package com.example.shelf

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import coil.compose.rememberAsyncImagePainter

data class Rayon(
    val imageRes: Int?,
    val date: String,
    val heure: String,
    val nombreProduits: Int,
    val nombreConcurrents: Int,
    val visibilite: Int
)

@Composable
fun ShelfListScreen(navController: NavHostController) {
    val rayons = listOf(
        Rayon(R.drawable.rayon1, "16/02/2025", "10:51", 60, 100, 35),
        Rayon(R.drawable.rayon1, "16/02/2025", "10:59", 60, 100, 35),
        Rayon(R.drawable.rayon1, "16/02/2025", "11:08", 60, 100, 35),
        Rayon(R.drawable.rayon1, "16/02/2025", "11:15", 60, 100, 35)
    )

    Scaffold(
        bottomBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Button(onClick = {
                    navController.navigate("CameraScreen") // Navigue vers l'écran caméra
                }) {
                    Text("📷 Ajouter photo")
                }
                Button(onClick = { /* Valider les informations */ }) {
                    Text("✅ Valider")
                }
            }
        }
    ) { paddingValues ->
        Text(
            text = "Liste des rayons",
            fontSize = 18.sp,
            fontWeight = FontWeight.ExtraBold,
            modifier = Modifier.padding(bottom = 12.dp)
        )
        LazyColumn(
            modifier = Modifier
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            items(rayons) { rayon ->
                RayonItem(rayon)
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
fun RayonItem(rayon: Rayon) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Image plus grande et rectangulaire
            Image(
                painter = rememberAsyncImagePainter(model = rayon.imageRes ?: R.drawable.placeholder),
                contentDescription = "Rayon",
                modifier = Modifier
                    .width(140.dp) // Largeur plus grande pour un effet rectangulaire
                    .height(100.dp) // Hauteur réduite pour équilibrer le rectangle
                    .clip(RoundedCornerShape(14.dp)) // Coins arrondis
                    .padding(end = 16.dp)
            )

            // Informations textuelles bien justifiées
            Column(
                modifier = Modifier
                    .fillMaxWidth(), // Le texte occupe tout l’espace restant
                horizontalAlignment = Alignment.Start
            ) {
                Text(
                    text = "${rayon.date}  ${rayon.heure}",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(text = "Nombre de produits: ${rayon.nombreProduits}")
                Text(text = "Nombre concurrents: ${rayon.nombreConcurrents}")
                Text(text = "Visibilité: ${rayon.visibilite}%")
            }
        }

        // Ligne de séparation entre chaque élément
        HorizontalDivider(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            thickness = 1.dp,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.2f)
        )
    }
}