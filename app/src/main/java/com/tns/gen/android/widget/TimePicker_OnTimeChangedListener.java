package com.tns.gen.android.widget;

public class TimePicker_OnTimeChangedListener implements android.widget.TimePicker.OnTimeChangedListener {
	public TimePicker_OnTimeChangedListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onTimeChanged(android.widget.TimePicker param_0, int param_1, int param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onTimeChanged", void.class, args);
	}

}
