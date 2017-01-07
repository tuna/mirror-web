FROM alpine:3.3
MAINTAINER Xuanwo <xuanwo.cn@gmail.com>
RUN apk add --update \
    nodejs ruby ruby-dev ruby-rdoc ruby-irb ruby-io-console ruby-nokogiri \
    gcc libc-dev libffi-dev zlib-dev libxml2-dev libxslt-dev build-base \
    && rm -rf /var/cache/apk/*
RUN gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/
RUN gem install bundler
RUN bundle config build.nokogiri --use-system-libraries
VOLUME /src
WORKDIR /src
EXPOSE 4000
CMD bundle install && jekyll server -H 0.0.0.0

