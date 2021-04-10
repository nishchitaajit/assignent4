import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({ myProducts, deleteProduct, index }) => (
  <tr>
    <td>{myProducts.product_name}</td>
    <td>${myProducts.product_price}</td>
    <td>{myProducts.product_category}</td>
    <td><Link to={`/img/${myProducts.id}`}>View</Link></td>
    <td><Link to={`/edit/${myProducts.id}`}>Edit</Link></td>
    <td><button type="button" onClick={() => {console.log(index);
      deleteProduct(index); }}>Delete</button></td>
  </tr>
));

export default function ProductTable({myProducts, deleteProduct}) {
    const productRows = myProducts.map((myProducts) =>
        <ProductRow key={myProducts.id} myProducts={myProducts}
         deleteProduct={deleteProduct} index={myProducts.id} />
    );

    return (
        <div >
            <table className="bordered-table" >
                <thead>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        </div>
    );
  }
