package com.tns.gen.android.webkit;

public class WebViewClient_frnal_ts_helpers_l58_c38__WebViewClientClassInner extends android.webkit.WebViewClient implements com.tns.NativeScriptHashCodeProvider {
	public WebViewClient_frnal_ts_helpers_l58_c38__WebViewClientClassInner(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public boolean shouldOverrideUrlLoading(android.webkit.WebView param_0, String param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "shouldOverrideUrlLoading", boolean.class, args);
	}

	public boolean shouldOverrideUrlLoading(android.webkit.WebView param_0, android.webkit.WebResourceRequest param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "shouldOverrideUrlLoading", boolean.class, args);
	}

	public void onPageStarted(android.webkit.WebView param_0, String param_1, android.graphics.Bitmap param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onPageStarted", void.class, args);
	}

	public void onPageFinished(android.webkit.WebView param_0, String param_1)  {
		Object[] args = new Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onPageFinished", void.class, args);
	}

	public void onReceivedError(android.webkit.WebView param_0, int param_1, String param_2, String param_3)  {
		Object[] args = new Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onReceivedError", void.class, args);
	}

	public void onReceivedError(android.webkit.WebView param_0, android.webkit.WebResourceRequest param_1, android.webkit.WebResourceError param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onReceivedError", void.class, args);
	}

	public boolean equals__super(Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
