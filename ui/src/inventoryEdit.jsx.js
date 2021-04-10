import React from 'react';
import { Link } from 'react-router-dom';
import NumInput from './NumInput.jsx';
import graphQLFetch from './graphQLFetch.js';
import TextInput from './TextInput.jsx';

export default class InventoryEdit extends React.Component {
  constructor() {
    super();
    this.state = {
        product : []
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const query = `mutation productUpdate(
      $id: Int!
      $changes: productUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id product_category product_name product_price product_image
      }
    }`;

    const { id, ...changes } = product;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ product: data.productUpdate });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
  }


  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id product_category product_name product_price product_image
      }
    }`;
    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ product: data ? data.product : {}, invalidFields: {} });
  }

  render() {
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const { product: {  product_category, product_name, product_price, product_image } } = this.state;
    return (
        <form onSubmit={this.handleSubmit}>
          <h3>{`Editing product: ${id}`}</h3>
          <table>
            <tbody>
              <tr>
                <td>Category:</td>
                <td>
                  <select name="product_category" value={product_category} onChange={this.onChange}  >
                    <option value="Shirt">Shirt</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jacket</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>
                  <NumInput name="product_price" value={product_price} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  <TextInput name="product_name" value={product_name} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td>Image:</td>
                <td>
                  <TextInput name="product_image" value={product_image} onChange={this.onChange} key={id} />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }
  }
