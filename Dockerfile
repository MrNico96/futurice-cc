FROM node:12.11-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --production

COPY . /app

# define environment variables
ENV NODE_ENV production
ENV PORT 3333

EXPOSE $PORT

# start application
CMD ["npm", "start"]
