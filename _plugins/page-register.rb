require 'liquid'
require 'jekyll'

module PageRegisterFilter
def save_on_page(input, name)
  @context.environments.first['page'][:saved_registers] ||= {}
  @context.environments.first['page'][:saved_registers][name.to_s] = input
end
def get_from_page(input)
  @context.environments.first['page'][:saved_registers] ||= {}
  @context.environments.first['page'][:saved_registers][input.to_s]
end
Liquid::Template.register_filter self
end
