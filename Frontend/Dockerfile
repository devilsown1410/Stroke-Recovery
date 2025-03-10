FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

RUN npm rebuild esbuild
COPY . .
EXPOSE 5173
RUN npm run build
CMD [ "npm", "run","dev"]