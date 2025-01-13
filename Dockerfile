FROM node:18

WORKDIR /home/node/app

COPY package*.json ./

ARG API_URL
ARG SESSION_SECRET 
ARG SESSION_EXPIRY

ENV API_URL ${API_URL}
ENV SESSION_SECRET = ${SESSION_SECRET}
ENV SESSION_EXPIRY = ${SESSION_EXPIRY}

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]