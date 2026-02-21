require 'open3'

module Jekyll::Zhelp
end

class Jekyll::Zhelp::Generator < Jekyll::Generator
  safe true
  priority :highest
  class HelpzCollection < Jekyll::Collection
    def initialize(site, metadata, helpzOutputDir)
      @site = site
      @metadata = metadata
      @relative_directory = helpzOutputDir
      @label = sanitize_label(metadata['label'] || 'helpz')
    end
    def write?
      true
    end
    def relative_directory
      @relative_directory
    end
    def directory
      @directory ||= site.in_source_dir(relative_directory)
    end
    def filtered_entries
      entries
    end
    def to_liquid
      super.to_h
    end
  end
  def generate(site)
    cache_dir = site.config['cache_dir'] || '.jekyll-cache'
    helpzConfig = site.config['helpz'] || {}
    helpzCollectionConfig = helpzConfig['collection'] || {}
    helpzDir = helpzConfig['dir'] || '_helpz'
    generateScript = helpzConfig['generator'] || 'generate.mjs'
    enabledPagesFile = helpzConfig['enabled_pages_file'] || 'enabled.yaml'
    enabledPagesFile = site.in_source_dir(File.join(helpzDir, enabledPagesFile))

    unless helpzConfig['language']
      Jekyll.logger.error "Zhelp:", "No language specified in _config.yml"
      raise "No language specified in _config.yml"
    end

    language = helpzConfig['language']

    helpzBuilder = site.in_source_dir(File.join(helpzDir, generateScript))
    helpzOutputDir = File.join(cache_dir, 'helpz')

    cmd = ['node', helpzBuilder,
      "--enabled-pages=#{enabledPagesFile}",
      "--output-dir=#{helpzOutputDir}",
      "--language=#{language}",
    ]

    Jekyll.logger.info "Zhelp:", "Generating help content with command: #{cmd.join(' ')}"
    status = Open3.popen3(*cmd) do |stdin, stdout, stderr, wait_threads|
      Thread.new { stdout.each_line { |line| Jekyll.logger.info "Zhelp:", line.chomp } }
      Thread.new { stderr.each_line { |line| Jekyll.logger.warn "Zhelp:", line.chomp } }
      wait_threads.value
    end
    unless status.success?
      Jekyll.logger.error "Zhelp:", "Failed to generate help content"
      raise "Failed to generate help content"
    end
    Jekyll.logger.info "Zhelp:", "Help content generated successfully"

    helpzCollection = HelpzCollection.new(site, helpzCollectionConfig, helpzOutputDir)
    helpzCollection.read
    site.collections[helpzCollection.label] = helpzCollection
  end

  def self.<=>(other)
    r = super
    if r == 0 && other.is_a?(Jekyll::Vite::Generator)
      -1
    else
      r
    end
  end
end

class Jekyll::Zhelp::TemplateCompile < Jekyll::Tags::IncludeTag
  @@compilers = {}
  def initialize(tag_name, markup, tokens)
    super(tag_name, "dummyfile #{markup}", tokens)
  end
  def render(context)
    site = context.registers[:site]
    parameters = parse_params(context) if @params
    parameters ||= {}
    templateCompiler = self.class.templateCompiler(site)
    compiler = @@compilers[site] ||= {}
    unless compiler[:isRunning]
      Jekyll.logger.info "Zhelp:", "Starting template compiler with command: node #{templateCompiler}"
      compiler[:isRunning] = true
      cmd = [ 'node', templateCompiler ]
      compiler[:stdin], compiler[:stdout], stderr, compiler[:wait] = Open3.popen3(*cmd)
      Thread.new { stderr.each_line { |line| Jekyll.logger.warn "Zhelp:", line.chomp }; stderr.close }
    end
    input = parameters.to_json
    size = compiler[:stdin].write("#{input.bytesize}\n#{input}")
    compiler[:stdin].flush
    readBuf = ""
    while true
      char = compiler[:stdout].getc
      break if char.nil? || char == "\n"
      readBuf << char
    end
    outputLength = readBuf.to_i
    output = ""
    while output.bytesize < outputLength
      chunk = compiler[:stdout].read(outputLength - output.bytesize)
      output << chunk
    end
    outputHash = JSON.parse(output)
    if outputHash['error']
      Jekyll.logger.error "Zhelp:", "Error compiling template: #{outputHash['error']}"
      raise "Error compiling template: #{outputHash['error']}"
    end
    compiled = outputHash['result']

    unless context.environments.first['page']['help_templates'].is_a?([]::class)
      context.environments.first['page']['help_templates'] = []
    end
    context.environments.first['page']['help_templates'].push(compiled['compiled'])
    compiled['rendered'] || ""
  end
  def self.stopCompiler(site)
    compiler = @@compilers[site]
    if compiler && compiler[:isRunning]
      begin
        compiler[:stdin].puts('0\n')
        compiler[:stdin].flush
        compiler[:stdin].close
        status = compiler[:wait].value
        compiler[:stdout].close
        Jekyll.logger.info "Zhelp:", "Stopping template compiler, exit status: #{status.exitstatus}"
      rescue => e
        Jekyll.logger.warn "Zhelp:", "Error when stopping template compiler: #{e.message}"
      ensure
        compiler[:isRunning] = false
      end
    end
  end
  def self.templateCompiler(site)
    helpzConfig = site.config['helpz'] || {}
    helpzDir = helpzConfig['dir'] || '_helpz'
    compileScript = helpzConfig['compile_script'] || 'compileTempl.mjs'
    site.in_source_dir(File.join(helpzDir, compileScript))
  end
end

class Jekyll::Zhelp::CompiledTemplates < Liquid::Tag
  def render(context)
    templates = context.environments.first['page']['help_templates'] || []
    '[' + templates.join(',') + ']'
  end
end

Liquid::Template.register_tag('ztmpl', Jekyll::Zhelp::TemplateCompile)
Liquid::Template.register_tag('zcompiled_templates', Jekyll::Zhelp::CompiledTemplates)


Jekyll::Hooks.register :site, :pre_render do |site|
  Jekyll::Zhelp::TemplateCompile.stopCompiler(site)
end

Jekyll::Hooks.register :site, :post_render do |site|
  Jekyll::Zhelp::TemplateCompile.stopCompiler(site)
end
