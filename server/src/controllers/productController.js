import { response } from "express";
import Product from "../model/productModel.js"; // adjust path if needed

//Get All Products Controller
export const getAllProducts = async (req, res)=>{
  try {
    const products = await Product.find();
    
    res.status(200).json({
      success: true,
      data:products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success:false,
      error: error.message,
    })
  }
}

// -------------------------------------------------------------
//Create product controller
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      category,
      stock,
      isActive,
    } = req.body;

    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price, and category are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      images,
      category,
      stock,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// -----------------------------------------------------------
//Product update controller 
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    };

    //Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new:true, //RETURN UPDATED DOCUMENT
        runValidators:true, //ENFORCES SCHEMA VALIDATION  
      }
    )
    
    return res.status(200).json({
      success:true,
      message:"Product updated successfullly",
      data:updateProduct,
    })
  } catch (error) {
    console.error("Product update error: ", error);
    
    return res.status(500).json({
      success:false,
      message:"Error! Failed to update product.",
      error: error.message,
    })
  }
}

// --------------------------------------------------
//Delete Product Controller
export const deleteProduct = async (req, res)=>{
  try {
     const {id}  = req.params;

     //Check if product exists
     const product = await Product.findById(id);
     if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      });
     }

     await Product.findByIdAndDelete(id);

     return res.status(200).json({
      success:true,
      message:"Product deleted successfully",
     })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      message: "Failed to delete product",
      error: error.message,
    })
  }
}
