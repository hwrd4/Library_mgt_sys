FROM node:16-alpine

WORKDIR /app

# Install wget for healthchecks
RUN apk add --no-cache wget

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
