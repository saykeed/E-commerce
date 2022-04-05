<template>
  <div class="orderSummary">
      <div class="imageAndInfo">
          <div class="imgBox">
            <img :src="product.image" alt="product image">
          </div>
          <h4>{{ product.title }}</h4>
      </div>
      <p>${{ product.price }} </p>
  </div>
</template>

<script>
export default {
    props: ['product'],
    mounted() {
        this.$emit('updatePrice', this.product.price)
    }
    
}
</script>

<style scoped>
    .orderSummary{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        width: 100%;
        margin: 10px auto;
        border-bottom: 1px solid rgba(0, 0, 0, 0.263);
    }
    .imageAndInfo{
        display: flex;
        align-items: center;
        height: 80px;
        width: 80%;
    }
    .imgBox{
        width: 50px;
        height: 100%;
        padding: 5px;
    }
    .imgBox img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .imageAndInfo h4{
        width: 250px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 15px;
    }

    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>