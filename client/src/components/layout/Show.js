import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
    this.admin = this.admin.bind(this);
    this.image = this.image.bind(this);
  }

  componentDidMount() {
    axios.get('/api/tickets/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/tickets/'+id)
      .then((result) => {
        this.props.history.push("/user/dashboard")
      });
  }
admin() {
  
  if (this.state.book.admin) {
    return this.state.book.admin
  } else {
    return 'No Admin has taken up your ticket'
  }
}
    // const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

image() {
  if (this.state.book.image) { 

    return <img   class="responsive-img"  src = {`data:${this.state.book.imageContentType};base64, ${this.state.book.image}`}/>
  } else {
    return null;
  }
}

  render() {
    const admin = this.admin();


    return (

      <div class = "section">
      <div class="container">
      <div class="col s12">
      <div class="card grey lighten-4 z-depth-2">
      <div class="card-content black-text">
      <h4><Link to="/user/dashboard/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Ticket List</Link></h4>
       
        <h4 class = "card-title">{this.state.book.title}</h4>
            
        <table class="table table-hover">
          <table class="table table-hover">
              <tr><th> Category </th> <td> {this.state.book.category} </td></tr>
              <tr><th>ID</th><td>{this.state.book._id}</td></tr>
              <tr><th>Admin</th><td>{admin.name}</td></tr>
              <tr>
                  <th>User</th>
                  <td>{this.state.book.author}</td>
              </tr>
              <tr>
                  <th>Description</th>
                  <td>{this.state.book.description}</td>
              </tr>
              <tr>
                  <th>Date</th>
                  <td>{new Date(this.state.book.created_date).toDateString()}</td>
              </tr>
              <tr>
                  <th>Status</th>
                  <td>{this.state.book.status}</td>
              </tr>
              <tr>
                  <th>File:{this.state.book.imageTitle}</th>
                  <td>{this.image()}</td>
              </tr>
          </table>
      </table>
              <div class="card-action">
              <Link to={`/user/newTickets/edit/${this.state.book._id}`} class="btn blue">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.book._id)} class="btn red">Delete</button>
           </div>
      </div>
      </div>
      </div>
      </div>
      </div>
        
    );
  }
}

export default Show;