const express = require("express");
const cors = require("cors");       

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

// Endpoints
app.get("/", (req, res) => {
    res.send("Servidor de Tickets Funcionando");
});


app.post("/comprar-ticket", (req, res) => {
    const { nombreComprador, evento, cantidad } = req.body;

    if (!nombreComprador || !evento || !cantidad) {
        return res.status(400).json({
            error: "Error: Faltan datos para procesar la compra del ticket.",
        });
    }

    console.log(`[LOG] Nueva compra de ${nombreComprador} para ${evento}`);

    res.status(201).json({
        mensaje: "¡Ticket comprado exitosamente!",
        resumenCompra: {
            nombreComprador,
            evento,
            cantidad,
        },
    });
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});