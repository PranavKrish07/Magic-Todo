#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install Python dependencies
# We point to the requirements file inside the backend folder
pip install -r backend/requirements.txt

# 2. Collect Static Files
# We tell manage.py to gather all CSS/JS for WhiteNoise
python backend/manage.py collectstatic --no-input

# 3. Apply Database Migrations
# This pushes your models to the Render PostgreSQL database
python backend/manage.py migrate