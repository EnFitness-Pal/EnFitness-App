
# React Native Template

[![Moove It](https://circleci.com/gh/moove-it/react-native-template.svg?style=svg)](https://app.circleci.com/pipelines/github/moove-it/react-native-template?branch=master)

EnFitness Pal will provide users with a mobile application that helps them exercise and track their daily calorie consumption. The app will provide users with useful functions to help them achieve their fitness goals, such as tracking daily calorie consumption

## Prerequisites

- [Node.js 18](https://nodejs.org), [npm](https://github.com/nvm-sh/nvm) and yarn (Recommended: Use [yarn](https://yarnpkg.com/))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 14.3.1](https://developer.apple.com/xcode)
- [Cocoapods 1.12.1](https://cocoapods.org)
- [JDK 11.0.19](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) for string localization.
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) as storage solution.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started) to dispatch asynchronous actions.
- [react-native-firebase](https://rnfirebase.io/) as storage video, image.
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) icon library.

## Usage
### Project
1. Install `react-native` on your computer. The project is not using Expo, as a result you have to follow the instructions from the `React Native CLI Quickstart` section of the [official documentation](https://facebook.github.io/react-native/docs/getting-started).
   **Make sure you are able to launch an Hello World `react-native` application before continuing!**
2. `git clone https://github.com/EnFitness-Pal/EnFitness-App` (or download the project archive).
3. `yarn` (never tested with `npm`)

### iOS

1. `sudo gem install cocoapods` (if you doesn't have [CocoaPods](https://cocoapods.org/) installed on your MAC).
2. Generate your own [GoogleService-Info.plist](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app) (When asking for a **iOS bundle ID**, use someting like `com.myusername.wordsreminder`).
3. Copy your `GoogleService-Info.plist` into `ios/WordsReminder/GoogleService-Info.plist`
4. `cd ios && pod install`
5. `yarn run-ios` (will run the app in simulator)



## Splash screen customization

To customize the splash screen (logo and background color) use the CLI provided in the [official docs](https://blog.logrocket.com/splash-screen-react-native/).

## Setup environments

### Using scripts from console

To define which env you want to use, just keep the structure `yarn [platform]`


DEV: `yarn ios`


#### iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

To create a new scheme:

- In the Xcode menu, go to Product > Scheme > Edit Scheme
- Click Duplicate Scheme on the bottom
- Give it a proper name on the top left. For instance: "qa"
- Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

  Expand the "Build" tab on the left menu
  - Click "Pre-actions", and under the plus sign select "New Run Script Action"
  - Where it says "Type a script or drag a script file", type: `echo ".env.qa" > /tmp/envfile` replacing `.env.qa` with your file.
- Also, you will need to select the executable for the new schema:

  Expand the "Run" tab on the left menu
  - Under the "Executable" dropdown select the ".app" you would like to use for that schema

## Styleguide

For coding styling, we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).


# Screens

<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.33.56.png?alt=media&token=8d6f3fae-5549-48da-8c3f-13faf0aca7ed" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.34.09.png?alt=media&token=5deea916-ec56-434a-84ee-597dd4ad032e" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.34.50.png?alt=media&token=14633929-a388-474a-814e-bf5a857f30fd" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.35.03.png?alt=media&token=56ab148a-911a-480a-b42b-481f1bbfe8fb" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.35.14.png?alt=media&token=c581ab52-49e7-44d8-8497-8d321c000505" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.35.22.png?alt=media&token=0dcae5f8-8ca4-474e-aae3-93b71ffaa662" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.35.29.png?alt=media&token=742e2c92-764a-471f-a9d4-5f545043e053" width="390" height="844">
<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FSimulator%20Screenshot%20-%20iPhone%2014%20-%202023-06-15%20at%2016.35.42.png?alt=media&token=2b89a1f7-94fd-4902-a940-5d847d3f77e4" width="390" height="844">

# API's Used
- dotNet Core

## Contributors
* [Lê Mạnh Duy - Back-end developer: ](https://www.facebook.com/marine.1616)

<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FScreenshot%202023-06-15%20at%2016.53.16.png?alt=media&token=bda6c0ab-31a1-4444-8153-ca6d80de3929" width="159" height="200">

* [Nguyễn Mạnh Đức - Front-end developer: ](https://www.facebook.com/taurusfbi04)

<img src="https://firebasestorage.googleapis.com/v0/b/capstoneproject-8ab42.appspot.com/o/screenshots%2FScreenshot%202023-06-15%20at%2016.53.42.png?alt=media&token=74025a48-d824-42fa-8fb3-6cd064571157" width="159" height="200">