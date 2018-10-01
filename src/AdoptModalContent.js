import React, { Fragment } from 'react';

const AdoptModalContent = props => (
  <Fragment>
    <h1>Would you like to adopt {props.name}?</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}>Yes</button>
      <button onClick={props.toggleModal}>No</button>
    </div>
  </Fragment>
);

export default AdoptModalContent;
