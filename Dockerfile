FROM cypress/included:10.6.0

RUN apt-get update
RUN apt-get -y install default-jdk
RUN apt-get clean

RUN npm install -g allure-commandline --save-dev
