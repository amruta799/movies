var express = require('express');
var mysql = require('mysql');
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'html');



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'joshi@1965',
  database: 'moviesdb'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected');
  }
});
app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");

});


  app.post("/",function(req,res){
    let item = req.body.movie_name
    console.log(item);
    let sp = item.split("",4);
    console.log(sp[0]);
    for(i=1;i<4;i++){
    if(sp[i]=== ' ' || sp[i]==='_' || sp[i]==='@' || sp[i]==='$' || sp[i]==='%'){
      continue;
    }
  }
    let join = sp[1]+sp[2]+sp[3];
    console.log(join);
    connection.query(`select * from movies where title like '%${join}%' limit 20`,
    `select * from movies where title like '${item}'` ,function(error,rows,fields){
      if(error){
      res.send('movie not found');
      console.log(error);
      }else{
        resultfinal = JSON.parse(JSON.stringify(rows));
        result = [];
        for(let i=0; i<rows.length; i++){
          result.push(rows[i].title)
        }
        //let result = [rows[0].title,rows[0].type,rows[0].year,rows[0].slug]
        res.send(result);
      }
    });
});

app.listen(3000);
