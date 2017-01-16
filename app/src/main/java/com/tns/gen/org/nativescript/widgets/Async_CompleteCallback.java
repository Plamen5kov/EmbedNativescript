package com.tns.gen.org.nativescript.widgets;

public class Async_CompleteCallback implements org.nativescript.widgets.Async.CompleteCallback {
	public Async_CompleteCallback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onComplete(Object param_0, Object param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onComplete", void.class, args);
	}

}
