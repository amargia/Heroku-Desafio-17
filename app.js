const express = require("express");
// const app = express();
const compression = require("compression");
const cluster = require('cluster');
const numCpus = require('os').cpus().length;

const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// const MongoStore = require('connect-mongo');

const minimist = require('minimist');
const { fork } = require('child_process');

// const { Server: HttpServer } = require("http");
// const { Server: IOServer } = require("socket.io");
// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);


// const advancedOptions = { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// };


// app.use(cookieParser());

// app.use(session({
//   store: new MongoStore({ 
//     mongoUrl: process.env.MONGO_URL,
//     mongoOptions: advancedOptions,
//   }),
//   secret: "coder",
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 },
//   rolling: true
// }));

if(cluster.isPrimary) {
  console.log(`Primary: ${process.pid}`);
  console.log(`numCpus: ${numCpus}`);
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
  });
} else {
  const app = express();

  const { Server: HttpServer } = require("http");
  const { Server: IOServer } = require("socket.io");
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  const MongoStore = require('connect-mongo');
  const advancedOptions = { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    };
  
  app.use(cookieParser());
  
  app.use(session({
    store: new MongoStore({ 
      mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce',
      mongoOptions: advancedOptions,
    }),
    secret: "coder",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    rolling: true
}));

app.use(compression());

//middlewares para autenticación
app.use(passport.initialize());
app.use(passport.session());

const router = require("./routes");

app.set('views', './views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const logger = require('./logs/logger');

const chat = require("./data/chat.js");
io.on('connection', async function(socket) {
  console.log('Cliente Online'); 
  
  const messages = await chat.list();  
  socket.emit('messages', messages);   
  
  io.sockets.emit('productos');

  socket.on('newMessage', async function(data) {
    try {
      chat.add(data);
      const messages = await chat.list();      
      io.sockets.emit('messages', messages);
    } catch (error) {
      console.log(error);
    }
  });
});

let port = 8080;
let dataPort = minimist(['--port', process.argv.slice(2)]);
if (typeof(dataPort.port) === "number") {
  port = dataPort.port;
}
httpServer.listen(port, () => {
  console.log(`Server up on port ${port}`);
})
console.log(`Worker: ${process.pid}`);
}

