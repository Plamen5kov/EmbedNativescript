package com.tns.gen.android.animation;

public class ValueAnimator_AnimatorUpdateListener implements android.animation.ValueAnimator.AnimatorUpdateListener {
	public ValueAnimator_AnimatorUpdateListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onAnimationUpdate(android.animation.ValueAnimator param_0)  {
		Object[] args = new Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onAnimationUpdate", void.class, args);
	}

}
