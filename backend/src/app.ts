import express from "express";
import { SerialPort } from "serialport";

const app = express();

// (async () => {
//     const list = await SerialPort.list();
//     console.log(list);
// })();

const arduino = new SerialPort({
    baudRate: 9600,
    path: "COM4",
});

arduino.on("open", function () {
    console.log("[Arduino] Serial Port opened");
});

app.get("/", async (req, res) => {
    arduino.write("Hallo");
});

app.post("/", async (req, res) => {

});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)); 
