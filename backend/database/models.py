from django.db import models
from django.contrib.postgres.indexes import GinIndex


# Create your models here.
class EncounterPreview(models.Model):
    encounter_id = models.IntegerField()
    fight_end = models.IntegerField(db_index=True)
    fight_duration = models.IntegerField(db_index=True)
    local_player = models.CharField(max_length=16, db_index=True)
    boss_name = models.CharField(max_length=64, db_index=True)
    difficulty = models.CharField(max_length=10, db_index=True)
    npc_id = models.IntegerField(null=True)
    player_data = models.JSONField()

    def __str__(self):
        return f"Encounter: {self.encounter_id} - {self.boss_name}"

    class Meta:
        indexes = [
            GinIndex(fields=["player_data"]),
        ]
