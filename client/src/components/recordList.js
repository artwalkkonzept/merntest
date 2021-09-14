import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
 
const Record = (props) => (
  <tr>
    <td>{props.record.article_title}</td>
    <td>{props.record.article_description}</td>
    <td>
      <Link to={"/api/edit/" + props.record.id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record.id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);
 
export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
 
  API_URL = process.env.REACT_APP_API_URL;
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }
 
  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("/api/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("/api/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }
 
  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }
 
  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div className="container">
        <h3>News List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}