const express=require('express');
const router=express.Router();
const bodyParse=require('body-parser');
const assert=require('assert');
const path=require('path');
const operation=require('./operation');

const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017/';
const dbName='conFusion';
var db=1;


MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    db=client.db(dbName);
    console.log('connected to server!!!\n');
});


router.get('/',(req,res)=>{
    operation.display(db,'dishes',(docs)=>{
        res.json({msg:'data',docs});
        console.log('data displayed..!!!!');
    });
});

router.get('/:id',(req,res)=>{
    res.json({msg:'search function\n'});
});

router.post('/',(req,res)=>{
    res.json({msg:'insert function\n'});
});

router.put('/',(req,res)=>{
    res.json({msg:'update function\n'});
});

router.delete('/',(req,res)=>{
    res.json({msg:'delete function\n'});
});

module.exports=router;