# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Run npm start when the container launches
CMD ["npm", "start"]
