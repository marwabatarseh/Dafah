import React, { Component } from 'react';
export default class Search extends Component {
    constructor(props) {
      super(props);
      this.state ={
         category:""
      };

    }




    onChangecategoryHandler(e) {
        this.setState(
          {
            category : e.target.value,
          }
        );
      }






    render() {
        return (
            <div>
    <select name="category" id="category"
     native
    value={this.state.value}
    onChange={this.onChangecategoryHandler.bind(this)}>
    <option value="">Please choose by Category</option>
    <option value="women">Women</option>
    <option value="men">Men</option>
    <option value="kids">Kids</option>
  </select>
            </div>
        )
    }
        

}  