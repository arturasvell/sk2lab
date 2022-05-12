import * as db from '../sk2lab/db/query'
import express,{Express} from 'express';
import cors from 'cors'
  
const app = express();
app.use(express.json());
app.use(cors());
  
app.get('/', (req, res) => {
  res.send('Running.');
});

function sleep(ms:number){
  return new Promise((resolve)=>{
    setTimeout(resolve,ms)
  })
}
interface User{
  name:string,
  email:string,
  roomNo:number
}
app.post('/register', async (req:any, res:any) => {
  try {
    let user:User={
      name:req.body.name,
      email:req.body.email,
      roomNo:req.body.roomNo
    }
    if(user.name=="testingdelay")
    {
      await sleep(10000)
    }
    return db.pool.query(`UPDATE rooms SET name='${user.name}',
    email='${user.email}',vacant='False' where roomnumber='${user.roomNo}'`,(err:any,result:any)=>{
      if(err)
      {
        console.log(err.message)
      }
      else{
        res.status(200).json({response:result.rows})
      }
    })
    res.send("Done")
  } catch (e:any) {
    res.send('Error! '+e.message);
  }
});
  
app.get('/get-room-data/:roomNo', async (req:any, res:any) => {
  try {
    return db.pool.query("SELECT * from rooms where roomnumber='"+req.params.roomNo+"'",(err:any,result:any)=>{
      if(err)
      {
        console.error(err.message)
        res.status(500).json({error:err.message})
      }
      else{
        if(result.rows.length!=0)
        {
          res.json({result:result.rows})
        }
      }
    })
  } catch (error:any) {
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