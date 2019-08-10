/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import expect from 'expect';
import MediaQuery from '../src';

let mockMatches = null;
let listener = null;
global.matchMedia = (query) => {
  const matches = query === 'all';
  return {
    get matches() {
      return mockMatches !== null ? mockMatches : matches;
    },
    addListener: (fn) => {
      listener = fn;
    },
    removeListener: (fn) => {
      if (listener === fn) listener = null;
    },
  };
};

function mockChange(matches) {
  mockMatches = matches;
  if (listener) listener({ matches });
}

describe('MediaQuery', () => {
  afterEach(() => {
    mockMatches = null;
    listener = null;
  });

  it('renders children when query matches', () => {
    const renderer = TestRenderer.create((
      <MediaQuery query="all">
        <h1 />
      </MediaQuery>
    ));
    expect(renderer.toJSON()).toMatchObject({ type: 'h1' });
  });

  it('does not render children when query does not match', () => {
    const renderer = TestRenderer.create((
      <MediaQuery query="none">
        <h1 />
      </MediaQuery>
    ));
    expect(renderer.toJSON()).toBe(null);
  });

  it('uses a different query when the prop changes', () => {
    const renderer = TestRenderer.create((
      <MediaQuery query="all">
        <h1 />
      </MediaQuery>
    ));
    expect(renderer.toJSON()).toMatchObject({ type: 'h1' });
    renderer.update((
      <MediaQuery query="none">
        <h1 />
      </MediaQuery>
    ));
    expect(renderer.toJSON()).toBe(null);
  });

  it('listens for media query match changes', () => {
    mockChange(false);
    const renderer = TestRenderer.create((
      <MediaQuery query="(min-width: 768px)">
        <h1 />
      </MediaQuery>
    ));
    expect(renderer.toJSON()).toBe(null);
    mockChange(true);
    expect(renderer.toJSON()).toMatchObject({ type: 'h1' });
  });

  it('removes the listener when unmounting', () => {
    const renderer = TestRenderer.create((
      <MediaQuery query="all">
        <h1 />
      </MediaQuery>
    ));
    expect(typeof listener).toBe('function');
    renderer.update(<div />);
    expect(listener).toBe(null);
  });

  it('calls render() prop with bool matches', () => {
    mockChange(false);
    const renderer = TestRenderer.create((
      <MediaQuery
        query="(min-width: 768px)"
        render={(m) => (m ? <h1 /> : <h2 />)}
      />
    ));
    expect(renderer.toJSON()).toMatchObject({ type: 'h2' });
    mockChange(true);
    expect(renderer.toJSON()).toMatchObject({ type: 'h1' });
  });
});
