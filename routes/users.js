import express from 'express';
const router = express.Router();
import passport from '../passport.js';
import UserService from '../src/daos/UserDaoMongodb.js'
import { inicialMailer } from "../helpers/mailer.js"
import { upload } from '../helpers/uploader.js';
const service = new UserService()

const authentication = (req, res, next) => {
  if (req.session.name) return res.send({ active: true, name: req.session.name });
  next();
}

router.post('/register', upload.single("uploaded_file"), passport.authenticate('registration'), (req, res, next) => {
  try {
    inicialMailer(req.body)
    res.send({ active: true, name: req.body.username });
  } catch (err) {
    console.log(err);
    next();
  }
})

router.post('/login', passport.authenticate('login'), (req, res) => {
  if (!req.session.name) {
    req.session.name = req.body.username;
  }
  res.send({ active: true, name: req.body.username });
})

router.get('/logout', (req, res) => {
  const response = req.session.name;
  req.session.destroy();
  res.send(response)
});

router.get('/loggedin', authentication, (req, res) => {
  return res.send({ active: false });
});

router.get('/:username?', (req, res) => {
  if (req.query.username === undefined)
    service.getAll().then(reponse => {
      res.json(reponse)
    })
  else
    service.getByparameter(req.query.username, "username").then(reponse => {
      let user = {...reponse};
      delete user.password;
      res.json(user);
    })
})
export default router;