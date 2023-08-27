const Pool=require('pg').Pool;

const pool=new Pool({
    connectionString:"postgres://postgres:123456@localhost:5432/HealthAppDB"
    }
)

module.exports=pool