# coffee_and_code_philly_dot_com

## How to run project locally

This project's backend is hosted on fireabase. The first step to duplicate the application in your local evnironment is to authenticate with firebase. To do this, first you must install the firebase CLI.

You can install firebase with the following command:

```sh
npm install --global firebase-tools
```

Afterwards, you can authenticate with the following command:

```sh
firebase login
```

Ask one of the project maintainers for access to our org's firebase credentials if you do not already have them. The easiest way to do this is to create an issue with the title: `Firebase Access Request`. Mention your name, email and reason for wanting access and one of the project maintainers will provide you with the correct credentials.

Next, you want to select the correct active firebase project for your working directory. To do this, run the following command:

```sh
firebase use coffee-and-code-philly-website
```

Finally, to run the project in your local environment, run the following command:

```sh
firebase serve
```
