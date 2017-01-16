package com.tns.gen.android.widget;

public class BaseAdapter_frnal_ts_helpers_l58_c38__ListViewAdapter extends android.widget.BaseAdapter implements com.tns.NativeScriptHashCodeProvider {
	public BaseAdapter_frnal_ts_helpers_l58_c38__ListViewAdapter(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public int getCount()  {
		Object[] args = null;
		return (int)com.tns.Runtime.callJSMethod(this, "getCount", int.class, args);
	}

	public Object getItem(int param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (Object)com.tns.Runtime.callJSMethod(this, "getItem", Object.class, args);
	}

	public long getItemId(int param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (long)com.tns.Runtime.callJSMethod(this, "getItemId", long.class, args);
	}

	public boolean hasStableIds()  {
		Object[] args = null;
		return (boolean)com.tns.Runtime.callJSMethod(this, "hasStableIds", boolean.class, args);
	}

	public int getViewTypeCount()  {
		Object[] args = null;
		return (int)com.tns.Runtime.callJSMethod(this, "getViewTypeCount", int.class, args);
	}

	public int getItemViewType(int param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (int)com.tns.Runtime.callJSMethod(this, "getItemViewType", int.class, args);
	}

	public android.view.View getView(int param_0, android.view.View param_1, android.view.ViewGroup param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		return (android.view.View)com.tns.Runtime.callJSMethod(this, "getView", android.view.View.class, args);
	}

	public boolean equals__super(Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
