import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { GlobalStyles, Theme } from '../utils/theme';
import SEO from '../components/seo';
import { AboutQuery } from '../../@types/graphql-types';

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

interface Props {
  theme: Theme;
  data: AboutQuery;
}

export default ({ data, theme }: Props) => (
  <>
    <SEO title="About Me" />
    <GlobalStyles theme={theme} />
    <Container>
      <section
        dangerouslySetInnerHTML={{ __html: data.about?.html ?? 'No content' }}
      />
    </Container>
  </>
);

export const pageQuery = graphql`
  query About {
    about: markdownRemark(
      fileAbsolutePath: { regex: "/content/about/" }
      frontmatter: { title: { eq: "Me" } }
    ) {
      html
    }
  }
`;
