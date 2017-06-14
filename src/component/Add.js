import React, { Component } from 'react';

import store from '../redux/store'
import {connect} from 'react-redux'

import axios from 'axios'
class Add extends Component{
  handleSubmit(e){
    e.preventDefault()
    axios.post('http://petapi.haoduoshipin.com/shop/new',{name:this.input.value}).then(res=>alert(res.data.msg))
    e.target.reset()
  }
  render(){
    console.log(this.props);
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input placeholder='输入店名'　ref={input => this.input=input}/>
        <input type="submit" />
      </form>
    )
  }
}
const mapStateToProps =(state)=>({
  shops:state
})

export default Add
