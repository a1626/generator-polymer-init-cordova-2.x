'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const defaultProps = {
  'description': 'A sample Apache Cordova application that responds to the deviceready event.',
  'version': '1.0.0',
  'authors': 'Apache Cordova Team',
  'authorEmail': 'dev@cordova.apache.org',
  'authorHref': 'http://cordova.io'
};

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-polymer-init-cordova-2.x') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project Name?',
      default: this.appname
    },{
      type: 'input',
      name: 'elementName',
      message: 'shell Name?',
      default: 'my-app'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      const prompt2 = [{
        type: 'input',
        name: 'packageName',
        message: 'Cordova package?',
        store: true,
        default: 'org.apache.cordova.'+this.props.projectName
      },{
        type: 'confirm',
        name: 'cordovaConfig',
        message: 'Would you like to configure cordova (There are 6 configurations available, otherwise defaults will be used)?',
        default: true,
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        name: 'description',
        message: 'Description (This same description will be used for bower.json)?',
        default: 'A sample Apache Cordova application that responds to the deviceready event.'
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        name: 'version',
        message: 'version (This same description will be used for bower.json)?',
        default: '1.0.0'
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authors',
        message: 'authors (This same description will be used for bower.json)?',
        default: 'Apache Cordova Team',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authorEmail',
        message: 'author\'s email?',
        default: 'dev@cordova.apache.org',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'input',
        name: 'authorHref',
        message: 'author\'s href?',
        default: 'http://cordova.io',
        store: true
      },{
        when: (response) => {
          return response.cordovaConfig
        },
        type: 'checkbox',
        name: 'platforms',
        message: 'Platforms:',
        store: true,
        choices: [{
          name: 'android',
          checked: true
        },{
          name: 'ios',
          checked: true
        },{
          name: 'blackberry10'
        },{
          name: 'browser'
        },{
          name: 'firefoxos'
        },{
          name: 'osx'
        }]
      },
      {
        type: 'confirm',
        name: 'proxy',
        message: 'proxy configurations?',
        store: true
      },
      {
        when: (response) => {
          return response.proxy;
        },
        type: 'input',
        name: 'http',
        message: 'http proxy?',
        store: true
      }];

      return this.prompt(prompt2).then(props => {
        if(!props.cordovaConfig) {
          props = populateArray(props, defaultProps);
        }
        this.props = populateArray(this.props, props);
        const prompt3 = [{
          when: () => {
            return this.props.proxy;
          },
          input: 'input',
          name: 'https',
          message: 'https proxy?',
          default: this.props.http
        }]

        return this.prompt(prompt3).then(props => {
          this.props = populateArray(props, this.props);
        });
      });
    });
  }

  writing() {
    if(this.props.proxy) {
      this.fs.copyTpl(
        this.templatePath('bowerrc.txt'),
        this.destinationPath('.bowerrc'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('gitconfig.txt'),
        this.destinationPath('.gitconfig'),
        this.props
      );
  } else {
      this.props.http = "";
      this.props.https = "";
  }

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(*.txt)`,
      this.destinationPath(),
      this.props
    );
    const elementName = this.props.elementName;
    this.props.camelElementName = this.props.elementName.replace(/^(.)|-([a-z])/g, g=>g[1] ? g[1].toUpperCase() : g.toUpperCase());
    this.fs.copyTpl(
      this.templatePath('www/src/shell.txt'),
      this.destinationPath(`www/src/${elementName}.html`),
      this.props
    );
  }

  install() {
    this.installDependencies({
      npm: false
    });
    let i=0;
    while (this.props.platforms && i<this.props.platforms.length) {
      this.spawnCommandSync('cordova', ['platform','add',this.props.platforms[i],'--save']);
      i++;
    }
  }

};

function populateArray(loopedArray, populatedArray) {
  const keys = Object.keys(loopedArray);
  for (let i = 0; i < keys.length; i++) {
    populatedArray[keys[i]] = loopedArray[keys[i]];
  }
  return populatedArray;
}
