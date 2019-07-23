package {{app_id}}

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.fragment_home.*

class HomeFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupViews()
    }

    private fun setupViews() {
        tvWelcomeMessage.text = getString(R.string.welcomeMessage)
        tvApplicationId.text = getString(R.string.appId, BuildConfig.APPLICATION_ID)
        tvApplicationVersion.text = getString(R.string.applicationVersion, BuildConfig.VERSION_NAME, BuildConfig.VERSION_CODE)
        tvApplicationTemplate.text = getString(R.string.template)
    }
}
