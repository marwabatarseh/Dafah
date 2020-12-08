const router = require('express').Router();
const AddUser = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

router.route('/').get((req, res) => {
      AddUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/adduser').post(async (req, res) => {
    
  //checking if the number already signed up
  //i am not sure we need this since we already put  unique:true in the schema
  const numberadded = await AddUser.findOne({phone: req.body.phone})
  if (numberadded) return res.status(401).send("there is an account with this number,do you want to log in?");

    //checking if the username is used
       
  const useradded = await AddUser.findOne({username: req.body.username})
  if (useradded) return res.status(402).send("there is an account with this username,please choose another one?");
  const username = req.body.username;

  //hashing password
  //sorry it is a mass it is leterlly 2 am
  const salt = await bcrypt.genSalt(10)
   const hashedPassword =  await bcrypt.hash(req.body.password, salt)
  console.log( "  the hasheeeeeeeeeed pasword is" , hashedPassword)
  const phone = req.body.phone;
  const address = req.body.address;
//every thing is readdy here we send the data to the server  
   const newUser = new AddUser({username:username,password:hashedPassword, phone: phone, address:address });
   try{
   const saveUser= await newUser.save()
     
      res.send({saveUser:newUser._id})
     // const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET )
    //   console.log(token)
    //localStorage.setItem('token', token)
     //res.header('addUser-token',token).send(token);
     //res.json({ token: token})
     
   }catch(err){
     res.status(400).send(err)
   }
    });

    ///loggingggg innnn
    router.route('/login').post(async (req, res) => {

    //checking if the username is signed up 
      const user = await AddUser.findOne({username: req.body.username})
      if (!user) {
        console.log("no username ..........")
        res.status(404).json({ errors });
          // stop further execution in this callback
          return;
      };

    //checking if password is correct
      const validpassword = await bcrypt.compare(req.body.password, user.password)
      if (!validpassword) return res.status(400).send('Password not correct');

    //creat and send a token
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
      console.log("toooooooooooooooooooooooken ..........", token)
    // res.header('addUser-token',token).send(token);
           res.send(token);
       });

  
/// verify the token for authorization 
       router.route('/verify').post(async (req, res) => {
        console.log (req.body.data, "veryyyyyyyyyyyyyyyyyyyyy")
        const token = req.body.data;
        
    if (token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
        if(err){
            console.log("errrrrrrrrrrrror no token")
        res.redirect('/login');
        } else {
        console.log(decodedToken)
          res.send('you are authenticated');
        }
       
    })
    }
    else{
        res.redirect('/login');
    }
  });
    

    module.exports= router;