
Get all posts of facebook by graphql in nodejs

To get all posts from a Facebook page using GraphQL in Node.js, you will need to do the following steps:

1.  Set up a Facebook Developer account and create a new app. This will give you access to the Facebook Graph API, which you will use to make GraphQL queries.
    
2.  Install the `fb-api-node` package, which is a Node.js library that simplifies the process of making GraphQL requests to the Facebook API.
    
3.  Obtain an access token from Facebook. You will need an access token to authenticate your GraphQL requests. There are several ways to obtain an access token, such as using the Facebook Login API or the Facebook Graph API Explorer.
    
4.  Use the `fb-api-node` library to make a GraphQL query to the Facebook API to retrieve the posts. You can use the following GraphQL query to get all the posts from a page:
    

Copy code
```js
query {
  page(id: "<PAGE_ID>") {
    posts {
      edges {
        node {
          id
          message
          created_time
          permalink_url
        }
      }
    }
  }
}
```

Replace `<PAGE_ID>` with the ID of the Facebook page you want to get the posts from. You can find the page ID by looking at the page's URL on Facebook.

5.  Use the `fb-api-node` library to send the GraphQL query to the Facebook API and handle the response. The response will contain an array of posts, which you can then use in your application as needed.

Here is an example of how to use the `fb-api-node` library to make a GraphQL request and handle the response:

Copy code

```js
const fbAPI = require('fb-api-node');

// Set up the fbAPI client with your access token
const client = fbAPI.client({ accessToken: '<ACCESS_TOKEN>' });

// Define the GraphQL query
const query = `
  query {
    page(id: "<PAGE_ID>") {
      posts {
        edges {
          node {
            id
            message
            created_time
            permalink_url
          }
        }
      }
    }
  }
`;

// Send the GraphQL query to the Facebook API
client.graphql(query).then(response => {
  // Handle the response
  const posts = response.page.posts.edges;
  console.log(posts);
});
```

I hope this helps! Let me know if you have any questions.