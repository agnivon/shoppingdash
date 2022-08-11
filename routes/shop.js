import express from 'express';
import * as auth from '../auth.js';
import {Product} from '../db.js';

const shopRouter = express.Router();

shopRouter.use(auth.authorize);

shopRouter.get('/', (req, res) => {
    console.log(req.session.userID);
    Product.find().then((products) => {
        res.render('shop', {admin: req.session.admin, products});
    }).catch(err => {
        res.sendStatus(500);
    })
})

export default shopRouter;