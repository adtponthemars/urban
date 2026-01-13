import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category/");
        setCategories(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      category,
      stock,
      description,
    };

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product created:", res.data);

      // Reset form
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setDescription("");

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };


  return (
    <div className="p-2 bg-amber-100">
      <form onSubmit={handleSubmit} className="p-10 text-xl bg-white w-2xl m-auto">
        {/* Product Name */}
        <div className="mb-2">
          <label className="">Product Name: </label>
          <input
          className="bg-gray-200 my-1 p-2 w-full"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Price */}
        <div className="mb-2">
          <label>Price: </label>
          <input
          className="bg-gray-200 my-1  p-2 w-full"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* Category */}
        <div className="mb-2">
          <label>Category: </label>
          
          <select
          className="bg-gray-200 my-1 p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select></div>
        {/* Stock */}
        <div className="mb-2">
          <label>Stock: </label>
          <input
          className="bg-gray-200 my-1 p-2 w-full"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          /></div>

        {/* Description */}
        <div className="mb-2">
          <label>Description:</label><br />
          <textarea
          className="bg-gray-200 my-1 p-2 w-full"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /></div>

        <button type="submit" className="bg-[#FF5555] p-2 rounded text-white">Create Product</button>
      </form>

      {/* Display Categories */}
      <div className="mb-2">
        {categories.map((cat) => (
          <div className="mt-2" key={cat._id}>
            <h2>{cat.name}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
