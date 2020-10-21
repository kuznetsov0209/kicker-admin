FROM node:8.16.0 as builder
WORKDIR /app
ENV CI true
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ARG API_HOST=http://localhost:3000
RUN yarn build

FROM nginx:1.15.6-alpine as runner
WORKDIR /var/www
# Add nginx conf for react-router support
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist .
