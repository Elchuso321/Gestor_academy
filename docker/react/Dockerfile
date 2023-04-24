FROM node

LABEL 	"GinesSaez" "2029469@alu.murciaeduca.es"
	
EXPOSE 	5173

WORKDIR	/app

COPY 	. .
#yarn cache clean && \
RUN yarn install

RUN yarn add react-router-dom && \
    yarn add react-icons && \
    yarn add @fortawesome/react-fontawesome




ENTRYPOINT [ "yarn", "dev", "--host"]
