FROM denoland/deno:alpine-2.0.0

WORKDIR /app

COPY . .

RUN deno cache main.ts --allow-import

ENTRYPOINT ["deno", "task", "prod"]