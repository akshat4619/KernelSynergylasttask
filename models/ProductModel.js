const db=require('../config/db');

//create product
const createproduct=async (name,description,price) =>{
const result=await db.query('INSERT INTO products(name,description,price) VALUES($1,$2,$3) RETURNING * '
    ,[name,description,price]
);
return result.rows[0];
};

//get all products

const getallproducts=async() =>{
    const result=await db.query('SELECT * FROM products');
};

//get product by id
const getproductbyid=async(id) =>{
    const result=await db.query('SELECT * FROM products WHERE id=$1',[id]);
    return result.rows[0];
};

//update product
const updateproduct=async(id,name,description,price) =>{
    const result=await db.query('UPDATE products SET name=$1,description=$2,price=$3 WHERE id=$4 RETURNING *',
        [name,description,price,id]
    );
    return result.rows[0];
};

//delete product
const deleteproduct=async(id) =>{
    const result=await db.query('DELETE FROM products WHERE id=$1 RETURNING *',[id]);
    return result.rows[0];
};

module.exports={createproduct,getallproducts,getproductbyid,updateproduct,deleteproduct};

