FROM node:lts-alpine AS builder

WORKDIR /build

COPY ../package.json ../package-lock.json ./
COPY ../apps/web/.browserslistrc ./

RUN apk add --no-cache python3 g++ make

RUN npm install -g @angular/cli
RUN npm install
COPY . .

ARG node_env=production
ENV NODE_ENV $node_env

RUN npx nx build web --prod

# ---

FROM nginx:1.21.6-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /build/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/dist/apps/web /usr/share/nginx/html
EXPOSE 80
