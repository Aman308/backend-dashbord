// routes/products.js
import express from 'express';
import { fetchAndSaveProducts } from '../controller/productController.js';
import { listTransaction } from '../controller/transactionController.js';
import { getStatistics } from '../controller/statisticsController.js';
import { getProductBarChart } from '../controller/barchartControler.js';
import { getPieChart } from '../controller/pieController.js';
import { getProductsByMonth } from '../controller/fetchProductBymonth.js';

const router = express.Router();

// Route to fetch external data and save it to MongoDB
router.get('/fetch-save', fetchAndSaveProducts);
router.get('/transaction' , listTransaction);
router.get('/statistics/monthly', getStatistics);
router.get('/price-range', getProductBarChart);
router.get('/pic-chart', getPieChart);
router.get('/month' ,getProductsByMonth)

export default router;
