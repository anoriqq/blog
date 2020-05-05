'use strict';

import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import { BlogIndexQuery } from '../../@types/graphql-types'

interface IBlogIndexProps {
  data: BlogIndexQuery;
  location: PageRendererProps['location'];
}

const BlogIndex = ({ data, location }: IBlogIndexProps) => {
  const siteTitle = data?.site?.siteMetadata?.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node?.frontmatter?.title || node?.fields?.slug;
        const path = node.fields.slug.match(/(\/[^\/]*)\/$/)[1] ?? '';
        return (
          <article key={node?.fields?.slug ?? undefined}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={path}>
                  {title}
                </Link>
              </h3>
              <small>{node?.frontmatter?.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node?.frontmatter?.description || node.excerpt || '',
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
