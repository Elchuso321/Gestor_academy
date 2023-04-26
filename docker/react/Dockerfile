FROM node

LABEL     "GinesSaez" "2029469@alu.murciaeduca.es"

EXPOSE     5173

WORKDIR    /app

COPY     . .


RUN yarn install

#RUN yarn add react-router-dom && \
#    yarn add react-icons && \
#    yarn add @fortawesome/react-fontawesome && \
#    yarn global add react-big-calendar moment && \
#    yarn add axios 




ENTRYPOINT [ "yarn", "dev", "--host"]

#yarn cache clean && \
