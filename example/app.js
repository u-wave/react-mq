/* eslint-env browser */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import ReactDOM from 'react-dom';

class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      large: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      large: event.target.checked,
    });
  }

  render() {
    return (
      <div>
        <p>
          <input id="size" type="checkbox" checked={this.state.large} onChange={this.handleChange} />
          <label htmlFor="size">
            Large iframe
          </label>
        </p>
        <iframe
          width={this.state.large ? 800 : 500}
          title="demo iframe"
          src="frame.html"
        />
      </div>
    );
  }
}

ReactDOM.render(<MainApp />, document.getElementById('example'));
