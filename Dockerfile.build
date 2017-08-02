FROM ruby:2.3

RUN mkdir /data
WORKDIR /data

RUN apt-get update && apt-get -y install nodejs

COPY Gemfile /data/

RUN gem install bundler
RUN bundle install

# Fix https://github.com/babel/ruby-babel-transpiler/issues/294
RUN sed -i 's/@context ||= ExecJS.compile("var self = this; " + File.read(script_path))/@context ||= ExecJS.compile("var self = this; " + File.read(script_path, :encoding => "UTF-8"))/' /usr/local/bundle/gems/babel-transpiler-0.7.0/lib/babel/transpiler.rb

ENV LANG en_US.UTF-8

CMD ["jekyll", "build"]
