<p align="center">
  <img width=35% src="https://github.com/user-attachments/assets/4b8a34cd-b95e-41af-abbf-951c1200fe06" alt="logo"/>
</p>


# Shelf : votre seule et unique solution trust us :))

<br>

## Table des Matières

1. [Introduction](#1-introduction)
2. [Architecture de la Solution ](#2-architecture-de-la-solution) 
3. [Fonctionnalités](#3-fonctionalités)  
   - [Détection automatique de la part de linéaire avec YOLO](#détection-automatique-de-la-part-de-linéaire-avec-yolo)  
   - Collecte automatique des données concurrentes par web scraping  
   - Interface utilisateur et reporting  
4. Résultats  
5. Installation  
6. Conclusion  


<br><br>

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

<br><br>

---

## 2. Architecture de la Solution

L’architecture de notre solution est conçue pour garantir une collecte, un traitement et une analyse efficace des données merchandising, tout en assurant une évolutivité et une adaptabilité à d'autres produits. Elle est composée des éléments suivants :

<br>

---

### **2.1. Vue d’ensemble de l’architecture**  

Notre architecture repose sur une approche modulaire et se divise en trois couches principales :  

1. **Couche Client (Front-end)**  
   - Interface mobile où le client peut soumettre des images de linéaires et configurer les produits à analyser (produit cible et concurrents).  
   - Interface utilisateur simple pour visualiser les résultats d’analyse sous forme de pourcentages et graphiques.  

2. **Couche Application (Back-end & Services d’IA)**  
   - Un serveur Django qui gère l’authentification, la gestion des utilisateurs et le stockage des images.  
   - Un module d’analyse basé sur YOLO qui détecte et identifie les produits sur les images soumises.  
   - Un module de web scraping qui collecte automatiquement des images de produits concurrents pour entraîner le modèle YOLO.  

3. **Couche Stockage (Base de Données & Dataset IA)**  
   - Une base de données PostgreSQL qui stocke les informations des utilisateurs, des points de vente et des produits.  
   - Un espace de stockage pour conserver les images des rayons analysées et les datasets entraînés.  

<br>

---

### **2.2. Détails de la base de données**  

Nous avons structuré notre base de données pour assurer une gestion efficace des informations clés. Voici les modèles principaux :  

#### **Modèle Utilisateur (User)**  
L’utilisateur peut être un **Admin** ou un **Merchandiser**.  
```python
class User(AbstractUser):
    ROLE_CHOICES = [('admin', 'Admin'), ('merchandiser', 'Merchandiser')]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='merchandiser')
```

#### **Modèle Merchandiser**  
Le merchandiser est associé à une liste de **points de vente** qu’il doit visiter quotidiennement.  
```python
class Merchandiser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    localisation = models.CharField(max_length=255)
```

#### **Modèle Point de Vente**  
Chaque point de vente est identifié par un ID et contient des commandes, la visibilité des produits et l’espace occupé par les produits.  
```python
class PointDeVente(models.Model):
    id = models.AutoField(primary_key=True)
    localisation = models.CharField(max_length=255)
    width = models.FloatField()
    height = models.FloatField()
    length = models.FloatField()
```

#### **Modèle Commande (Command)**  
Une commande est associée à un point de vente et contient une liste de produits commandés.  
```python
class Command(models.Model):
    id = models.AutoField(primary_key=True)
    point_de_vente = models.ForeignKey(PointDeVente, on_delete=models.CASCADE)
    date_commande = models.DateField(auto_now_add=True)
```

#### **Modèle Produit (Product)**  
Chaque produit a une marque, un type et des dimensions. Il possède aussi une liste de concurrents.  
```python
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    length = models.FloatField()
    height = models.FloatField()
    width = models.FloatField()
    price = models.FloatField()
    concurrents = models.ManyToManyField('self', blank=True)
```
<br>

---

### **2.3. Flux de données dans la solution**  

1. **Soumission d’une image par le client**  
   - Le client télécharge une image du rayon via l’interface web.  
   - L’image est stockée dans le serveur et envoyée au modèle YOLO pour analyse.  

2. **Détection et analyse de la linéarité**  
   - YOLO identifie les produits du client et les produits concurrents dans l’image.  
   - L’algorithme calcule les pourcentages de linéarité de chaque marque.  

3. **Affichage des résultats**  
   - Les résultats (visibilité du produit, concurrents, position) sont stockés en base de données.  
   - L’interface web permet de visualiser ces données sous forme de graphiques et tableaux.  

---

Cette architecture assure une solution robuste, évolutive et efficace pour améliorer le suivi du merchandising et optimiser la stratégie commerciale des entreprises. 🚀


<br><br>

---

## 3. Fonctionnalités

<br>

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
<br>

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
<br>

### 3.3 Interface Utilisateur et Reporting

- **Téléchargement d’images** : Interface intuitive pour charger des images.
- **Visualisation des résultats** : Affichage interactif des pourcentages de linéaire et des placements des produits.
- **Exportation des rapports** : Génération de rapports PDF et Excel avec les résultats d’analyse.

<br><br>

---

## 4. Résultats

Notre solution permet :
- Une réduction significative du **temps de traitement** par point de vente.
- Une **meilleure représentativité des données** avec une couverture plus large des produits.
- Une **objectivité accrue** grâce à une détection automatisée et standardisée.
- Une **scalabilité** permettant d’ajouter facilement de nouveaux produits.

<br><br>

---

## 5. Installation

### Prérequis
- NextJS
- TailwindCSS
- Python 3.10+
- Django Framework
- YOLOv5 (PyTorch)
- playwright (pour le crawling des données)
- SQLite (Base de données)

### Étapes d’Installation
```
git clone https://github.com/Imeneallouche/Shelf.git
cd Shelf
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
npm run dev
```
---

## 6. Conclusion

Notre solution révolutionne le merchandising en automatisant la collecte et l’analyse des données grâce à l’IA et au web scraping (crawling plus en moins). Cette approche permet aux entreprises d’optimiser leur stratégie et de prendre des décisions basées sur des **données précises et objectives**.

🚀 **Notre système est adaptable à tout type de produit et permet une scalabilité future.**

