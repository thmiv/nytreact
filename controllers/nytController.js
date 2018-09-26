import axios from "axios";

/* Defining methods for the Controller 
module.exports = {
  searchApi: function(req, res) {
      let searchQuery = req.params.q;
      let dateBegin = req.params.date1;
      let dateEnd = req.params.date2;
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?', {
        params: {
          'api-key': "blah",
          'q': searchQuery,
          'begin_date': dateBegin,
          'end_date': dateEnd
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
*/