<template>
    <transition :name="slideName">
        <div :class="{bannerTextRight: index == 1, bannerTextLeft: index != 1}"  
            v-show="index == visibleSlide">
            <p>{{ banner.para }}</p>
            <h2>{{ banner.head }}</h2>
            <div class="sliderinfo_btn">Explore Now</div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['index', 'visibleSlide', 'banner', 'slideName']
}
</script>

<style scoped>
    .bannerTextLeft{
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    .bannerTextRight{
        text-align: right;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
    }
    p{
        font-size: 13px;
    }
    h2{
        margin: 2px 0;
    }
    .sliderinfo_btn{
        background: black;
        width: 140px;
        padding: 10px;
        color: white;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
    }
    .left-enter-active{
        animation: dropin 1s ease-in-out;
    }
    .left-leave-active{
        animation: dropout 1s ease-in-out
    }
    .right-enter-active{
        animation: jumpin 1s ease-in-out;
    }
    .right-leave-active{
        animation: jumpout 1s ease-in-out
    }
    @keyframes dropin{
        from{opacity: 0;
            transform: translateY(-100px);}
        to{opacity: 1; }
    }
    @keyframes dropout{
        from{opacity: 1;}
        to{opacity: 0;
        transform: translateY(100px);}
    }
    @keyframes jumpin{
        from{opacity: 0;
            transform: translateY(100px);}
        to{opacity: 1; }
    }
    @keyframes jumpout{
        from{opacity: 1;}
        to{opacity: 0;
        transform: translateY(-100px);}
    }



    /*for the responsieve screen of md and above*/
        @media screen and (min-width:800px){
            p{
                font-size: 20px;
            }
            h2{
                font-size: 50px;
            }
            .sliderinfo_btn{
                background: black;
                width: 200px;
                padding: 10px;
                color: white;
                text-align: center;
                font-size: 20px;
                font-weight: 500;
                cursor: pointer;
                display: inline-block;
            }
        }
</style>



/*


*/