source "https://rubygems.org"
ruby RUBY_VERSION

# HACK(bouk): Overwrite Bundler's platform matcher to ignore universal CPU
# The protobuf and gRPC 'universal' macOS gems break on M1
module Bundler::MatchPlatform
  def match_platform(p)
    return false if ::Gem::Platform === platform && platform.cpu == "universal"
    Bundler::MatchPlatform.platforms_match?(platform, p)
  end
end

gem 'jekyll'
gem 'html-proofer'
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#

# If you have any plugins, put them here!
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
group :jekyll_plugins do
    gem 'jekyll-feed'
    gem 'jekyll-sitemap'
    gem 'jekyll-paginate'
    gem 'jekyll-seo-tag'
end
