import os
from dotenv import load_dotenv
from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


load_dotenv()

django_insecure_key = "DJANGO_INSECURE_KEY"
debug_status = "DEBUG_STATUS"
debug_status_default = False


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv(django_insecure_key)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv(debug_status, debug_status_default)
load_dotenv()

CORS_ORIGIN_ALLOW_ALL = True
# ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'c17-70-m-python-production.up.railway.app']

ALLOWED_HOSTS = ["*"]

# CSRF_TRUSTED_ORIGINS = ["https://c17-70-m-python-pr-69.onrender.com", "https://c17-70-m-python.vercel.app/"]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'dj_rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'coreapi',
    'accounts',
    # 'videoconference'
    'login',
    'appointments',
    # 'videochat',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

SITE_ID = 1

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
load_dotenv()
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['RAILWAY_DATABASE_NAME'],
        'USER': os.environ['RAILWAY_DATABASE_USERNAME'],
        'PASSWORD': os.environ['RAILWAY_DATABASE_PASSWORD'],
        'HOST': os.environ['RAILWAY_DATABASE_HOST'],
        'PORT': os.environ['RAILWAY_DATABASE_PORT'],
    }
}


DATABASES["default"] = dj_database_url.parse(os.getenv("DATABASE_URL"))

DEFAULT_CONNECTION_NAME = "default"

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CORES_ALLOW_ORIGINS = [

]

############################################################
# STATICFILES_DIRS = [os.path.join(BASE_DIR, "ui/static")]
# STATIC_ROOT = os.path.join(BASE_DIR, "ui/staticfiles")


REST_FRAMEWORK = {
    ...: ...,
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    )
}

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend"
)

AUTH_USER_MODEL = 'accounts.CustomUser'
SOCIALACCOUNT_ADAPTER = 'login.adapters.CustomSocialAccountAdapter'

load_dotenv()
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.getenv('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.getenv(
    'SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')
SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI = os.getenv(
    'SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI')

ACCOUNT_EMAIL_VERIFICATION = "none"

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            "secret": SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
            "key": ""
        },
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "offline",
        },
        'FETCH_USERINFO': True
    }}
