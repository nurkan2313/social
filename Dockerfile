FROM node:10.16.0-alpine
WORKDIR '/var/www/das'


COPY . .
EXPOSE 4444
CMD ["npm", "start"]

