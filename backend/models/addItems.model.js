const mongoose = require('mongoose');

//Create New Schema
const Schema = mongoose.Schema;

const addItemsSchema = new Schema ({
  //userId: {type:String, required:true},
  itemName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  phoneNumber: { type: Number, required: true, trim: true },
  image : {type:String,required: true, trim: true}
}, {
  timestamps: true,
});

const AddItems = mongoose.model("AddItems", addItemsSchema);


module.exports = AddItems;