package com.tns.gen.android.app;

public class DialogFragment_frnal_ts_helpers_l58_c38__DialogFragmentClassInner extends android.app.DialogFragment implements com.tns.NativeScriptHashCodeProvider {
	public DialogFragment_frnal_ts_helpers_l58_c38__DialogFragmentClassInner(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public android.app.Dialog onCreateDialog(android.os.Bundle param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		return (android.app.Dialog)com.tns.Runtime.callJSMethod(this, "onCreateDialog", android.app.Dialog.class, args);
	}

	public void onStart()  {
		Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onStart", void.class, args);
	}

	public void onDestroyView()  {
		Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onDestroyView", void.class, args);
	}

	public void onDismiss(android.content.DialogInterface param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onDismiss", void.class, args);
	}

	public boolean equals__super(Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
