const mongoose = require('mongoose');

const database = 'mongodb+srv://gisellmazo:1214743656@cluster0.flrhc.mongodb.net/tareas-app-db?retryWrites=true&w=majority'

mongoose.set('useFindAndModify', false);
mongoose.connect(database,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));

module.exports = mongoose;