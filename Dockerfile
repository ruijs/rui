FROM node:18.18.0-alpine
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm libs
RUN pnpm --filter=react-player build

EXPOSE 3000

CMD ["pnpm", "--filter", "react-player", "start"]