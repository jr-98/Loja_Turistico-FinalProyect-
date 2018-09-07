
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * from hoteles,servicios where hoteles.id_hotel=servicios.id_hotel',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('media',{page_title:"Hoteles de Loja",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};
exports.list2 = function(req, res){
  req.getConnection(function(err,connection){     
        var query = connection.query('SELECT * from hoteles',function(err,rows)
        {     
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('hotelesn',{page_title:"Hoteles de Loja",data:rows}); 
         });
    });
};
exports.list3 = function(req, res){
  req.getConnection(function(err,connection){     
        var query = connection.query('SELECT * from usuario',function(err,rows)
        {     
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('usuario',{page_title:"Hoteles de Loja",data:rows}); 
         });
    });
};
exports.add = function(req, res){
  res.render('add_hotel',{page_title:"Agregar Hotel"});
};
exports.add1 = function(req, res){
  res.render('add_usuario',{page_title:"Agregar Hotel"});
};
exports.signin = function(req, res){
  res.render('signin',{page_title:"Agregar Usuario"});
};
exports.contact = function(req, res){
  res.render('contact',{page_title:"Comtactanos"});
};
exports.login = function(req, res){
  res.render('login',{page_title:"Agregar Usuario"});
};
exports.open = function(req, res){ 
    var id = req.params.id_hotel;
    req.getConnection(function(err,connection){
        var query = connection.query('select * from hoteles,servicios where hoteles.id_hotel=servicios.id_hotel and hoteles.id_hotel = ?',[id],function(err,rows)
        {   
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('hotel',{page_title:"Editar Hotel",data:rows});
         });            //console.log(query.sql);
    }); 
};
var data
exports.open2 = function(req, res){ 
    var id = req.params.id_hotel;
    req.getConnection(function(err,connection){
        var query = connection.query('select * from hoteles,servicios where hoteles.id_hotel=servicios.id_hotel and hoteles.id_hotel = ?',[id],function(err,rows)
        {   
            if(err)
                console.log("Error Selecting : %s ",err );
            data=rows
         }); 
        var query2 = connection.query('select login,email,img,opinion,calificacion from usuario,usuario_has_hoteles,hoteles where usuario.login=usuario_has_hoteles.Usuario_Login and usuario_has_hoteles.hoteles_id_hotel=hoteles.id_hotel and hoteles.id_hotel=?',[id],function(err,rows)
        {   
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('hotel',{page_title:"Editar Hotel",data2:rows,data});
         }); 
    }); 
};
exports.edit = function(req, res){
    var id = req.params.id_hotel;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM hoteles WHERE id_hotel = ?',[id],function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_hotel',{page_title:"Editar Hotel",data:rows});
         });
    }); 
};
exports.editUsu = function(req, res){
    var id = req.params.Login;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM usuario WHERE Login = ?',[id],function(err,rows)
        {  
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_usuario',{page_title:"Editar Usuario",data:rows});
         });
    }); 
};
/*Save the customer*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            nombre:input.nombre,
            direccion:input.direccion,
            categoria:input.categoria,
            canton    : input.canton,
            latitud : input.latitud,
            longitud  : input.longitud,
            img1:input.img1,
            img2:input.img2,
            img3    : input.img3,
            telefono : input.telefono,
            link  : input.link,
            descripcion  : input.descripcion,
        };
        var insert_sql = 'INSERT INTO hoteles set ?';
        var query = connection.query(insert_sql,data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/hotelesn');
        });
       // console.log(query.sql); get raw query
    });
};
exports.save1 = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            Login:input.Login,
            email:input.email,
            password:input.password,
            pais    : input.pais,
            img : input.img,
        };
        var insert_sql = 'INSERT INTO usuario set ?';
        var query = connection.query(insert_sql,data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          res.redirect('/usuarios');
        });
       // console.log(query.sql); get raw query
    });
};
exports.save2 = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data2 = {
            Login:input.Login,
            email:input.email,
            password:input.password,
            pais    : input.pais,
            img : input.img,
        };
        var insert_sql = 'INSERT INTO usuario set ?';
        var query = connection.query(insert_sql,data2, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
            res.render('usuario',{page_title:"Hoteles de Loja",data:rows});
        });
    });
};
exports.save_edit = function(req,res){  
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id_hotel;
    req.getConnection(function (err, connection) { 
        var data = {
            nombre:input.nombre,
            direccion:input.direccion,
            categoria:input.categoria,
            canton    : input.canton,
            latitud : input.latitud,
            longitud  : input.longitud,
            img1:input.img1,
            img2:input.img2,
            img3    : input.img3,
            telefono : input.telefono,
            link  : input.link,
            descripcion  : input.descripcion,
        };
        connection.query("UPDATE hoteles set ? WHERE id_hotel = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/hotelesn');
        });
    });
};
exports.save_editUsu = function(req,res){  
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.Login;
    req.getConnection(function (err, connection) { 
        var data = {
            email:input.email,
            password:input.password,
            pais:input.pais,
            img    : input.img,
        };
        connection.query("UPDATE usuario set ? WHERE Login = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/usuarios');
        });
    });
};
exports.delete_hotel = function(req,res){     
     var id = req.params.id_hotel;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM hoteles  WHERE id_hotel = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/hotelesn');
        });
     });
};
exports.delete_usuarios = function(req,res){     
     var id = req.params.Login;
     req.getConnection(function (err, connection) {
        connection.query("DELETE FROM usuario  WHERE Login = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.redirect('/usuarios');
        });
     });
};
exports.ubicacion = function(req, res){
  res.render('ubicacion',{page_title:"Ubicación Hotel"});
};