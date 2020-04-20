// -- reuqire models
require('./models/User');
require('./models/Track');

/* INCLUDES */
const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
/* routes */
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const generalRoutes = require('./routes/generalRoutes');

//---app
const app = express();

/* middlewares */
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(generalRoutes);

/* mongo setup */
const mongoURI = "mongodb+srv://admin:admin@cluster0-h3pma.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
  console.log("connected to mongo");
})
mongoose.connection.on('error',(err)=>{
  console.error('Error connecting to mongo',err);
});


/* app listen */
app.listen(3000,()=>{
  console.log(`listening on port ${3000}`)
})