import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <article key={post.fields.slug} className="index-story" itemScope itemType="http://schema.org/Article">
            <header className="index-story-summary">
              <div className="category">Category</div>
              <h1>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h1>
              <div className="published"><time>{post.frontmatter.date}</time></div>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
              <Link to={post.fields.slug} itemProp="url">[ Keep reading ]</Link>
            </header>
            <div className="index-story-img">
              <Link to={post.fields.slug} itemProp="url">
                <img src={
                  post.frontmatter.image ||
                    "https://images.unsplash.com/photo-1622357102666-c9f68f951fa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                 } alt="" />
              </Link>
            </div>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          updated(formatString: "MMMM DD, YYYY")
          title
          description
          image
        }
      }
    }
  }
`