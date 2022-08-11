import mongoose from 'mongoose';

const uri = `mongodb://localhost:27017/edureka-nodejs`
const db = mongoose.connect(uri).then(() => {
    console.log('Successfully connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, default: 'customer'}
});

const productSchema = new mongoose.Schema({
    name: String,
    details: String,
    price: Number,
});

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)

export {User, Product};