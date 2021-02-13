<template>
  <div
    class="p-4 m-2 mt-4 flex flex-col md:flex-row bg-white items-center justify-center rounded shadow"
  >
    <div class="text-left flex flex-col">
      <a
        v-if="result.title.length && result.articleUrl"
        :href="result.articleUrl"
        class="text-blue-700"
      >
        {{ result.title }}
      </a>
      <h2 v-else-if="result.title.length && result.articleUrl.length">
        {{ result.title }}
      </h2>
      <p v-if="result.description.length" class="pt-2">
        {{ result.description }}
      </p>
      <p v-if="result.author.length" class="pt-2 italic">
        by {{ result.author }}
      </p>
    </div>
    <div class="p-4">
      <img
        :src="result.thumbUrl"
        alt="article thumbnail"
        class="thumb border"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.thumb {
  max-height: 430px;
  max-width: 200px;
  object-fit: cover;
  margin: 10px;
}
</style>
