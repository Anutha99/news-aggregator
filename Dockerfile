# Use Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the default port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
