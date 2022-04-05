<template>
  <div class="recommended">
        <div class="recomendHeader">
            <h3>Recommeded for you</h3>
        </div>
        <Loading v-if="loader"/>
        <Network v-if="network" />
        <div class="recoProductsBox" v-if="products">
            <Recoproducts
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            products: null,
            loader: false,
            network: false
        }
    },
    methods: {
        async fetchAllProducts() {
            this.loader = true
            await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                this.products = data
                this.loader = false
            })
            .catch(err => {
                this.loader = false
                this.network = true
                console.log('shit',err.message)
            })
        }
    },
    computed: {
        
    },
    mounted() {
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
        justify-content: space-around;
        width: 100%;
        max-width: 900px;
        margin: 10px auto;
    }

    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        
    }
</style>