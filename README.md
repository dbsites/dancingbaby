# DevOps

Setup for this unit will be a little different than what you're used to.  In order clearly show the advantages of containerized applications, we want to share the same codebase.  

So you'll only fork this repo to one partner's account.  After you've forked it, go to your forked version and find the 'Settings' tab at the top of the repo.  Select that and then select 'Collaborators and Teams'. Scroll down to the bottom and add the other partner as a Collaborator by entering their github name and setting their access to 'write'.  And now...

## Docker

### Summary

[Docker](http://docker.com/) is a tool designed to make it easier to create, deploy, and run applications by using containers.

Containers provide an easy way for us to create lightweight isolated environments that are defined by a configuration file and may be used again and again across your team and infrastructure to ensure that everyone working on the codebase shares the same environment with each other and production.

### Docker Overview

#### Docker Containers

Containers are runtime environments. You usually run only a single main process in one Docker container. So basically, one Docker container provides one service in your project.

For example, you can start one container to be your node server and start another container to be your postgres database and connect these containers together to get a full stack project set up on your development machine.

#### Docker Images

In order to create a container, you will need to create a Docker image.  A Docker image can be thought of as a template derived from a recipe of technologies. A Docker image is _not a runtime_, it’s rather a collection of files, libraries and configuration files that build up an environment.

Images can be layered on top of each other to add further utilities/libraries/etc to the environment.  There is a great resource of community and official images on [Docker Hub](https://hub.docker.com/search?q=&type=image).  These files can be accessed using the FROM keyword in your Dockerfile, (or you can pull the image manually with the `docker pull` command.)

Containers are created from images with the `docker run` command.

#### Dockerfile

- The Dockerfile is a text file that (mostly) contains the instructions that you would execute on the command line to create an image.
- A Dockerfile is a step by step set of instructions.
- Docker provides a set of standard instructions to be used in the Dockerfile, like `FROM, COPY, RUN, ENV, EXPOSE, CMD`  
- Docker will build a Docker image automatically by reading these instructions from the Dockerfile.

### Getting Started

First things first, let's just make sure that the application works with live updates/HMR without any kind of containerization.

1. Run ```npm install```
1. Run ```npm run dev:hot```

That should open up a browser window with the MegaMarkets app all set for further development.  To verify that it's working, hop over to client/styles.css and change the color of the text to something exciting.  You should see your change immediately reflected in the browser.  Yes?  Good.  No?  Send a help desk :smiley:

Now that we have our baseline application working, let's containerize it.  We'll begin by deleting the node_modules.

```rm -rf node_modules/```

**...and we'll never npm install in this directory again!** We'll be sourcing our node_modules from an image the whole team can share.

#### Setup

- Go to [docker.com](http://docker.com/), then download and install Docker for your OS. (You'll be required to create a docker account to do this.  Remember your dockerId, you'll use it in the next step)

##### Docker Hub

We have a way to collaboratively share code with Github.  Docker Hub gives us a way to collaboratively share images.

1. Head over to [Docker Hub](https://hub.docker.com) and create an account with the dockerID that you used when you installed Docker.  

1. Create an organization.  The name will need to be unique across all of Docker Hub, so this may take a couple of attempts.  You'll use this name as you go through the challenge anywhere you see `[orgname]`

1. Add your partner to the **owners** team by entering their dockerID

1. Make sure that each partner's docker daemon is pointing to your organization by right clicking it the icon and selecting your dockerID -> and then your organization

Okay, setup complete! On to the...

#### Challenges

This repo contains a full stack version of the MegaMarkets application built in React/Redux/Node/Express fronting a postgres database.  The application is completely built out.  The goal of this two day unit is for you to deploy a **containerized** version of this full stack application to **AWS** using **Travis-CI**.

We'll begin by containerizing this application.  For now, let's just get an image configured with a stable version of node and make sure that all of our node_modules are built within our container.  This will ensure that everyone who uses this image will be on the same page.

##### Part 1 - Dockerfile

###### Create a file in the top level directory called `Dockerfile` that implements the following

1. Start FROM a baseline image of node v10.1

1. Set up a WORKDIR for application in the container

1. COPY all of your application files to the WORKDIR in the container

1. RUN a command to npm install your node_modules in the container

1. RUN a command to build your application in the container

1. EXPOSE your server port

1. run the server with CMD

###### Build the docker image from the Dockerfile

Tag the image as mm-prod so it will be easy to recognize and reference.  By default, Docker will look for the Dockerfile in the current directory.  That's also where we'll tell it to build the image.

```docker build -t [orgname]/mm-prod .```

We can verify that the image has been created by listing the docker images on your machine.

```docker images```  

###### Create the container by running the image

We'll open port 3001 on our localhost and point to port 3000 in the container.  (These could be the same value, we're just differentiating for clarity here)

```docker run -p 3001:3000 [orgname]/mm-prod```

You should see the server start up.  Now just go to your browser and navigate to localhost:3001 to see the application running from within your container!

You can also verify that the container has been created by listing the current running containers

```docker ps```

Note the NAME in the output.  Docker generates a random name for us that we can use to reference the container.  We can specify the name if we include a ```--name <name>``` parameter when we invoke ```docker run```.

We can stop our container by hitting cmd-C or by opening another terminal and issuing the stop command.

```docker stop <container_name>```

##### Part 2 - Docker Compose

So we can build an image that creates a container that runs our application.  Great.  However, you may have noticed that we aren't running webpack-dev-server, so we're not getting live reloading/HMR.  

Wouldn't it be really cool if we could run webpack-dev-server in a container?  Wouldn't it also be swell if we had a container that hosted a local version of our database to use for development?  You bet it would.  And we can.

Now, we could spin up these containers in proper order manually every time we wanted to run our app, but wouldn't it be even better if we could write up a configuration file that would handle all of that with a single command?  Yes, yes it would.

All of this can be ours by building a couple of images and orchestrating them with the **docker-compose** utility.

To begin, let's build an image that will create a container running webpack-dev-server.

###### Create a file in the top level directory called `Dockerfile-dependencies` that implements the following

1. Start FROM a baseline image of node v10.1

1. RUN a command to npm install webpack globally in the container

1. Set up a WORKDIR for application in the container

1. COPY your package*.json (to get both package and package-lock) files to the WORKDIR in the container

1. RUN a command to build your application in the container

1. RUN a command to npm install your node_modules in the container

1. EXPOSE your server port

###### Build the docker image from Dockerfile-dependencies

Tag the image as mm-dependencies so it will be easy to recognize and reference.  We'll tell it to look for the Dockerfile-dependencies using the -f parameter

```docker build -t [orgname]/mm-dependencies -f Dockerfile-dependencies .```

Let's verify that the image has been created by listing the docker images on your machine.

```docker images```  

###### Create the container using docker-compose

This time, instead of running the image to create the container using the command line, we're going to make use of the docker-compose utility.  First, we'll create a configuration file that docker-compose will use to orchestrate our containers.  You'll want to refer to the [docker docs](https://docs.docker.com/compose/overview/) to learn more about configuring docker-compose.

The file format for this configuration file will be [yaml](https://rollout.io/blog/yaml-tutorial-everything-you-need-get-started/), which stands for 'YAML Ain't Markup Language'.  It's useful as a simple human-readable structured data format. Yaml format is used a lot in the industry for configuration files.

###### Create a file in the top level directory called `docker-compose-dev-hot.yml` that implements the following

1. Set the docker-compose **version** to 3

1. Create a **services** dictionary

    1. Create a **dev** dictionary as the first element in the **services** dictionary

        1. Create an **image** element pointing to your [orgname]/mm-dependencies image

        1. Create a **container_name** element set to something meaningful like 'mm-dev-hot'

        1. Create a **ports** element that contains an array.  We'll just have one value that will route requests from port 8080 on the host to port 8080 in the container.

        1. Create a **volumes** element that contains an array.  

            1. In our first element, we'll want to mount our current directory to the `/usr/src/app` directory in the container.  This will allow the webpack-dev-server running in the container to watch for code changes in our file system outside the container.

            1. In our next element, we'll mount a volume we'll simply call 'node_modules' to `/usr/src/app/node_modules` in the container.

        1. Create a **command** element that executes ```npm run dev:hot```

1. Create a **volumes** dictionary where we'll declare the named volume(s) we're mounting in our container(s)

    1. Create an empty **node_modules** element.  

###### Run the container using docker-compose

```docker-compose -f docker-compose-dev-hot.yml up```

Let's verify that the live reloading is working by changing the text color in your styles.css file.  It should reload the page with the new color.  Voila!

Okay, we've got a containerized environment with live reloading/HMR working for our application.  There's just one last thing to add - a local development database.  This will enable us to work on new features without worrying about our test data affecting production.

##### Create a file in the top level directory called `Dockerfile-postgres` that implements the following

1. Start FROM a baseline image of postgres v9.6.8

1. COPY the sql script in the ./scripts directory to /docker-entrypoint-initdb.d/ in the container.  Whenever the container spins up, scripts in that directory get executed automotically.  This will create and populate our database in the container.

###### Build the docker image from Dockerfile-postgres

Tag the image as mm-dependencies so it will be easy to recognize and reference.  We'll tell it to look for the Dockerfile-dependencies using the -f parameter

```docker build -t mm-dependencies -f Dockerfile-dependencies .```

Let's verify that the image has been created by listing the docker images on your machine.

```docker images```

###### Edit `docker-compose-dev-hot.yml` to add our postgres container configuration

1. Create a **postgres-db** dictionary as the second element in the **services** dictionary

    1. Create an **image** element pointing to your mm-postgres image

    1. Create a **container_name** element set to something meaningful like 'mm-database'

    1. Create an **environment** element that contains an array.  We'll add three elements to the array:
        1. POSTGRES_PASSWORD=admin
        1. POSTGRES_USER=mmadmin
        1. POSTGRES_DB=mmdb

    1. Create a **volumes** element that contains an array.  

        1. In our single element here, we'll want to mount a volume we'll call 'dev-db-volume' to the `/var/lib/postgresql/data` directory in the container.  This is where postgres stores the actual data files that make up your database.  This volume will persist the data between container starts and stops.

1. Under the **volumes** dictionary, add an empty **dev-db-volume** element.

1. We only want our **dev** service to start _after_ our **postgres-db** service has started.  We can do that by adding a **depends_on** array to our **dev** dictionary and set the first element to **postgres-db**

1. Finally, we just need to let our application know that we want to use our development database hosted in the container rather than the production database.  Look at the ./server/models/mmModel.js file to see how we're doing this by using an environment variable called NODE_ENV.

    1. In order to pass that environment variable to our server, we can update the 'dev:hot' script in package.json to pass that key with the value 'development'.  Now we'll point to the containerized database.

###### Make your life even easier by using npm scripts

It's good to know the docker-compose command to start up your containers, but once you know how to do it, it's nice to make it simple to kick off by adding it as a command in your script object in package.json.  You can see where this has already been added as 'docker-dev:hot'


##### Part 3 - Docker Hub

1. Now we can push our images up to Docker Hub

    - ```docker push [orgname]/mm-postgres```
    - ```docker push [orgname]/mm-dependencies```
    - ```docker push [orgname]/mm-prod```

2. Check your organization page in Docker Hub to verify that your images are there

3. And now for the final test!  Have your partner clone your forked repo to their local machine and run
    - ```npm run docker-dev:hot```
