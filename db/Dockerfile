FROM mongo:4.4.11-rc0-focal

WORKDIR /data/json

COPY ./json/personnes.json .
COPY ./json/sauvetages.json .


CMD mongoimport \
    --host mongo \
    --db admin \
    --collection personnes \
    --type json \
    --file /data/json/personnes.json \
    --jsonArray \
    --username=$DB_USER \
    --password=$DB_PASSWORD && \
    mongoimport \
    --host mongo \
    --db admin \
    --collection sauvetages \
    --type json \
    --file /data/json/sauvetages.json \
    --jsonArray \
    --username=$DB_USER \
    --password=$DB_PASSWORD