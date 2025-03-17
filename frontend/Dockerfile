# Используем официальный образ Node.js
FROM node:14

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь исходный код
COPY . .

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
