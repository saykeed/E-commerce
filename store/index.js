export const state = () => ({
    products: null,
    error: false
})

export const getters =  {
  getProducts (state) {
    return state.products
  },
  getError (state) {
    return state.error
  }
}


export const mutations = {
  updateProducts(state, data) {
    state.products = data
  },
  updateError(state, data) {
    state.error = true
  }
}


export const actions = {
  async fetchAllProducts(context) {
    await fetch('https://fakestoreapi.cm/products')
    .then(res => res.json())
    .then(data => context.commit('updateProducts', data))
    .catch(err => {
      console.log('shit',err.message)
      context.commit('updateError', data)
    })
  }
}

