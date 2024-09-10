FROM postgres:16.4 AS dumper

COPY ./test/data/ ./test-data/
RUN cat ./test-data/*.sql > /docker-entrypoint-initdb.d/Seed.sql

RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV PGDATA=/data

RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

FROM postgres:16.4
COPY --from=dumper /data $PGDATA