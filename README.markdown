This is the code base for the Goo Software Ltd website ([www.goosoftware.co.uk](http://www.goosoftware.co.uk)). 

It uses [Nanoc](http://nanoc.stoneship.org/) to build the static site contents - check it out, it's really cool.

# Installation

    gem install nanoc
    gem install rack
    gem install mime-types
    gem install kramdown
    gem install builder
    gem install rake
    gem install bundler
    gem install systemu # for rsync deployment    

# Compiling the site

To compile once:

    nanoc co
    
To test (runs a WEBBrick server and re-compiles every time a file changes):

    nanoc aco

# Deployment

    rake deploy