---
date: 2020-06-23T08:31:14Z
hero_image: "/2020/06/gatsby.png"
title: Gatsby
author: Karima Ben Zineb

---
# **Getting Started**

The gatsbsy-source-notionso installation is a 3 steps process.

Install the plugin

In your Gatsby project directory, you need to add the plugin as a dependency.

With npm:

    npm install --save gatsby-source-notionso
    

With yarn:

    yarn add gatsby-source-notionso
    

@Abdelhedi Hlel

Update your gatsby-config.js file

You need then to add this new plugin in your gatsby-config.js file.

**Important**: You also need to have the gatsby-source-filesystem plugin: this plugin will enhance your image nodes with the publicURL property which is required to serve your images.

Example of a minimal gatsby-config.js file

    module.exports = {
      siteMetadata: {
        title: 'gatsby-plugin-notionso example site',
        description:
          'series of article to explain how to use gatsby-plugin-notionso',
        basePath: '/',
      },
      plugins: [
        {
          resolve: 'gatsby-source-notionso',
          options: {
            name: 'Blog',
            rootPageUrl:
              '<https://www.notion.so/><your page here>',
            debug: false,
          },
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `pages`,
            path: `${__dirname}/src/pages`,
          },
        },
      ],
    };
    

This plugin takes 3 parameters:

* name : this is string which is used when generating the different nodes in the GraphQL tree. This name is useful if you want to use the plugin multiple times in your site with different Notion pages.
* rootPageUrl: this is the public URL of your notion page.
* debug : you can set this boolean to true to get extra logs on the screen. May be useful to help debug an issue with the plugin itself.

Create an index page

Usually, if used in the context of a blog for instance, you have a page listing all the pages available.

The structure of such a page component would be something like that:

    import React from 'react';
    import Layout from '../components/Layout';
    import ArticleBlockLink from '../components/ArticleBlockLink';
    import { graphql } from 'gatsby';
    
    const IndexPage = ({ data }) => {
      return (
        <Layout>
          {data.allNotionPageBlog.edges.map(edge => (
            <ArticleBlockLink
              title={edge.node.title}
              link={`/gatsby-source-notion-so/${edge.node.slug}`}
              excerpt={edge.node.excerpt}
              icon={edge.node.pageIcon}
            />
          ))}
        </Layout>
      );
    };
    
    export default IndexPage;
    
    export const query = graphql`
      query {
        allNotionPageBlog(
          filter: { isDraft: { eq: false } }
          sort: { fields: [indexPage], order: DESC }
        ) {
          edges {
            node {
              title
              slug
              excerpt
              pageIcon
            }
          }
        }
      }
    `;
    

This query collects all the pages which are not a draft and orders page following the inverse order of the root Notion page.

Creating individual pages

In order to create the individual pages, which are linked from the index page, you need to create the usual gatsby-node.js file like this one:

    exports.createPages = async ({ graphql, actions, reporter }, options) => {
      const { createPage } = actions;
    
      const pageTemplate = require.resolve('./src/templates/page.js');
    
      const result = await graphql(
        `
          query {
            allNotionPageBlog {
              edges {
                node {
                  pageId
                  slug
                }
              }
            }
          }
        `,
      );
      if (result.errors) {
        reporter.panic('error loading events', result.errors);
        return;
      }
    
      result.data.allNotionPageBlog.edges.forEach(({ node }) => {
        const path = `/gatsby-source-notion-so/${node.slug}`;
        createPage({
          path,
          component: pageTemplate,
          context: {
            pathSlug: path,
            pageId: node.pageId,
          },
        });
      });
    };
    

The associated template page is like this:

    import React from 'react';
    import { graphql } from 'gatsby';
    import notionRendererFactory from 'gatsby-source-notionso/lib/renderer';
    import Layout from '../components/Layout';
    import NotionBlockRenderer from '../components/notionBlockRenderer';
    
    const Template = ({ data, pageContext }) => {
      const notionRenderer = notionRendererFactory({
        notionPage: data.notionPageBlog,
      });
      return (
        <Layout meta>
          <NotionBlockRenderer
            data={data}
            renderer={notionRenderer}
            debug={false}
          />
        </Layout>
      );
    };
    
    export const query = graphql`
      query($pageId: String!) {
        notionPageBlog(pageId: { eq: $pageId }) {
          blocks {
            blockId
            blockIds
            type
            attributes {
              att
              value
            }
            properties {
              propName
              value {
                text
                atts {
                  att
                  value
                }
              }
            }
          }
          imageNodes {
            imageUrl
            localFile {
              publicURL
            }
          }
          pageId
          slug
          title
          isDraft
          id
          indexPage
        }
      }
    `;
    
    export default Template;
    

as the data coming back from the notion API are kind of difficult to easily process, the plugin comes with a utility to make that rendering easy:

    import notionRendererFactory from 'gatsby-source-notionso/lib/renderer';
    

Check the repo of the sample for now.. more information will be available soon.

[https://github.com/pcarion/gatsby-source-notionso-example](https://github.com/pcarion/gatsby-source-notionso-example "https://github.com/pcarion/gatsby-source-notionso-example")