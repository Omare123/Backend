const express = require('express')
const app = express();
app.use(express.json())
app.use('/api/productos', require('./routes/products'))
app.use('/api/carrito', require('./routes/cart'))
app.listen(8080, () => {
  console.log('Listening on port 8080!')
});