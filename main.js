const express=require('express');
const router=express.Router();
const assert=require('assert');
const path=require('path');
const operation=require('./operation');

const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017/';
const dbName='conFusion';
var db=1;

const bodyParse=require('body-parser');//
router.use(bodyParse.json());   //       to get value from client.

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
    if(!req.body.name || !req.body.description){
        return res.status(400).json({msg:"Invalid Content!!!"});
    }
    var doc={
        name:req.body.name,
        description:req.body.description
    }
    operation.insertDb(db,doc,'dishes',(result)=>{
        // res.json({msg:'inserted:\n',doc});  //un-commenting this will result in error during post operation
        console.log('Inserted\n');
    });
    res.json({msg:'inserted:\n',doc});
});

router.put('/',(req,res)=>{
    res.json({msg:'update function\n'});
});

router.delete('/',(req,res)=>{
    if(!req.body.name || !req.body.description){
        return res.status(400).json({msg:'Invalid details'});
    }
    var doc={
        name:req.body.name,
        description:req.body.description
    }
    operation.remove(db,doc,'dishes',(result)=>{
        console.log('deleted');
    })
    res.json({msg:'deleted:\n',doc});
});

module.exports=router;