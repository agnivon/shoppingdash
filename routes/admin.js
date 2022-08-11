import express from 'express';
import * as auth from '../auth.js';
import {User, Product} from '../db.js';

const adminRouter = express.Router();

function getEntity(req) {
    const entity = req.params.entity;
    if(entity === 'product') {
        var model = Product;
    } else if(entity === 'user') {
        var model = User;
    }
    return model;
}

adminRouter.use(auth.authorize);
adminRouter.use(auth.authorizeAdmin);

adminRouter.get('/', (req, res) => {
    console.log(req.session.admin);
    let data = {};
    User.find().then((users) => {
        data.users = users;
        return Product.find();
    }).then((products) => {
        data.products = products;
        res.render('admin', {data})
    }).catch(err => {
        res.sendStatus(500);
    })
})

adminRouter.post('/add/:entity', (req, res) => {
    console.log(req.body);
    let model = getEntity(req);
    model.create(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

adminRouter.put('/update/:entity/:id', (req, res) => {
    let model = getEntity(req);
    model.updateOne({_id: req.params.id}, {$set: req.body}, {upsert: true},(err, result) => {
        if (err) {
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

adminRouter.delete('/delete/:entity/:id', (req, res) => {
    let model = getEntity(req);
    model.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

export default adminRouter;

