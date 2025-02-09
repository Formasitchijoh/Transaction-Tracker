FROM node:18-bullseye

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Use the root .env variable
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

CMD [ "npm", "run", "dev" ]

