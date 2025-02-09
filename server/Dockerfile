FROM node:20

EXPOSE 3001

WORKDIR /server

RUN npm install npm@latest -g 

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["npx", "ts-node-dev", "--respawn", "app/index.ts"]

