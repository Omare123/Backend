import express from 'express';
const router = express.Router();
import passport from '../passport.js'

const authentication = (req, res, next)=> {
  if (req.session.name) return res.send({active: true, name: req.session.name});
  next();
}
router.post('/register', passport.authenticate('registration'), (req, res) => {
  res.send({active: true, name:req.body.name });
})

router.post('/login', passport.authenticate('athentication'),  (req, res) => {
  if (!req.session.name){
    req.session.name = req.body.name;
  }
  res.send({active: true, name:req.body.name });
})

router.get('/logout', (req, res) => {
  const response = req.session.name;
  if(req.session.name){
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/login.html');
    });
    res.send(response)
  }
  else{
    throw new Error("No existe ese usuario")
  }
});

router.get('/loggedin', authentication, (req, res) => {
  return res.send({active: false});
});

export default router;