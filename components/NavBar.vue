<template>
  <div class="nav-bar pr-12 pl-12 fixed bg-blue-500 text-gray-300">
    <nuxt-link class="flex-1 text-left link" to="/">newsapi search</nuxt-link>
  </div>
</template>

<style lang="postcss" scoped>
.nav-bar {
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  height: 40px;
  width: 100%;
  border-bottom: 2px solid black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-family: "Times";
  z-index: 1;
}

.link {
  @apply mr-3 cursor-pointer;
}

.link.right {
  @apply ml-3;
}
</style>