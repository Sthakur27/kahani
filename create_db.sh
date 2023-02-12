#!/bin/bash

# Start the Postgres container
docker-compose up -d

# Wait for the container to start up
sleep 5

# Create a new database
docker-compose exec db psql -U postgres -c "CREATE DATABASE mydatabase;"

# Create a new user with a password
docker-compose exec db psql -U postgres -c "CREATE USER myuser WITH PASSWORD 'mypassword';"

# Grant permissions to the user on the database
docker-compose exec db psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;"
