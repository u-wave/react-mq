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

    this.handleChange = ({ matches }) => {
      this.setState({ matches });
    };

    addChangeListener(this.query, this.handleChange);
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (query === prevProps.query) return;

    removeChangeListener(this.query, this.handleChange);
    this.query = matchMedia(query);
    addChangeListener(this.query, this.handleChange);

    this.handleChange(this.query);
  }

  componentWillUnmount() {
    removeChangeListener(this.query, this.handleChange);
  }

  render() {
    const { render, children } = this.props;
    const { matches } = this.state;
    if (render) return render(matches);
    if (matches) return children;
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
