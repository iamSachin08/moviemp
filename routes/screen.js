var express=require('express');
var router=express.Router();
var pool=require('./pool');



router.get('/fetch_all_screens',function(req,res,next){
    pool.query("select * from screen where cinemaid=?",[req.query.cinemaid],function(error,result){
        if(error)
        {
            res.status(500).json({result:[],message:'Server Error: Issue In Database'})
        }
        else
        {
            res.status(200).json({result:result,message:'Succcess'})
        }
    })
})



module.exports=router;