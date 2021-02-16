<template>
  <transition name="fade">
    <div
      v-if="visible"
      id="overlay"
      class="fixed top-0 mt-2 bg-gray-900 h-screen w-full flex items-center justify-center"
      :style="{ '--bg-opacity': 0.7 }"
      @click="onOverlayClick"
    >
      <div class="bg-white p-1 bordered">
        <img
          ref="imageRef"
          :src="imageUrl"
          alt="full thumbnail image"
          class="modal-image"
        >
      </div>
    </div>
  </transition>
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
  },

  methods: {
    onOverlayClick (e) {
      if (e.target.className !== 'modal-image') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.modal-image {
  max-width: 500px;
  max-height: 285px;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
