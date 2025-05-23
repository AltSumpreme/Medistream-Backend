FROM node:20-slim
RUN apt-get update -y && \
    apt-get install -y openssl wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm node-gyp
WORKDIR /app
COPY package.json pnpm-lock.yaml .env ./
RUN pnpm install
COPY . .
COPY init.sh .
RUN chmod +x init.sh
EXPOSE 3050
CMD ["./init.sh"]