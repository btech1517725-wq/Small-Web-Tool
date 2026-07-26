const express = require("express");
const cors = require("cors");
const auditRoute = require("./routes/audit");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/audit", auditRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(Running on ${PORT});
});
