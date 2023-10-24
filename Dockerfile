FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /app

# copy package.json to the working directory for packages installation
COPY package.json /app
COPY . .

# install
RUN npm install

# Build the app
RUN npm run build

# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# start
CMD ["npm", "start"]