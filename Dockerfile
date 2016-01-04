FROM node:5.2.0
MAINTAINER nukr <nukrs.w@gmail.com>

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json /tmp/package.json
RUN npm install pm2 -g
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

COPY . /opt/app
RUN ln -s ../src /opt/app/node_modules/app
WORKDIR /opt/app
EXPOSE 12345

RUN chmod 755 ./bin/start
CMD ["./bin/start"]
