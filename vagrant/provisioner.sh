#!/bin/bash

#Update system
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get update
apt-get dist-upgrade -y
apt-get autoremove -y
apt-get install -y nodejs

#Install rvm
\curl -sSL https://get.rvm.io | bash -s stable

#Add user to rvm group
usermod -a -G rvm vagrant

#Load rvm
source /etc/profile.d/rvm.sh

#Install ruby
rvm install 2.1.2

#Install bundler
gem install bundler

#Install bower
npm install -g bower

#Switch to vagrant user
su - vagrant

#Switch to vagrant folder
cd /vagrant

#Install ruby gems
bundle

npm install
bower install
