import express from 'express';
import { fork } from 'child_process'
const router = express.Router();

router.get('/:cant?', (req, res) => {
  const cant = req.query['cant'] ? Number.parseInt(req.query.cant) : 10e5;
  const forked = fork('src/child_process/random.js');
  if (!isNaN(cant))
    forked.on('message', msg => {
      if (msg === 'start')
        forked.send(`${cant}`)
      else
        res.send(msg)
    })
  else
    res.send("Error")
})
export default router;