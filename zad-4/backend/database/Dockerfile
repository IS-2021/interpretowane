FROM postgres:16

ENV POSTGRES_DB=aji
ENV POSTGRES_USER=aji
ENV POSTGRES_PASSWORD=ajipassword

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432:5432