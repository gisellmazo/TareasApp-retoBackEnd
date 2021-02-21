const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database')

const app = express();

app.set('port', process.env.PORT || 3002)

app.use(morgan('dev'));
app.use(express.json());

app.use('/tasks', require('./routes/tasks'))
app.use('/users', require('./routes/users'))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

