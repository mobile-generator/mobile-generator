# Mobile Generator

## Purpose

This project aims to initialize mobile project by following guidelines provided by constructor and frameworks.

This will allow you to quickly integrate an application according to your guidelines. You can unify your different mobile projects by applying the same rules everywhere.

## Getting started

The best way to get started is to install our [npm package](https://www.npmjs.com/package/mobile-generator).

### :package: install it using NPM

`$ npm i mobile-generator`

Read the [CLI usage](https://github.com/mobile-generator/mobile-generator/mobile-generator) to run CLI or start with [one of our example](https://github.com/mobile-generator/examples).

If you want more in-depth information about go-flutter, read the [wiki](https://github.com/mobile-generator/mobile-generator/wiki).

## Supported platform

### Android

* [x] Instant Apps Support  
* [x] Usage of android.* artifacts  
* [x] Android API Support from 21 to 29 (up to 85% of Android Devices Supported)  
* [x] Android Material Theme support (Day/Night)  
* [x] Easy integration with Materiel UI Color Tool https://material.io/tools/color  
* [x] Simple & Complex Navigation pattern (Drawer Navigation, Tabbed Navigation, Single View, … more to come)  
* [x] Check your color theme with the provided StyleGuide view presenting different native Android components  
* [x] StyleGuide view supports Day/Light rendering  
* [x] Smart Permission Support  
* [x] Smart Import Support According to your answers  

### iOS

* [x]  Simple & Complex Navigation pattern (Tabbed Navigation, Single View, … more to come)  
* [x] iOS 10.3 to 12.2(latest) Version Support  
* [x] Test & UITest Target Support  
* [ ] Smart Import Support According to your answers  
* [ ] Dark/Light Color Support (coming with iOS 13 release)  
* [ ] StyleGuide Support (coming with Dark/Light Color Support)  

### Flutter

* [ ] StyleGuide Support (coming with Dark/Light Color Support)  
* [ ] iOS language (for now it's swift)  
* [ ] android language (for now it's kotlin)  


Are you missing a feature? [Open an issue!](https://github.com/mobile-generator/mobile-generator/issues/new)

## Usage

### Interactive

This command will prompt you questions. Once you answered all of them it will generate the corresponding project

`$ mobile-generator interactive`  

### Create

This command will is the same as the interactive one except that you need to provide your answer as arguments/flags.
This will allow you to integrate to your CLI.

Android example:  
`$ mobile-generator create android my-app com.mycompany --android_min_sdk=21 --android_target_sdk=29 --android_template=drawer --internet_permission`

iOS example:  
`$ mobile-generator create ios my-app com.mycompany --ios_min_sdk=21 --ios_template=drawer --internet_permission`

Flutter example:  
`$ mobile-generator create flutter my-app com.mycompany`

## Examples

A separate repository contains examples. Go to [github.com/mobile-generator/examples](https://github.com/mobile-generator/examples) to give them a try.

## Contributions and support

Mobile-generator is developed completely in the open, and your contributions are more than welcome. It's still a very new project, so I'm sure there are bugs to be found and improvements to be made - and hopefully we can work on those together as a community.

## License

[MIT License](LICENSE)
