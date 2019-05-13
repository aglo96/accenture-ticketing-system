import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import {categories} from "../../categories";
import M from "materialize-css"



class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      file: null,
      url: ""
    };
    this.image = this.image.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.imageNew = this.imageNew.bind(this);
  }

  onFileChange(e) {
    if (e.target.files[0]) {
    this.setState({file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])});
  } else {
    this.setState({file: null, url: ''})
  }
  }

  image() {
    if (this.state.book.image) { 
  
      return <img   class="responsive-img"  src = {`data:${this.state.book.imageContentType};base64, ${this.state.book.image}`}/>
    } else {
      return null;
    }
  }
  imageNew() {
    if (this.state.file) {
      return(
        <div>
      <h6>New Image:</h6>
      <img class="responsive-img" alt = "preview of file uploaded" src={this.state.url}/>
      </div>)
    } else {
      return null
    }
  }


  componentDidMount() {
    M.AutoInit();
    axios.get('/api/tickets/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
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

    const { title,  description,  category, status } = this.state.book;
    const admin = this.props.auth.admin.id;

    axios.put('/api/tickets/'+this.props.match.params.id, { title, description,  category, status,admin })
      .then((result) => {
        if (this.state.file) {
          axios.post(`/api/tickets/uploadphoto/${result.data._id}`,formData,config);
          }
        this.props.history.push({pathname: "/user/newTickets/show/" + this.props.match.params.id})
      });
  }

  render() {
    const categoryOptions = categories.map((category) =>
    <option  value = {category} >{category}</option>
);
    return (
      <div class = "section">
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT TICKET 
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/admin/dashboard/show/${this.state.book._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Ticket List</Link></h4>
            <dl>
              <dt>User:</dt>
              <dd>{this.state.book.author}</dd>
            </dl>
            <form  class = 'col s12' onSubmit={this.onSubmit}>
            <div class = "row">
              <div class="input-field col s12">
                <select onChange = {this.onChange} class = "form-control" name = "category" value = {this.state.book.category} >
                  {categoryOptions}         
                </select>
                <label for="status">Category</label>
              </div> 
              </div>
              <div class = "row">
              <div class="input-field col s12">
                <input type="text" class="form-control" name="title" value={this.state.book.title} onChange={this.onChange} placeholder="Title" />
                <label for="title">Title:</label>

              </div>
              </div>

              <div class = "row">
              <div class="input-field col s12">
                <input type="text" class="form-control" name="description" value={this.state.book.description} onChange={this.onChange} placeholder="Description" />
                <label for="description">Description:</label>

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
               <h6>Original Image:</h6>
               {this.image()}
               {this.imageNew()}

              </div>
              </div>             
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
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
  )(Edit);
