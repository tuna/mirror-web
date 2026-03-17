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
  class Jekyll_Filters
    include Jekyll::Filters
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

    cmd = ['node', '--import=tsx/esm', helpzBuilder,
      "--enabled-pages=#{enabledPagesFile}",
      "--output-dir=#{helpzOutputDir}",
      "--language=#{language}",
      "--site-config=#{Jekyll_Filters.new.jsonify(site.config)}"
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
