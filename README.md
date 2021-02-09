# newsapi

Display searchable Google News API results with Nuxt.js (Vue.js) and Tailwind CSS.

## Requirements 
- Implement an input field to search with Google News API "everything" endpoint.
  - API website https://newsapi.org 
- Search results should be limited to 20 and presented as a list. 
- Each row in the list should have two columns - title, description, author in one column and thumbnail image in another column. 
- The layout should be responsive. 
- Clicking on the thumbnail image should open a modal with the image centered both horizontally and vertically. 
- Create a button that sorts the results by title alphabetically, toggle between descending and ascending.

## Build Setup

Make sure to place your NewsAPI API key in a file called `config.js` in the root directory.

E.g.:

```javascript
export default {
    apiKey: <your key here>
}
```

Then, use one of the following to run the web server:

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
