# login jwt
 ## we will performend login and dashboard with jsonWebToken.
- modeler data 
- requeriments analitics of projects. 
 ## resources
-for login(boostrap5.1.0 -sweet-alert,dashboard).
 ## modules
- npm i -y install bcryptjs,cookie-parser,dotenv,ejs,express,jsonWebToken,mysql2.
## created structure folder 
- controllers
- database
- views
- router
- public
- ENV
- app.js
## working in file app.js
- initialized server with express()
- dotEnv()
- cookieParser()
- initialize server
- specifed route.
### set engine templates ejs
- set(view engine, ejs)
### set static files
- use(express.static('public'))
### for processing forms
- use(express.urlencoded{extended:true})
- use(express.json)
### set up enviroments vars.
- dotenv.config({path: ./env/.env});
- db_host
- db_user
- db_pass
- db_database
### creating db.js ('mysql')
- create conexion()
- host: proccess.env.DB_HOST.
- conect()
- export module.
### set cookie 
- use(cookie-parser)
### working in router
- create file router.js
- express() -> method router
- define router()
- export conexion(database)
- conexion().query for sql.
## call methods router in app.js
- use(router) ->views.
## workig in views
- get botstrap
- templates
- make references to folder css-js-img etc.
- create forms.

  
  





