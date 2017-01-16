package com.tns.gen.android.support.v4.view;

public class PagerAdapter_frnal_ts_helpers_l58_c38__PagerAdapterClassInner extends android.support.v4.view.PagerAdapter implements com.tns.NativeScriptHashCodeProvider {
	public PagerAdapter_frnal_ts_helpers_l58_c38__PagerAdapterClassInner(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public int getCount()  {
		Object[] args = null;
		return (int)com.tns.Runtime.callJSMethod(this, "getCount", int.class, args);
	}

	public CharSequence getPageTitle(int param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (CharSequence)com.tns.Runtime.callJSMethod(this, "getPageTitle", CharSequence.class, args);
	}

	public Object instantiateItem(android.view.ViewGroup param_0, int param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (Object)com.tns.Runtime.callJSMethod(this, "instantiateItem", Object.class, args);
	}

	public Object instantiateItem(android.view.View param_0, int param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (Object)com.tns.Runtime.callJSMethod(this, "instantiateItem", Object.class, args);
	}

	public void destroyItem(android.view.ViewGroup param_0, int param_1, Object param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "destroyItem", void.class, args);
	}

	public void destroyItem(android.view.View param_0, int param_1, Object param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "destroyItem", void.class, args);
	}

	public boolean isViewFromObject(android.view.View param_0, Object param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "isViewFromObject", boolean.class, args);
	}

	public android.os.Parcelable saveState()  {
		Object[] args = null;
		return (android.os.Parcelable)com.tns.Runtime.callJSMethod(this, "saveState", android.os.Parcelable.class, args);
	}

	public void restoreState(android.os.Parcelable param_0, ClassLoader param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "restoreState", void.class, args);
	}

	public boolean equals__super(Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
