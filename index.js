import express from "express";
import bodyParser from "body-parser";

import cors from "cors";


import todosRoutes from './routes/todos.js';

const app = express()
app.use(cors())
const port = 3000

app.use(bodyParser.json());

app.use('/api',todosRoutes);

app.get('/',(req,res) => {
    res.send('ok cha')
})

app.listen(port,() => {
    console.log(`Server running at port http://localhost:${port}`)
});