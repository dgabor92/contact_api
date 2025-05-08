FROM node:18-slim

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]