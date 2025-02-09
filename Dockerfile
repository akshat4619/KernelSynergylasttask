# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm rebuild bcrypt --build-from-source


# Copy the rest of the application code
COPY . .

# Expose the application port (change if needed)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]