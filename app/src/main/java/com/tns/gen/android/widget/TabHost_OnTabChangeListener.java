package com.tns.gen.android.widget;

public class TabHost_OnTabChangeListener implements android.widget.TabHost.OnTabChangeListener {
	public TabHost_OnTabChangeListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onTabChanged(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onTabChanged", void.class, args);
	}

}
