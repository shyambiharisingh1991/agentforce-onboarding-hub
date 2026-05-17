FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web ./apps/web
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false
RUN pnpm --filter @agentforce/web build
EXPOSE 3000
CMD ["pnpm", "--filter", "@agentforce/web", "start"]
