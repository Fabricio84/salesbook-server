import express from 'express';
import cors from 'cors';
import { router }  from "./router.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3333, ()=> {
    console.log('HTTP server salesbook running on port 3333!');
});