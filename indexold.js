const mongoose = require('mongoose');
  
mongoose.connect(
  'mongodb://127.0.0.1:27017/',
  {
    dbName: 'viesbuciu_rezervacija',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : 
    console.log('Connected to Mongo DB.')),
);
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roomNo: {
    type: String,
    required: true
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
  
const RoomBooked = mongoose.model('users', UserSchema);
RoomBooked.createIndexes();
  
const express = require('express');
const cors = require('cors');
  
const app = express();
app.use(express.json());
app.use(cors());
  
app.get('/', (req, res) => {
  res.send('Running.');
});

function sleep(ms){
  return new Promise((resolve)=>{
    setTimeout(resolve,ms)
  })
}

app.post('/register', async (req, res) => {
  try {
    let room=RoomBooked.find({
      'users.roomNo':req.body.roomNo
    })
    const user = new RoomBooked(req.body);
    //sleep(5000)
    await RoomBooked.updateOne(
      {'users.roomNo':req.body.room},
      {$set:{'users.roomNo':req.body.room,'users.name':req.body.name,'users.email':req.body.email}} //padaryti taip, kad vienas serveris
      //miega kelias sekundes, kitas ne, ir persirašo duombazės laukai
    )
    //result = result.toObject();
    /*if (result) {
      delete result.password;
      res.send(req.body);
      console.log(result);
    } else {
      console.log('The guest is already registered!');
    }*/
    res.send("Done")
  } catch (e) {
    res.send('Error! '+e.message);
  }
});
  
app.get('/get-room-data', async (req, res) => {
  try {
    const details = await RoomBooked.find({});
    res.send(details);
  } catch (error) {
    console.log(error);
  }
});
  
// Server setup
app.listen(5000, () => {
  console.log('Listening at port 5000');
});
app.listen(5001,()=>{
  console.log('Listening at port 5001');
})