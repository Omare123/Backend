import express from 'express';
const router = express.Router();
import {container} from '../../dependencies.js'
const upload = container.resolve("upload");

router.post('/', upload.single("uploaded_file"), async (req, res) => {
  if(req.file.filename)
    res.json(req.file.filename)
  else
    res.status(400)
})

export default router;