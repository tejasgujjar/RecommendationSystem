echo "Setting up platform"
call cd src/
call npm install
call bower install
call node bin/www
echo "===================================================="
echo "Project setup succesfull. Please visit http://localhost:3000/new-ui"
echo "===================================================="
