FROM node:alpine

WORKDIR /app
COPY package.json .

# will not install dependencies listed under "devDependencies" in package.json
RUN npm install --only=prod

COPY . .

# double quotes here!
CMD ["npm", "start"]
