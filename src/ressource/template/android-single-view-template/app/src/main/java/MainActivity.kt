package {{app_id}}

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupViews()
        setupInteractions()
    }

    private fun setupViews() {

        tvWelcomeMessage.text = getString(R.string.welcomeMessage)
        tvApplicationId.text = getString(R.string.appId, BuildConfig.APPLICATION_ID)
        tvApplicationVersion.text = getString(R.string.applicationVersion, BuildConfig.VERSION_NAME, BuildConfig.VERSION_CODE)
        tvApplicationTemplate.text = getString(R.string.template)
    }

    private fun setupInteractions() {

        bToLayoutGuide.setOnClickListener {
            val layoutGuideIntent = Intent(this@MainActivity, LayoutGuideActivity::class.java)
            startActivity(layoutGuideIntent)
        }
    }
}
