
<script>
export default {};
</script>

<template>
<div>
  <h1>Welcome</h1>
    <object type="image/svg+xml" data="../../public/images/rent-a-rat-vector.svg" class="svg-object"></object>
  <RouterLink to="/renter">
    <button>I am a Renter</button>
  </RouterLink>
  <RouterLink to="/rentee">
    <button>I am a Rentee</button>
  </RouterLink>
</div>
</template>

<style scoped>
.svg-object {
  max-width: 100%;
}
</style>