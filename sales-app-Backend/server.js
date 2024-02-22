// Imported express library
const express = require('express');
// Importing cors library
const cors = require('cors');
// Importhing jsonwebtoken package
const JWT = require('jsonwebtoken');
// imported PORT varible data from config.js file 
const { PORT, SECRET_JWT, MONGODB_URL } = require('./config')
// importing bcryptjs package
const bcryptjs = require('bcryptjs')
// Import Mongoose for MongoDB
const MONGODB = require('mongoose')
// Importing Created Schema Models
require('./Models/userModels')
require('./Models/salesModels')

const UserModel = MONGODB.model('SalesAppUserData')
const SalesModel = MONGODB.model('SalesDataModel')

// Import MiddleWare
const MiddleWare = require('./MiddleWare/RouteProtectMW')
const app = express();

// Applying cors as Middleware
app.use(cors());
// Applying json() as Middleware
app.use(express.json());


//  DataBase Connections
MONGODB.connect(MONGODB_URL)
MONGODB.connection.on("connected", () => {
    console.log("MongoDB Connected Successfully");
})
MONGODB.connection.on("error", () => {
    console.log("MongoDB Connection Error");
})

// Post Method to Store Registration/ new User data
app.post("/userregister", (request, response) => {
    // try catch
    try {
        const { F_name, L_name, email, password } = request.body;
        // Validation
        if (!F_name || !L_name || !email || !password) {
            response.status(400).json({ error_msg: "All fields are required" })
        }
        // Validation to check weather the user is registered or Not
        UserModel.findOne({ Email: email })
            .then((userFounded) => {
                if (userFounded) {
                    response.status(400).json({ userError: "User is Already Registered" })
                }
                // change the password into bcryptedPassword using hash function
                bcryptjs.hash(password, 10)
                    .then((bcryptedPassword) => {
                        const RegisterUser = new UserModel({ FirstName: F_name, LastName: L_name, Email: email, Password: bcryptedPassword });
                        // Save the Stored data in MongoDB
                        RegisterUser.save()
                            .then(() => {
                                response.status(200).json({ regis_Success: "User Registered Successfully" })
                            })
                            .catch(err => {
                                response.status(400).json({ regis_Error: "Something went wrong Please try again" })
                            });
                    })
                    .catch(err => {
                        response.status(400).json({ regis_Error: "Something went wrong Please try again" })
                    });
            })
            .catch(err => {
                response.status(400).json({ regis_Error: "Something went wrong Please try again" })
            });
    } catch (error) {
        response.status(error.status).json({ error_msg: error.message });
    }

})

// Post Method to user Login
app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error_msg: "All fields must be required" });
        }
        UserModel.findOne({ Email: email })
            .then((userFounded) => {
                if (!userFounded) {
                    res.status(400).json({ error_msg: "User is not Registered - please register" });
                }
                else {
                    // if userFound then first check the password is correct or not
                    // for that we use compare function from bycryptjs library
                    //  syntax : bcryptjs.compare(value send by user,  value which store in DB)
                   bcryptjs.compare(password, userFounded.Password)
                        .then((passordMatched) => {
                            if (passordMatched) {
                                // when user passwrd match we have to return token and user_data so that user can logined in sucessfully
                                //  how to generate Token (using jsonwebtoken package [JWT]) 1) install the pacjage npm i jsonwebtoken
                                // import the package
                                //  sign function will create a secrect code so that nobody will hack decode your password
                                const Token = JWT.sign({password: userFounded.password }, SECRET_JWT)
                                const userInfo = { "_id": userFounded.id, "Username": userFounded.FirstName + " " + userFounded.LastName }
                                res.status(200).json({ Result: { token: Token, userInfo: userInfo } })
                            }
                            else {
                                res.status(400).json({ error_msg: "Wrong Credential" });
                            }
                        })
                        .catch((err) => {
                            res.status(400).json({ error_msg: "Something went wrong please try again USER" });
                        })
                }
            })
            .catch(err => {
                res.status(400).json({ error_msg: "Something went wrong please try again USERFOUND" });
            });
    } catch (error) {
        console.log(err);
        res.status(400).json({ error_msg: "Something went wrong please try again CATCH" });
    }
})

// Post Method to Save New Sales Dates
// this endPoint will be protected (give permission to add Sales if user is logged in)
//  to protect this route we have to create Middleware
app.post('/addsales',MiddleWare,(req, res) => {
    const { prod_name, quantity, amount } = req.body;
    try {
        if (!prod_name || !quantity || !amount) {
            res.status(400).json({ error_msg: "All fields must be required" });
        }
        const SalesData = new SalesModel({Product_Name : prod_name, Quantity : quantity, Amount : amount});
        SalesData.save()
        .then((data)=>{
            res.status(200).json({ Success_Mssg: "Sales Added Successfully"});
        })
        .catch(err =>{
            res.status(400).json({ error_msg: "Something Went Wrong Please try again"});
        })
    } catch (error) {
        res.status(400).json({ error_msg: "Something Went Wrong Please try again"});
    }
})

// GET Method to fetch  all sales data
const todayDate = new Date;
app.get('/getallsales',MiddleWare, async (req, res)=>{
    await SalesModel.find()
    .then((data)=>{
        const TodaysData = data.filter((date)=>date.Date.toLocaleDateString() == todayDate.toLocaleDateString())
        res.status(200).json({Result:TodaysData});
    })
    .catch(error=>{
        console.log(error);
        res.status(400).json({ error_msg: "Something went wrong Please try again"});
    })
});
  

app.listen(PORT, () => {
    console.log("listening on port http://localhost:" + PORT);
})
