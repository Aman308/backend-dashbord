import productModel from "../models/productModel.js";

// Controller function to list transaction with search and pagination
 
export const listTransaction = async (req,res)=>{
    try {

        // Extract search and pagination parameters

        const {search = '' , page = 1 , perPage = 10 } = req.query
        
        // Create a filter object for search

        let searchFilter = {};

        if (search) {
            searchFilter = {
              $or: [
                { productTitle: { $regex: search, $options: 'i' } }, // Case-insensitive search
                { productDescription: { $regex: search, $options: 'i' } },
                { productPrice: parseFloat(search) || 0 } // Search price if a number is provided
              ]
            };
          }
           // Pagination settings
           const pageNumber = parseInt(page) || 1;
    const perPageNumber = parseInt(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;


    // Fetch the matching transactions from MongoDB with pagination
    const transactions = await productModel.find(searchFilter)
      .skip(skip)
      .limit(perPageNumber);

      // Get total count of records matching the search
    const totalRecords = await productModel.countDocuments(searchFilter);

    // Send response with data and pagination info
    res.json({
        transactions,
        pagination: {
          totalRecords,
          currentPage: pageNumber,
          perPage: perPageNumber,
          totalPages: Math.ceil(totalRecords / perPageNumber)
        }
      });

    } catch (error) {
        res.status(500).json({ error: 'Error retrieving transactions' });
    }
}