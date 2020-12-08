import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom" ;
import axios from "axios";
import Footer from './Footer';
import Search from './Search'
//
const ClothesItem = props => (
    <tr>

        <td>{props.item.itemName}</td>
        <td>{props.item.category}</td>
        <td>{props.item.type}</td>
        <td>{props.item.description}</td>
        <td>{props.item.phoneNumber}</td>
        
        <td>
        <img src= {props.item.image} width="200" height="200" class="w3-round" alt="Norway"/>
        </td>
        <td>
        <Link to ={"/edit/"+props.item._id} className="btn btn-deep-orange darken-4" >Edit</Link>
        <button type = "button" 
        className="btn btn-deep-orange darken-4"
        onClick = {() => {props.deleteItem(props.item._id)}}>
        Delete
        </button>
        </td>
    </tr>
)

class ItemsList extends Component {

    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            items: [],
            filteredItems :[],
            // SearchString:''
            category:""
        }
    }

   
    componentDidMount() {
         axios.get("http://localhost:3000/addItems/")   
            .then( res => {
                this.setState({items: res.data})
                console.log(this.state.items,"hayniiii")
            })
            .catch((error) => {
            // console.log(error);
            })
    }

    deleteItem(id) {
        axios.delete("http://localhost:3000/addItems/" + id)
            .then(res => console.log(res.data));
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

   

    itemsList() {
        let listedItems = (this.state.filteredItems.length > 0)? this.state.filteredItems : this.state.items; 

        return listedItems.map(currentItem => {
            return <ClothesItem item = { currentItem } deleteItem = { this.deleteItem } key = { currentItem._id }/>; 
        })
    } 

    onSubmit(category){
        console.log(category,"cccccccccccccccccccccccccccc")
        axios.post("http://localhost:3000/addItems/select")
        .then(res =>{
         console.log (res, "Items selected")
        })
        .catch(err =>alert("no items found"));         
    }
    
    onChangecategoryHandler(event) {
        this.setState(
          {
            category: event.target.value,
          },
          ()=>{
              this.onSubmit(this.state.category)
          }
        );
        console.log(this.state.category)

      }

    // onSearch = e => {
    //     let { items } = this.state
    //     let string = e.target.value
    //     if(string.length > 0){
    //        let filteredItems = items.filter(item => item.category.includes(string))
    //        this.setState({category:string,filteredItems:filteredItems})
    //     }
    //     else this.setState({category:string,filteredItems:[]})
    // }

// onFilter(e){
//     var category = e.target.value
//     if(category.length > 0){
//          let filteredItems = items.filter(item => item.itemName.includes(category))
//          this.setState({category:category,filteredItems:filteredItems})
//      }
//     else this.setState({category:category,filteredItems:[]})

// }

    render() {

        return (
            <div>
                 
            <br />
            <div className = "container text-center border border-light p-9">
                <h2>Clothing</h2>
                <Search/>
                <input name="Category" className="form-control" onChange={e => this.onSearch(e)} value={this.state.SearchString}  placeholder="Search for item Name"/>
                <table className = "table">
                <thead className = "thead">
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Donor Phone Number</th>
                        <th>Image</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.itemsList()}
                </tbody>
                </table>
            </div>
          
            <Footer />
            </div>
        )
    }
}

export default withRouter(ItemsList)