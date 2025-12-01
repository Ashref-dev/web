# Backend Dockerfile
FROM node:20-slim

WORKDIR /app

# Install system dependencies required for MongoDB Memory Server
RUN apt-get update && apt-get install -y \
    libcurl4 \
    libcurl4-openssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig
COPY tsconfig.json ./

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the server with ts-node
CMD ["npx", "nodemon", "--exec", "node", "--loader", "ts-node/esm", "src/server.ts"]
