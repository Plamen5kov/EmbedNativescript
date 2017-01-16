var frame_1 = require("ui/frame");
require("./MyCustomNativeScriptFragment");
var MyCustomNativeScriptActivity = (function (_super) {
    __extends(MyCustomNativeScriptActivity, _super);
    function MyCustomNativeScriptActivity() {
        _super.call(this);
        return global.__native(this);
    }
    MyCustomNativeScriptActivity.prototype.onCreate = function (savedInstanceState) {
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
//        var application = require("application");
//        application.start();
        var platform_1 = require("nativescript-angular/platform");
        var app_module_1 = require("./app.module");
        platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    MyCustomNativeScriptActivity.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    MyCustomNativeScriptActivity.prototype.onStart = function () {
        this._callbacks.onStart(this, _super.prototype.onStart);
    };
    MyCustomNativeScriptActivity.prototype.onStop = function () {
        this._callbacks.onStop(this, _super.prototype.onStop);
    };
    MyCustomNativeScriptActivity.prototype.onDestroy = function () {
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    MyCustomNativeScriptActivity.prototype.onBackPressed = function () {
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    MyCustomNativeScriptActivity.prototype.onRequestPermissionsResult = function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
    };
    MyCustomNativeScriptActivity.prototype.onActivityResult = function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    };
    MyCustomNativeScriptActivity = __decorate([
        JavaProxy("com.tns.MyCustomNativeScriptActivity")
    ], MyCustomNativeScriptActivity);
    return MyCustomNativeScriptActivity;
}(android.app.Activity));
//# sourceMappingURL=activity.js.map