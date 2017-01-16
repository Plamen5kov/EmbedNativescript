package com.tns.gen.android.widget;

public class NumberPicker_Formatter implements android.widget.NumberPicker.Formatter {
	public NumberPicker_Formatter() {
		com.tns.Runtime.initInstance(this);
	}

	public String format(int param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (String)com.tns.Runtime.callJSMethod(this, "format", String.class, args);
	}

}
