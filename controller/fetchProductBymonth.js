import Product from '../models/productModel.js';

// Fetch products based on the selected month
export const getProductsByMonth = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate the month parameter
        if (!month || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) {
            return res.status(400).json({ error: 'Invalid month parameter. It should be a number between 1 and 12.' });
        }

        const monthIndex = Number(month);

        // Fetch products where dateOfSale matches the selected month
        const products = await Product.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] }
        });

        // Return the products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products for the selected month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
