const express = require('express');
const app = express();
const mysql = require('mysql');
const json = express.json();
const urlencode = express.urlencoded({extended:true});
const enc = require('crypto-js');

app.use(json);
app.use(urlencode);

let userid = 1; 
const key = "qahwsUkZoP";
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'workindia'
})

connection.connect();
app.post("/sites/register", (req, res)=>{
    if(addUser(req.body.username, req.body.password))
        res.send("success");
    else    
        res.send("registration failed");
})

app.post("/sites/login", (req, res)=>{
    if(login(req.body.username, req.body.password))
        res.send("success");
    else 
        res.send("login failed");
})
app.get("/sites/list", (req, res)=>{
    res.send(viewList());
})
app.post("/sites",(req,res)=>{
    const data = req.body;
    if(addPassword(data.username, data.website, data.password));
        res.send({'status':"success"});
})
app.listen(3000,()=>{
    console.log("Listening in 3000");
});

function viewList() {
    let result = []
    connection.query("SELECT WEBSITE, USERNAME, PASSWORD FROM LIST WHERE UID = ?", [userid],(err, res)=>{
        if(err){
            console.log(err);
            return false;
        } else {
            res.forEach(resu => {
                result.push({"Website":resu.WEBSITE, "Username":resu.USERNAME, "Password":enc.AES.decrypt(resu.PASSWORD, key).toString(enc.enc.Utf8)});
            });
            console.log(result);
        }
        return result;
    })
}

function login(username, password){
    connection.query("Select ID from users where name = ? and password = ?",[username, password], (err, res)=>{
        if(err){
            console.log(err);
            return false;
        } else {
            userid = res[0].ID;
        }
    });

}

function addPassword(website, username, password){
    password = enc.AES.encrypt(password, key).toString();
    connection.query("INSERT INTO list (UID, WEBSITE, USERNAME, PASSWORD) VALUES (?,?,?, ?)", [userid, website, username, password], (err)=>{
        if(err){
            console.log(err);
            return false;
        }
        else 
            return true;
    })
}

function addUser(username, password){
    connection.query("INSERT INTO USERS (NAME, PASSWORD) VALUES (?,?)", [username, password], (err)=>{
        if(err){
            console.log(err);
            return false;
        } else {
            return true;
        }
    })
}