FROM postgres:13

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB mydatabase

EXPOSE 5432

VOLUME /var/lib/postgresql/data
