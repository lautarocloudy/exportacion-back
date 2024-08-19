const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const conexion = async()=>{

    try{

        
       await mongoose.connect("mongodb+srv://lautarorcloudy:Wys6BbhgJ5ogX4fv@cluster0.v29ai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    //    mongodb+srv://lautarocloudy:<password>@cluster0.dbqadgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
       console.log("conectado correctamente");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports={
    conexion
}

