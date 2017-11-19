FROM node:8.9.0
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN DEBIAN_FRONTEND=noninteractive
RUN npm rebuild
RUN mkdir /var/www
WORKDIR /var/www
ADD package.json /var/www/package.json
# RUN npm i yarn
ADD start.sh /var/www
ENTRYPOINT ["/bin/bash", "start.sh"]
# CMD ["npm", "start"]:w
