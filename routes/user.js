import express from 'express';
import dayjs from 'dayjs';
import * as auth from '../auth.js'

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
    res.render('user/login');
})

userRouter.post('/login', (req, res) => {
    let response = {};
    auth.login(req.body).then((result) => {
        if (result.success) {
            response = {
                success: true,
                message: "User login successful",
            };
            req.session.authToken = result.token;
            res.json(response);
        }
        else {
            response = {
                success: false,
                message: result.error
            };
            res.json(response);
        }
    })
})

userRouter.get('/register', (req, res) => {
    res.render('user/register');
})

userRouter.post('/register', (req, res) => {
    let response = {};
    auth.register(req.body).then((result) => {
        if (result.success) {
            response = {
                success: true,
                message: "User registration successful"
            };
            res.json(response);
        }
        else {
            response = {
                success: false,
                message: result.error
            };
            res.json(response);
        }
    })
})

userRouter.get('/logout', (req, res) => {
    delete req.session.authToken;
    let script = ' <script> setTimeout(() => window.location.href = "/user/login", 1000) </script>';
    res.send('Logged out successfully.' + script);
})

export default userRouter;