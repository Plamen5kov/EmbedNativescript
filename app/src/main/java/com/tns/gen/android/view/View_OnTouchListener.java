package com.tns.gen.android.view;

public class View_OnTouchListener implements android.view.View.OnTouchListener {
	public View_OnTouchListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onTouch(android.view.View param_0, android.view.MotionEvent param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onTouch", boolean.class, args);
	}

}
