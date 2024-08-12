# Json Server
- install json server: npm install -g json-server
- if no sudo, run from proj root: npx json-server --port 3001 --watch db.json
- run json server: json-server --port 3001 --watch db.json
| default is 3000 
- dev server: npm install json-server --save-dev
| and then add "server":"json-server -p3001 --watch db.json" in the scripts object, package.json
| and then run : npm run server
# Axios
- from proj root: npm install axios
# ESlint
- npm install eslint @eslint/js --save-dev
- npx eslint --init