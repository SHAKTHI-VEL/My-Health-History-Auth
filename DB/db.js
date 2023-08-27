const Pool=require('pg').Pool;
const dotenv=require('dotenv').config();

const pool=new Pool({
    connectionString:process.env.connectionString
    }
)

module.exports=pool