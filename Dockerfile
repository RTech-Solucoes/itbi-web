FROM node:22.14.0-alpine AS build
WORKDIR /build
COPY . .
RUN npm install && npm run build

FROM nginx
COPY ./environment.sh /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/environment.sh
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
VOLUME /var/log/nginx/log
COPY --from=build /build/dist/itbi/browser .
CMD ["sh", "-c", "/usr/share/nginx/html/environment.sh && nginx -g 'daemon off;'"]
