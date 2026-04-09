FROM node:20-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose port and start application
EXPOSE 3000

ENV PORT=3000
# By default, use dev server for hot reloading in local docker
CMD ["npm", "run", "dev"]
