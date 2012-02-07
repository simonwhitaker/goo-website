---
kind: article
created_at: 2012-02-07
title: How to run your own simple Git server
---

I had the need recently to set up a temporary git remote on a Mac mini on my local network. It turned out to be pretty handy so I thought I'd document how I did it.

Throughout this article I'll refer to the Mac mini where I set up the remote repository as **the server**, and my Macbook Pro (my primary work computer) as **my laptop**.

## What I wanted

I use Github a lot, so I'm used to representing my remotes in the SSH style, like this:

	git@github.com:simonwhitaker/PyAPNs.git

Then I'll clone that remote by running:

	git clone git@github.com:simonwhitaker/PyAPNs.git

and away I go. So, the question was, how do I create a remote on my own device and access it in the same way.

## Unpicking the SSH notation

It helps to first have an understanding of exactly what that notation Github uses actually means. It's really simple. The notation adheres to the following pattern:

	[username]@[hostname]:[path to repository]

That's it. So that Github connect string from earlier means that I'm connecting to the server at **github.com** as the **git** user, and cloning the repository that exists at **simonwhitaker/PyAPNs.git** within the git user's home directory.

Hang on though - I don't have a password for the git user on github.com, so how come I can read and write stuff in their home directory? It's because I've set up **passwordless SSH** by uploading my SSH public key to Github. When I then connect via SSH, the SSH server at github.com looks to see if the private SSH key on my computer matches a public key on github.com. If it does, I'm allowed in.

So, here's what I had to do on my Mac mini:

1. Create a new user called git
2. Set up passwordless SSH so that I can connect to my git user's account without a password
3. Create a directory in git's home directory for storing my repositories
4. For each repository I want to host: log in to git's account on my Mac mini and initialise a new Git repository.

## Step 1: Create the git user

The steps on how to do this will vary depending on your operating system. For the sake of simplicity, on the server I just opened System Preferences > Accounts and added a new user, setting their username to git and giving them a suitably strong password. (That's not a perfect solution: it sets git up as a regular user so e.g. they appear in the login screen, but it works fine for me. If you want to create a user who doesn't appear in the login screen you can search online for how to do that.)

## Step 2: Set up passwordless SSH

On my laptop I opened a terminal window and checked to see if I have a current public SSH key:

	$ ls ~/.ssh/id_rsa.pub

I did. If you don't have one, you can create a new public/private key pair using ssh-keygen:

	$ ssh-keygen

Once that's done, I needed to copy my public key to the server. I copied it to the git user's home directory, like this:

	$ scp ~/.ssh/id_rsa.pub git@Goo-mini.local:

When prompted, I entered **git's password** (the one I set up earlier). Then I connected to the server over SSH, again using the git account:

	$ ssh git@Goo-mini.local

Again, I entered the git user's password when prompted.

Once logged in as git, I copied my public SSH key into the list of authorised keys for that user.

	$ mkdir -p .ssh
	$ cat id_rsa.pub >> .ssh/authorized_keys

Then I locked down the permissions on .ssh and its contents, since the SSH server is fussy about this.

	$ chmod 700 .ssh
	$ chmod 400 .ssh/authorized_keys

That's it, passwordless-SSH is now set up. Try it out: log out of the server then log back in:

	$ ssh git@[your server name]

You should be logged straight in without being prompted for a password. If you're not, something's gone wrong - check through the instructions so far and make sure you didn't miss something.

## Step 3: Create a directory in git's home directory for storing my repositories

I'm going to log in as git and create a directory called simon in git's home directory. This will store my repositories on the server.

	$ ssh git@Goo-mini.local
	$ mkdir simon

Simple.

## Step 4: For each repository I want to host, log in to git's account on my Mac mini and initialise a new Git repository.

This one's pretty simple, too. First I create a directory to hold the repository. I'll follow Github's convention and name the directory as [project name].git:

	$ ssh git@Goo-mini.local
	$ mkdir -p simon/myproject.git
	$ cd simon/myproject.git

Now I need to initialise a bare Git repository in that directory:

	$ git init --bare

Note the `--bare` option: that means that rather than creating all Git's config in a .git subdirectory it'll be created directly in myproject.git, which is what we want.

## Trying it out

That's it, we're done! Let's try it out. On my own laptop:

	$ cd /path/to/git/repo
	$ git remote add origin git@Goo-mini.local:simon/myproject.git
	$ git push origin master
	Counting objects: 3, done.
	Writing objects: 100% (3/3), 232 bytes, done.
	Total 3 (delta 0), reused 0 (delta 0)
	To git@Goo-mini.local:simon/myproject.git
	 * [new branch]      master -> master

Cooooool!

## Next steps

There are loads of ways you could improve this process. For example, any user who uploads their public SSH key would have access to all repositories in git's home directory. You might want to change that, for example so that users can only write to their own repositories.
