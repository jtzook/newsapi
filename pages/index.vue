<template>
  <div class="page">
    <NavBar />
    <div class="content flex-1">
      <slot></slot>
      {{ config }}
    </div>
  </div>
</template>

<script>
import NewsApi from "newsapi";

import config from "../config.js";

export default {
  data() {
    return {
      config,
      newsapi: new NewsApi(config.apiKey),
      articles: [],
      query: "bitcoin",
    };
  },

  computed: {
    currentArticles: () => (this.articles.length ? articles.slice(0, 20) : []),
  },

  async fetch() {
    this.articles = await this.fetchArticles();
  },

  methods: {
    async fetchArticles() {
      // To query /v2/everything
      // You must include at least one q, source, or domain
      const response = await this.newsapi.v2.everything({
        q: this.query,
        language: "en",
        sortBy: "relevancy",
      });

      if (response && response?.status == "ok") {
        const articleData = [];
        response.articles.forEach((a) => {
          articleData.push({
            title: a?.title ?? "",
            description: a?.description ?? "",
            author: a?.author ?? "",
            thumbUrl: a?.urlToImage ?? "",
          });
        });

        console.log("articleData", articleData);
        // return data?.photos?.photo;
      }

      return [];
    },
  },
};
</script>

<style lang="postcss">
.page {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content {
  margin-top: 80px;
  padding: 25px 35px;
}
</style>
