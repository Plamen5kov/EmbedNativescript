# EmbedNativescript
This is an Android Studio project.

### How to embed NativeScript in a working application. 
You can follow most of the instructions from [here](https://docs.nativescript.org/angular/integration-with-existing-ios-and-android-apps/extend-existing-android-app-with-ns-angular2.html) plus a couple of additional ones, I'll describe here:
* do all the article sais
* add
```
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
```
to the custom Javascript Implementation of the activity in the onCreate method as done [here](https://github.com/Plamen5kov/EmbedNativescript/blob/master/app/src/main/assets/app/MyCustomNativeScriptActivity.js#L15-L17).
This is the bootstrap code of the angular app. If you want to implement another app, you need to take it's bootstrap code, normally situated in the path declared in `app/package.json` main attribute of a nativescript project.

### Take notice if you'll make changes and experiment
* [path to java implementation](https://github.com/Plamen5kov/EmbedNativescript/blob/master/app/src/main/assets/app/MyCustomNativeScriptActivity.js#L42) or in other words [this](https://github.com/Plamen5kov/EmbedNativescript/blob/master/app/src/main/java/com/tns/MyCustomNativeScriptActivity.java) file. If you change the string, you'll need to change the java file also. Same goes [here](https://github.com/Plamen5kov/EmbedNativescript/blob/master/app/src/main/assets/app/MyCustomNativeScriptFragment.js#L39).

### How to run
* open in Android Studio (the project is build with Android Studio 2.2.3)
* run

### How to add module
In Android Studio
* File / New Module / Import .JAR/.AAR Package 
* right click application folder / Open Module Settings / Dependencies (tab) / (+) add dependency 
* find the module inserted earlyer
* compile project

### Used Dependencies
```
{
  "description": "NativeScript Application",
  "license": "SEE LICENSE IN <your-license-filename>",
  "readme": "NativeScript Application",
  "repository": "<fill-your-repository-here>",
  "nativescript": {
    "id": "org.nativescript.cliapp",
    "tns-android": {
      "version": "2.6.0-next-2017-01-13-1624"
    }
  },
  "dependencies": {
    "@angular/common": "2.3.1",
    "@angular/compiler": "2.3.1",
    "@angular/core": "2.3.1",
    "@angular/forms": "2.3.1",
    "@angular/http": "2.3.1",
    "@angular/platform-browser": "2.3.1",
    "@angular/platform-browser-dynamic": "2.3.1",
    "@angular/router": "3.3.1",
    "nativescript-angular": "1.3.0",
    "nativescript-theme-core": "^0.2.1",
    "reflect-metadata": "~0.1.8",
    "rxjs": "5.0.0-rc.4",
    "tns-core-modules": "2.4.4"
  },
  "devDependencies": {
    "babel-traverse": "6.21.0",
    "babel-types": "6.21.0",
    "babylon": "6.15.0",
    "lazy": "1.0.11",
    "nativescript-dev-android-snapshot": "^0.*.*",
    "nativescript-dev-typescript": "^0.3.2",
    "typescript": "~2.0.10",
    "zone.js": "~0.7.2"
  }
}
```
