# React-Meteor-Webpack2

This is a fork of [Angular-Meteor-Webpack](https://github.com/KeithGillette/Angular-Meteor-Webpack).


# FORKED: Angular-Meteor-Webpack

A quick & dirty sample project demonstrating use of Webpack2 as the client bundler on an [Angular-Meteor](https://angular-meteor.com/) project, specifically the [Angular2-Meteor Boilerplate](https://github.com/Urigo/angular2-meteor-base), using [Meteor Client Bundler](https://github.com/Urigo/meteor-client-bundler) to bundle Meteor Atmosphere packages for use outside of Meteor Isobuild. For demonstration purposes only.

## Prerequisities
* node.js
* MeteorJS

## Usage
After downloading:

`npm install`

To launch:

`npm run start`

Open a browser to [http://localhost:8080/](http://localhost:8080/)

## NPM Scripts

- `> npm run start` - Run the Meteor application, served by webpack-dev-server at [http://localhost:8080/](http://localhost:8080/).
- `> npm run meteor.reset` - Resets Meteor's cache and clears the MongoDB collections.
- `> npm run meteor.run` Runs only the Meteor server
- `> npm run webpack.dev` Runs only the Angular-Meteor client via `webpack-dev-server`
- `> npm run meteor.client-bundle` Runs `meteor-client-bundler`, needed when new client Atmosphere packages added`

## History
How this project was made:
* In a privileged command prompt:
```dos
git clone https://github.com/bsliran/angular2-meteor-base Angular-Meteor-Webpack
cd Angular-Meteor-Webpack
meteor add mongo
npm install
npm install --global meteor-client-bundler
mkdir meteor
move .meteor meteor\.meteor
move server meteor\server
mklink /d meteor\both both
mklink /d meteor\node_modules node_modules
mklink meteor\typings.d.ts typings.d.ts
mklink meteor\package.json package.json
```
* Added `meteor-client.config.json`:
```json
{
  "import": [
    "meteor-base",
    "mongo",
    "reactive-var",
    "tracker",
    "es5-shim",
    "autopublish",
    "insecure"
  ]
}
```
* Bundled Atmosphere packages for loading via Webpack:
```dos
meteor-client bundle
```
* Modified `client\main.ts` adding `import 'meteor-client';` to add bundled Meteor Atmosphere packages
* Modified `tsconfig.json` adding `"meteor/**/*"` to `exclude` array
* Hacked together `webpack.config.js` based on
    * [TypeScript](https://angular.io/docs/ts/latest/guide/webpack.html#!#common-configuration)
    * [SCSS](https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-include-SCSS-in-components)
    * [CSS](https://angular.io/docs/ts/latest/guide/webpack.html#!#common-configuration)
    * [Angular ContextReplacement](https://angular.io/docs/ts/latest/guide/webpack.html#!#common-configuration)
* Modified `package.json` `dependencies` & `devDependencies` via `npm install` to add Webpack development dependencies used in `webpack.config.js`
* Modified `package.json` `scripts` to function in new configuration
