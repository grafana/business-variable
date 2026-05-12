# syntax=docker/dockerfile:1.7@sha256:a57df69d0ea827fb7266491f2813635de6f17269be881f696fbfdf2d83dda33e

FROM mcr.microsoft.com/playwright:v1.59.1-noble@sha256:b0ab6f3cb99aa7803adbc14d9027ec1785fc6e433b97e134e0f8fe61683b6b53

WORKDIR /app

# Copy manifests first so the install layer is cached until dependencies change
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline

# Copy config and provisioned dashboards (provisioning/ is not volume-mounted at runtime)
COPY playwright.config.ts tsconfig.json ./
COPY provisioning/ provisioning/
COPY src/ src/

CMD ["npm", "run", "test:e2e"]
