<template>
  <div class="page">
    <NavBar />
    <div class="content flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  // components: {
  //   NavBar,
  // },
};
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
}

.content {
  margin-top: 80px;
  padding: 25px 35px;
}
</style>
