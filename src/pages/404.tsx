import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';

import { NotFoundPageQuery } from '@typings/graphql-types';
import Layout from '../components/layout';
import { Seo } from '../components/seo';

interface Props {
  data: NotFoundPageQuery;
  location: PageRendererProps['location'];
}

const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
