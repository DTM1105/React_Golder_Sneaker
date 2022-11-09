import "./App.css";
import React, { Component } from "react";
import logonike from "./img/logo_nike.png";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      sl: 1,
      total: 0,
      t: 1,
    };
  }
  componentDidMount() {
    this.setState({
      list: this.props.list,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { total } = this.state;
    if (prevProps.list !== this.props.list) {
      let dsach = this.props.list;
      dsach.map((item, index) => {
        if (item.isSelected === true) {
          if (item.isCash === true) {
            total = total + item.price;
            this.setState({
              total: this.roundToTwo(total),
            });
            item.isCash = false;
          }
        }
      });
      this.setState({
        list: this.props.list,
      });
    }
  }
  handleRemovetocart = (product) => {
    let { list, total } = this.state;
    if (list && list.length > 0) {
      list = list.map((item) => {
        if (item.id === product.id) {
          item.isSelected = !item.isSelected;
          item.isCash = true;
          total = total - product.quantity * product.price;
          total = this.roundToTwo(total);
          this.setState({
            total: total,
          });
        }
        return item;
      });
      this.setState({
        list: list,
      });
    }
    this.props.parentCallback(list);
  };
  roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  handleIncrement = (product) => {
    if (product.quantity < 100000) {
      product.quantity = product.quantity + 1;
      let { total } = this.state;
      total = total + product.price;
      total = this.roundToTwo(total);
      console.log(total);
      this.setState({
        sl: product.quantity,
        total: total,
      });
    }
    console.log(this.state.list);
  };
  handleDecrement = (product) => {
    let { list } = this.state;
    let { total } = this.state;
    console.log("chua tru", total);
    if (list && list.length > 0) {
      list = list.map((item) => {
        if (item.id === product.id) {
          product.quantity = product.quantity - 1;
          total = total - product.price;
          total = this.roundToTwo(total);
          this.setState({
            sl: product.quantity,
            total: total,
          });
          if (product.quantity < 1) {
            product.isSelected = !product.isSelected;
            product.isCash = true;

            this.props.parentCallback(list);
            console.log(list);
          }
          // this.setState({
          //     list:list
          // })
        }
      });
    }
  };
  render() {
    let { list, total, t } = this.state;
    return (
      <div className="App">
        <div className="card">
          <div className="card-top">
            <img src={logonike} className="card-top-logo"></img>
          </div>
          <div class="card-title">
            Your cart<span class="card-title-amount">${total}</span>
          </div>
          <div class="card-body">
            <div class="cart-items">
              <div>
                {list &&
                  list.map((item, index) => {
                    if (item.isSelected === true) {
                      return (
                        <div class="cart-item">
                          <div class="cart-item-left">
                            <div
                              class="cart-item-image"
                              style={{ backgroundColor: "rgb(225,231,237)" }}
                            >
                              <div class="cart-item-image-block">
                                <img src={item.img} />
                              </div>
                            </div>
                          </div>
                          <div class="cart-item-right">
                            <div class="cart-item-name">{item.name}</div>
                            <div class="cart-item-price">${item.price}</div>
                            <div class="cart-item-actions">
                              <div class="cart-item-count">
                                <div
                                  class="cart-item-count-button"
                                  onClick={() => this.handleDecrement(item)}
                                >
                                  -
                                </div>
                                <div class="cart-item-count-number">
                                  {item.quantity}
                                </div>
                                <div
                                  class="cart-item-count-button"
                                  onClick={() => this.handleIncrement(item)}
                                >
                                  +
                                </div>
                              </div>
                              <div
                                class="cart-item-remove"
                                onClick={() => this.handleRemovetocart(item)}
                              >
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC"
                                  class="cart-item-remove-icon"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;
