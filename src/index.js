import express from 'express';
import { router }  from "./router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3333, ()=> {
    console.log('HTTP server salesbook running on port 3333!');
});