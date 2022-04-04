<template>
    <div class="cats">
        <Loading 
            v-if="!categories"
        />
        <Recoproducts
            v-for="product in categories"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script>
export default {
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

<style>
    .cats{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 10px auto;
    }
</style>