# Generated by Django 5.0.7 on 2024-07-10 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('subtitle', models.CharField(blank=True, max_length=50, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('image_source', models.CharField(max_length=255)),
                ('link', models.CharField(blank=True, max_length=255, null=True)),
                ('display_order', models.IntegerField(db_index=True)),
            ],
        ),
        migrations.CreateModel(
            name='Jumbotron',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, null=True)),
                ('video_source', models.CharField(max_length=255)),
                ('display_order', models.IntegerField(db_index=True)),
            ],
        ),
    ]
