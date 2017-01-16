package com.tns.gen.android.location;

public class LocationListener implements android.location.LocationListener {
	public LocationListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onLocationChanged(android.location.Location param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onLocationChanged", void.class, args);
	}

	public void onStatusChanged(String param_0, int param_1, android.os.Bundle param_2)  {
		Object[] args = new Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onStatusChanged", void.class, args);
	}

	public void onProviderEnabled(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onProviderEnabled", void.class, args);
	}

	public void onProviderDisabled(String param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onProviderDisabled", void.class, args);
	}

}
