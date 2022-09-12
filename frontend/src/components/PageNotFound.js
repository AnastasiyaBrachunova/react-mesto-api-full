import React from 'react';
import { Link } from 'react-router-dom';

import Bye from '../images/HTML-404-Error-Page.png';

function PageNotFound () {
  return (
    <div className="not-found">
      <img className="not-found__image" src={Bye} alt=""/>
      <Link className="button not-found__button not-found__title" to="/signup">¯\_(ツ)_/¯</Link>

  </div>
  )
}

export default PageNotFound; 