import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import useBlogData from '../static_queries/useBlogData'
import blogTemplateStyles from "../styles/templates/blog.module.scss"

export default function Blog(props) {
  const data = props.data.markdownRemark
  const allBlogData = useBlogData()

  return (
    <Layout>
      <article className={blogTemplateStyles.blog}>
          <img
            className={blogTemplateStyles.blog__hero}
            src={`/uploads${data.frontmatter.hero_image}`}
            alt={data.frontmatter.title}
          />
        <div className={blogTemplateStyles.blog__info}>
          <h1>{data.frontmatter.title}</h1>
        </div>
        <div
          className={blogTemplateStyles.blog__body}
          dangerouslySetInnerHTML={{ __html: data.html }}
        ></div>
      </article>
    </Layout>
  )
}

export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        hero_image 
      }
      html
    }
  }
`
