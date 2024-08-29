from django.db import models


# Create your models here.
class EncounterPreview(models.Model):
    fight_start = models.IntegerField(db_index=True)
    fight_duration = models.IntegerField(db_index=True)
    name = models.CharField(max_length=64, db_index=True)
    difficulty = models.CharField(max_length=15, db_index=True)
    entity_type = models.CharField(max_length=10)
    character_id = models.IntegerField()
    npc_id = models.IntegerField(db_index=True)
    class_id = models.IntegerField(db_index=True)
    max_hp = models.IntegerField()
    dps = models.IntegerField(db_index=True)
    gear_score = models.DecimalField(max_digits=6, decimal_places=2)
    is_dead = models.BooleanField()

    def __str__(self):
        return f"{self.boss_name} - {self.fight_start}"
