package com.example.shelf

import android.net.Uri
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberAsyncImagePainter

// Modèle de données

data class ProductInfo(
    val name: String,
    val items: List<ProductItem>,
    val percentage: Int
)

data class ProductItem(
    val name: String,
    val quantity: Int
)

@Composable
fun ProductStatsScreen(photoUri: Uri?) {
    var products by remember {
        mutableStateOf(
            listOf(
                ProductInfo(
                    name = "Produit Ramy",
                    items = listOf(
                        ProductItem("UP Fraise 20 CL", 13),
                        ProductItem("UP Orange 20 CL", 12)
                    ),
                    percentage = 61
                ),
                ProductInfo(
                    name = "Produit Ruhba",
                    items = listOf(
                        ProductItem("UP Fraise 20 CL", 13),
                        ProductItem("UP Orange 20 CL", 12)
                    ),
                    percentage = 39
                )
            )
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Informations Déduites",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        // Affichage de l'image capturée
        photoUri?.let {
            Image(
                painter = rememberAsyncImagePainter(it),
                contentDescription = "Photo du rayon",
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .padding(bottom = 8.dp)
            )
        }

        products.forEach { product ->
            ProductCard(product)
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = { /* Gérer la validation */ },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Text("Valider")
            }

            Button(
                onClick = { /* Gérer la reprise */ },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
            ) {
                Text("Reprendre")
            }
        }
    }
}

@Composable
fun ProductCard(product: ProductInfo) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = product.name,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 8.dp)
            )

            product.items.forEach { item ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(item.name)
                    Text(item.quantity.toString())
                }
            }

            HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Total", fontWeight = FontWeight.Bold)
                Text(
                    product.items.sumOf { it.quantity }.toString(),
                    fontWeight = FontWeight.Bold
                )
            }

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Pourcentage", fontWeight = FontWeight.Bold)
                Text("${product.percentage}%", fontWeight = FontWeight.Bold)
            }
        }
    }
}
