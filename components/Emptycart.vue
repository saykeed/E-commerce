<template>
  <div class="emptycart">
        <img src="@/assets/img/emptycart.jpg" alt="image thumb" />
  </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .emptycart{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
    }
    .emptycart img{
        width: 80%;
        margin: 0 auto;
    }
</style>