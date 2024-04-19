FROM node:lts-alpine AS builder

WORKDIR /build

COPY ../package.json ../package-lock.json ./

RUN apk add --no-cache python3 g++ make

RUN npm install
COPY . .

ARG node_env=production
ENV NODE_ENV $node_Env

RUN npx nx build api --prod

# ---

FROM node:lts-alpine

WORKDIR /api

COPY --from=builder /build/dist/apps/api .
COPY package.json package-lock.json ./

RUN apk add --no-cache python3 g++ make

# Skip the postinstall script which decorates the Angular CLI
RUN npm config set ignore-scripts true
RUN npm install

CMD ["node", "main.js"]
