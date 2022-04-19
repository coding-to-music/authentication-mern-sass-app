# authentication-mern-sass-app

# 🚀 Javascript full-stack 🚀

## MERN Stack

### React / Express / MongoDB / TypeScript 

### Full authentication boilerplate using Node.js Express MongoDB React

https://github.com/coding-to-music/authentication-mern-sass-app

https://authentication-mern-sass-app.herokuapp.com

https://authentication-mern-sass-app.onrender.com

by Thomas Sentre https://github.com/Thomas-Max99

https://github.com/Thomas-Max99/authentication-app

```java
const secret = process.env.JWT_SECRET;
mongoose_1.default.connect(`${process.env.MONGODB_URI
```

## Deploying to Render

This plugin will extract info from Heroku and put it into a Docker file.

```java
heroku plugins:install @renderinc/heroku-import
```

Output:

```java
warning ../../../package.json: No license field
warning ../../../../../../package.json: No license field
warning "eslint-config-oclif > eslint-config-xo-space@0.27.0" has incorrect peer dependency "eslint@>=7.20.0".
warning "eslint-config-oclif > eslint-plugin-mocha@9.0.0" has incorrect peer dependency "eslint@>=7.0.0".
warning "eslint-config-oclif > eslint-plugin-unicorn@36.0.0" has incorrect peer dependency "eslint@>=7.32.0".
warning "eslint-config-oclif > eslint-config-xo-space > eslint-config-xo@0.35.0" has incorrect peer dependency "eslint@>=7.20.0".
warning "eslint-config-oclif > eslint-plugin-unicorn > eslint-template-visitor@2.3.2" has incorrect peer dependency "eslint@>=7.0.0".
warning "eslint-config-oclif > eslint-plugin-unicorn > eslint-template-visitor > @babel/eslint-parser@7.16.3" has incorrect peer dependency "eslint@^7.5.0 || ^8.0.0".
Installing plugin @renderinc/heroku-import... installed v1.1.0
```

```java
heroku render:import --app authentication-mern-sass-app
```

Output:

```java

=== Gathering information about Heroku app
Verifying Heroku app exists and CLI is logged in... ✔️
Verifying app is using a single, official Heroku buildpack... ✔️
Getting stack image... heroku-20
Getting and translating plan... Heroku Free $0/mo --> Render Free $0/mo
Getting instance count... 1
Getting custom domains... 0 custom domain(s)
Getting environment variables... 2 environment variable(s)
Getting add-ons... 0 add-on(s)

? Select addons to import.

Create render.yaml file and Dockerfile.render? This will overwrite any existing files with the same name. (y/n): y
Generating render.yaml file... done
Generating Dockerfile.render... done

=== Environment variables excluded from render.yaml
The following environment variables were not included in the generated
  render.yaml file because they potentially contain secrets. You may need to
  manually add them to your service in the Render Dashboard.

- JWT_SECRET:

=== Follow these steps to complete import of service(s) and database(s) to Render
1. Add, commit, and push the generated render.yaml and Dockerfile.render to GitHub or GitLab.
2. Go to https://dashboard.render.com/select-repo?type=iac
3. Search for and select this repository.
4. Verify the plan showing the resources that Render will create, and
   then click 'Create New Resources'.
5. After the resources are deployed, you may need to manually add
   the above environment variables to your Web Service in the Render Dashboard.
   They were not included in the generated render.yaml because they potentially
   contain secrets.
```


<!-- Please update value in the {}  -->

<h1 align="center">Full authentication application</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://https://image-uploader-67dc9.web.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview


![screenshot](https://i.ibb.co/zHKkvcR/overview-image-uploader.jpg)
![User Profile](https://i.ibb.co/LvKH1dF/image-uploader-overview2.jpg)



This is an an Authentication app. User can :

-Can register a new account
-Can log in
-Can log in or register with at least one of the following services: Google, Facebook, Twitter or Github
-Can sign out
-Can see his profile details
-Can edit my details including: photo, name, bio, phone, email and password
-Can upload a new photo or provide an image URL


### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Nodejs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Sass](https://sass-lang.com/)


## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) was to build an application to complete the given user stories.


## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/your-user-name/your-project-name

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example -->

- [Steps to replicate a design with only HTML and CSS](https://devchallenges-blogs.web.app/how-to-replicate-design/)
- [Node.js](https://nodejs.org/)
- [Facebook Developer](https://developers.facebook.com/)
- [Formidable](https://www.npmjs.com/package/formidable)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [Material UI](https://mui.com/)
- [Passport](https://www.npmjs.com/package/passport)

## Contact
- [Linkedin](https://www.linkedin.com/in/thomas-sentre-20035b1b7)
- [Email](info3thomas@gmail.com)
- [Quora](https://fr.quora.com/profile/Thomas-Sentre)
- [GitHub](https://github.com/Thomas-Max99)
- [Twitter](https://twitter.com/info3thomas)

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/authentication-mern-sass-app.git
git push -u origin main
```

## Heroku

```java
heroku create authentication-mern-sass-app
```

## Heroku MongoDB Environment Variables

```java
heroku config:set

heroku config:set JWT_SECRET="secret"

heroku config:set PUBLIC_URL="https://authentication-mern-sass-app.herokuapp.com"
```

## Push to Heroku

```java
git push heroku

# or

npm run deploy
```