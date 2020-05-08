import React from 'react';
import renderer from 'react-test-renderer';
import { PageRendererProps } from 'gatsby';

import Layout from '../layout';

describe('Layout', () => {
  it('renders correctly of location at "/"', () => {
    const location = { pathname: '' } as PageRendererProps['location'];
    const tree = renderer
      .create(
        <Layout location={location} title="All posts">
          <div>Hello World</div>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly of location at "hello-world"', () => {
    const location = {
      pathname: 'hello-world',
    } as PageRendererProps['location'];
    const tree = renderer
      .create(
        <Layout location={location} title="All posts">
          <div>Hello World</div>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
