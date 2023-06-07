const pool = require('../../database');

async function getProducts() {
  try {
    const [rows, fields] = await pool.execute("SELECT * FROM products");
    const response = {
      count: rows.length,
      products: rows.map((row) => {
        return {
          name: row.name,
          price: row.price,
          product_id: row.product_id,
          created: row.created,
          request: {
            type: "GET",
            url: "localhost:3000/products/" + row.product_id,
          },
        };
      }),
    };
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function createProduct(name, price) {
  try {
    const createQuery = `INSERT INTO products (name, price) VALUES (?, ?)`;
    await pool.execute(createQuery, [name, price]);
    console.log("success");
    return "success";
  } catch (error) {
    console.log("something went wrong");
    return error;
  }
}

async function getProductById(id) {
  try {
    const createQuery = `SELECT * FROM products WHERE product_id = ?`;
    const [rows, fields] = await pool.execute(createQuery, [id]);
    if (rows.length > 0) {
      const response = rows.map((row) => {
        return {
          name: row.name,
          price: row.price,
          product_id: row.product_id,
          request: {
            type: "GET",
            description: "Get all products",
            url: "localhost:3000/products",
          },
        };
      });
      return response;
    } else {
      const response = {
        message: "No valid Entry Found ",
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updateProductById(id, name, price) {
  try {
    const updateQuery =
      "UPDATE products SET name = ?, price = ? WHERE product_id = ?";
    await pool.execute(updateQuery, [name, price, id]);

    // VERIFY UPDATE
    const [rows, fields] = await pool.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );
	const updatedProduct = rows[0]
    const response = {
      message: "Updated product successfully",
      updatedProduct: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        id: updatedProduct.product_id,
        request: {
          type: "PATCH",
          url: "localhost:3000/products/" + updatedProduct.product_id,
        },
      },
    };
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteProductById(id) {
  const deleteQuery = "DELETE FROM products WHERE product_id = ?";
  await pool.execute(deleteQuery, [id]);
  const response = {
    message: "Deleted product successfully",
  };
  console.log(response.message);
  return response;
}


module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProductById,
	deleteProductById
}
