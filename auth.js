import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './db.js';

async function register(user) {
    if (user.password !== user.cpassword) {
        console.log('Passwords do not match')
        return {
            success: false,
            error: 'Passwords do not match'
        }
    }

    const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

    const {err, result} = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword
    })
    if (err) {
        return {
            success: false,
            error: 'Database error'
        }
    }
    else {
        return {
            success: true
        }
    }
}

async function login(userC) {
    console.log(userC);
    const user = await User.findOne({ email: userC.email });
    /* if (err) {
        return {
            success: false,
            error: 'Database error'
        }
    } */
    if (!user) {
        return {
            success: false,
            error: 'User does not exist'
        }
    }
    const passwordValid = bcrypt.compareSync(userC.password, user.password)
    if (!passwordValid) {
        return {
            success: false,
            error: 'Invalid password'
        }
    }
    return {
        success: true,
        token: jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400
        })
    }
}

function verifyToken(token) {
    try {
        const data = jwt.verify(token, process.env.SECRET);
        return data;
    } catch {
        return false;
    }
}

/* const authorize = (req, res, next) => {
    const token = req.session.authToken;
    if (!token) {
        return res.redirect('/user/login');
    }
    const tokenValid = verifyToken(token);
    if(tokenValid) {
        req.session.userID = tokenValid.id;
        return next();
    } else {
        return res.redirect('/user/login');
    }
}; */

const authorize = (req, res, next) => {
    const token = req.session.authToken;
    if (!token) {
        return res.redirect('/user/login');
    }
    const tokenValid = verifyToken(token);
    if(tokenValid) {
        const userID = tokenValid.id;
        User.findOne({_id: userID}).then((user) => {
            if(user) {
                req.session.userID = tokenValid.id;
                if(user.role === 'admin') {
                    req.session.admin = true;
                } else {
                    req.session.admin = false;
                }
                return next();
            } else {
                return res.redirect('/user/login');
            }
        })
    } else {
        return res.redirect('/user/login');
    }
};

const authorizeAdmin = (req, res, next) => {
    if(req.session.admin) {
        return next();
    } else {
        return res.sendStatus(403);
    }
};

export { register, login, authorize, authorizeAdmin };