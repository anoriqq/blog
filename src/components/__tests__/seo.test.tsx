import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { PureSeo as Seo } from '../seo';

describe('Seo', () => {
  it('renders correctly title and description', async () => {
    const date = {
      site: {
        siteMetadata: {
          title: "anoriqq's Blog",
          description: 'A blog powered by Gatsby',
          social: {
            twitter: 'anoriqq',
          },
        },
      },
    };
    render(
      <Seo
        description="This is Description"
        title="This is Title"
        lang="ja"
        meta={[]}
        site={date.site}
      />
    );

    await waitFor(() => {
      expect(document.title).toBe(`This is Title | anoriqq's Blog`);
      expect(
        document.querySelector(
          'head>meta[name="description"][data-react-helmet="true"]'
        )
      ).toHaveAttribute('content', 'This is Description');
    });
  });
});
