//require("dotenv").config();
import dotenv from "dotenv";
import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
const apiKeys = require("../../API-keys");
const nytKey = apiKeys.NYTimes.key;

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    date: "",
    url: "",
    searchQuery: "",
    dateStart: "",
    dateEnd: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.date) {
      API.saveArticle({
        title: this.state.title,
        date: this.state.date,
        url: this.state.url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  // makes the query url
  makeQueryURL = (query, dateFirst, dateLast) => {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    var queryParams = { "api-key": nytKey };
  
    queryParams.q = query;

    var startYear = dateFirst;
    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101";
    }

    var endYear = dateLast;
    if (parseInt(endYear)) {
      queryParams.end_date = endYear + "0101";
    }
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + queryParams);
    return queryURL + queryParams;
  }

  render() {
    return (
      <Container fluid>
        <Row>
          {/* // query form */}
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date (required)"
              />
              <TextArea
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="URL (Optional)"
              />
              <FormBtn
                disabled={!(this.state.date && this.state.title && this.state.url)}
                onClick={this.handleFormSubmit}
              >
                Submit Form
              </FormBtn>
            </form>
          </Col>
          {/* // Searched articles will go here */}
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => (
                  <ListItem key={articles._id}>
                    <Link to={"/articles/" + articles._id}>
                      <strong>
                        {articles.title} on {articles.date}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(articles._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          {/* // saved articles */}
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => (
                  <ListItem key={articles._id}>
                    <Link to={"/articles/" + articles._id}>
                      <strong>
                        {articles.title} on {articles.date}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(articles._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;