'use strict';

import React from 'react';
import styled from 'styled-components';

import { GlobalStyles, Theme } from '../utils/theme';

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

export default (props: Props) => (
  <React.Fragment>
    <GlobalStyles theme={props.theme} />
    <Container>
      <h2># anoriqq (Shota Yoshikawa)</h2>
      <a href={`https://github.com/anoriqq`}>GitHub</a>
    </Container>
  </React.Fragment>
);
