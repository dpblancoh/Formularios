// app.js
const express = require('express');
const app = express();
const cors = require('cors');


const pool= require("./database/conexion")

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.use("/public", express.static("./public/"));

// Middleware CORS para permitir solicitudes desde cualquier origen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//rutas
const sophos=require("./routes/sophos")
app.use("/sophos", sophos)


// Ruta para la página "Hola Mundo"
app.get('/', (req, res) => {
    pool.getConnection((err, cn) =>{
        if (err) {
            console.error("error de conexion:", err.message)
            return res.status(500).json({error: err.message})
        }
        cn.query("select * from sophos", (err, filas)=>{
            if (err) {
                console.error("error de consulta:", err.message)
                cn.release()
                return res.status(500).json({error: err.message})                
            }
            cn.release()
            res.status(200).json(filas)
        })
    })
  
    //res.render("pages/index");
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
