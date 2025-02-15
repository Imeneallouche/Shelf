<p align="center">
  <img width=35% src="https://github.com/user-attachments/assets/4b8a34cd-b95e-41af-abbf-951c1200fe06" alt="logo"/>
</p>


# SHELF

## Table des Matières
1. Introduction  
2. Architecture de la Solution  
3. Fonctionnalités  
   - Détection automatique de la part de linéaire avec YOLO  
   - Collecte automatique des données concurrentes par web scraping  
   - Interface utilisateur et reporting  
4. Résultats  
5. Installation  
6. Conclusion  

---

## 1. Introduction

### Problématique
Le merchandising est un enjeu majeur pour les entreprises, mais il présente plusieurs défis :  
- **Fiabilité des mesures** : L’évaluation de la profondeur des rayons est difficile et les produits peuvent être déplacés.  
- **Échantillonnage incomplet** : Les marchandiseurs se concentrent souvent sur quelques produits, réduisant la représentativité des données collectées.  
- **Nombre limité de magasins couverts** : En raison du temps nécessaire pour chaque visite, peu de magasins sont analysés quotidiennement.  
- **Méthode subjective** : Chaque marchandiseur peut avoir une interprétation différente de la répartition des linéaires.  

### Notre Solution
Nous avons développé une solution innovante qui automatise la collecte et l’analyse des données de merchandising. L’utilisateur prend simplement une photo des rayons d’un point de vente et notre système utilise **YOLO (You Only Look Once)** pour analyser automatiquement la part de linéaire des produits du client et des concurrents.  

---

## 2. Architecture de la Solution

Notre solution est composée de plusieurs modules :
- **Acquisition des images** : L’utilisateur télécharge une photo du rayon via une interface mobile dédiée aux merchandisers.
- **Détection des produits** : Un modèle **YOLO** entraîné détecte les produits présents et calcule leur visibilité.
- **Collecte des données concurrentielles** : Un **web scraper** récupère des images des produits concurrents pour enrichir la base de données d’entraînement.
- **Analyse et reporting** : Le système génère un rapport détaillé sur la part de linéaire et la visibilité des produits.

---

## 3. Fonctionnalités

### 3.1 Détection Automatique de la Part de Linéaire avec YOLO

#### Pseudo-algorithme de traitement d'image avec YOLO

```
Entrée : Image du rayon d’un point de vente
Sortie : Pourcentages de visibilité des produits détectés

1. Charger le modèle YOLO pré-entraîné
2. Redimensionner l’image et la normaliser
3. Passer l’image dans le modèle pour obtenir les prédictions (bounding boxes, labels, scores de confiance)
4. Pour chaque produit détecté :
   a. Calculer la surface occupée (largeur * hauteur du bounding box)
   b. Calculer le pourcentage de linéaire par rapport à l’ensemble du rayon
5. Retourner les résultats sous forme de rapport
```

### 3.2 Collecte Automatique des Données Concurrentes par Web Scraping

#### Pseudo-algorithme du Scraper

```
Entrée : Nom du produit du client et des marques concurrentes
Sortie : Base de données d’images de produits

1. Définir les sources de données (sites e-commerce, moteurs de recherche)
2. Construire une requête de recherche pour chaque produit
3. Récupérer les URL des images trouvées
4. Télécharger et stocker les images dans la base de données
5. Nettoyer les images et les préparer pour l'entraînement du modèle YOLO
```

### 3.3 Interface Utilisateur et Reporting

- **Téléchargement d’images** : Interface intuitive pour charger des images.
- **Visualisation des résultats** : Affichage interactif des pourcentages de linéaire et des placements des produits.
- **Exportation des rapports** : Génération de rapports PDF et Excel avec les résultats d’analyse.

---

## 4. Résultats

Notre solution permet :
- Une réduction significative du **temps de traitement** par point de vente.
- Une **meilleure représentativité des données** avec une couverture plus large des produits.
- Une **objectivité accrue** grâce à une détection automatisée et standardisée.
- Une **scalabilité** permettant d’ajouter facilement de nouveaux produits.

---

## 5. Installation

### Prérequis
- Python 3.10+
- Django Framework
- YOLOv5 (PyTorch)
- OpenCV, BeautifulSoup, Scrapy (pour le scraping)
- PostgreSQL (Base de données)

### Étapes d’Installation
```
git clone https://github.com/votre-repo
cd votre-repo
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
---

## 6. Conclusion

Notre solution révolutionne le merchandising en automatisant la collecte et l’analyse des données grâce à l’IA et au web scraping. Cette approche permet aux entreprises d’optimiser leur stratégie et de prendre des décisions basées sur des **données précises et objectives**.

🚀 **Notre système est adaptable à tout type de produit et permet une scalabilité future.**

