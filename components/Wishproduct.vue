<template>
    <transition name="wish" appear>
        <div class="recoproducts">
            <NuxtLink :to="`/Details/${product.id}`">
                <div class="recoproductsImgBox">
                    <img :src="product.image" alt="">
                </div>
            </NuxtLink>
            <p class="title">{{ product.title }}</p>
            <p class="price">${{ product.price }} <i @click="addToCart(product.id)" class="material-icons">shopping_cart</i></p> 
            <i class="material-icons wish" @click="deleteFromLS(product.id)">favorite</i>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            
        }
    },
    methods: {
        // function that deletes from local storage
        deleteFromLS (id) {
            let favs = JSON.parse(localStorage.getItem('favorites'))
            localStorage.setItem('favorites', JSON.stringify(favs.filter(favId => favId !== id)))
            this.$emit('reloadCart', this.product.id)
        },
        // section for adding to cart functions

        addToCart(id) {
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', '[]')
            }
            let carted = JSON.parse(localStorage.getItem('cart'))
            if (carted.includes(id)) {
                alert('this product has been added to cart')
            } else {
                let oldData = JSON.parse(localStorage.getItem('cart'))
                oldData.push(id)
                localStorage.setItem('cart', JSON.stringify(oldData))
            }
            
        },
    }

}
</script>

<style>
div.recoproducts{
    width: 46%;
    margin: 3% 2%;
    position: relative;
    padding: 5px;
}
.recoproducts i.wish{
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(250, 250, 250, 0.159);
    transition: all .5s ease-in-out
}
.recoproducts i.wish:active{
    background: transparent;
    animation: stagger 1s ease-in-out;
}

@keyframes stagger{
    0%{transform: translateY(0)}
    20%{transform: translateY(10px)}
    40%{transform: translateY(-20px)}
    60%{transform: translateY(0px)}
    80%{transform: translateY(0px)}
    100%{transform: translateY(0px)}
}
.recoproductsImgBox{
    width: 100%;
    height: 200px;
    overflow: hidden;
}
.recoproducts img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s ease-in-out;
}
.recoproducts img:hover{
   transform: scale(1.2);
}
.recoproducts p.title{
    margin: 5px 0;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.recoproducts .price{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.recoproducts .price i{
    vertical-align: middle;
}
.wish-enter{
    opacity: 0;
    transform: scale(0.5);
}
.wish-leave-to {
  opacity: 0;
}
.wish-enter-active{
    transition: opacity .5s ease-in-out;
} 
.wish-leave-active {
  transition: opacity .5s ease-in-out;
  position: absolute;
}
.wish-move{
    transition: all 0.5s ease;
}
</style>