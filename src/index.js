const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('./config/passport');

const app = express();

app.set('port', process.env.PORT || 3002)

app.use(morgan('dev'));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: 'tareasapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Rutas
app.use('/tasks', require('./routes/tasks'));
app.use('/users', require('./routes/users'));


app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

