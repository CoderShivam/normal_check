import mongoose from "mongoose"

export const dbConnection= ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName : "Project0"
    }).then(()=>{
        console.log("Successfully Connected to database")
    }).catch(err=>{
       console.log(`Some error occured,${err}`);
    })
}