import express from 'express'
import User from '../models/User.js';
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).render('register');
})
router.post('/',async (req,res)=>{
    const{username , email ,password , confirm_password} = req.body
    let errors = []

    if(!username || !email || !password || !confirm_password){
        errors.push({msg:"some fields is not felt"})
    }
    if(password !== confirm_password){
        errors.push({msg:"incorrect password match"})
    }
    if(password.length < 6){
        errors.push({msg:"short password"});
    }
    if(errors.length > 0){
        res.status(200).json({errors})
        //somthing went wrong
    }else{
        //save data to the db
        const isExist = await User.findOne({email});
        try{
            if(!isExist){
                const newUser = new User({username ,email, password})
                await newUser.save();
                console.log(`a new user is register ${newUser}`)
                res.status(200).json({msg:"success"});
            }else{
                res.status(201).json({msg:"this user is aleady exist"})
            }
        }catch(err){
            console.error(err);
            res.status(500).json({msg:"something went wrong with the server side "})
        }
    }
})

export default router;