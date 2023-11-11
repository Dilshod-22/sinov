const express = require('express')
const app = express();
const authFace = require('./sinov')

app.use(express.json());



app.use('/auth',authFace)

PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server is running " + PORT);
})