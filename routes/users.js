import express from 'express';
const router = express.Router();
import passport from '../passport.js';


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./tempImages")
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })
// const upload = multer({
//   storage: storage 
//   });
  
const authentication = (req, res, next)=> {
  if (req.session.name) return res.send({active: true, name: req.session.name});
  next();
}

router.post('/register', passport.authenticate('registration'), (req, res) => {
  try{
  res.send({active: true, name:req.body.username });
  }catch(err){
    console.log(err);
  }
})

router.post('/login', passport.authenticate('login'),  (req, res) => {
  if (!req.session.name){
    req.session.name = req.body.username;
  }
  res.send({active: true, name:req.body.username });
})

router.get('/logout', (req, res) => {
  if(!req.session.name)
    throw new Error("Hubo un error")
  const response = req.session.name;
  req.session.destroy();
  res.send(response)
});

router.get('/loggedin', authentication, (req, res) => {
  return res.send({active: false});
});

export default router;