import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import pf from 'petfinder-client';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';
import { Provider } from './SearchContext';
import NavBar from './NavBar';

/*
API Key
3ad2d5a5c96a4a855b5d378af44c97ce

API Secret
2a55f1033a8feae176772f0920e9d56b

API Status
Active
*/

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value,
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
      },
      this.getBreeds
    );
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value,
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed,
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: [],
      });
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
