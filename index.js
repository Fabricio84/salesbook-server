import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Its working!");
})

app.listen(3333, ()=> {
    console.log('HTTP server schedule-man running on port 3333!');
});