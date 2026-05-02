# syntax=docker/dockerfile:1.7

FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

# Copy manifests first so the install layer is cached until dependencies change
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline

# Copy config and provisioned dashboards (provisioning/ is not volume-mounted at runtime)
COPY playwright.config.ts tsconfig.json ./
COPY provisioning/ provisioning/
COPY src/ src/

CMD ["npm", "run", "test:e2e"]
