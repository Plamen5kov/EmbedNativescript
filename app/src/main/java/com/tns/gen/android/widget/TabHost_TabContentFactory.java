package com.tns.gen.android.widget;

public class TabHost_TabContentFactory implements android.widget.TabHost.TabContentFactory {
	public TabHost_TabContentFactory() {
		com.tns.Runtime.initInstance(this);
	}

	public android.view.View createTabContent(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (android.view.View)com.tns.Runtime.callJSMethod(this, "createTabContent", android.view.View.class, args);
	}

}
