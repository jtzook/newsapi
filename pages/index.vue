<template lang="ts">
  <div class="page">
    <NavBar />
    <div class="content flex-1 md:w-11/12 lg:max-w-2xl overflow-hidden">
      <input
        v-model="queryInput"
        type="text"
        placeholder="Type Something Here to Search NewsMax"
        :class="inputBoxTailwind"
        @click="queryInput = ''"
      >
      <div class="results mt-8 mb-10">
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
    <div id="footer" class="italic text-left m-6">
      <span v-if="articles.length">
        Showing {{ currentArticles.length }} of {{ articles.length }} result{{
          articles.length == 1 ? '' : 's'
        }}
      </span>
    </div>
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
      // credit: creative-tim.com
      inputBoxTailwind: [
        'px-3',
        'py-3',
        'text-gray-700',
        'relative',
        'bg-white',
        'bg-white',
        'rounded',
        'text-sm',
        'shadow',
        'outline-none',
        'focus:outline-none',
        'focus:shadow-outline',
        'w-full pl-10',
        'w-4/6 max-w-sm md:max-w-lg',
        'mt-4'
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
      return !this.loading && this.queryInput.length >= 3 && this.articles.length === 0
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

.content {
  margin-top: 60px;
}
</style>
