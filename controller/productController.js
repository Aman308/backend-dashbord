import axios from "axios";
import Product from '../models/productModel.js'
import moment from 'moment';


export const fetchAndSaveProducts = async (req, res) => {
  try {

    // Fetching data from api
    const response = await axios.get(process.env.PRODUCT_URL);
    const products = response.data;
   for(const productData of products) {
    const product = new Product({
      productTitle: productData.title,
      productDescription: productData.description.slice(0,120) + '...',
      productPrice: productData.price,
      productCategory: productData.category,
      dateOfSale: moment(productData.dateOfSale).format('YYYY-MM-DD'),
      sold : productData.sold,
      image: productData.image
    })
    await product.save()
   }
   

  
   

    res.json({
      message: 'Data fetched and saved to mongoDB',
      savedProducts: products.length
    })

  } catch (error) {
    res.status(500).json({ error: 'Error fetching or saving data', details: error.message });
  }
}