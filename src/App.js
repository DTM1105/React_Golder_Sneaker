import "./App.css";
import React, { Component } from "react";
import logonike from "./img/logo_nike.png";
import DataProduct from './DataProduct.json';
import Cart from "./Cart";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DataProduct,
      listcart:[],
      total: 0,
      listfromChild:[]
    }
  }
  componentDidMount() {
    let data = this.state.data;
    if (data && data.length > 0) {
      data = data.map((item) => ({ ...item, isSelected: false }));
    }
    this.setState({
      listcart: data,
    });
  }
  handleAddtocart = (product) => {
    let {data,total} = this.state;
    if(data && data.length > 0){
      data = data.map(item => {
        if(item.id === product.id)
        {
          item.isSelected = !item.isSelected;
          item.quantity = 1
          total = item.price
        }
            return item;
    })
    this.setState({
      listcart:data,
      total:total
  })
    }
  
  }
  handleCallback = (childData) =>{
    this.setState({listfromChild: childData})
}

  
  render() {
    let listcart = this.state.listcart;
    let {listfromChild}= this.state;
    return (
      <div className="App">
        <div className="card">
          <div className="card-top">
            <img src={logonike} className="card-top-logo"></img>
          </div>
          <div className="card-title">Our Products</div>
          <div className="card-body">
            <div className="shop-items">
              {listcart && listcart.map((item,index)=>(
                              <div className="shop-item">
                              <div
                                className="shop-item-image"
                                style={{ backgroundColor: "rgb(225,231,237)" }}
                              >
                                <img src={item.img.toString()}></img>
                              </div>
                              <div className="shop-item-name">{item.name}</div>
                              <div class="shop-item-description">
                                {item.des}
                              </div>
                              <div class="shop-item-bottom">
                                <div class="shop-item-price">${item.price}</div>
                                {
                                  item.isSelected ?
                                <div class="shop-item-button inactive">
                                  <div class="shop-item-button-cover">
                                    <div class="shop-item-button-cover-check-icon"></div>
                                  </div>
                                </div> : 
                                <div class="shop-item-button" onClick={()=>this.handleAddtocart(item)}><p>ADD TO CART</p></div>
                                 }
                              </div>
                            </div>
              ))}
              <div className="shop-item">
                <div
                  className="shop-item-image"
                  style={{ backgroundColor: "rgb(225,231,237)" }}
                >
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png"></img>
                </div>
                <div className="shop-item-name">Nike Air Zoom Pegasus 36</div>
                <div class="shop-item-description">
                  The iconic Nike Air Zoom Pegasus 36 offers more cooling and
                  mesh that targets breathability across high-heat areas. A
                  slimmer heel collar and tongue reduce bulk, while exposed
                  cables give you a snug fit at higher speeds.
                </div>
                <div class="shop-item-bottom">
                  <div class="shop-item-price">$108.97</div>
                  <div class="shop-item-button inactive">
                    <div class="shop-item-button-cover">
                      <div class="shop-item-button-cover-check-icon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Cart list = {this.state.listcart} total={this.state.total} parentCallback = {this.handleCallback}/>

      </div>
    );
  }
}

export default App;
