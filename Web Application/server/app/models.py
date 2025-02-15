from django.db import models
from django.contrib.auth.models import AbstractUser


# User Model
class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("merchandiser", "Merchandiser"),
    )
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)


# Product Model
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)  # Marque du produit
    type = models.CharField(max_length=100)
    length = models.FloatField()
    height = models.FloatField()
    width = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    competitors = models.ManyToManyField("self", blank=True, symmetrical=False)

    def __str__(self):
        return self.name


# Point de Vente Model
class PointDeVente(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=255)
    products_visibility = models.JSONField(
        default=dict
    )  # {"product_id": visibility_percentage}
    competitors_visibility = models.JSONField(
        default=dict
    )  # {"competitor_product_id": visibility_percentage}

    def __str__(self):
        return f"Point de Vente {self.id}"


# Command Model
class Command(models.Model):
    id = models.AutoField(primary_key=True)
    point_de_vente = models.ForeignKey(
        PointDeVente, on_delete=models.CASCADE, related_name="commands"
    )
    products = models.ManyToManyField(Product, through="CommandProduct")
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Command {self.id} for {self.point_de_vente}"


# Intermediate Model for Command & Product
class CommandProduct(models.Model):
    command = models.ForeignKey(Command, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)


# Merchandiser Model
class Merchandiser(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, limit_choices_to={"role": "merchandiser"}
    )
    points_to_visit = models.ManyToManyField(PointDeVente, through="DailyVisit")

    def __str__(self):
        return self.user.get_full_name()


# Daily Visit Model
class DailyVisit(models.Model):
    merchandiser = models.ForeignKey(Merchandiser, on_delete=models.CASCADE)
    point_de_vente = models.ForeignKey(PointDeVente, on_delete=models.CASCADE)
    visit_date = models.DateField()

    class Meta:
        unique_together = ("merchandiser", "point_de_vente", "visit_date")

    def __str__(self):
        return (
            f"Visit {self.merchandiser} -> {self.point_de_vente} on {self.visit_date}"
        )
