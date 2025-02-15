package com.example.shelf

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.shelf.ui.theme.ShelfTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ShelfTheme {
                val navController = rememberNavController()
                NavHost(navController, startDestination = "shelfListScreen") {
                    composable("ShelfListScreen") { ShelfListScreen(navController) }
                    composable("CameraScreen") { CameraScreen(navController) }
                }
            }
        }
    }
}

