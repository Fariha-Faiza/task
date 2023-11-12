const mongoose = require("mongoose");

const InformationSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true,
    },
   
    email:{
      type: String,
      required: true,
      unique: true,
    }
    ,
    profession:{
      type: String,
      required: true,
      unique: false,
    },
    interest: { 
       type: Array,
       required: true,
       },
    bio:{
      type: String,
      required: true,
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Information", InformationSchema);