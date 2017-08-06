
[![npm-image](https://badge.fury.io/js/generator-polymer-init-cordova-2.x.svg)](https://www.npmjs.com/package/generator-polymer-init-cordova-2.x)
[![License](http://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/a1626/generator-polymer-init-cordova-2.x/blob/master/LICENSE)


# generator-polymer-init-cordova-2.x
Polymer cli template for cordova. As name suggests template is for Polymer 2.x applications.


## Pre-requisites
  - Please make sure [npm/node](https://nodejs.org/en/download/) is installed.
  - [Polymer-cli](https://github.com/Polymer/polymer-cli)
    ```
    npm install -g polymer-cli
    ```
  - [Cordova](https://cordova.apache.org/)
  ```
  npm install -g cordova
  ```

## Installation and Usage
This package is a template for polymer-cli and hence needs to be used along with same.

- To install the package use npm (Prefer installing the package globally).
```
npm install -g generator-polymer-init-cordova-2.x
```
- Then in the directory where you want to create a new project use `polymer init` command and you will find a new package named `cordova-2.x`.
- Choose the package and you will be asked for some configurations in order to start your project.

## Structure
   ```
    .
    ├── .bowerrc
    ├── .gitconfig
    ├── bower.json
    ├── config.xml
    ├── hooks
    │     └── Readme.md
    ├── platforms
    └── www
         ├── index.html
         ├── images
         │    └── fav.ico
         └── src
              └── my-app.html

   ```

## Options
This project offers following options for user to configure directly from command line. Please note most of the default values are used from cordova.

- __Project Name__: Name of the new project to create (defaults to the folder name).
- __Shell Name__: Name of the main [shell](https://developers.google.com/web/updates/2015/11/app-shell) of the app (defaults to `my-app`).
- __Cordova package__: Package name to configure for cordova app (defaults to `org.apache.cordova.<project name>`).
- __Advance cordova configuration__: User will be provided option to further configure cordova. These configurations can be skipped (default values will be used in this case). Below are the six configurations that user can choose to opt out of:
  
    - __Description__: A short description for the project. Same description is also used for `bower.json` (defaults to `A sample Apache Cordova application that responds to the deviceready event.`).
    - __Version__: Initial version of the project for cordova and bower config (defaults to `1..0.0`).
    - __Authors__: Name of author/s contributing in app (defaults to `Apache Cordova Team`).
    - __Author's email__: Email address for of contributing author/s (defaults to `dev@cordova.apache.org`).
    - __Author's href__: Web page to check author's details or to reach out to them (defaults to `http://cordova.io`).
    - __Platforms__: Platforms for which cordova app needs to be configured. Following platforms are configurable

        - __android__: Default true.
        - __ios__: Default true.
        - __blackberry10__: Default  false.
        - __browser__: Default  false.
        - __firefoxos__: Default  false.
        - __osx__: Default  false.
- __Proxy__: In case you are behind a firewall you can choose to configure proxy for git and bower using this option.
    - __http__: http proxy value.
    - __https__: https proxy value (defaults to same value and that for http).

## License

MIT © [Abhishek Gupta](https://github.com/a1626)
