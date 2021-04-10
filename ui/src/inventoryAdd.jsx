import React from 'react';

export default class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAddForm
        const price = form.price.value
        const product = { product_name: form.product.value, product_price: parseFloat(price.substring(1, price.length)), product_category: form.productCategory.value, product_image: form.image.value }
        const { createProduct } = this.props;
        createProduct(product);
        form.product.value = "";
        form.price.value = "$";
        form.image.value = "";
    }

    render() {
        return (
            <div>
                <form name="productAddForm" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="column">
                            <h4 className="addFormTitle">Product Category</h4>
                            <select name="productCategory">
                                <option >Shirt</option>
                                <option >Jeans</option>
                                <option >Sweater</option>
                                <option >Jacket</option>
                                <option >Accessories</option>
                            </select>

                            <h4 className="addFormTitle">Product Name</h4>
                            <input type="text" name="product" placeholder="Product Name" />
                        </div>
                        <div className="column">
                            <h4 className="addFormTitle">Product Price</h4>
                            <input defaultValue="$" type="text" name="price" />

                            <h4 className="addFormTitle">Image URL</h4>
                            <input type="text" name="image" placeholder="Product Image" />
                        </div>
                    </div>

                    <br />
                    <button>Add Product</button>
                </form>
            </div>
        );
    };
  }
