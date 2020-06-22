import React from "react"
import { Link } from "gatsby"
import useBlogData from "../static_queries/useBlogData"
import blogListStyles from "../styles/components/bloglist.module.scss"
import Img from 'gatsby-image'

export default function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <div className="blog-link">
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map(blog => {
            return (
              <Link to={`/blog/${blog.node.fields.slug}`} key={blog.node.id}>
                <li className={blogListStyles.li} key={blog.node.fields.slug}>
                    {console.log("renderBlogData -> blog.node.frontmatter.hero_image", blog.node.frontmatter)}
                  <div className={blogListStyles.list__hero}>
                    <img 
                    src={`${blog.node.frontmatter.hero_image}`}
                      alt={blog.node.frontmatter.title}
                    />
                  </div>
                  <div className={blogListStyles.list__info}>
                    <h2>{blog.node.frontmatter.title}</h2>
                    <h3>{blog.node.frontmatter.date}</h3>
                    <p>{blog.node.excerpt}</p>
                    <h5>{blog.node.frontmatter.author}</h5>
                  </div>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul className={blogListStyles.list}>{renderBlogData()}</ul>
    </section>
  )
}

