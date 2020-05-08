import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

export const PureBio = ({ data }) => (
  <div
    style={{
      display: `flex`,
      marginBottom: rhythm(2.5),
    }}
  >
    <Image
      fixed={data.avatar.childImageSharp.fixed}
      alt={data.site.siteMetadata.author.name}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        minWidth: 50,
        borderRadius: `100%`,
      }}
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
    <p>
      Written by
      <strong>{` ${data.site.siteMetadata.author.name} `}</strong>
      {data.site.siteMetadata.author.summary}
      {` `}
      <Link to="/about">About</Link>
      {` `}
      <a href={`https://github.com/${data.site.siteMetadata.social.github}`}>
        GitHub
      </a>
      {` `}
      <a href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}>
        Twitter
      </a>
    </p>
  </div>
);

export const Bio = () => (
  <StaticQuery
    query={graphql`
      query BioQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author {
              name
              summary
            }
            social {
              twitter
              github
            }
          }
        }
      }
    `}
    render={data => <PureBio data={data} />}
  />
);
