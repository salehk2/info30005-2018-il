import React from 'react';
import Particles from 'react-particles-js';
import particles from '../../styles/particles';

export default () => {
  return (
    <div className="about">
      <Particles params={particles} className="particles" />
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">About Us</h1>
              <br />
              <p>
                Our goal is to provide a platform that answers the questions about higher education and lets learners and educators interact and have
                their voices heard to provide a brighter future for all.
                <br />
                <br />
                We've made this for you to release your creativity, to help others and to guide and be guided. We aim to let everyone enrich
                themselves with the cutting-edge skills and technology needed to go forward in this dynamic world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
