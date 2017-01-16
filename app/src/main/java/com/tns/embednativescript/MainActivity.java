package com.tns.embednativescript;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button b = (Button)findViewById(R.id.start_ns);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openNativeScriptActivity();
            }
        });
    }

    private void openNativeScriptActivity(){
        com.tns.Runtime runtime = com.tns.RuntimeHelper.initRuntime(MainActivity.this.getApplication());
        if(runtime != null) {
            Intent intent = new Intent(MainActivity.this, com.tns.MyCustomNativeScriptActivity.class);
            intent.setAction(Intent.ACTION_DEFAULT);
            startActivity(intent);
        }
    }
}
