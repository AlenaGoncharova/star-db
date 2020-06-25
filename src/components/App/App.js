import React, { Component } from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorButton from '../ErrorButton';
import ErrorBoundary from '../ErrorBoundary';

import './App.css';
import Row from '../Row';
import ItemDetails, { Record } from '../ItemDetails';
import ItemList from '../ItemList';

import SwapiService from '../../services/swapiService';
import { PersonList, PlanetList, StarshipList, PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components';

import { SwapiServiceProvider } from '../SwapiServiceContext';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      >

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11} />

            <PlanetDetails itemId={5} />

            <StarshipDetails itemId={9} />

            <PersonList />

            <StarshipList />

            <PlanetList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}