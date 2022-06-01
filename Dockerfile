FROM node:latest

EXPOSE 9001

COPY ./messageapp ./

RUN echo "hello world"

RUN npm install

CMD ["npm", "start" ]





# ARG BUILD_TAG=unknown
# LABEL BUILD_TAG=$BUILD_TAG
