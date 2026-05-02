# Multi-stage Docker build for mottosysqrcsclient Angular 18 application
# Based on the proven pattern from mottosyslimsclient

# Stage 1: Build the Angular application
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Clear npm cache and install dependencies with legacy peer deps
RUN npm cache clean --force && npm ci --legacy-peer-deps

# Copy the entire source code
COPY . .

# Clear Angular cache and build the application
ARG BUILD_ENV
ARG BASE_HREF
ARG NG_BUILD_COMMAND

# Build the Angular application
RUN rm -rf .angular/cache 2>/dev/null || true && npm run ${NG_BUILD_COMMAND}

# Production stage with nginx
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/dist/mottosysqrcsclient /usr/share/nginx/html

# Create environment info file for debugging
ARG BUILD_ENV
ARG BASE_HREF
RUN echo "{\"environment\":\"${BUILD_ENV}\",\"timestamp\":\"$(date)\",\"version\":\"1.0.0\",\"baseHref\":\"${BASE_HREF}\"}" > /usr/share/nginx/html/env-info.json

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
