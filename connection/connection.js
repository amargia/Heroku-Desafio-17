const mongoose = require('mongoose');

const url = process.env.MONGO_URL || 'mongodb+srv://Backend:Backend@cluster0.6xdsyrn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
    url ,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)

mongoose.connection.on('open', () => {
    console.log('Conectado a la base de datos');
}).on('error', (err) => {
    console.log('Error al conectarse a la base de datos', err);
});