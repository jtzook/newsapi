<template lang="ts">
  <div class="page overflow-hidden">
    <NavBar />
    <div :class="resultsStyles">
      <div id="search-box" class="w-full md:w-xl px-2">
        <input
          v-model="queryInput"
          type="text"
          placeholder="Type Something Here to Search the News"
          :class="inputBoxTailwind"
          @click="queryInput = ''"
        >
      </div>

      <div v-if="articles.length" class="w-full mt-4">
        <div class="flex flex-row justify-between items-center content-center px-2">
          <span class="text-sm italic">
            showing {{ currentArticles.length }} of {{ articles.length }} result{{
              articles.length == 1 ? '' : 's'
            }}
          </span>
          <div @click="onSortButtonClick">
            <SortButton :sortDirection="sortDirection" />
          </div>
        </div>
        <hr />
      </div>

      <div class="mt-3 mb-10">
        <div v-if="apiErrorMessage" class="italic text-left">{{ apiErrorMessage }}</div>
        <div v-else-if="noArticlesFound" class="italic">
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
        'my-4',
        'text-gray-700',
        'relative',
        'bg-white',
        'rounded',
        'text-sm',
        'shadow',
        'outline-none',
        'focus:outline-none',
        'focus:shadow-outline',
        'w-full md:w-xl'
      ],
      resultsStyles: [
        'mt-16',
        'flex-1',
        'flex',
        'flex-col',
        'content-center',
        'items-center',
        'md:max-w-xl',
        'lg:max-w-3xl',
        'w-full'
      ],
      loading: false,
      sortDirection: '',
      apiErrorMessage: ''
    }
  },

  async fetch () {
    if (this.queryInput.length) {
      this.articles = await this.fetchArticles()
    }
  },

  computed: {
    currentArticles () {
      const articles =
        this.articles && this.articles.length ? this.articles.slice(0, 20) : []

      if (!this.sortDirection.length) {
        return articles
      }

      const sortFactor = this.sortDirection === 'ascending' ? 1 : -1

      return articles.sort((a, b) =>
        a.title > b.title ? sortFactor : -sortFactor
      )
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
        return []
      }

      let response = {}
      try {
        response = await this.$axios.$get('https://newsapi.org/v2/everything', {
          params: { q: this.queryInput, apiKey: config.apiKey }
        })
      } catch (e) {
        this.apiErrorMessage = e.response.data.message
        return []
      }

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
    },

    onSortButtonClick () {
      if (!this.sortDirection) {
        this.sortDirection = 'ascending'

        return
      }

      this.sortDirection =
        this.sortDirection === 'ascending' ? 'descending' : 'ascending'
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
