# Spellit
An online spelling application that merges the act of English with play. It is best to be used with a bunch of friends or at school. However
don't be worried if you've got no one to play with as Spellit also features online lobbies.

Spellit makes it easier for you to learn English by having fun. The project is being developed within a <a href="https://www.delta-skola.cz/talentovy-program-delta-topgun">school program at DELTA - Střední škola informatiky a ekonomie, s.r.o.</a>

## User stories

* as a user you can create an account
* as a user you can log into your existing account
* as a logged-in user you can log out
* as a logged-in user you can view your statistics
* as a logged-in user you can view a global leaderboard
* as a logged-in user you can join an existing lobby
* as a logged-in user you can create a new lobby
* as a logged-in user you can invite your friends to join your lobby
* as a logged-in playing user you can input a valid English word to be spelled by all other players
* as a logged-in playing user you can spell a word that has been inputted by another player
* as a logged-in playing user you can place yourself on the lobby leaderboard
* as a logged-in playing user you can win a game

## Acceptance criteria

A web based application allowing simultaneous connection of multiple users across multiple lobbies.
Users are required to create an account to be able to participate. Each account always consists of an username, email address and password.

### Account

#### username
Username is allowed to consist of lowercase letters, numbers, dots and underscores. The length of username cannot exceed 16 characters.

#### email address
Every account has to have a valid email address linked to it. After registering, the user will receive an email containing a link. When the user opens the url, a screen with a checkmark and a button will present itself. The checkmark states "I agree with the TOS". The button states "Submit". After the user agrees to the TOS and clicks the submit button, the account is marked as created. Until then, the account exists, but is marked as uncreated and is unable to perform any action.

#### password
Password has to contain at least 8 characters from which there has to be at least one letter and one number.

### Authentication

#### Register
The register page should consist of a submit button and of three input fields. One for username, one for email address and one for password. If one of the inputs does not meet the requirements given in Acceptance criteria->Account section, warning text should appear informing the user of their mistake.

#### Login
The login page will consist of a submit button, an input field for email address, an input field for password and a checkmark for saving the user login. This means that the next time they will visit Spellit, they'll be automatically authenticated without filling their information in considering they did not log out.

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
