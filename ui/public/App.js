"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* globals React ReactDOM */

/* eslint "no-alert": "off" */

/* eslint implicit-arrow-linebreak: ["error", "beside"] */

/* eslint "no-unused-vars": "off" */

/* eslint "react/jsx-no-target-blank": "off" */

/* eslint "react/destructuring-assignment": "off" */

/* eslint "react/jsx-indent": "off" */

/* eslint "prefer-template": "off" */
var ProductList = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductList, _React$Component);

  var _super = _createSuper(ProductList);

  function ProductList() {
    var _this;

    _classCallCheck(this, ProductList);

    _this = _super.call(this);
    _this.state = {
      myProducts: []
    };
    _this.createProduct = _this.createProduct.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ProductList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var query;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      productList {\n        product_category product_name product_price product_image\n      }\n    }";
                fetch(window.ENV.UI_API_ENDPOINT, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                }).then(function (response) {
                  response.json().then(function (result) {
                    _this2.setState({
                      myProducts: result.data.productList
                    });
                  });
                }).catch(function (err) {
                  alert('Error in sending data to server: ' + err.message);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createProduct",
    value: function createProduct(myProduct) {
      var _this3 = this;

      var query = "mutation productAdd($myProduct: InventoryInputs!) {\n    productAdd(product: $myProduct) {\n      id\n    }\n  }";
      fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query,
          variables: {
            myProduct: myProduct
          }
        })
      }).then(function (response) {
        _this3.loadData();
      }).catch(function (err) {
        alert('Error in sending data to server: ' + err.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        title: "Inner Div"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "headerClass"
      }, " My Company Inventory "), /*#__PURE__*/React.createElement("h2", {
        className: "headerClass"
      }, " Showing all available products "), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
        myProducts: this.state.myProducts
      }), /*#__PURE__*/React.createElement("h2", null, "Add a new product to the inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
        createProduct: this.createProduct
      }));
    }
  }]);

  return ProductList;
}(React.Component);

function ProductTable(_ref) {
  var myProducts = _ref.myProducts;
  var productRows = myProducts.map(function (product) {
    return /*#__PURE__*/React.createElement(ProductRow, {
      key: product.id,
      product: product
    });
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image")), /*#__PURE__*/React.createElement("tbody", null, productRows)));
}

function ProductRow(_ref2) {
  var product = _ref2.product;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.product_name), /*#__PURE__*/React.createElement("td", null, "$", product.product_price), /*#__PURE__*/React.createElement("td", null, product.product_category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: product.product_image,
    target: "_blank"
  }, "View")));
}

var ProductAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProductAdd, _React$Component2);

  var _super2 = _createSuper(ProductAdd);

  function ProductAdd() {
    var _this4;

    _classCallCheck(this, ProductAdd);

    _this4 = _super2.call(this);
    _this4.handleSubmit = _this4.handleSubmit.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(ProductAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.productAddForm;
      var price = form.price.value;
      var product = {
        product_name: form.product.value,
        product_price: parseFloat(price.substring(1, price.length)),
        product_category: form.productCategory.value,
        product_image: form.image.value
      };
      this.props.createProduct(product);
      form.product.value = '';
      form.price.value = '$';
      form.image.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "productAddForm",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "addFormTitle"
      }, "Product Category"), /*#__PURE__*/React.createElement("select", {
        name: "productCategory"
      }, /*#__PURE__*/React.createElement("option", null, "Jeans"), /*#__PURE__*/React.createElement("option", null, "Shirts"), /*#__PURE__*/React.createElement("option", null, "Sweaters"), /*#__PURE__*/React.createElement("option", null, "Accessories"), /*#__PURE__*/React.createElement("option", null, "Jackets")), /*#__PURE__*/React.createElement("h4", {
        className: "addFormTitle"
      }, "Product Name"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "product",
        placeholder: "Product Name"
      })), /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "addFormTitle"
      }, "Product Price"), /*#__PURE__*/React.createElement("input", {
        defaultValue: "$",
        type: "text",
        name: "price"
      }), /*#__PURE__*/React.createElement("h4", {
        className: "addFormTitle"
      }, "Image URL"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "image",
        placeholder: "Product Image"
      }))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Add Product")));
    }
  }]);

  return ProductAdd;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));