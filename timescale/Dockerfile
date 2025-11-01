FROM node@sha256:e524a871ad29ac5fa38b840667a6590f42bc14eb052047815faa0ba421c52b93

## Create app directory
WORKDIR /app

## Copy Server
COPY server.ts .

## Add Postgres package
RUN yarn add pg

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && node server.ts
