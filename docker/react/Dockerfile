FROM 	node

LABEL 	"GinesSaez" "2029469@alu.murciaeduca.es"
	
EXPOSE 	5173

WORKDIR	/

RUN yarn create vite app --template react

WORKDIR	/app

COPY ./package.json .

#RUN yarn cache clean
RUN yarn

RUN npm install react-burger-menu --save

ENTRYPOINT [ "yarn", "dev", "--host" ]





#    yarn global add react-big-calendar moment
#yarn cache clean && \

