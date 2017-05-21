# React Feed
React feed is a realtime newsfeed similar to instagram (but a lot simpler). This project uses the power of firebase to make the single page application responsive, lightweight, blazing fast and easy to maintain.


## Features
### User authentication
The authentication relies on Firebase authentication so it's very easy to add Facebook, Google, Github and Twitter oAuth
- Login
- Signup
- Logout
- Password recovery
- Email confirmation
- User profile page

### Realtime newsfeed (no need for page reload)
Using firebase realtime database the feed is super fast and responsive
- Feed items list (instagram style)
- Feed item create and delete (only authors can delete)
- Comments create and delete (only authors can delete)
- Like / unlike posts
- Image upload to firebase storage

## Dependencies
- *Firebase:* to manage the nosql realtime database, user authentication and file storage
- *Lodash:* makes it simpler to deal with arrays and objects
- *Mobx:* to manage the state (simpler than Redux)
- *Moment:* makes easier to deal with dates
- *react-dropzone:* for drag and drop image uploads
- *react-icons:* enable support for a variety of icons
- *react-router:* takes care of all the routing
- *styled-components:* great to manage styles in a component architecture



## Installation
### Create a firebase account:
go to https://console.firebase.google.com/ and create an account and create a project.

while testing configure your rules for public access
This does make your database open to anyone, even people not using your app, so be sure to restrict your database again when you set up authentication.

## Config:
In your firebase project go to:
- Authentication
and on the top right click:
- WEB SETUP

Copy the info and paste in the config-sample.js in your root directory and save it as config.js

## Install the app:
`npm install` or `yarn install`

## Running the app:
`yarn start`
