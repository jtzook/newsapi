<template lang="ts">
  <div class="page overflow-hidden">
    <NavBar />
    <div :class="resultsStyles">
      <div id="search-box" class="w-full px-2">
        <input
          v-model="queryInput"
          type="text"
          placeholder="Type Something Here to Search the News"
          :class="inputBoxTailwind"
          @click="queryInput = ''"
        >
      </div>
      <div class="mt-4 mb-10">
        <div v-if="noArticlesFound" class="italic">
          No articles found for "{{ queryInput }}"
        </div>
        <div v-else-if="articles.length">
          <Result
            v-for="(article, idx) in currentArticles"
            :key="idx"
            :result="article"
          />
        </div>
      </div>
    </div>
    <Footer :currentArticleCount="currentArticles.length" :totalArticleCount="articles.length" />
  </div>
</template>

<script>
import config from '../config.js'

export default {
  data () {
    return {
      config,
      articles: [],
      queryInput: 'japan',
      inputBoxTailwind: [
        'my-2',
        'text-gray-700',
        'relative',
        'bg-white',
        'rounded',
        'text-sm',
        'shadow',
        'outline-none',
        'focus:outline-none',
        'focus:shadow-outline',
        'w-full md:max-w-xl'
      ],
      resultsStyles: [
        'mt-16',
        'flex-1',
        'flex',
        'flex-col',
        'content-center',
        'items-center',
        'md:max-w-xl',
        'lg:max-w-3xl'
      ],
      loading: false
    }
  },

  async fetch () {
    if (this.queryInput.length) {
      this.articles = await this.fetchArticles()
    }
  },

  computed: {
    currentArticles () {
      return this.articles && this.articles.length
        ? this.articles.slice(0, 20)
        : []
    },

    noArticlesFound () {
      return (
        !this.loading &&
        this.queryInput.length >= 3 &&
        this.articles.length === 0
      )
    }
  },

  watch: {
    async queryInput (queryString) {
      this.articles = []

      if (queryString.length >= 3) {
        this.loading = !this.loading
        const newArticles = await this.fetchArticles()

        this.articles = newArticles
        this.loading = !this.loading
      }
    }
  },

  methods: {
    async fetchArticles () {
      // To query /v2/everything
      // You must include at least one q, source, or domain

      if (!this.queryInput?.length) {
        return
      }

      const response = await this.$axios.$get(
        'https://newsapi.org/v2/everything',
        {
          params: { q: this.queryInput, apiKey: config.apiKey }
        }
      )

      if (response && response?.status === 'ok') {
        const articleData = []

        response.articles.forEach((a) => {
          articleData.push({
            title: a?.title ?? '',
            description: a?.description ?? '',
            author: a?.author ?? '',
            articleUrl: a?.url ?? '',
            thumbUrl: a?.urlToImage ?? ''
          })
        })

        return articleData
      }

      return []
    }
  }
}
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
</style>
