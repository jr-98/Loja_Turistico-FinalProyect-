var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//load customers route
var hoteles = require('./routes/hoteles'); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(
    connection(mysql,{ 
        host: 'localhost', //'localhost',
        user: 'root',
        password : '12345',
        port : 3306, //port mysql
        database:'hoteles_loja'
    },'pool') //or single
);
app.get('/', routes.index);
app.get('/contact', hoteles.contact);
app.get('/signin', hoteles.signin);
app.get('/login', hoteles.login);
app.get('/hoteles', hoteles.list);
app.get('/hotelesn', hoteles.list2);
app.get('/usuarios', hoteles.list3);
app.get('/usuarios/edit/:Login', hoteles.editUsu);
app.post('/usuarios/edit/:Login',hoteles.save_editUsu);
app.get('/usuarios/delete/:Login', hoteles.delete_usuarios);
app.get('/usuarios/add', hoteles.add1);
app.post('/usuarios/add', hoteles.save1);
app.post('/usuarios/add1', hoteles.save2);
app.get('/hoteles/add', hoteles.add);
app.get('/ubicacion', hoteles.ubicacion);
app.post('/hoteles/add', hoteles.save);
app.get('/hoteles/delete/:id_hotel', hoteles.delete_hotel);
app.get('/hoteles/open/:id_hotel', hoteles.open2);
app.get('/hoteles/edit/:id_hotel', hoteles.edit);
app.post('/hoteles/edit/:id_hotel',hoteles.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});