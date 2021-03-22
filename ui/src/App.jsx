/* globals React ReactDOM */
/* eslint "no-alert": "off" */
/* eslint implicit-arrow-linebreak: ["error", "beside"] */
/* eslint "no-unused-vars": "off" */
/* eslint "react/jsx-no-target-blank": "off" */
/* eslint "react/destructuring-assignment": "off" */
/* eslint "react/jsx-indent": "off" */
/* eslint "prefer-template": "off" */

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { myProducts: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList {
        product_category product_name product_price product_image
      }
    }`;

    fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    }).then((response) => {
      response.json().then((result) => {
        this.setState({ myProducts: result.data.productList });
      });
    }).catch((err) => {
      alert('Error in sending data to server: ' + err.message);
    });
  }

  createProduct(myProduct) {
    const query = `mutation productAdd($myProduct: InventoryInputs!) {
    productAdd(product: $myProduct) {
      id
    }
  }`;
    fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { myProduct } }),
    }).then((response) => {
      this.loadData();
    }).catch((err) => {
      alert('Error in sending data to server: ' + err.message);
    });
  }

  render() {
    return (
      <div title="Inner Div">
        <h1 className="headerClass"> My Company Inventory </h1>
        <h2 className="headerClass"> Showing all available products </h2>
        <hr />
        <ProductTable myProducts={this.state.myProducts} />
        <h2>Add a new product to the inventory</h2>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}

function ProductTable({ myProducts }) {
  const productRows = myProducts.map(product => <ProductRow key={product.id} product={product} />);
  return (
    <div>
      <table className="bordered-table">
        <thead>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.product_name}</td>
      <td>
        $
        {product.product_price}
      </td>
      <td>{product.product_category}</td>
      <td><a href={product.product_image} target="_blank">View</a></td>
    </tr>
  );
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAddForm;
    const price = form.price.value;
    const product = {
      product_name: form.product.value,
      product_price: parseFloat(price.substring(1, price.length)),
      product_category: form.productCategory.value,
      product_image: form.image.value,
    };
    this.props.createProduct(product);
    form.product.value = '';
    form.price.value = '$';
    form.image.value = '';
  }

  render() {
    return (
      <div>
        <form name="productAddForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
              <h4 className="addFormTitle">Product Category</h4>
                <select name="productCategory">
                  <option>Jeans</option>
                  <option>Shirts</option>
                  <option>Sweaters</option>
                  <option>Accessories</option>
                  <option>Jackets</option>
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
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));
