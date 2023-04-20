# Usa la imagen de Node.js 16 como base
FROM node:16

# Establece el directorio de trabajo en /usr/src/app/front
WORKDIR /usr/src/app/front

# Copia el archivo package.json a la imagen
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia todo el contenido del directorio actual al directorio de trabajo
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Configura el comando predeterminado que se ejecutará cuando se inicie el contenedor
CMD ["npm", "start"]

