import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {categories} from "../../categories";
import M from "materialize-css";

class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      created_date: Date.now,
      status: 'New',
      category: 'API DevOps',
      file: null,
      url: ''
    };  
    this.onFileChange = this.onFileChange.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onFileChange(e) {
    if (e.target.files[0]) {
    this.setState({file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])});
  } else {
    this.setState({file: null, url: ''})
  }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

    const { title, description, created_date,  status,category } = this.state;
    const email = this.props.auth.user.email

    axios.post('/api/tickets/', { title,  description, created_date,  status,category})
      .then((result) => {
        if (this.state.file) {
        axios.post(`/api/tickets/uploadphoto/${result.data._id}`,formData,config);
        }
        const id = result.data._id;
        axios.post('/api/emails/createticketemail', { title, description,email,id}).then((result) => {
          console.log(result);
        })  
        this.props.history.push("/user/dashboard")
      });


  }

  render() {
    
    const categoryOptions = categories.map((category) =>
    <option  value = {category} >{category}</option>
);
    const { title,  description, created_date, status,category } = this.state;
    return (
      <div class = "section">
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD TICKET
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/user/dashboard/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Ticket List</Link></h4>
           <div class = "row">
            <form class = 'col s12'onSubmit={this.onSubmit} enctype="multipart/form-data" >
              <div class="input-field col s12">
                <select onChange = {this.onChange} class = "form-control" name = "category" value = {category} >
                  {categoryOptions}         
                </select>
                <label for="status">Category</label>
              </div>     
              <div class="row">
              <div class="input-field col s12">
                <input type="text" class="validate" name="title" value={title} onChange={this.onChange}  />
                <label for="title">Title</label>
              </div>
              </div>
              <div class="row">
              <div class="input-field col s12">
                <textArea class="materialize-textarea" name="description" onChange={this.onChange} cols="80" rows="3">{description}</textArea>
                <label for="description">Description</label>
                </div>
              </div>
              <div class = "row"> 
              <div class = "input-field col s12">
              <div class="file-field input-field">
              <div class="btn">
              <span>File</span>
              <input type="file" name = "myImage" onChange = {this.onFileChange}/>
              </div>
              <div class="file-path-wrapper">
               <input class="file-path validate" type="text" />
               </div>
               </div>
               <img class="responsive-img" alt = "preview of file uploaded" src={this.state.url}/>
              
              </div>
              </div>  
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Create);