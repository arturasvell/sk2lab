import { query } from 'express'
import { Pool, PoolConfig } from 'pg'

export const dbParams:PoolConfig = {
    user: "virtualizacija",
    host: "localhost",
    database: "virtualizacija",
    password: "test",
    port: 5432
}

export const pool = new Pool(dbParams);

const queryDb=async function(text:any,params:any,callback:any=''){
    try{
        let response = await pool.query(text,params,callback)
        return response
    }catch(error:any){
        console.error(error)
        return "Error connecting to database!"
    }
};

export default {queryDb}