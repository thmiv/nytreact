import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Detail extends Component {
  state = {
       title: "",
       author: "",
       synopsis: ""
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({
           title: res.data.title,
           author: res.data.author,
           synopsis: res.data.synopsis
      }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
   const { name, value } = event.target;
   this.setState({
    [name]: value
   });
  };

  //  MY WORK FOR UPDATING START
  handleFormSubmit = event => {
   event.preventDefault();
   if (this.state.title && this.state.author) {
      API.updateBook({
        _id: this.props.match.params.id,
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
   }
  };
  //  MY WORK FOR UPDATING END

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.title} by {this.state.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {this.state.synopsis}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
        <form>
         <Input
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title (required)"
         />
         <Input
            onChange={this.handleInputChange}
            name="author"
            placeholder="Author (required)"
         />
         <TextArea
            onChange={this.handleInputChange}
            name="synopsis"
            placeholder="Synopsis (Optional)"
         />
         <FormBtn
            disabled={!(this.state.author && this.state.title && this.state.synopsis)}
            onClick={this.handleFormSubmit}
         >
            Update Book Information
         </FormBtn>
        </form>
      </Container>
    );
  }
}

export default Detail;
