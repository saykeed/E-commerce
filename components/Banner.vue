<template>
  <div class="banner">
      <Homeslider 
        v-for="(banner, index) in banners" :key="banner.index"
        :banner="banner"
        :slideName="slideName"
        :index="index"
        :visibleSlide="visibleSlide"
      />

      <div class="slide_controls">
          <i class="material-icons left" @click="prev">chevron_left</i>
          <i class="material-icons right" @click="next">chevron_right</i>
      </div>

      <div class="slider_indicator">
          <span v-for="(banner, index) in banners" 
            :key="banner.index"
            :class="{active: visibleSlide == index}"
            >
          </span>
      </div>
      <Sliderinfo 
          v-for="(banner, index) in banners"
          :key="banner.img"
          :banner="banner"
          :index="index"
          :visibleSlide="visibleSlide"
          :slideName="slideName"
      />
  
  </div>
</template>

<script>
export default {
    data() {
        return {
            banners: [
                {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider1_2700x.jpg?v=1628696608', para: 'SUMMER 2022', head: 'New Arrival Collection'},
                {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider2_2700x.jpg?v=1628696608', para: 'NEW SEASON', head: 'Lookbook Collection'},
                {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider3_2700x.jpg?v=1628696608', para: 'SUMMER SALE', head: 'Save up to 70%'}
            ],
            visibleSlide: 0,
            slideName: '',
            timer: null
        }
    },
    methods: {
        prev() {
            this.slideName = 'right'
            if(this.visibleSlide <= 0) {
                this.visibleSlide = this.banners.length-1
            } else {
                this.visibleSlide--
            }
        },
        next() {
            this.slideName = 'left'
            if(this.visibleSlide >= this.banners.length -1) {
                this.visibleSlide = 0
            } else {
                this.visibleSlide++
            }
        }
    },
    mounted() {
        setInterval(() => {
            this.next()
        }, 5000);
    }
}
</script>

<style>
    .banner{
         position: relative;
         height: 200px;
    }
    .slide_controls i{
        position: absolute;
        bottom: 15px;
        font-size: 30px;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.364);
        color: white;
        cursor: pointer;
    }
    .slide_controls i.left{
         left: 10px
    }
    .slide_controls i.right{
         right: 10px
    }
    .slider_indicator{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
    .slider_indicator span{
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.275);
        margin: 0 5px
    }
    .slider_indicator span.active{
        background: rgb(0, 0, 0);
    }




    /*for the responsieve screen of md and above*/
        @media screen and (min-width:800px){
            .banner{
                height: 400px;
            }
        }
</style>

/*



*/