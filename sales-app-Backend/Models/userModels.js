// we are creating required fields for Database

//  Import Mongoose package
const MONGODB = require('mongoose');

// to Create field we need Schema function
// syntax: const userSchema = new MONGODB.Schema()
const userSchema = new MONGODB.Schema({
 FirstName : {
    type: String,
    required: true
 },
 LastName : {
    type: String,
    required: true
 },
 Email : {
    type: String,
    required: true
 },
 Password : {
    type: String,
    required: true
 }
});

// Creating Schema Model
// Syntax: Mongoose_variable.model("DB_Name",Schema_variable)
MONGODB.model('SalesAppUserData',userSchema)