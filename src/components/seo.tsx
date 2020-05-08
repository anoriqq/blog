import React, { FunctionComponent } from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import { SeoQuery } from '@typings/graphql-types';

interface Props {
  description?: string;
  title?: string;
  lang?: string;
  meta?: HelmetProps['meta'];
}

interface PureProps extends Props {
  site?: SeoQuery['site'];
}

export const PureSeo: FunctionComponent<PureProps> = ({
  description = '',
  title,
  lang = 'ja',
  meta = [],
  site,
}) => {
  const metaDescription = description || site.siteMetadata.description;
  const defaultMeta: HelmetProps['meta'] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.social.twitter,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={defaultMeta.concat(meta)}
    />
  );
};

export const Seo: FunctionComponent<Props> = ({
  description,
  title,
  lang,
  meta,
}) => (
  <StaticQuery
    query={graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `}
    render={({ site }: SeoQuery) => (
      <PureSeo
        description={description}
        title={title}
        lang={lang}
        meta={meta}
        site={site}
      />
    )}
  />
);
