import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 6886;

app.listen(PORT,()=>{
    console.log(`server is start on port : ${PORT}`) ;
})