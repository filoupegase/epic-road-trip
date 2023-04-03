FROM node:16-bullseye AS website-image
EXPOSE 3000

RUN apt update && apt install tzdata -y
ENV TZ="Europe/Paris"

WORKDIR /app
COPY ./package.json .

RUN yarn install

COPY . .

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["sh","/entrypoint.sh"]