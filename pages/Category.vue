<template>
    <div class="category">
        <div class="categories" v-for="link in links" :key="link.text">
          <NuxtLink :to="`/Categories/${link.route}`">
            <img :src="link.image" alt="category image">
          </NuxtLink>
            <p>{{ link.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return{
      links: [
        {image: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/27/834243/1.jpg?3923', text: 'Jewelries', route: 'jewelery'},
        {image: 'https://media.istockphoto.com/photos/mobile-devices-picture-id178716575?k=20&m=178716575&s=612x612&w=0&h=Cpbs-ivT4RGz--xBlXFrHhTTPX5kaEcRd4FK4koduWM=', text: 'Electronics', route: 'electronics'},
        {image: 'https://st.depositphotos.com/1007995/1274/i/600/depositphotos_12746726-stock-photo-fashion-man-wearing-sunglasses-thinking.jpg', text: 'Men\'s Clothing', route: 'men\'s clothing'},
        {image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBjbG90aGVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80', text: 'Women\'s Clothing', route: 'women\'s clothing'}
      ]
    }
  }
}
</script>

<style scoped>
    div.category{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
    }
    .category a{
      text-decoration: none;
    }
    .categories{
      width: 30vw;
      height: 30vw;
      margin: 2% auto;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
    }
    .categories img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .categories p{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      text-align: center;
      color: green;
    }
</style>