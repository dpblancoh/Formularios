const express = require("express");
const router = express.Router();
const mysql = require("../database/conexion");

router.get("/", (req, res) => {
  res.render("pages/sophos");
});

router.post("/", (req, res) => {
  let form = req.body;
  console.log(form);
  mysql.getConnection((err, cn) => {
    if (err) {
      console.error("error de conexion:", err.message);
      return res.status(500).json({ error: err.message });
    }

    let insertquery = `INSERT INTO sophos SET ?`;

  
    let valores = {
      contacto: form.contactoCybersafe,
      nombre_com: form.nombreCompania,
      persona_encarg: form.personaEncargada,
      cargo_persona: form.cargoPersonaEncargada,
      cuantos_proyecto: form.tiempoImplementacion,
      publica_nube: form.serviciosNube == "si" ? 1 : 0,
      servicios_detalle: form.serviciosNubeDetallesInput,
      actualmente_sede: form.masDeUnaSede == "si" ? 1 : 0,
      cuantas_sedes: form.cantidadSedes,
      requiere_firewall: form.masDeUnFirewall == "si" ? 1 : 0,
      como_conectan: form.conexionSedes,
      cantidad_dispositivos: form.dispositivosGeneranTrafico,
      requieren_vpn: form.vpn == "si" ? 1 : 0,
      canales_internet: form.cantidadCanales,
      especifique_mps: form.cuantasMbps,
      directorio_activo: form.directorioA == "si" ? 1 : 0,
      telefonia_ip: form.telefoniaIP == "si" ? 1 : 0,
      proyeccion_crecimiento: form.proyeccionDis,
      funcionalidades_adicionales: Array.isArray(form.funcionalidades) ? form.funcionalidades.join(","):form.funcionalidades,
      observaciones_adiciones: form.observaciones,
      time_stamp: new Date()
    };

    cn.query(insertquery, valores, (err, filas) => {
      if (err) {
        console.error("error de consulta:", err.message);
        cn.release();
        return res.status(500).json({ error: err.message });
      }
      cn.release();
      res.status(200).json(filas);
    });
  });

   //res.send("GRACIAS POR RESPONDER EL FORMULARIO")
});

module.exports = router;
