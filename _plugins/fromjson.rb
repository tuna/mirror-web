require 'liquid'
require 'json'

module FromJsonFilter
def fromjson(input)
    JSON.parse(input.to_s)
end
Liquid::Template.register_filter self
end
