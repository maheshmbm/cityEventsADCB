# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



## Here in this app , 
1) I have created the login and sign up flow with firebase, user login is persisted till the momemnt user not logged out manually. 
2) After successful login with the help of ticket master api events shonw, currently to show keyword and city ( city full city name require exact case) to show the results
3) view details page: details of the event with multiple images, map , seat selction routing handles
4) profile page to show username, logout and biometric toggele ( some enhancement required)
5) if login or singup time error shown , please clear data or reinstall app, may be due to firbase app tokens causing issue
6) I tried without expo framework but spend lot of time to resolve firebase hermes issue , i think due to version mismatch not sure , hence migrated all code expo framework,
7) Expo not allowing to create a env due to some restriction hence credentials are stored in constants
