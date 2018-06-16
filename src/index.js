import React from 'react';
import PropTypes from 'prop-types';

function addChangeListener(mq, handler) {
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else {
    mq.addListener(handler);
  }
}

export default class MediaQuery extends React.Component {
  constructor(props) {
    super(props);

    this.prevQuery = props.query;
    this.query = matchMedia(props.query);
    this.state = {
      matches: this.query.matches,
    };

    addChangeListener(this.query, ({ matches }) => {
      this.setState({ matches });
    });
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    if (this.props.query === this.prevQuery) return;

    this.query = matchMedia(this.props.query);
    addChangeListener(this.query, ({ matches }) => {
      this.setState({ matches });
    });

    this.setState({ matches: this.query.matches });

    this.prevQuery = this.props.query;
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
