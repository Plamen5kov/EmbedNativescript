package com.tns.gen.android.widget;

public class SearchView_OnQueryTextListener implements android.widget.SearchView.OnQueryTextListener {
	public SearchView_OnQueryTextListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onQueryTextSubmit(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextSubmit", boolean.class, args);
	}

	public boolean onQueryTextChange(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextChange", boolean.class, args);
	}

}
