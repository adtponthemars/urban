import Category from "../model/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required."
      });
    }

    const newCategory = await Category.create({
      name,
      description
    });

    return res.status(201).json({
      success: true,
      message: "New category successfully created.",
      data: newCategory
    });

  } catch (error) {
    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists."
      });
    }

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create new category",
      error: error.message
    });
  }
};

export const getCategories = async (req, res)=>{
    try {
      const categories = await Category.find();
      
      res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching categories",
        error: error.message,
      })
      
    }
}