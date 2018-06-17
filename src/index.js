import React from 'react';
import PropTypes from 'prop-types';

function addChangeListener(mq, handler) {
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else {
    mq.addListener(handler);
  }
}

function removeChangeListener(mq, handler) {
  if (mq.removeEventListener) {
    mq.removeEventListener('change', handler);
  } else {
    mq.removeListener(handler);
  }
}

export default class MediaQuery extends React.Component {
  constructor(props) {
    super(props);

    this.query = matchMedia(props.query);
    this.state = {
      matches: this.query.matches,
    };

    this.handleChange = this.handleChange.bind(this);

    addChangeListener(this.query, this.handleChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query === prevProps.query) return;

    removeChangeListener(this.query, this.handleChange);
    this.query = matchMedia(this.props.query);
    addChangeListener(this.query, this.handleChange);

    this.handleChange(this.query);
  }

  componentWillUnmount() {
    removeChangeListener(this.query, this.handleChange);
  }

  handleChange({ matches }) {
    this.setState({ matches });
  }

  render() {
    const { matches } = this.state;
    if (this.props.render) return this.props.render(matches);
    if (matches) return this.props.children;
    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  MediaQuery.propTypes = {
    query: PropTypes.string.isRequired,
    render: PropTypes.func,
    children: PropTypes.node,
  };
}
