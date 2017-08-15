#docker-compose build node && docker-compose up --no-deps -d node
# sudo apt-get install build-essential

FROM node:8.2.1

RUN mkdir -p /var/www/server

WORKDIR /var/www/server

RUN npm install -g pm2

ADD . /var/www/server

EXPOSE 3000

CMD ["pm2-docker", "./bin/www", "-i", "0"]
