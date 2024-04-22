set -o errexit

pip install -r requirements.txt

py manage.py makemigrations

python manage.py migrate
