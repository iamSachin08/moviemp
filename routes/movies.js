var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/moviesinterface', function (req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    {
      res.render('loginpage',{message:''})
    }
    else
    {
      res.render('movieinterface',{message:' '});
    }
  }
  catch(e)
  {
    res.render('loginpage',{message:' '});
  }
  
});



router.post('/Submit_moviedata', upload.single('picture'),function (req, res) {


    pool.query("insert into mvdata(stateid, cityid, cinemaid, screenid, moviename, description, releasedate, ticketprice, status, actor, actress, singer,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.releasedate, req.body.ticketprice, req.body.status, req.body.actor, req.body.actress, req.body.singer,req.file.filename], function (error, result) {
      if (error) {
        console.log(error)
        res.render("movieinterface", { message: 'Server error:Failed to submit record' })

      }
      else {
        console.log(result)
        res.render("movieinterface", { message: 'Record Submitted Successfully' })
      }
    })
});


router.get('/submit_all_movies', function (req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    { res.render('loginpage',{message:''})}
    else
    {
    pool.query("select M.*,(select S.statename from state S  where S.stateid= M.stateid) as statename,(select C.cityname from city C where C.cityid= M.Cityid) as cityname,(select CI.cinemaname from cinema CI where CI.cinemaid= M.cinemaid ) as cinemaname,(select SC.screenname from screen SC where SC.screenid= M.screenid )as screenname from mvdata M ",function(error,result){

      if(error)
      {
        res.render('displayallmoviedata',{data:[],status:false,message:'Server Error : Pls Contact to Server Admin....'})
      }
      else
      {
        if(result.length==0)
        {
          res.render('displayallmoviedata',{data:[],message:'No Record Found....',status:false})
        }
        else
        {
          res.render('displayallmoviedata',{data:result,message:'Success',status:true})
        }
      }
    })
  }
}
catch(e)
{
  res.render('loginpage',{message:''})
}
  
});



router.get('/display_movies_by_id',function(req,res,next){
    pool.query("select M.*,(select S.statename from state S where S.stateid=M.stateid) as statename,(select C.cityname from city C  where C.cityid=  M.cityid) as cityname,(select CI.cinemaname from cinema CI where CI.cinemaid= M.cinemaid ) as cinemaname,(select SC.screenname from screen SC where SC.screenid= M.screenid )as screenname from mvdata M where M.movieid=? ",[req.query.movieid],function(error,result){
      if(error)
      {
        res.render('displaymoviesbyid',{data:[],status:false,message:'Server Error :Pls Contact To Server Admin'})
      }
      else
      {
        res.render('displaymoviesbyid',{data:result[0],message:'NO record Found',status:false})
      }
    })
});

router.post('/edit_delete_movies',function(req,res,next){
    var btn=req.body.btn
    if(btn=="Edit")
    {
    pool.query("update mvdata set stateid=?, cityid=?, cinemaid=?, screenid=?, moviename=?, description=?, releasedate=?, ticketprice=?, status=?, actor=?, actress=?, singer=? where  movieid=?",[req.body.stateid,req.body.cityid,req.body.cinemaid,req.body.screenid,req.body.moviename,req.body.description,req.body.releasedate,req.body.ticketprice,req.body.status,req.body.actor,req.body.actress,req.body.singer,req.body.movieid],function(error,result){
      if(error)
      {
        res.redirect('/movies/submit_all_movies')
      }
      else
      {
        res.redirect('/movies/submit_all_movies')
      }
    })
   }
    else
   {
    pool.query("delete from mvdata where movieid=?",[req.body.movieid],function(error,result){
      if(error)
      {
       
        res.redirect('/movies/submit_all_movies')
      }
      else
      {
        
        res.redirect('/movies/submit_all_movies')
      }
    })
    }
});

router.get('/show_picture',function(req,res,next){
  res.render('showpicture',{data:req.query})
});


router.post('/edit_picture',upload.single('picture'),function(req,res,next){
  pool.query("update mvdata set picture=? where movieid=?",[req.file.filename,req.body.movieid],function(error,result){
    if(error)
    {
      res.redirect('/movies/submit_all_movies')
    }
    else
    {
      res.redirect('/movies/submit_all_movies')
    }
  })
});


router.get('/movies_detail', function (req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    { res.render('loginpage',{message:''})}
    else
    {
    pool.query("select M.*,(select S.statename from state S  where S.stateid= M.stateid) as statename,(select C.cityname from city C where C.cityid= M.Cityid) as cityname,(select CI.cinemaname from cinema CI where CI.cinemaid= M.cinemaid ) as cinemaname,(select SC.screenname from screen SC where SC.screenid= M.screenid )as screenname from mvdata M ",function(error,result){

      if(error)
      {
        res.render('moviedetails',{data:[],status:false,message:'Server Error : Pls Contact to Server Admin....'})
      }
      else
      {
        if(result.length==0)
        {
          res.render('moviedetails',{data:[],message:'No Record Found....',status:false})
        }
        else
        {
          res.render('moviedetails',{data:result,message:'Success',status:true})
        }
      }
    })
  }
}
catch(e)
{
  res.render('loginpage',{message:''})
}
  
});
  

module.exports = router;