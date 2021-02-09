<template>
  <div class="page">
    <NavBar />
    <div class="content flex-1 md:w-11/12 lg:max-w-2xl overflow-hidden">
      <input
        type="text"
        v-model="queryInput"
        placeholder="Type Something Here to Search NewsMax"
        :class="inputBoxTailwind"
        @click="queryInput = ''"
      />
      <div class="results mt-4">
        <Result
          v-for="(article, idx) in articles"
          :key="idx"
          :result="article"
        />
      </div>
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
      articles: [],
      queryInput: "japan",
      // credit: creative-tim.com
      inputBoxTailwind: [
        "px-3",
        "py-3",
        "text-gray-700",
        "relative",
        "bg-white",
        "bg-white",
        "rounded",
        "text-sm",
        "shadow",
        "outline-none",
        "focus:outline-none",
        "focus:shadow-outline",
        "w-full pl-10",
        "w-4/6 max-w-lg",
      ],
    };
  },

  computed: {
    currentArticles() {
      return this.articles && this.articles.length
        ? this.articles.slice(0, 20)
        : [];
    },
  },

  async fetch() {
    if (this.queryInput.length) {
      this.articles = await this.fetchArticles();
    }
  },

  watch: {
    async queryInput(queryString) {
      this.articles = [];

      if (queryString.length >= 3) {
        const newArticles = await this.fetchArticles();

        this.articles = newArticles;
      }
    },
  },

  methods: {
    async fetchArticles() {
      // To query /v2/everything
      // You must include at least one q, source, or domain
      if (!this.queryInput.length) {
        return;
      }

      const newsapi = new NewsApi(config.apiKey);

      const response = await newsapi.v2.everything({
        q: this.queryInput,
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
            articleUrl: a?.url ?? "",
            thumbUrl: a?.urlToImage ?? "",
          });
        });

        return articleData;
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
  background-color: rgba(247, 250, 252);
}

.content {
  margin-top: 60px;
}
</style>
