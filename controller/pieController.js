import Product from '../models/productModel.js';

export const getPieChart = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate the month parameter
        if (!month || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) {
            return res.status(400).json({ error: 'Invalid month parameter. It should be a number between 1 and 12.' });
        }

        const monthIndex = Number(month);

        // Calculate total sale amount for sold and unsold items
        const totalStats = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthIndex],
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSoldAmount: { 
                        $sum: { 
                            $cond: ["$sold", "$productPrice", 0] // Sum prices of sold items
                        } 
                    },
                    totalUnsoldAmount: { 
                        $sum: { 
                            $cond: ["$sold", 0, "$productPrice"] // Sum prices of unsold items
                        } 
                    },
                    totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } }, // Count sold items
                    totalUnsoldItems: { $sum: { $cond: ["$sold", 0, 1] } } // Count unsold items
                }
            }
        ]);

        // Get the results from the aggregation
        const results = totalStats.length > 0 ? totalStats[0] : {};

        // Return the statistics
        res.status(200).json({
            totalSoldAmount: results.totalSoldAmount || 0,
            totalUnsoldAmount: results.totalUnsoldAmount || 0,
            totalSoldItems: results.totalSoldItems || 0,
            totalUnsoldItems: results.totalUnsoldItems || 0,
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
