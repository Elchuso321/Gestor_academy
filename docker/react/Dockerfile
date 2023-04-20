FROM 	node

LABEL 	"IvanDeLaPoza" "5593312@alu.murciaeduca.es"
	
EXPOSE 	5173

WORKDIR	/app

COPY 	. .

RUN yarn install

ENTRYPOINT [ "yarn", "dev", "--host"]
