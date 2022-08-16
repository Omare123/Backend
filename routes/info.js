import express from 'express';
import os from 'os';
const router = express.Router();

router.get('/', (req, res) => {
  const response = {
    arguments: process.argv.slice(2).join(' '),
    plat: process.platform,
    ver: process.version,
    memory: process.memoryUsage().arrayBuffers,
    direc: process.report.directory,
    cwd: process.cwd(),
    numPro: os.cpus().length
  }
  console.log("response", response)
  res.send({...response})
})
export default router;