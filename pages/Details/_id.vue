<template>
  <div class="detailsPage">
      <Loading 
        v-if="$fetchState.pending"
      />
      <Productdetail 
      v-else
      :details="details"
      />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      productID: this.$route.params.id,
      details: null
    }
  }, 
  computed: { },
  async fetch() {
    this.details = await fetch(
      'https://fakestoreapi.com/products/' + this.productID
    ).then(res => res.json())
    .catch(err => console.log(err))
  }
}
</script>

<style scoped>
  .detailsPage{
    text-align: center;
  }
  
</style>