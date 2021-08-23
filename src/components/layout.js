import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  const twitter = data.site.siteMetadata.social.twitter
  return (
    <div data-is-root-path={isRootPath}>
      <header className="global-header container">
      <div className="logo-header"><Link to="/">Ashwin's Blog</Link></div>
      </header>
      <main className="story container">{children}</main>
      <footer className="global-footer">
      <div className="container">
        <p>© {new Date().getFullYear()}, Built By {``} Ashwin</p>
        <ul><li><a href={`http://twitter.com/@${twitter}`}>{`${twitter}`}</a></li></ul>
        </div>
      </footer>
    </div>
  )
}

export default Layout
