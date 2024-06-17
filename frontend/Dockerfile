# Install dependencies only when needed
FROM node:18-alpine AS builder
WORKDIR /srv
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

# Setup nginx server for frontend
FROM nginx:1.23.1-alpine AS deploy
COPY --from=builder /srv/dist/ /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
