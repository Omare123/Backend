import express, { response } from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
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
    throw new Error("Qué haces?")
  }
});

router.get('/loggedin', (req, res) => {
  if (req.session.name) {
    return res.send({active: true, name: req.session.name});
  }
  return res.send({active: false});
});

export default router;