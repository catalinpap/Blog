# Base image
FROM postgres:latest

# Copy initialization scripts into the container (if any)
# These scripts will be executed during the initialization of the database
COPY init.sql /docker-entrypoint-initdb.d/

# Optional: Copy a custom PostgreSQL configuration file
# COPY postgresql.conf /etc/postgresql/postgresql.conf

# Expose PostgreSQL port
EXPOSE 5432
