import Product from '../models/productModel.js'; // Adjust the path to your Product model

// Function to get product data for a selected month and create bar chart data
export const getProductBarChart = async (req, res) => {
    const month = parseInt(req.query.month);

    if (!month) {
        return res.status(400).json({ message: "Month is required." });
    }

    try {
        // Ensure the query will match any year for the selected month
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month] // Match month, regardless of the year
            }
        });

        console.log("Fetched Products:", products); // Log fetched products

        // Check if products were fetched
        if (products.length === 0) {
            console.log("No products found for this month.");
            return res.json({
                '0-100': 0,
                '101-200': 0,
                '201-300': 0,
                '301-400': 0,
                '401-500': 0,
                '501-600': 0,
                '601-700': 0,
                '701-800': 0,
                '801-900': 0,
                '901-above': 0
            });
        }

        // Define price ranges
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        // Count items in each price range using productPrice
        products.forEach(product => {
            const price = product.productPrice; // Accessing productPrice

            // Log the product price
            console.log("Processing Product:", product);
            console.log("Product Price:", price); // Log the product price for debugging

            // Check if price is a valid number
            if (typeof price !== 'number') {
                console.error("Invalid price data:", price);
                return; // Skip invalid data
            }

            // Categorize price into ranges
            if (price >= 0 && price <= 100) priceRanges['0-100']++;
            else if (price >= 101 && price <= 200) priceRanges['101-200']++;
            else if (price >= 201 && price <= 300) priceRanges['201-300']++;
            else if (price >= 301 && price <= 400) priceRanges['301-400']++;
            else if (price >= 401 && price <= 500) priceRanges['401-500']++;
            else if (price >= 501 && price <= 600) priceRanges['501-600']++;
            else if (price >= 601 && price <= 700) priceRanges['601-700']++;
            else if (price >= 701 && price <= 800) priceRanges['701-800']++;
            else if (price >= 801 && price <= 900) priceRanges['801-900']++;
            else if (price >= 901) priceRanges['901-above']++;
        });

        console.log("Price Ranges:", priceRanges); // Log the price ranges before sending response

        res.json(priceRanges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product bar chart data." });
    }
};
