#!/bin/bash

echo "Setting up platform"
cd src/
npm install
bower install

echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000"
echo "===================================================="

node bin/www
