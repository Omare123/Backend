import express from 'express';
const router = express.Router();
const ProductContent = await import(`../daos/DaoSelector.js`)
    router.post('/',  async (req, res) => {
        try{
            console.log(ProductContent)
            ProductContent.save(req.body).then(reponse => {
                res.json(reponse)
            })
        }
        catch(err){
            console.error(err)
        }
      })

export default router;