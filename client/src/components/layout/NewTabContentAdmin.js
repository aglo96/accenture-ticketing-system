import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import { logoutAdmin } from "../../actions/authActions";
import { BrowserRouter as  Route } from 'react-router-dom';
import Edit from './Edit';
import Create from './Create';
import Show from './Show';
import M from 'materialize-css';

class NewTabContentAdmin extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        books: [],
        filter: "New",      //filter for state
        userfilter: '',     //what is inputed by the user into the search
        searchFilter: 'User', //which option the search searches for
      };
      this.OnClickStatus = this.OnClickStatus.bind(this);
      this.Class = this.Class.bind(this);
      this.owner = this.owner.bind(this);
      this.category = this.category.bind(this);
      this.author = this.author.bind(this);

    }
    componentDidMount() {
      M.AutoInit();
      axios.get('/api/tickets/admin/newTickets')
        .then(res => {
          this.setState({ books: res.data });
          console.log(this.state.books);
        });
    }

    onChangeSearchFilter = (e) => {
      this.setState({searchFilter: e.target.value})
    }
    onChange = (e) => {
      this.setState({userfilter:e.target.value});
    }

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutAdmin();
    };
    OnClickStatus(e) {
        this.setState({filter: e.target.name});

    }

    Class(name) {
      if (name === this.state.filter) {
        return '"waves-effect waves-light light-blue darken-3 btn col s3'
      } else {
        return '"waves-effect waves-light grey btn col s3'
      }
    }
    category(book) {
      if (book.category) {
        return book.category
      } else {
        return ''
      }
    }
    owner(book) {
      if (book.owner) {
        if (this.state.searchFilter === "User") {
          
        return book.owner.name;

        } else if (this.state.searchFilter === "Title"){
          return book.title;

        } else if (this.state.searchFilter === "ID") {
          return book._id;

        } else if (this.state.searchFilter === "Category"){
          return this.category(book);
        }
      } else {
        return '';
      }
    }
    author(book) {
      if (book.owner){
      return <Link to = {`/user/profile/${book.owner._id}`}>{book.author}</Link>
      } else {
        return book.author;
      }

    }
  
    render() {
      const searchFilter = this.state.searchFilter;
      return (
        <div class = "section">
        <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {/* ACCENTURE TICKET */}
              {/* <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                position: 'absolute',
                right: 100
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Logout
            </button> */}
            </h3>

          </div>
          <div class="panel-body">
          <div class = "row">
                      <form class = "col s12">
                      <div class="row">
                      <div class = "input-field col s4">

                      <input type="text" class = "validate" name="name" value={this.state.userfilter} onChange={this.onChange} ></input>
                      <label for = 'name' >Search {this.state.searchFilter}:</label>
                      </div>
                      <div class = "input-field col s4">
                      <select onChange = {this.onChangeSearchFilter} name = "category" value = {this.state.searchFilter} >
                      <option selected value="User">User</option>
                      <option value="Category">Category</option>
                      <option  value="ID">ID</option>
                      <option value="Title">Title</option>
                      </select>
                      <label for="searchFilter">Choose a search filter:</label>
                      </div>

                      </div>
                      </form>
                      </div>

            <table class="highlight responsive-table grey lighten-4 z-depth-2">
              <thead>

                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.filter((book) => {
                     if (this.state.filter === "All") {
                         return book;
                     } else {return book.status === this.state.filter}
                    }).filter((book) =>{
                      const name = this.owner(book).toLowerCase();
                      return name.indexOf(this.state.userfilter.toLowerCase()) !== -1
                    }
                    ).map(book =>
                  <tr>
                    <td><Link to={`/admin/newTickets/show/${book._id}`}>{book._id}</Link></td>
                    <td>{book.title}</td>
                    <td>{this.author(book)}</td>
                    <td>{this.category(book)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>

    {/* <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    /> */}
      </div>
        )
    }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {logoutAdmin}
)(NewTabContentAdmin);