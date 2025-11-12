
import express from 'express'

import { Client} from 'pg'
const app=express()
app.use(express.json())
const pgclient=new Client("postgresql://neondb_owner:npg_E9SNR0mlZjcz@ep-weathered-mouse-ahnmaogz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
pgclient.connect()
app.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    const street=req.body.street;
    const city=req.body.city;
    const country=req.body.country;
    const pincode=req.body.pincode
    // we get all the entries from the user
    // let sqlquery="INSERT INTO users (username,email,password) VALUES("
    // sqlquery+=username;
    // sqlquery+=",";
    // sqlquery+=email;
    // sqlquery+=",";
    // sqlquery+=password,
    // sqlquery+=")"
    
    // try catch esliye kyuki duplicates m backend crash ho jaa rha tha
    try{
        const insertquery=`INSERT INTO users (username,password,email) VALUES ($1,$2,$3) RETURNING id`
        // to start connection
        await pgclient.query("BEGIN;")
        const response=await pgclient.query(insertquery,[username,password,email])
        // console.log(response)
      const userid=response.rows[0].id
        // const response=await pgclient.query(`INSERT INTO users (username,password,email) VALUES ('${username}',' ${password}', '${email}') `) ab avoid  krenge sql injection
        // abhi tak user ke liye kiya ab address ke liye bhi krna h uske liye postman m bhi data add krna hoga aur yha se bhi
        
        const addressinsertquery=`INSERT INTO addresses (city,country,street, pincode,user_id) VALUES ($1,$2,$3,$4,$5)`
        await new Promise(x=>setTimeout(x,100*1000)); //stop the control on this line for 100 s, yeh hmne partial transaction ko show krne ke liye kiya, partial ho jaeyga agr begin aur commit ho hta de , vrna partial nhi hoga
        const addressresponse=await pgclient.query(addressinsertquery,[city,country,street,pincode,userid])
        // ab mere paas entry user se address m bhi aaeyge
        // hm sirf user m bhi kr sakte h entry aur dono m bhi
        
        await pgclient.query("COMMIT;")
        // entry ho gye user table m entry ho gye address table m yha dono sql query ek sath jaenge--transaction
        res.json({
        message:"you have signed up"
    })
    }catch(e){
        res.json({
            message:"error while signing up"
        })
    }
})

app.get('/metadata',async(req,res)=>{
    const id=req.query.id

    const query1=`SELECT * FROM users WHERE id=$1`
    const response1=await pgclient.query(query1,[id])

    const query2=`SELECT * FROM addresses WHERE user_id=$1`
    const response2=await pgclient.query(query2,[id])
    
    res.json({
        user:response1.rows[0],
        address:response2.rows[0]
    })

})

app.get('/better-metadata',async(req,res)=>{
    const id=req.query.id
    const query=`SELECT users.id,users.username,users.password,users.email,addresses.city,addresses.country,addresses.street,addresses.pincode
FROM users JOIN addresses ON users.id=addresses.user_id
WHERE users.id=$1`
const response=await pgclient.query(query,[id])
res.json({
    response:response.rows
})
// yeh join se kr liya

})
app.listen(3000)
// agr begin aur commit hta de toh partial transaction ho jaeyge
// foreign key se koi bhi data hm address m nhi daal sakte agr vo user m nhi h