package com.tns.gen.android.view;

public class View_OnAttachStateChangeListener implements android.view.View.OnAttachStateChangeListener {
	public View_OnAttachStateChangeListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onViewAttachedToWindow(android.view.View param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onViewAttachedToWindow", void.class, args);
	}

	public void onViewDetachedFromWindow(android.view.View param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onViewDetachedFromWindow", void.class, args);
	}

}
