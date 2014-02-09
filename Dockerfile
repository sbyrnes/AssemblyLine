# AssemblyLine
# Android App Build image
#
# VERSION       0.1

# use the ubuntu base image provided by dotCloud
FROM ubuntu:latest
MAINTAINER Sean Byrnes, sean@fogstack.com

# make sure the package repository is up to date
# RUN apt-get update

# install nginx
RUN apt-get install -y nginx

# configure nginx to not run in daemon mode (or else docker will think it exits immediately)
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ADD ./setup/assembly.line.nginx /etc/nginx/sites-available/default
RUN mkdir /var/www
ADD ./setup/assembly.line.html /var/www/index.html

# export port 80
EXPOSE 8080

# start nginx
ENTRYPOINT ["nginx"]