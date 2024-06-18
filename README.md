# kahani
Single-database configuration for Flask.


migrations

update models.py
flask db migrate -m "Added description column to story table"

Review the Migration Script

flask db upgrade

verify changes in psql
psql -U sid -d kahani