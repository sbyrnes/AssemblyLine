# AssemblyLine
# Android App Build image
#
# VERSION       0.1

# use the ubuntu base image provided by dotCloud
FROM ubuntu:latest
MAINTAINER Sean Byrnes, sean@fogstack.com

# make sure the package repository is up to date
# RUN apt-get update

# install required software
RUN apt-get install -y nodejs
RUN apt-get install -y git

# install the android SDK and images
RUN wget http://dl.google.com/android/adt/adt-bundle-linux-x86_64-20131030.zip
RUN gunzip adt-bundle-linux-x86_64-20131030.zip

# check out the Assembly Line code
RUN git clone git@github.com:sbyrnes/AssemblyLine.git

# export ports
EXPOSE 8080
EXPOSE 8081

# start nginx
ENTRYPOINT ["AssemblyLine/scripts/run_assemblyLine.sh"]