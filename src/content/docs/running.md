```
//setup npm and use correct node version for app
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 8.15.1
curl https://install.meteor.com/ | sh //install meteor
 //two repo install vulcan
git clone https://github.com/VulcanJS/Vulcan.git
git checkout d4381795825badd3bf6c61c8e7a72ed255f3ea2b
git clone https://github.com/Shielkwamm/one_Z-rk.git
cd one_Z-rk;meteor npm install //initial setup of app npm packages
./runme.sh //run the dang thing

then go to localhost:3000/backoffice this account will be admin
if you have missing packages errors, try npm install -g *missing package name* until errors go away ;)
```