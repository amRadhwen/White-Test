const express = require("express");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();
require("./db/connect").connectDB();


const app = express();

app.use(express.json());
app.use(morgan("dev"));





app.use("*", (req, res) => {
    res.send("<pre>API IS RUNNIG</pre>")
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})