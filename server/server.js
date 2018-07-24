const express = require('express');
const path = require('path');

const port = 3000;
//app init
const app = express();

//static folder
app.use(express.static(path.join(__dirname, '../public')));

//listen to port
app.listen(port, () =>{
  console.log(`Server started at ${port}`);
})
