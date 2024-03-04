#1. Choose base image
FROM node:latest

#2. Set working directory
WORKDIR /app

#3. Copy package.json and package-lock.json to the container
COPY package*.json ./

#4. Install deps
RUN npm install

#5. Copy the rest of the application code to the container
COPY . .

RUN npm run build

#6. Expose the port on which the app will run
EXPOSE 3000

#7. Command to run the application
CMD ["node", "/app/index.js"]

