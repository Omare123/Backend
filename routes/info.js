import express from 'express';
import os from 'os';
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    arguments: process.argv.slice(2).join(' '),
    plat: process.platform,
    ver: process.version,
    memory: process.memoryUsage().arrayBuffers,
    direc: process.report.directory,
    cwd: process.cwd(),
    numPro: os.cpus().length
  })
})
export default router;