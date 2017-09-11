[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)

# Cmp2

**Important: This is a OSX only app as it use AppleScript to comunicate with Evernote**

Cmp2 is a Client Management Program that bring SalesForce and Evernote together

Features:
* Grab SalesForce info (Account, Opportunities)
* SalesForce reports (SOQL)
* Create / edit notes in Evernote (Offline)
* Todo list global and per account
* Gmail (webview)

# Contribute

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/abruneau/cmp2.git
```

Install dependencies with your favorite dependencies manager (npm or yarn) :

``` bash
npm install
```

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start
- **in another terminal window** -> npm run electron:serve

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Electron window and "Developer Tools" is open.
The Angular component contains an example of Electron and NodeJS native lib import. See [Use NodeJS Native libraries](#use-nodejs-native-libraries) charpter if you want to import other native libraries in your project.
You can desactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## To build for production

- Using development variables (environments/index.ts) :  `npm run electron:dev`
- Using production variables (environments/index.prod.ts) :  `npm run electron:prod`

Your built files are in the /dist folder.

## Included Commands

|Command|Description|
|--|--|
|`npm run start:web`| Execute the app in the brower |
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Ma |

**Your application is optimised. Only the files of /dist folder are included in the executable.**

## Execute E2E tests

You can find end-to-end tests in /e2e folder.

You can run tests with the command lines below :
- **in a terminal window** -> First, start a web server on port 4200 : `npm run start:web`
- **in another terminal window** -> Then, launch Protractor (E2E framework): `npm run e2e`

# Contributors

This project is based on https://github.com/maximegris/angular-electron
