package {{app_id}}

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import kotlinx.android.synthetic.main.fragment_layout_guide.*

class LayoutGuideFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_layout_guide, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupInteractions()
    }

    private fun setupInteractions() {

        switchNightMode.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                (activity as AppCompatActivity).delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_YES
            } else {
                (activity as AppCompatActivity).delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
            }
        }
    }
}
