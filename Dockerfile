# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from root
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile || yarn install

# Copy all source code
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

# Start the server
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
