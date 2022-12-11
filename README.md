# Spellit
An online spelling application that merges the act of learning English with play.
It is best to be used with a bunch of friends or at school.
However, don't worry if you've got no one to play with as Spellit also features online lobbies.

Spellit makes it easier for you to learn English by having fun.
The project is being developed within a 
<a href="https://www.delta-skola.cz/talentovy-program-delta-topgun">school program at DELTA - Střední škola informatiky a ekonomie, s.r.o.</a>

## User stories

* as a **guest** I want to be able to create a new account
* as a **guest** I want to be able to log into my existing account
* as a **guest** I want my login to be saved, so I don't have to fill in my login details again
* as a **user** I want to be able to log out
* as a **user** I want to be able to see my statistic so that I can compare myself to my friends
* as a **user** I want to be able to see a **global leaderboard** so that I can compare myself to all the other players
* as a **user** I want to be able to join an existing lobby, so that I can join my friend's lobby
* as a **user** I want to be able to create a new game lobby, so that I can invite other players to join
* as a **player** I want to be able to see if the game has already started
* as a **input_player** I want to be able to input a word for other players to spell
* as a **speller_player** I want to be able to hear the inputted word by **input_player**, so that I can spell it out
* as a **player** I want to be able to placed on a game **lobby leaderboard**, so that I can compare myself to other players in the lobby
* as a **player** I want to be able to win a game, so that I can get a better placement on the **global leaderboard**

## Acceptance criteria

A web based application allowing simultaneous connection of multiple users across multiple lobbies.

### Authentication

#### Register
The register page should consist of a submit button and of three input fields. One for username, one for email address and one for password. If one of the inputs does not meet the requirements given in Acceptance criteria->Account section, warning text should appear informing the user of their mistake.

#### Login
The login page will consist of a submit button, an input field for email address, an input field for password and a checkmark for saving the user login. This means that the next time they will visit Spellit, they'll be automatically authenticated without filling their information in considering they did not log out.

### guest

Anyone who wants to participate needs to create an account. Each account always consists of a username, email address and password.

#### Account

*username*
* Username is allowed to consist of lowercase letters, numbers, dots and underscores. The length of username cannot exceed 16 characters.

*email address*
* Every account has to have a valid email address linked to it.

*password*
* Password has to contain at least 8 characters from which there has to be at least one letter and one number.

After registering, the guest will receive an email containing a link with a "agree to TOS" screen. The account exists, but until agreeing to the TOS, it will be marked as not-created and is considered to be a guest account.

### user

After creating an account and agreeing to TOS, we consider the guest to be a user. They now have access to the application.
They can create a **new lobby**, join an **existing lobby**, view their **profile**, view the **global leaderboard**.

#### profile
Each user will be able to view their profile. They'll see their general information there. General information such as win rate,
games played, their name and their bio.

#### global leaderboard
All users are displayed on a global leaderboard ranked by their win rate

#### existing lobby
You can join a lobby given you've got an invitation link. This invitation link will simply be an url to the lobby.

#### new lobby
As a user you can create a new lobby and invite your friends to play with you. After creating the lobby, an invitation link is simply the url.

### player
After joining an existing lobby, or creating a new lobby you become a **player**. You've now got two roles to play as. 
Either you are a **input_player** or **speller_player**

### input_player
Every iteration (one iteration = once have all the players became the input_player at least once) is a player input_player.
As this role, the player inputs a valid English word into the prompt that shows up on screen. The word is then played out loud
to speller_player role. After inputting the word, the input_player gains 1 point.

### speller_player
As this role you're supposed to spell the word given by an input_player. The word is always played out loud and you can choose to
play it again. After spelling out the word correctly, you gain 1 point.

## Technical Overview
### Frontend
The application's frontend is written in the React ecosystem. Using React as the frontend library of choice. React router as the 
router. For styling the application uses styled-components with the additional vanilla CSS when convenient.

### Backend
The API is written using the Go programming language. For the database the application uses Postgresql.

#### Endpoints

**POST** *Registers a new user*

Successful request will result in: 201 Created

Unsuccessful request will result in: 
* 400 Bad Request - user already has an account created.
```
{{baseUri}}/api/user/register/{"userName":string,"email":string,"password":string}
```

**GET** *Login an existing user*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - user doesn't exist.
```
{{baseUri}}/api/user/login/{"email":string,"password":string}
```

**GET** *Shows user information*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - user doesn't exist.
```
{{baseUri}}/api/user/profile/{"email":string}
```

**GET** *Shows global leaderboard*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 500 Internal Server Error - server encountered an unexpected condition
```
{{baseUri}}/api/leaderboard}
```

**GET** *Shows not started active lobbies*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 500 Internal Server Error - server encountered an unexpected condition
```
{{baseUri}}/api/lobby}
```

**POST** *Create a new lobby*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - client error
* 403 Forbidden - an active lobby with the same name already exists
```
{{baseUri}}/api/lobby/new/{"name":string}}
```

**POST** *Join a lobby*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 403 Forbidden - lobby is full
```
{{baseUri}}/api/lobby/{"name":string}}
```

**POST** *Start the game*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 403 Forbidden - lobby could not be started (usually because the player count did not exceed 1)
```
{{baseUri}}/api/lobby/start/{"name":string,"email":string}}
```

**GET** *List players in lobby*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - lobby does not exist
```
{{baseUri}}/api/lobby/players/{"name":string}}
```

**POST** *Inputs word to be spelled by input_player*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - the word did not match accepted pattern
* 403 - user roles did not match
```
{{baseUri}}/api/lobby/spellit/{"word":string}}
```

**POST** *Inputs spelled word by speller_player*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - the string did not match accepted pattern
* 403 - user roles did not match
```
{{baseUri}}/api/lobby/spelled/{"word":string}}
```

**GET** *Lobby score*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - lobby does not exist
```
{{baseUri}}/api/lobby/stats/"name":string}
```

**POST** *Increase score*

Successful request will result in: 200 OK

Unsuccessful request will result in:
* 400 Bad Request - user does not exist
```
{{baseUri}}/api/lobby/increase/"email":string,"value":number}
```

## Component Diagram
TODO

## Database model

![data_structure.png](data_structure.png)

## Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
