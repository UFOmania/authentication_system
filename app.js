import express from 'express'
import  path from 'path'
const __dirname = path.resolve();//in this version of node u cant access __dirname directly it says it undefined

import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("database has been linked successfully")})
.catch(err=>{console.log("a database error : \n",err)})


const app = express()

//app middlewares
app.use(express.urlencoded({extended:"true"}))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));
//change the view engine to ejs while using html
app.set('view engine','ejs')


//routes ---------------
import register_router from './routes/register.js';
app.use('/register',register_router);

//default route
app.get('/',(req,res)=>{
    res.status(200).send('make your self home with medox !!!')
})

export default app;