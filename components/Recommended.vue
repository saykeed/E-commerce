<template>
  <div class="recommended">
        <div class="recomendHeader">
            <p>Recommeded for you</p>
        </div>
        <Loading v-if="!products"/>
        <div class="recoProductsBox">
            <Recoproducts
            v-for="product in products"
            :key="product.id"
            :product="product"
            />
        </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(['fetchAllProducts'])
    },
    computed: {
        ...mapGetters(['getProducts']),
        products() {
            return this.getProducts
        }
    },
    created() {
        this.fetchAllProducts()
    }
}
</script>

<style>
    .recomendHeader{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        width: 100%;
    }
    .recoProductsBox{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        margin: 10px auto;
    }
</style>