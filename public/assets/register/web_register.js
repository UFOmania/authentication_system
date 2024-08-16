 document.getElementById('register_form_submit').addEventListener('click',()=>{
    //event.preventDefault();//stop sending the data to the server by default

    const username = document.getElementById('username_field').value;
    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;
    const confirm_password = document.getElementById('confirm_password_field').value;

    let errors = []
    //check the inputs
    if(!username ||!email || !password || !confirm_password){
        //please fill all the fields
        errors.push({msg:"please fill all the fields"})
    }
    if(password !== confirm_password){
        //password fields are not the same
        errors.push({msg:"password fields are not the same"});
    }
    if(!email.split('@')[1]){
        //non vlaid email
        errors.push({msg:"non vlaid email"});
    }
    if(errors.length === 0){
        //make a json data obj
        const formData = {
            username : username,
            email : email,
            password: password,
            confirm_password : password
        }
    
        const jsonData = JSON.stringify(formData);
    
        fetch('/register',{
            "method":"POST",
            "headers":{
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>console.log(err));
    }else{
        errors.forEach(ele=>console.log(ele.msg))
    }
})

