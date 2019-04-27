//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import './HomeScreen.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const pricinData={
  pricing:{
    subtotal:102.96,
    savings:3.85,
    tac:8.92,
    total:108.03,
    zip:85050
  },
  itemsDetails:{
    item_name:"Essential b OFM-ESS-3085 Racing style Leather Gaming chair, Red",
    quantity:1,
    ImageURL:"https://www.staples-3p.com/s7/is/image/Staples/m005055719_sc7?$splssku$"
  }
}
const disCount=10;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props)
  {
    super(props);
    this.state={
      showItemsDetails:false,
      showPromoCode:false,
      promoCode:"",
      EpromoCode:"",
      discount:0,
      transaction:pricinData
    }
  }
  render() {
    return (
      <div className="container well" style={{padding:40}}>
        <div className="row ">
              <div className="col-md-4">
              <strong> SubTotal</strong>
              </div>
              <div className="col-md-8">
              <strong>{"$"+ this.state.transaction.pricing.subtotal}</strong> 
              </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
            <span className="tooltip">
            <strong > Pickup Savings</strong> 
            <span className="tooltiptext">Picking up your order in store helps cut costs, and we pass the savings on you</span>
            </span>
            </div>
            <div className="col-md-8 text-danger" >
            <strong>  {"-$"+ this.state.transaction.pricing.savings}</strong> 
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
            <strong>  Est. taxes & fees (Based on 94085)</strong> 
            </div>
            <div className="col-md-8">
            <strong> {"$"+ this.state.transaction.pricing.tac}</strong> 
            </div>
          </div>
          {this.state.discount!=0? <div className="row">
          <div className="col-md-4">
          <strong> Promo discount ({disCount+"%"}) </strong> 
          </div>
          <div className="col-md-8">
          <strong> {" $"+this.state.discount}</strong> 
          </div>
          </div>:<div></div>}
          <div className="row ">
            <div className="col-md-4">
            <strong>  Est. total </strong> 
            </div>
            <div className="col-md-8">
             <strong> {" $"+(this.state.transaction.pricing.total-this.state.discount)}</strong> 
            </div>
          </div>
          <hr />
          {this.state.showItemsDetails==false?
            <div className="row">
                <div className="col-md-12">
                <a  className="btn btn-default" title="Show Item Details +" onClick={(e)=>this.showSection("showItemsDetails",true)} >Show Item Details +</a>
              </div>
          </div>
          :    <div className="row">
          <div className="col-md-12">
            <a  className="btn btn-default" title="Hide Item Details -" onClick={(e)=>this.showSection("showItemsDetails",false)} >Hide Item Details -</a>
            <div className="row ">
            <div className="col-md-2">
            <img  src ={this.state.transaction.itemsDetails.ImageURL} className={"img-md"}></img>
                {/*<img src={image} className="img-md"></img>*/}
            </div>
            <div className="col-md-10">
                        <div className="row">
            <div className="col-md-12">
              { this.state.transaction.itemsDetails.item_name}
            </div>
            <div className="col-md-8">
            <strong> {"$"+ (this.state.transaction.pricing.subtotal-this.state.discount)}</strong> 
            </div>
            <div className="col-md-4 pull-right">
              {"Qty:"+ this.state.transaction.itemsDetails.quantity}
            </div>
            <div className="col-md-8" style={{textDecorationLine:'line-through'}}>
            <strong className="color-grey">  { "$"+this.state.transaction.pricing.total}</strong>
            </div>
            </div>
            </div>
            </div>
            </div>
          </div>}
     <hr />
          {this.state.showPromoCode==false?
          <div>
            <a  className="btn btn-default" title="Apply promo code +" onClick={(e)=>this.showSection("showPromoCode",true)} >Apply promo code +</a>
          </div>
          : <div className="col-md-12">
          <a className="btn btn-default" title="Hide promo code -" onClick={(e)=>this.showSection("showPromoCode",false)} >Hide promo code -</a>
            <div className="input-group">
              <input text="text" className="form-control"  onChange={(text) =>{this.handler(text.target.value)}} value={this.state.promoCode}></input>

              <a  title="Apply" className="btn-round" onClick={()=>{this.Apply()}} >Apply</a>
          </div><div className="col-md-12 text-danger"> {this.state.EpromoCode} </div> </div>}
          <hr />
      </div>
    );
  }
  handler(e)
  {
    this.setState({promoCode:e}, () => {this.validate();});
  }
  validate()
  {
    if(this.state.promoCode=="")
    {
      this.setState({EpromoCode:"Please enter promo Code"});
      return false;
    }
    else
    {
      this.setState({EpromoCode:""});
      return true;
    }
  }
  Apply()
  {
    if(this.validate())
    {
      if(this.state.promoCode!="DISCOUNT")
      {
        this.setState({EpromoCode:"Please enter valid promo Code"});
      }
      else
      {
        var discountAmount=Math.round((this.state.transaction.pricing.total*disCount)/100);
        this.setState({EpromoCode:"",discount:discountAmount});
      }
    }
  }
 showSection(section,bool)
  {
    this.setState({
      [section]:bool
    });
  }
  
}
