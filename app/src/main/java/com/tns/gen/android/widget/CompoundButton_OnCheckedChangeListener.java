package com.tns.gen.android.widget;

public class CompoundButton_OnCheckedChangeListener implements android.widget.CompoundButton.OnCheckedChangeListener {
	public CompoundButton_OnCheckedChangeListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCheckedChanged(android.widget.CompoundButton param_0, boolean param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onCheckedChanged", void.class, args);
	}

}
