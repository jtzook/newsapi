<template>
  <button :class="buttonTailwind">
    <div class="flex flex-row justify-between items-center">
      <span :class="{ 'font-bold': sortDirection.length }">sort</span>
      <div class="flex flex-col ml-1 font-light">
        <span
          class="h-3"
          :class="{ 'font-bold': sortDirection === 'ascending' }"
        >^</span>
        <span class="h-1" />
        <span
          class="h-3 transform rotate-180"
          :class="{ 'font-bold': sortDirection === 'descending' }"
        >^</span>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    sortDirection: {
      type: String,
      default: 'ascending'
    }
  },

  data () {
    return {
      buttonTailwind: [
        'my-1',
        'py-1 px-3',
        'bg-blue-500',
        'text-white',
        'font-semibold',
        'rounded-lg',
        'shadow-md',
        'hover:bg-blue-700 focus:outline-none'
      ]
    }
  }
}
</script>
