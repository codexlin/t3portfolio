FROM node:18-alpine AS base

# 仅在需要时安装依赖
FROM base AS deps
# 查看 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么可能需要 libc6-compat。
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 根据首选的包管理器安装依赖
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/
ENV PNPM_REGISTRY=https://registry.npmmirror.com/
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "未找到锁定文件。" && exit 1; \
  fi

# 仅在需要时重建源代码
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 收集完全匿名的遥测数据以了解一般使用情况。
# 在构建期间，如果您想禁用遥测，请取消注释以下行。
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "未找到锁定文件。" && exit 1; \
  fi

# 生产镜像，复制所有文件并运行 next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 在运行时，如果您想禁用遥测，请取消注释以下行。
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 为预渲染缓存设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 自动利用输出跟踪以减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js 是由 next build 从独立输出创建的
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
