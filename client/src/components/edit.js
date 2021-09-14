import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeArticleTitle = this.onChangeArticleTitle.bind(this);
    this.onChangeArticleDescription = this.onChangeArticleDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      article_title: "",
      article_description: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          article_title: response.data.article_title,
          article_description: response.data.article_description,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditedarticle = {
      article_title: this.state.article_title,
      article_description: this.state.article_description,
    };
    console.log(newEditedarticle);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedarticle
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className="container">
        <h3 align="center">Update Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Article's Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.article_title}
              onChange={this.onChangeArticleTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.article_description}
              onChange={this.onChangeArticleDescription}
            />
          </div>
          
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
