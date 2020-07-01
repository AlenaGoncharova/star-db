import React from 'react';
import { withRouter }  from 'react-router-dom';
import Row from '../Row';
import { PlanetList, PlanetDetails } from '../sw-components';

const PlanetsPage = ({ history, match }) => {
  const { id } = match.params;
  return (
    <Row
      left={<PlanetList onItemSelected={(id) => history.push(id)} />}
      right={<PlanetDetails itemId={id} />}
    />
  );
};

export default withRouter(PlanetsPage);