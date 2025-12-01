# Backend Dockerfile
FROM node:20-slim

WORKDIR /app

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
