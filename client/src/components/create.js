import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeArticleTitle = this.onChangeArticleTitle.bind(this);
    this.onChangeArticleDescription = this.onChangeArticleDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      article_title: "",
      article_description: "",
    };
  }

  // These methods will update the state properties.
  onChangeArticleTitle(e) {
    this.setState({
      article_title: e.target.value,
    });
  }

  onChangeArticleDescription(e) {
    this.setState({
      article_description: e.target.value,
    });
  }

// This function will handle the submission.
onSubmit(e) {
  e.preventDefault();

  // When post request is sent to the create url, axios will add a new record(newarticle) to the database.
  const newarticle = {
    article_title: this.state.article_title,
    article_description: this.state.article_description,
  };

  axios
    .post("/api/record/add", newarticle)
    .then((res) => console.log(res.data));

  // We will empty the state after posting the data to the database
  this.setState({
    article_title: "",
    article_description: "",
  });
}

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <h3>Create New Article</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title of the article: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.article_title}
              onChange={this.onChangeArticleTitle}
            />
          </div>
          <div className="form-group">
            <label>Article's description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.article_description}
              onChange={this.onChangeArticleDescription}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create article"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
