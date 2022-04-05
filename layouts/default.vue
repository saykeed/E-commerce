<template>
    <div class="default">
        <Bignav class="default_bignav" />
        <Sidebar class="default_sidebar" v-if="showSidebar" @emitCloseSidebar="controlSidebar"/>
        <Topnav class="default_topnav" @togSidebar="controlSidebar"/>
        <Nuxt class="webPages"/>
        <Footer class="default_footer"/>
    </div>
</template>

<script>
export default {
    data() {
        return{
            showSidebar: false
        }
    },
    methods: {
        controlSidebar() {
            this.showSidebar = !this.showSidebar
        }
    }
}
</script>

<style scoped>
    .default{
        position: relative;
        width: 100%;
    }
    .default_sidebar{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999999;
    }
    .default_topnav{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999999;
    }
    .default_bignav{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999999;
        display: none;
    }
    .default_footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 999999;
    }
    .webPages{
        margin: 70px auto;
    }


    /*for the responsieve screen of md and above*/
        @media screen and (min-width:800px){
            .default_bignav{
                display: flex;
            }
            .default_topnav, .default_footer{
                display: none;
            }
        }
</style>