import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Header from './dumb_components/Header';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Info from './dumb_components/Info'
import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css";  
import { Typography } from '@material-ui/core';
import './css/App.css';



const itemList = [
  {name:'Classic Ad' , id:'classic'},
  {name:'Standout Add' ,id:'standout'},
  {name:'Premium Add' , id:'premium'}
]

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      itemList,
      referal:[],
      classic:0,
      standout:0,
      premium:0,
      totalPrice:0,
      isDisable:false
    }
    this.addOnDismiss = this.addOnClick.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
  }

  componentDidMount(){
    axios.get(`http://localhost:4000/get-user/${this.props.match.params.id}` ,{
      headers : {
        'Content-Type':'application/json; charset=UTF-8'
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({referal:Object.values(res.data)});
    })
    .catch(err => {
      this.setState({ isDisable:true });
      new Noty({  
        type: 'error',
        text: "Customer Not Exist!",
        layout: "center",
        timeout: '500',     
      }).show();
  });
  }
  
  componentDidUpdate(prevProps , prevState){
    if (this.state.classic !== prevState.classic || this.state.standout !== prevState.standout || this.state.premium !== prevState.premium ) {
      this.submitItem();
    } 
  }

  componentWillUnmount() {
    clearInterval(this.state.totalPrice);
  }

  addOnClick(value){
    console.log(value);
    if(value==='classic'){
      this.setState({classic: this.state.classic + 1})
    }
    if(value==='standout'){
      this.setState({standout: this.state.standout + 1})
    }
    if(value==='premium'){
      this.setState({premium: this.state.premium + 1})
    }
  }

  submitItem(){ 
    axios.post(`http://localhost:4000/add-to-cart` , {classic:this.state.classic,standout:this.state.standout,premium:this.state.premium,userId:this.props.match.params.id},{
      headers : {
        'Content-Type':'application/json; charset=UTF-8'
      }
    })
    .then(res => {
      const totalPrice = res.data;
      console.log(res.data);
      this.setState({ totalPrice });
    })
  }

  renderDiscount(ads){
    if(ads.item.status===true){
      if (ads.item.discount==='free-deal')
      {
        return(
          `Value Buy , Buy More Than ${ads.item.minValue} Of Classic Ads You Get 1 Free Ads .`
        )
      }
    else if(ads.item.discount==='discount-price')
      {
        return(
          `Entitled for $${ads.item.specificPrice} For Each Standout Ads .`
        )
      } 
      else if(ads.item.discount==='buy-more-discount')
      {
        return(
          `Entitled for ${ads.item.discount} When Buy More Than ${ads.item.minValue} For Premium Ads .`
        )
      } 
    }
  }
  
  render(){
    return(
      <div className="AppMain">
      <Header name={`Customer - ${this.props.match.params.id}`}/>
      <Container fixed className="AppPositon">
      <Grid container spacing={3}>
        <Grid item sm={8}>
        {this.state.referal.map((item,key) =>
          <Paper style={{padding: "10px", display: "flex", margin: "10px 0"}} key={item.id}>
            <Typography component={'span'} variant={'body2'}>
              <Typography>
                {item.id} - ${item.price}
              </Typography>
              <Typography className="AppLink">
                {this.renderDiscount({item})}
              </Typography>
            </Typography>
            <Button onClick={()=>this.addOnClick(item.id)} variant="contained" style={{marginLeft: "auto"}} disabled={this.state.isDisable}>Add To Cart</Button>
          </Paper>
        )}
        </Grid>
        <Grid item sm={3}>
          <Info  list={[{name:'Classic Add',total:this.state.classic},{name:'Standout Ads',total:this.state.standout},{name:'Premium Ads',total:this.state.premium}]}  title="Total Item"  value={this.state.classic+this.state.standout+this.state.premium}/>
          <Info title="Total Price"  value={this.state.totalPrice} />
        </Grid>
      </Grid>
      </Container>   
      </div>   
    )
  }
}

export default App;
