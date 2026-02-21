require 'liquid'

module EndswithFilter
def endswith(input, suffix)
    input.to_s.end_with?(suffix.to_s)
end
Liquid::Template.register_filter self
end
