FROM node

LABEL 	"GinesSaez" "2029469@alu.murciaeduca.es"
	
EXPOSE 	5173

WORKDIR	/app

COPY 	. .
RUN yarn install

RUN yarn add react-router-dom




ENTRYPOINT [ "yarn", "dev", "--host"]
