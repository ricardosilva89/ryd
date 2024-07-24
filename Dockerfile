FROM node:lts-alpine

# Set environment variable for Node.js to increase max-old-space-size
ENV NODE_OPTIONS="--max-old-space-size=4096"

# The WORKDIR instruction sets the working directory for any subsequent RUN, CMD, ENTRYPOINT, COPY and ADD instructions
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app/

# Install dependencies
RUN npm install

# Build your application
RUN npm run build

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Set environment variable
ENV NODE_ENV=production

# Command to run your application
CMD ["npm", "run", "dev:debug"]