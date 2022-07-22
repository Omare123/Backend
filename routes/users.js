import express from 'express';
const router = express.Router();
import passport from '../passport.js'

const authentication = (req, res, next)=> {
  if (req.session.name) return res.send({active: true, name: req.session.name});
  next();
}

router.post('/register', passport.authenticate('registration'), (req, res) => {
  console.log(req.body)
  res.send({active: true, name:req.body.name });
})

router.post('/login', passport.authenticate('login'),  (req, res) => {
  console.log(req.body)
  if (!req.session.name){
    req.session.name = req.body.username;
  }
  res.send({active: true, name:req.body.username });
})

router.get('/logout', (req, res) => {
  const response = req.session.name;
  if(req.session.name){
    req.session.destroy();
    res.send(response)
  }
  throw new Error("Hubo un error")
});

router.get('/loggedin', authentication, (req, res) => {
  return res.send({active: false});
});

export default router;