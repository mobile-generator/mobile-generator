package {{app_id}}

import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import kotlinx.android.synthetic.main.fragment_home.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setupNavigationController()
    }

    private fun setupNavigationController() {
        val navView: BottomNavigationView = findViewById(R.id.nav_view)
        val tabNavController = Navigation.findNavController(this, R.id.tab_content_fragment)
        navView.setupWithNavController(tabNavController)
    }

}
