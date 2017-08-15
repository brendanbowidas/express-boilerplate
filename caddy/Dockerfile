# docker-compose build caddy && docker-compose up --no-deps -d caddy
FROM zzrot/alpine-caddy

ADD ./Caddyfile /etc/

# -ca https://acme-staging.api.letsencrypt.org/directory

CMD caddy -conf /etc/Caddyfile -agree -log stdout
