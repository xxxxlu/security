import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    currency: 'Rs.'
  },
  getters: {
    products: state => state.products,
    cart: state => state.cart,
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, { product, quantity }) {
      const existingProduct = state.cart.find(item => item.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity
        })
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
    initializeProducts({ commit }) {
      // In a real app, we would fetch from an API
      const products = [
        {
          id: 1,
          name: "2 HD CCTV Cameras Package Dahua",
          price: 27500,
          originalPrice: 28400,
          description: "Complete 2 Camera HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2019/08/2-camera.jpg",
          stock: 15
        },
        {
          id: 2,
          name: "4 HD CCTV Cameras Package Dahua",
          price: 40500,
          originalPrice: 42500,
          description: "Complete 4 Camera HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2019/08/4-camera.jpg",
          stock: 12
        },
        {
          id: 3,
          name: "8 HD CCTV Camera Package Dahua",
          price: 68000,
          originalPrice: 72000,
          description: "Complete 8 Camera HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2019/08/8-camera.jpg",
          stock: 8
        },
        {
          id: 4,
          name: "2 FHD CCTV Camera Package Dahua",
          price: 29500,
          originalPrice: 30600,
          description: "Complete 2 Camera Full HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2019/08/2-camera.jpg",
          stock: 10
        },
        {
          id: 5,
          name: "4 FHD CCTV Cameras Package Dahua",
          price: 41500,
          originalPrice: 44000,
          description: "Complete 4 Camera Full HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2019/08/4-camera.jpg",
          stock: 7
        }
      ]

      // Add more products to make 35 total
      for (let i = 6; i <= 35; i++) {
        const isHikvision = i % 2 === 0;
        const cameraCount = [2, 4, 8][Math.floor(Math.random() * 3)];
        const type = ['HD', 'FHD', 'Full HD IP'][Math.floor(Math.random() * 3)];
        const brand = isHikvision ? 'HIKVISION' : 'Dahua';

        let basePrice;
        if (type === 'HD') {
          basePrice = cameraCount === 2 ? 27500 : cameraCount === 4 ? 41000 : 67500;
        } else if (type === 'FHD') {
          basePrice = cameraCount === 2 ? 29500 : cameraCount === 4 ? 41500 : 72000;
        } else {
          basePrice = cameraCount === 2 ? 57000 : cameraCount === 4 ? 79000 : 140500;
        }

        // Vary price slightly
        const price = Math.min(49999, basePrice + Math.floor(Math.random() * 1000) - 500);
        const originalPrice = Math.floor(price * 1.05);

        products.push({
          id: i,
          name: `${cameraCount} ${type} CCTV Camera Package ${brand}`,
          price,
          originalPrice,
          description: `Complete ${cameraCount} Camera ${type} CCTV system with ${brand} technology, including DVR and installation`,
          category: "CCTV Package",
          image: `https://securityexperts.pk/wp-content/uploads/2019/08/${cameraCount}-camera.jpg`,
          stock: Math.floor(Math.random() * 15) + 5
        });
      }

      commit('setProducts', products)
    },
    addToCart({ commit }, { product, quantity = 1 }) {
      commit('addToCart', { product, quantity })
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('updateCartItemQuantity', { productId, quantity })
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
})
