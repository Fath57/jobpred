FROM node:20 AS base

WORKDIR /app

EXPOSE 3050

RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

FROM base AS development

# Copy package files first
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN yarn install --check-files

# Copy all application source files
COPY . .

# Ensure build-schema.js is executable
RUN chmod +x build-schema.js 2>/dev/null || true

# Generate Prisma client if schema exists
RUN if [ -f "prisma/schema.prisma" ]; then npx prisma generate --schema=prisma/schema.prisma; fi

# Verify package.json exists
RUN ls -la /app && cat /app/package.json | head -n 5

CMD ["yarn", "run", "start:dev"]
# Production stage
FROM base AS production

# Copy package files first
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN yarn install --production --check-files

# Copy all application source files
COPY . .

# Ensure build-schema.js is executable
RUN chmod +x build-schema.js 2>/dev/null || true

# Generate Prisma client if schema exists
RUN if [ -f "prisma/schema.prisma" ]; then npx prisma generate --schema=prisma/schema.prisma; fi

# Verify package.json exists
RUN ls -la /app && cat /app/package.json | head -n 5

# Build the application
RUN yarn build

CMD ["yarn", "run", "start:prod"]
