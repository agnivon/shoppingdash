import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRouter from './routes/user.js';
import shopRouter from './routes/shop.js';
import adminRouter from './routes/admin.js';

dotenv.config({path: './.env'})
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./public'));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true}));

app.use('/user', userRouter);
app.use('/shop', shopRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('API online');
})

app.listen(port, (err) => {
    if(err) console.log('Error listening on port', port, '\n', err);
    else console.log('Server listening on port', port);
})