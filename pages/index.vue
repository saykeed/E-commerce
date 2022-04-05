<template>
  <div class="index">
      <div class="bannerWrap">
        <Banner />
      </div>
      <div class="recommended_box">
        <Recommended />
      </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  name: 'IndexPage'
  
}
</script>

<style scoped>
    .index{
      margin: 70px auto;
    }
    .bannerWrap{
      width: 100%;
      overflow: hidden;
    }




    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
    
</style>