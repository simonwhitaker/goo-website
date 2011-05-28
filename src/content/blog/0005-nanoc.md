---
title: Site construction and blogging with nanoc
kind: article
created_at: 2010-10-20
---

Since its inception, the Goo Software website has been written as static HTML and the 
blog's been running on a Wordpress installation. It's worked fine but I've never been
happy with the setup. On the blog side, Wordpress is OK but heavyweight for our modest
needs, and on the main site maintaining everything as static HTML is a pain. Even with
only a few pages there's a load of boilerplate code that needs to be kept in sync 
across pages, and on the front page there's a load of duplicate code around the
portfolio.

I'd toyed with the idea of using [Django][django] to run the site, which would allow me
to use Django's templates system to share boilerplate code across pages, and Django's
ORM to model stuff like apps for the portfolio, but that's getting seriously heavyweight
for a site that seldom changes. I needed something in between static and Django. And then
I found [nanoc][nanoc].

## What is nanoc?

nanoc is "a Ruby site compiler that generates static HTML". In essence, you provide content 
as *layouts* (templates) and *items* (pages), and nanoc uses those building blocks to 
generate your site. The back end strikes just the right balance between flexibility and
simplicity, and it's nicely extensible so you're only a few lines of Ruby away from any
missing functionality that you can't do without.

## Basic workflow

Using nanoc is really easy. Page content can be specified in a number of different formats,
(I tend to use HTML for the regular website and Markdown for blog posts). You edit your page
content then at the command line, type:

    $ nanoc compile

That compiles your nanoc source into your final, static web content. You can preview the
build locally and when you're ready, deploy it as you would any static web content, e.g.
using FTP. nanoc has built-in support for rsync so if your server supports it you can deploy
your site without even having to fire up your favourite FTP client. Just add the deploy details
to your site's config (which is written in YAML), for example:

    deploy:
        default:
            dst: "goosoft@goosoftware.co.uk:~/goosoftware.co.uk"

Then deploy with Rake:

    $ rake deploy:rsync

## Case study: the Goo Software portfolio

Have a look on the [Goo front page][goo] and you'll see our funky portfolio showing some of the
cool apps we've worked on recently. Have a look at the page source and you'll see it's basically
a load of divs with the same internal structure, one for each app. And that static HTML is exactly
how we used to code it - copying and pasting the div each time we added a new app.

Here's how we achieve the same thing using nanoc. In the config for the index page, we've got this:

    apps:
     -  name: RSA Vision
        slogan: Enlightenment to go
        itunes_url: http://itunes.apple.com/gb/app/rsa-vision/id397348011?mt=8
        image: /images/apps/rsa-vision.png 
        description:
            - > The RSA Vision app brings to you the latest videos from the 
                RSA's free public events programme. You can browse by category, 
                search for videos and compile a playlist of your favourite 
                videos to watch later.
            -   (Check out the RSAnimate category - they're <em>really</em> great!)
        client: <a href="http://www.torchbox.com/">Torchbox Ltd</a>
        platform: iPhone and iPod Touch

     -  name: iBreastCheck
        slogan: Helping you to be breast aware
        itunes_url: http://itunes.apple.com/gb/app/ibreastcheck/id391746205?mt=8
        image: /images/apps/ibreastcheck.png
        description:
            - > iBreastCheck from breast cancer charity Breakthrough helps 
                you to be breast aware with a little TLC: Touch, Look, Check.
            - > The app has video and slideshow content explaining how to 
                check your breasts, a reminder service to help you to remember 
                to check regularly, and more.
        client: <a href="http://www.torchbox.com/">Torchbox Ltd</a>
        platform: iPhone and iPod Touch

Then in the HTML, we've got this:

    <% for app in @item[:apps]%>
    <div class="app" id="<%= app[:name].downcase.gsub(' ','-') %>">
        <h2>
            <a href="<%= app[:itunes_link] %>"><%= app[:name] %></a>
            <span class="appslogan"><%= app[:slogan]%></span>
        </h2>
        <a href="<%= app[:itunes_link] %>">
            <img src="<%= app[:image] %>" class="screenshot" alt="app screenshot" border="0">
        </a>
        <div class="description">
            <% for desc in app[:description]%>
            <p><%= desc %></p>
            <% end %>

            <div class="appstore-badge">
                <a href="<%= app[:itunes_link] %>">
                    <img src="/images/app-store-badge-clipped.png" alt="App Store Badge Clipped" border="0">
                </a>
            </div>
            <% if app[:client] %>
            <div class="detail">Client: <%= app[:client] %></div>
            <% end %>
            <% if app[:platform] %>
            <div class="detail">Platform: <%= app[:platform] %></div>
            <% end %>
        </div>
        <div class="app-end"></div>
    </div>
    <% end %>

If you're interested in using nanoc yourself and you're the sort of person who learns best
by example, you can find the complete source for this site (including the blog) 
[on GitHub][goo-on-github].


[django]: http://www.djangoproject.com/
[nanoc]: http://nanoc.stoneship.org/
[goo-on-github]: http://github.com/simonwhitaker/goo-website
[goo]: http://www.goosoftware.co.uk/