FROM node:20.5-bullseye-slim
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y libc6  && \
    apt-get clean \

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

WORKDIR /app

COPY .yarn ./.yarn
COPY public ./public
COPY src ./src

COPY .browserlistrc \
     .env.local \
     .yarnrc.yml \
     components.json \
     entrypoint.sh \
     index.js \
     logger.js \
     next.config.mjs \
     next-env.d.ts \
     package.json \
     postcss.config.js \
     README.md \
     tailwind.config.js \
     tsconfig.json \
     yarn.lock \
     ./

RUN yarn install

RUN chown -R node:node /app
USER node

EXPOSE 3000
ENTRYPOINT ["/app/client/entrypoint.sh"]
