import React, { Component } from 'react';
import './App.css';
import dummyData from './dummy-data';
import PostsPage from './components/PostContainer/PostsPage';
import Authenticate from './Authentication/Authenticate';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      comment: '',
      search: '',
      like: false,
    }
    localStorage.setItem("like", this.state.like);
  }

  componentDidMount(){
    this.setState({data: dummyData})
  }

  updateComment = event => {  
    this.setState({comment: event.target.value});
  }

  updateSearch = event => {
    this.setState({search: event.target.value})
  }
  
  addNewComment = (event, index) => {
    event.preventDefault();
    let newData = this.state.data.slice();
    let newComment = {
      username: localStorage.getItem("username"),
      text: this.state.comment,
    }
    newData[index].comments.push(newComment);
    this.setState({data: newData, comment: ''});
  }

  searchHandler = event => {
    event.preventDefault();
    if(this.state.search === ''){
      this.setState({data: dummyData})
    }
    else{
      let regEx = new RegExp(this.state.search, 'i');
      let newPosts = this.state.data.filter(post => 
        regEx.test(post.username)
      );
      this.setState({data: newPosts, search: ''});
      
    }

  }

  like = (index) => {
    let newData = this.state.data.slice();
    if(localStorage.getItem("like") === "false"){
        newData[index].likes++;
        localStorage.setItem("like", "true");
      }  
    else{
      newData[index].likes--;
      localStorage.setItem("like", "false");
    }
    this.setState({data: newData, like: !this.state.like});
  }

  logout = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <div className="posts">
          <PostsPage data={this.state.data}
                      addNewComment={this.addNewComment}
                      updateComment={this.updateComment}
                      updateSearch={this.updateSearch}
                      searchHandler={this.searchHandler}
                      search={this.search}
                      like={this.like} />
        </div>
        <form onSubmit={this.logout}><button type="submit">Logout</button></form>
      </div>
    );
  }
}




export default Authenticate(App);
