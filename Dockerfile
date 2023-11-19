FROM node:20-alpine

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN addgroup docker && adduser nextjs docker
RUN chown -R nextjs:nodejs /app

USER nextjs
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start-with-migrate"]
