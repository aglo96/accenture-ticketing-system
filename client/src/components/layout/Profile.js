import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/api/users/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  render() {


    return (
        <div class = "section">
        <div class = "container">
        <div class="row">
        <div class="col s6 offset-s3">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{this.state.book.name}</span>
              <div class = "row">
              <h6>Email:</h6>
              <p>{this.state.book.email}</p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
        
    );
  }
}

export default Profile;