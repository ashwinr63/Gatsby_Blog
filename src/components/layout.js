import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div data-is-root-path={isRootPath}>
      <header className="global-header container">
      <div className="logo-header"><Link to="/">Ashwin's Blog</Link></div>
      </header>
      <main className="story container">{children}</main>
      <footer className="global-footer">
      <div className="container">
        © {new Date().getFullYear()}, Built By {``} Ashwin Ramkumar,
        </div>
      </footer>
    </div>
  )
}

export default Layout
