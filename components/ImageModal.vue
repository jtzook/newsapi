<template>
  <div
    v-if="visible"
    class="fixed top-0 mt-2 bg-gray-900 h-screen w-full flex items-center justify-center"
    :style="{ '--bg-opacity': 0.7 }"
  >
    <div class="bg-white p-1 bordered">
      <img :src="imageUrl" alt="full thumbnail image" class="modal-image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-image {
  max-width: 500px;
  max-height: 285px;
}
</style>
