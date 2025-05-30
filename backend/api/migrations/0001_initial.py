# Generated by Django 5.1.6 on 2025-02-18 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('birth_date', models.DateField()),
                ('position', models.CharField(max_length=50)),
                ('salary', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Horse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('breed', models.CharField(max_length=50)),
                ('origin', models.CharField(max_length=50)),
                ('father', models.CharField(blank=True, max_length=50, null=True)),
                ('mother', models.CharField(blank=True, max_length=50, null=True)),
                ('age', models.IntegerField()),
            ],
        ),
    ]
