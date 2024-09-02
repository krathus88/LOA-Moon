from django.db import models


# Create your models here.
class EncounterPreview(models.Model):
    fight_end = models.IntegerField(db_index=True)
    fight_duration = models.IntegerField(db_index=True)
    boss_name = models.CharField(max_length=64, db_index=True)
    difficulty = models.CharField(max_length=10, db_index=True)
    max_hp = models.BigIntegerField(null=True)
    max_hp_bars = models.IntegerField(null=True)
    npc_id = models.IntegerField(null=True)

    def __str__(self):
        return f"Encounter: {self.encounter_id} - {self.boss_name}"


class EncounterPreviewPlayers(models.Model):
    encounter = models.ForeignKey(
        EncounterPreview, on_delete=models.CASCADE, related_name="players"
    )
    name = models.CharField(max_length=16, db_index=True)
    character_id = models.BigIntegerField(null=True)
    class_id = models.IntegerField(db_index=True)
    subclass = models.CharField(max_length=20, db_index=True, null=True)
    dps = models.IntegerField(db_index=True)
    gear_score = models.FloatField(db_index=True)
    is_dead = models.BooleanField(db_index=True)
    party_num = models.IntegerField()
    display_name = models.BooleanField(default=True)

    def __str__(self):
        return f"Encounter: {self.encounter.id} - Player: {self.name}"
