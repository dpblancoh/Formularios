const mysql = require("mysql2")
const conexion = mysql.createPool({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"cybersaf_formularios",
    connectionLimit: 10

})


module.exports=conexion