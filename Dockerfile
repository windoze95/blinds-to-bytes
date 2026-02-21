# Stage 1: Build client assets and install all dependencies
FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm ci
RUN cd client && npm ci
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/client/dist ./client/dist
COPY server ./server
RUN mkdir -p /data
ENV NODE_ENV=production
ENV DATABASE_PATH=/data/progress.db
ENV PORT=3001
EXPOSE 3001
CMD ["node", "server/index.js"]
