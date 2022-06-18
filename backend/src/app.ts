import express from "express";
import { ReadlineParser, SerialPort } from "serialport";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// (async () => {
//     const list = await SerialPort.list();
//     console.log(list);
// })();

const arduino = new SerialPort({
    baudRate: 9600,
    path: "/dev/ttyACM0",
});
const parser = arduino.pipe(new ReadlineParser());

arduino.on("open", function () {
    console.log("[Arduino] Serial Port opened");
});

parser.on("data", function (data) {
    data = data.trim();
    
    console.log(data);

    if (data == "Finished") {
        arduino.emit("finished", { finished: true });
    }
});

app.get("/water", (req, res) => {
    const { percentage } = req.query;

    arduino.write(percentage as string);
    console.log(`Sending percentage of ${percentage}%`);

    arduino.once("finished", () => {
        res.json({
            finished: true,
        })
    });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)); 
