# node

## built in objects

- console
  - used to access the console / terminal
  - log(): used to print output on console

## module

- used to reuse the code
- module is any file with an extension: .js, .jsx, .mjs
- node module contains ONLY the JS code
- node adds an object called as a module to every module (JS file)
- exporting entities (function/variable/constant/class/interface) from module
  - `module.exports = {....}`
- importing a module
  - require(<module name>)
    - require function returns the exported property of imported module

## npm

- node package manager
- used to manage (install, uninstall, update etc.) node modules / packages
- commands
  - init: initialize a package.json file
  - install: used to install a node package
  - uninstall: used to remove the package

## package.json

- file created when `npm init` command is fired
- contains metadata of the application
- contains
  - name of the application
  - version of the application
  - scripts: used to define the custom commands which will be executed using `npm run`
  - dependencies
    - used to specify the list of dependencies to run the application
    - when the application gets built, these dependencies will be added to the website bundle
  - devDependencies
    - used to specify the list of dependencies to develop the application
    - when the application gets built, these dependencies will NOT be added to the website bundle

## popular packages

- nodemon
  - stands for node monitor
  - used to restart the node application when there is a change in the code
  - installation
    - -g: global installation (no need to install everytime for new application)
    - `npm install -g nodemon`
