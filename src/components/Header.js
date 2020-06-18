import React from "react"
import { Link } from "gatsby"
import headerStyles from "../styles/components/header.module.scss"
import ThemeChanger from './themeChanger';

export default function Header(props) {
  console.log("Header -> props", props)
  return (
    <header
      className={`${headerStyles.header} ${props.page === 'info' &&
        headerStyles.info_page}`}
    >
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/">
          <img className="logo-positive" src="/static/oyezLogo.jpg" />
        </Link>
        <ThemeChanger />
      </nav>
    </header>
  )
}