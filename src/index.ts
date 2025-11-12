
import { Client } from "pg"
// const pgclient=new Client("psql 'postgresql://neondb_owner:npg_E9SNR0mlZjcz@ep-weathered-mouse-ahnmaogz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'")
const pgclient=new Client({
    user:"neondb_owner",
    password:"npg_E9SNR0mlZjcz",
    port:5432,
    host:"ep-weathered-mouse-ahnmaogz-pooler.c-3.us-east-1.aws.neon.tech",
    database:"neondb",
    ssl:true
})
async function main(){
    await pgclient.connect()
    // const response=await pgclient.query("SELECT * FROM  users")
        const response=await pgclient.query("UPDATE  users SET username='ayu' WHERE id=1")

    // console.log(response)
    console.log(response.rows)
}
main()