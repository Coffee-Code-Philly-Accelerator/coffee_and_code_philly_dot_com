# Coffee and Code Philly

## Getting Started

To begin working with this project, follow the steps below to set up your local development environment.

### Install Project Dependencies

Run the following command to install the project's dependencies:

```sh

npm install
```

If you encounter an error due to not having npm installed, make sure to install Node.js. 

### Configure the Backend

1. Authenticate with Firebase

The backend of this project is hosted on Firebase. To duplicate the application in your local environment, you need to authenticate with Firebase.
a. Install the Firebase CLI

You can install the Firebase CLI with the following command:

```sh
npm install --global firebase-functions firebase-admin firebase-tools
```

b. Login to Firebase

Authenticate with Firebase by running:

```sh
firebase login
```

If you do not have access to our organization's Firebase credentials, request them from a project maintainer. The recommended way is to create an issue with the title Firebase Access Request. Include your name, email, and the reason for requesting access. If approved, a maintainer will provide you with the necessary credentials. 3. Select the Firebase Project

Set the correct active Firebase project for your working directory by running and selecting coffee-and-code-philly-website:

```sh
firebase use --add
```

c. Run the Backend Locally

To run the project in your local environment, execute the following command:

```sh
firebase serve
```

### Laucnh the Frontend

To launch the Frontend, ensure you have first installed the necessary dependencies, then run the following command:
```sh
npm start
```

### Optional: Run Firebase Cloud Functions in a Test Environment

If you would like to run Firebase Cloud Functions locally in a test environment, refer to [this document](https://firebase.google.com/docs/functions/get-started?gen=2nd#emulate-execution-of-your-functions).

For a quick start, you can run the following command:

```sh
firebase emulators:start
```

To verify that a cloud function is working properly, visit the following URL (replace <function_name_here> with the actual function name):

http://127.0.0.1:5001/coffee-and-code-philly-w-c03af/us-central1/<function_name_here>

We have a `helloWorld` cloud function that you can use to verify your setup:

[http://127.0.0.1:5001/coffee-and-code-philly-w-c03af/us-central1/helloWorld](http://127.0.0.1:5001/coffee-and-code-philly-w-c03af/us-central1/helloWorld)
