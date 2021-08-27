FROM node:14

RUN mkdir -p /code
WORKDIR /code

COPY package.json /code/
COPY ./data /code/data
COPY buildData.js /code/
RUN npm install

EXPOSE 3001
CMD ["npm", "start"]