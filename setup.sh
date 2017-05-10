#!/bin/bash

echo "Setting up platform"
cd src/
npm install
bower install
node bin/www
echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000/new-ui"
echo "===================================================="
