'use strict';

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { GlobalStyles, Theme } from '../utils/theme';
import { default as SEO } from '../components/seo';

interface Props {
  theme: Theme;
}

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Summary = styled.p`
  font-family: Cica !important;
`

export default (props: Props) => (
  <React.Fragment>
    <SEO title="About Me" />
    <GlobalStyles theme={props.theme} />
    <Container>
      <h2># anoriqq (Shota Yoshikawa)</h2>
      <Summary>料理をしたり、筋トレしたり、TypeScript書いたりする</Summary>
      <p>
        <a href={`https://github.com/anoriqq`}>GitHub</a>
        {` `}
        <Link to="/">Blog</Link>
        {` `}
        <a href={`https://twitter.com/anoriqq`}>Twitter</a>
        {` `}
        <a href={`mailto:shota.yoshikawa@anoriqq.com`}>Email</a>
      </p>
    </Container>
  </React.Fragment>
);
