const assert=require('assert');

exports.insertDb=(db,doc,mycoll,callback)=>{
    const coll=db.collection(mycoll);
    coll.insert(doc,(err,result)=>{
        assert.equal(err,null);
        console.log('inserted: '+result.result.n+'\n inserted data: '+mycoll);
        callback(result);
    });
};

exports.display=(db,mycoll,callback)=>{
    const coll=db.collection(mycoll);
    coll.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};

exports.remove=(db,doc,mycoll,callback)=>{
    const coll=db.collection(mycoll);
    coll.deleteOne(doc,(err,result)=>{
        assert.equal(err,null);
        console.log('Element removed:\n',doc);
        callback(result);
    });
};

exports.update=(db,doc,update,mycoll,callback)=>{
    const coll=db.collection(mycoll);
    coll.updateOne(doc,{$set:update},null,(err,result)=>{
        assert.equal(err,null);
        console.log('element updated:\n',update);
        callback(result);
    });
};

exports.updateDoc=(db,doc,update,collection,callback)=>{
    const coll =db.collection(collection);
    coll.updateOne(doc,{$set:update},null,(err,result)=>{
        assert.equal(err,null);
        console.log('updated the document with ',update);
    });
};
