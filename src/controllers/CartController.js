import CartService from "../services/CartService.js"
import express from 'express';
const router = express.Router();

    router.post('/', (req, res) => {
        try{
            CartService.save(req.body).then(reponse => {
                res.json(reponse)
            })
        }
        catch(err){
            console.error(err)
        }
      })

export default router;