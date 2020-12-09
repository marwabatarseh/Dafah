import React, { Component } from 'react';
import axios from "axios";
import {withRouter } from "react-router-dom" ;
import Footer from './Footer';
import { storage } from "../firebase.js"


 class AddItems extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimg = this.onChangeimg.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.handleUpload = this.handleUpload.bind(this)


    this.state = {
      itemName: "",
      category : "Women",
      description: "",
      phoneNumber: "",
      image : null,
      url: "",
      type:"Jacket"
    }
  }

  //List of category
  //Event Handlers:
  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value
    });
  }

  onChangeCategory(e) {
    const { value } = e.target
    this.setState({
      category : value
    });
  }
  onChangetype(e){
    const { value } = e.target
    this.setState({
     type: value
    });
    
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });

  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber : e.target.value
    });
  }



  onChangeimg(e) {
    if(e.target.files[0]){
      this.setState({
          image : e.target.files[0]
         
        });
    }else console.log("error in onchangeimg")

  
  }

  handleUpload() {
    // e.preventDefault();
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error, "error");
      },
      () => {
        storage
        .ref("images")
        .child(this.state.image.name)
        .getDownloadURL()
        .then(url => {
          this.setState({
            url: url
            
          })

        });

      }
    )

  }



  onSubmit(e) {
    e.preventDefault();
    const item = {
      itemName: this.state.itemName,
      category: this.state.category,
      description: this.state.description,
      phoneNumber: this.state.phoneNumber,
      type:this.state.type,
      image:this.state.url
    }

    console.log(item);

    axios.post("http://localhost:3000/addItems/add", item)
      .then(res => console.log(res.data, "nooooooo"));

    window.location = '/ItemsList'
  }


  render() {
    console.log("image", this.state.image)
    return (
      <div>
        <br />
        <div className = "container">
       
          <form className="text-center border border-light p-9" action="#!" onSubmit = {this.onSubmit}>

            <h3> "Only by giving are you able to receive more than you already have." -Jim Rohn </h3>

            <p className="h4 mb-4">Donate Your Item</p>

                <div className="col">
                <label>Item Name</label>
                <input 
                required="true"
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.itemName} 
                  onChange = {this.onChangeItemName}
                  text-align = "center"
                  placeholder = "Insert Item Name"/>
                </div>

                <br />

                <div className="col">
                  <label>Select Category  </label>
                  <select
                    ref = "userInput"
                    required="true"
                    className = "form-control"
                    value = {this.state.category}
                    onChange = {this.onChangeCategory}
                    >
                    <option value = "Women">Women</option>
                    <option value = "Men">Men</option>
                    <option value = "Kids">Kids</option>
                  </select>
                </div>

                <br />

                <div className = "col">
                  <label>Select Type  </label>
                  <select
                    ref = "userInput"
                    required="true"
                    className = "form-control"
                    value = {this.state.type}
                    onChange = {this.onChangetype}
                    >
                    <option value = "Shoes">Shoes</option>
                    <option value = "Dress">Dress</option>
                    <option value = "Jacket">Jacket</option>
                    <option value = "Blouse">Blouse</option>
                    <option value = "Gloves">Gloves</option>
                    <option value = "Hat">Hat</option>
                    <option value = "Scarf">Scarf</option>

                  </select>
                </div> 

                <br />

                <div className = "col">
                  <label>Description  </label>
                  <input 
                    type = "text" 
                    required="true"
                    className = "form-control" 
                    value = {this.state.description} 
                    onChange = {this.onChangeDescription}
                    placeholder = "Please insert a description of your item and add its current condition"/>
                </div>

                <br />

                <div className = "col">
                  <label> Donor Phone Number  </label>
                  <input 
                    type = "text" 
                    required="true"
                    className = "form-control" 
                    value = {this.state.phoneNumber} 
                    onChange = {this.onChangePhoneNumber}
                    placeholder = "Please insert your phone number"/>
                </div>

                <br />
                
                <div className = "col">
                    <label>Add Image as URL</label>
                    <input 
                      type = "file" 
                      required="true"
                      className = "form-control" 
                      // value = {this.state.image} 
                      onChange = {this.onChangeimg}/>
                      <button onClick = {this.handleUpload}>Upload</button>
                      <br />
     
                      <img src = {this.state.url || "http://via.placeholder.com/100x150"} alt = "firebase-image" />
                  </div>  

                  <br />

                <div>
                <button type="submit" className="btn btn-deep-orange darken-4" >Submit</button>
                </div>

          </form>
        </div>
        <Footer />
      </div>
        
    )
  }
}

export default withRouter(AddItems)