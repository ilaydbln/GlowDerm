from django.conf import settings
from django.db import models


class Routine(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="routine",
    )
    answers = models.JSONField(default=list)
    routine = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Routine for {self.user}"
