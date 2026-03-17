require "rubygems"
require "json"

module SelectFilter
def select(input, *selected)
    input.map do |o|
        hashIn = o.to_liquid.hash_for_json
        selectedHash = {}
        selected.each do |key|
            if key.include?(":")
                keyfrom, keyto = key.split(":", 2)
            else
                keyfrom, keyto = key, key
            end
            if keyfrom.include?(".")
                value = keyfrom.split(".").reduce(hashIn) { |h, k| h[k] if h }
            else
                value = hashIn[keyfrom]
            end
            selectedHash[keyto] = value unless value.nil?
        end
        selectedHash
    end
end
Liquid::Template.register_filter self
end
