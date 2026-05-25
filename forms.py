from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm


class GlowRegisterForm(UserCreationForm):
    username = forms.CharField(
        label="Kullanıcı adı",
        widget=forms.TextInput(
            attrs={
                "class": "auth-input",
                "placeholder": "Kullanıcı adınız",
                "autocomplete": "username",
            }
        ),
    )
    password1 = forms.CharField(
        label="Şifre",
        widget=forms.PasswordInput(
            attrs={
                "class": "auth-input",
                "placeholder": "En az 8 karakter",
                "autocomplete": "new-password",
            }
        ),
    )
    password2 = forms.CharField(
        label="Şifre (tekrar)",
        widget=forms.PasswordInput(
            attrs={
                "class": "auth-input",
                "placeholder": "Şifrenizi tekrar girin",
                "autocomplete": "new-password",
            }
        ),
    )


class GlowLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Kullanıcı adı",
        widget=forms.TextInput(
            attrs={
                "class": "auth-input",
                "placeholder": "Kullanıcı adınız",
                "autocomplete": "username",
            }
        ),
    )
    password = forms.CharField(
        label="Şifre",
        widget=forms.PasswordInput(
            attrs={
                "class": "auth-input",
                "placeholder": "Şifreniz",
                "autocomplete": "current-password",
            }
        ),
    )
