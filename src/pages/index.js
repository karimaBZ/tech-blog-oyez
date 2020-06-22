import React from "react"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"

export default function IndexPage({ data }) {
  return (
    <Layout page="home" bgColor="inherit">
      <div className="site-description">
        <div className="headline">{data.site.siteMetadata.title}</div>
        <br />
        <div className="description">{data.site.siteMetadata.description}</div>
      </div>
      <hr />
      <section className="site-content">
        <BlogList />
      </section>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
   site {
     siteMetadata {
       title
       description
     }
   }
  }
`