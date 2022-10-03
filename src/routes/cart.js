import router from 'koa-router' 
import {container} from '../../dependencies.js'
const cartController = container.resolve('cartController');


const cartRouter = router({prefix: '/api/cart'})

cartRouter.get('/', async (request, response) => {
  if (!request.session.name)
    response.redirect("/login.html")
  response.json(await cartController.getCart(request.session.name))
})

cartRouter.get('/buy', async (request, response) => {
  if (!request.session.name)
    response.redirect("/login.html")
  try {
    await cartController.buy(request.session.name)
    response.sendStatus(200)
  }
  catch (err) {
    console.log(err)
  }

})

cartRouter.post('/add', async (request, response) => {
  if (!request.session.name)
    response.redirect("/login.html")
  try {
    response.json(await cartController.add(request.session.name, request.body.product));
  }
  catch (err) {
    console.log(err)
  }

})


export default cartRouter;