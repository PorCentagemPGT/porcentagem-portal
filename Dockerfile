# Etapa 1: build da aplicação Next.js
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Diretório da aplicação dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install --frozen-lockfile

# Copia o restante da aplicação
COPY . .

# Build da aplicação Next.js
RUN yarn build

# Etapa 2: container de produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copia os arquivos de produção do builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expondo a porta para o Azure
EXPOSE 3000

# Iniciando a aplicação
CMD ["yarn", "start"]
