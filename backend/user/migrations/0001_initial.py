# Generated by Django 5.1 on 2024-09-17 22:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('socialaccount', '0006_alter_socialaccount_extra_data'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=16, null=True)),
                ('access_token', models.CharField(blank=True, max_length=64, null=True)),
                ('avatar', models.URLField(blank=True, max_length=255, null=True)),
                ('social_account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='socialaccount.socialaccount')),
            ],
        ),
        migrations.CreateModel(
            name='Characters',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(db_index=True, max_length=10)),
                ('name', models.CharField(db_index=True, max_length=16)),
                ('class_id', models.IntegerField(db_index=True)),
                ('display_name', models.BooleanField(default=False)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='characters', to='user.profile')),
            ],
            options={
                'constraints': [models.UniqueConstraint(fields=('region', 'name'), name='unique_name_per_region')],
            },
        ),
    ]
