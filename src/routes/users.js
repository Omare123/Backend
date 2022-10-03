import router from 'koa-router' 
import passport from '../../passport.js';
import { upload } from '../helpers/uploader.js';
import {container} from '../../dependencies.js';
const userController = container.resolve('userController');

const userRouter = router({prefix: '/user'})

const authentication = ({request, response}, next) => {
  if (request.session.name) return response.send({ active: true, name: request.session.name });
  next();
}

userRouter.post('/api/register', upload.single("uploaded_file"), passport.authenticate('registration'), ({request, response}, next) => {
  try {
    response.send({ active: true, name: request.body.username });
  } catch (err) {
    console.log(err);
  }
})

userRouter.post('/login', passport.authenticate('login'), ({request, response}) => {
  if (!request.session.name) {
    request.session.name = request.body.username;
  }
  response.send({ active: true, name: request.body.username });
})

userRouter.get('/logout', ({request, response}) => {
  const res = request.session.name;
  request.session.destroy();
  response.send(res)
});

userRouter.get('/loggedin', authentication, ({request, response}) => {
  return response.send({ active: false });
});

userRouter.get('/:username?', ({request, response}) => {
    response.json(userController.getUser(request.query.username))
})
export default userRouter;