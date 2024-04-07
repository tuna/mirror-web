Jekyll::Hooks.register(:site, :after_init) do |site|
  site.config['exclude'].push(*(site.config['addition_exclude'] || []))
end
