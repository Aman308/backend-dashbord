import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productTitle: { type: String , required: true },
  productDescription: { type: String , required: true },
  productPrice: { type: Number , required: true },
  productCategory: { type: String  , required: true},
  dateOfSale: { type: Date , required: true},
  sold : {type : Boolean , required: true},
  image:{type: String}
});

const productModel = mongoose.models.product || mongoose.model('product' , productSchema);

export default productModel;
