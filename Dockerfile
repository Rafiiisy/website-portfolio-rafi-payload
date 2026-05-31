FROM node:22.11-alpine

WORKDIR /app

# Stubs for `next build` / Payload generate (overridden in CI via build-args)
ARG DATABASE_URI=mongodb://127.0.0.1:27017/ci-build?authSource=admin
ARG PAYLOAD_SECRET=ci-build-secret-ci-build-secret-ci-build
ARG SITE_URL=http://localhost:3000
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV SITE_URL=$SITE_URL

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

RUN npm run generate:types && npm run generate:importmap && npm run build

HEALTHCHECK --interval=30s --timeout=30s --retries=6 \
  CMD wget --no-verbose --tries=1 --spider http://`hostname`:3000/api/healthcheck || exit 1

CMD ["npm", "run", "start"]
