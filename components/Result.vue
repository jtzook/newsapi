<template>
  <div class="result">
    <div class="article pt-8 flex flex-col text-left">
      <a
        v-if="result.title.length && result.articleUrl"
        :href="result.articleUrl"
        class="text-blue-300"
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
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
    },
  },
};
</script>