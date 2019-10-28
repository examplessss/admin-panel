const express = require('express'),
    bodyParser = require('body-parser'),
    pg = require('pg');
const morgan = require('morgan')

const pool = new pg.Pool({
    port: 5432,
    password: 1111,
    database: 'admin-panel',
    max: 10,
    host: 'localhost',
    user: 'postgres'
});


const PORT = 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/login', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            return res.status(400).send(err);
        } else {
            db.query('SELECT * FROM login', function (err, table) {
                done();
                if (err) {
                   return  res.status(400).send(err);
                }
                else {
                  return   res.status(200).send(table.rows)
                   }
            })
        }
    });
});

app.get('/users/user', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            return res.status(400).send(err);
        } else {
            db.query('SELECT * FROM users', function (err, table) {
                done();
                if (err) {
                      res.status(400).send(err)
                }
                else {
                    return   res.status(200).send(table.rows)
                }
            })
        }
    });
});


app.get('/reports', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            return res.status(400).send(err);
        } else {
            db.query('SELECT * FROM reports', function (err, table) {
                done();
                if (err) {
                    return  res.status(400).send(err);
                }
                else {
                    return   res.status(200).send(table.rows)
                }
            })
        }
    });
});


app.post('/notification',function (request,response) {
    var name = request.body.name;
    var description = request.body.description;
    var estimation = request.body.estimation;
    var spent = request.body.spent;
    var id = request.body.id;
    pool.connect((err,db,done)=>{
        if (err){
            return response.status(400).send(err)
        }
        else{
            db.query('INSERT INTO reports (id,name,description,estimation,spent) VALUES($1,$2,$3,$4,$5)',[id,name,description,estimation,spent],(err,table)=>{
                done();
                if(err){
                    return response.status(400).send(err)
                }
                else{
                    console.log('Data Inserted!');
                    db.end();
                    response.status(201).send({message:'Data Inserted!'})
                }
            })
        }
    })
});
app.post('/report',function (request,response) {
    var agreed=request.body.agreed;
    var id=request.body.id
    pool.connect((err,db,done)=>{
        if (err){
            return response.status(400).send(err)
        }
        else{
            db.query(`UPDATE reports SET agreed=${agreed} WHERE ID=${id}`,(err,table)=>{
                done();
                if(err){
                    return response.status(400).send(err)
                }
                else{
                    console.log('Data Inserted!');
                    db.end();
                    response.status(201).send({message:'Data Updates!'})
                }
            })
        }
    })
});
app.post('/users/user-name',function (request,response) {
    var name = request.body.name ;
    var lastname = request.body.lastname;
    var profession = request.body.profession;
    var id  = request.body.id;
    pool.connect((err,db,done)=>{
        if (err){
            return response.status(400).send(err)
        }
        else{
            db.query('INSERT INTO users (id,name,lastname,profession) VALUES($1,$2,$3,$4)',[id,name,lastname,profession],(err,table)=>{
                done()
                if(err){
                    return response.status(401).send(err)
                }

                console.log('Data Inserted!')
                db.end();
                response.status(201).send({message:'Data Inserted!'})


            })
        }
    })
});


app.listen(PORT, function () {
    console.log('Server'+PORT);
})
//
// app1.listen(3010,function () {
//     console.log('Beach server '+3010)
// })
