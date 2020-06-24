import React, { Component } from 'react';

import ItemList from '../ItemList';
import ItemDetails from '../ItemDetails';
import SwapiService from '../../services/swapiService';
import Row from '../Row';
import ErrorBoundary from '../ErrorBoundary';

import './PeoplePage.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
  
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople} 
      >
        {(i) => (`${i.name} (${i.birthYear})`)}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <ItemDetails personId={this.state.selectedPerson} />
      </ErrorBoundary>
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
