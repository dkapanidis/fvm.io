FROM dockerfile/nodejs

MAINTAINER Dimitris Kapanidis <d.kapanidis@gmail.com>

# Needed for PhantomJS (http://www.dorukdestan.com/blog/phantomjs-installation-on-lxc/)
RUN apt-get update -y && apt-get install -y libfreetype6 libfontconfig && apt-get clean

WORKDIR /home/mean

# Install Mean.JS Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install Mean.JS packages
ADD package.json /home/mean/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/mean/.bowerrc
ADD bower.json /home/mean/bower.json
RUN bower install --config.interactive=false --allow-root
RUN npm install -g forever

# Make everything available for start
ADD . /home/mean

# currently only works for development
ENV NODE_ENV development

EXPOSE 3000
CMD ["grunt"]
