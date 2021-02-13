<template lang="ts">
  <div id="footer" class="italic text-left m-6">
    <span v-if="totalArticleCount">
      Showing {{ currentArticleCount }} of {{ totalArticleCount }} result{{
        totalArticleCount == 1 ? '' : 's'
      }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    currentArticleCount: {
      type: Number,
      default: 0
    },
    totalArticleCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
