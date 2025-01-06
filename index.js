const express = require("express");
const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send(`server is running`);
// })

const teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    return res.status(201).send(teaData);
})

app.get("/teas", (req, res) => {
    return res.status(200).send(teaData)
})

app.get("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existdata = teaData.find(tea => tea.id === id);
    if (!existdata) {
        return res.status(404).send("tea not found");
    }
    return res.status(201).send(existdata);
})

app.put("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const updateTea = teaData.find(tea => tea.id === id)
    if (!updateTea) {
        return res.status(404).send("tea not found");
    }
    updateTea.name = name;
    return res.status(200).send(updateTea);

})

app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = teaData.findIndex(tea => tea.id === id);
    if (index === -1) {
        return res.status(404).send("tea not found");
    }
    teaData.splice(index, 1);
    return res.status(200).send(teaData)
})

app.listen(3000, () => {
    console.log(`<h1>server is running at port 3000</h1>`)
})