echo "Setting up platform"
call cd src/
call npm install
call bower install

echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000/new-ui"
echo "===================================================="
call node bin/www
