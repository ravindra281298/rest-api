const express=require('express');
const path=require('path');

const app=express();
const hostname='localhost';
const port=3000;

app.use('/',require('./main'));

app.listen(port,hostname,()=>{
    console.log(`listening at http://${hostname}:${port}`);
});