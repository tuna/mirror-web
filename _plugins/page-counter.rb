require 'liquid'
require 'jekyll'

module PageCounterTag
  class PageCounterTag < Liquid::Increment
    def render(context)
      context.environments.first['page'][:page_counters] ||= {}
      value = context.environments.first['page'][:page_counters][@variable] ||= 0
      context.environments.first['page'][:page_counters][@variable] = value + 1
      value.to_s
    end
  end
  Liquid::Template.register_tag('page_increment', PageCounterTag)
end
