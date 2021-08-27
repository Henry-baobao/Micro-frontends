FROM node:14

RUN mkdir -p /code
WORKDIR /code

COPY package.json /code/
COPY ./src /code/src
COPY ./public /code/public
COPY .env /code/
RUN npm install

EXPOSE 3001
ENTRYPOINT [ "npm", "run"]
CMD ["deploy"]