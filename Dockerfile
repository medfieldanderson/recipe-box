# filepath: /d:/dev/recipe-box/Dockerfile
# Stage 1: Build the client
FROM node:20 AS build-client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the server
FROM node:20 AS build-server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Copy the built client files to the server's public directory
COPY --from=build-client /app/client/dist /app/server/public

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]