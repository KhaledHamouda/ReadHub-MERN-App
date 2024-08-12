// const express = require('express');
// const usersModel = require('../models/user')
// const router = express.Router();
// const bcrypt = require('bcryptjs')
const {authSignup} = require('../controllers/validateData')
// const {editToken, separateToken} = require('../middlewares/userMiddleware')

// router.get('/', async function (req, res) {
//     try {
//         const users = await usersModel.find({})
//         res.json(users)

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/admin/:token', async function (req, res) {
//     try {
//         const token = req.params.token;
//         const separatedInfo = separateToken(token);

//         const userId = separatedInfo.id;

//         if (!userId) {
//             throw new Error('Invalid userId extracted from token.');
//         }

//         const user = await usersModel.findById(userId);

//         console.log('User found:', user);

//         if (!user) {
//             throw new Error('User not found.');
//         }
//         res.json({ admin: user.admin });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.get('/getUser/:token', async function (req, res){
//     try {
//         const token = req.params.token;

//         const separtedInfo = separateToken(token);    
//         const userId=separtedInfo.id;
//         const curUser = await usersModel.findById(userId).exec();   
//         res.json({"email":curUser.email,"firstName":curUser.firstName, "lastName":curUser.lastName })

//     } catch (err) {
//         res.status(500).json({errorMessage:err.message});
//     }
// })

// router.post('/register/:admin?', async function (req, res) {
//     try {
//         const { error, value } = authSignup.validate(req.body);
//         if (error) {
//             return res.status(400).json({ error: error.details[0].message });
//         }

//         const { firstName, lastName, email, password } = value;
//         console.log(firstName);

//         const tmpUser = await usersModel.findOne({ email });
//         if (tmpUser) {
//             return res.status(409).json({ err: "Email already used" });
//         }

//         let newUser = new usersModel({
//             firstName,
//             lastName,
//             email,
//             password,
//             admin: req.params.admin === 'admin'
//         });

//         await newUser.save();

//         const token = await newUser.generateAuthToken();
//         const editedToken = editToken(newUser._id, token);

//         res.status(200).json(editedToken);
//         console.log("Everything is ok!");
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log(err);
//     }
// });

// router.post('/editUser/:token', async function (req, res){
//     try{
        
//         const token = req.params.token;
//         const separtedInfo = separateToken(token);    
//         const userId=separtedInfo.id;

//         let curUser= await usersModel.findById(userId)
    
//         const tmpUser = await usersModel.findOne({"email":req.body.email})
        
//         if(tmpUser != null && String(curUser._id) != String(tmpUser._id)) {
//             return res.status(409).json({err:"email already used"})
//         }
    
//         curUser.firstName=req.body.firstName
//         curUser.lastName=req.body.lastName
//         curUser.email=req.body.email
        
//         if(req.body.password.length){
//             curUser.password = await bcrypt.hash( req.body.password, 8);
//         }
//         const tmp= await usersModel.findByIdAndUpdate(userId,curUser)
//         console.log("user updated successfully" , tmp);
        
//         return res.status(200).json({"firstName": curUser.firstName, "lastName": curUser.lastName , "email":curUser.email})
//     }catch(error){
//         res.status(500).json(error); 
//     }
// })

// router.post('/login', async function (req, res) {
//     try {
//         const {email,password}= req.body
//         const curUser = await usersModel.findByCredentials(email, password)
    
//         if (!curUser) {
//             return res.status(400).json({error: 'Wrong email or password!'})
//         }
//         const token = await curUser.generateAuthToken()
//         const editedtoken = editToken(curUser._id,token)
        
//         if(curUser.admin)res.status(200).json( {editedtoken, "admin":curUser.admin} )
//         else res.status(200).json(editedtoken)

//     } catch (err) {
//         res.status(500).json(err);
//     }

// });

// router.post('/logout', async (req, res) => {
//     try {
//         const { token } = req.body;

//         console.log(typeof token); 
//         console.log(token); 

//         const separatedInfo = separateToken(token);

//         //console.log(`here is separatedINFO ${JSON.stringify(separatedInfo)}`);

//         const id = separatedInfo.id;
//         const curtoken = separatedInfo.token;

//         const curUser = await usersModel.findById(id).exec();

//         if (!curUser) {
//             throw new Error('User not found.');
//         }

//         curUser.tokens = curUser.tokens.filter(item => item.token !== curtoken);

//         await curUser.save();

//         console.log("The user is logged out!");
//         res.json({ msg: "from the server the user is logged out!" });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// router.delete("/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//     const result = await usersModel.findByIdAndRemove(id);
//     res.json(result);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authMiddleware = require('../middlewares/userMiddleware');
const router = express.Router();

// Get all users (restricted to admin)
router.get('/', async (req, res) => {
    // if (!req.isAdmin) {
    //     return res.status(403).json({ error: 'Access denied' });
    // }
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get the user is admin or not
router.get('/admin', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw new Error('User not found.');
        }
        res.json({ admin: user.admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user details by token
router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw new Error('User not found.');
        }
        res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
});


// Edit user details
router.post('/editUser', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await User.findById(req.userId);

        if (!user) {
            throw new Error('User not found.');
        }

        if (email && (await User.findOne({ email })) && email !== user.email) {
            return res.status(409).json({ error: 'Email already used' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register a new user
router.post('/register/:admin?', async (req, res) => {
    try {
        const { error, value } = authSignup.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const { firstName, lastName, email, password } = value;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already used' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            admin: req.params.admin === 'admin'
        });
        await newUser.save();
        // const token = newUser.generateAuthToken();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email);
        console.log('Received password:', password);

        const user = await User.findByCredentials(email, password);
        console.log('Found user:', user);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        console.log('Generated token:', token);

        res.status(200).json({ token, admin: user.admin });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});

router.post('/logout', authMiddleware, (req, res) => {
    res.json({ msg: 'User logged out!' });
});

router.delete('/:id', authMiddleware, async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Access denied' });
    }
    try {
        const result = await User.findByIdAndRemove(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
