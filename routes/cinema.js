var express=require('express');
var router=express.Router();
var pool=require('./pool');

router.get('/fetch_all_cinemas',function(req,res,next){
    pool.query("select * from cinema where cityid=?",[req.query.cityid],function(error,result){
        if(error)
        {
            res.status(500).json({result:[],message:'Server Error: Issue in database'})
        }
        else
        {
            res.status(200).json({result:result,message:'success'})
        }
    })
})

module.exports=router;