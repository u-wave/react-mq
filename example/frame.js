/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from '../';

const FrameApp = () => (
  <div>
    <MediaQuery
      query="(min-width: 768px)"
      render={matches => (
        <p>Matches: {JSON.stringify(matches)}</p>
      )}
    />
    <MediaQuery query="(min-width: 768px)">
      <p>Big screen!</p>
    </MediaQuery>
    <MediaQuery query="(max-width: 767px)">
      <p>Small screen!</p>
    </MediaQuery>
  </div>
);

ReactDOM.render(<FrameApp />, document.getElementById('example'));
