<template>
    <div class="cats">
        <Loading 
            v-if="!categories"
        />
        <div class="catsProductBox">
            <Recoproducts
                v-for="product in categories"
                :key="product.id"
                :product="product"
            />
        </div>
    </div>
</template>

<script>
export default {
    layout: 'default',
    data() {
        return {
            query: this.$route.params.category,
            categories: null
        }
    },
    methods: {
        async fetchProducts() {
            await fetch('https://fakestoreapi.com/products/category/' + this.query)
            .then(res => res.json())
            .then(data => this.categories = data)
            .catch(err => console.log(err))
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>

<style scoped>
    .cats{
        width: 100%;
    }
    .catsProductBox{
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