import React, { Component } from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorBoundary from '../ErrorBoundary';
import SwapiService from '../../services/swapiService';
import DummySwapiService from '../../services/dummySwapiService';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return { swapiService: new Service() };
    })

  }

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />

              <Route path="/" render={() => <h2>Welcome to StarDB!</h2>} exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route
                path="/starships/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />
                }} 
              />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}