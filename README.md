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
