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
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 15
        },
        {
          id: 2,
          name: "4 HD CCTV Cameras Package Dahua",
          price: 40500,
          originalPrice: 42500,
          description: "Complete 4 Camera HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-4-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 12
        },
        {
          id: 3,
          name: "8 HD CCTV Camera Package Dahua",
          price: 48000,
          originalPrice: 62000,
          description: "Complete 8 Camera HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/Hikvision-CCTV-camera-price-in-Lahore-Pakistan-8-Analog-CCTV-Cameras-Package-securityexperts.pk_.jpg",
          stock: 8
        },
        {
          id: 4,
          name: "2 FHD CCTV Camera Package Dahua",
          price: 29500,
          originalPrice: 30600,
          description: "Complete 2 Camera Full HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-1.jpg",
          stock: 10
        },
        {
          id: 0,
          name: "4 FHD CCTV Cameras Package Dahua",
          price: 41500,
          originalPrice: 44000,
          description: "Complete 4 Camera Full HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 7
        },
        {
          id: 5,
          name: "4 FHD CCTV Cameras Package Dahua",
          price: 41500,
          originalPrice: 44000,
          description: "Complete 4 Camera Full HD CCTV system with Dahua technology, including DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 7
        },
        {
          id: 6,
          name: "4 FHD CCTV Camera Package HIKVISION",
          price: 41800,
          originalPrice: 44800,
          description: "Premium 4 Camera Full HD CCTV system with Hikvision technology, includes DVR and professional installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 5
        },
        {
          id: 7,
          name: "4 HD CCTV Cameras Package Dahua",
          price: 40500,
          originalPrice: 42500,
          description: "High-definition 4 camera CCTV package with Dahua DVR, 270 feet copper wire, and complete installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 9
        },
        {
          id: 8,
          name: "4 HD CCTV Cameras Package HIKVISION",
          price: 41000,
          originalPrice: 43800,
          description: "Complete 4 HD camera security system with Hikvision technology, 270 feet copper wire and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 6
        },
        {
          id: 9,
          name: "2 HD CCTV Cameras Package Dahua",
          price: 27500,
          originalPrice: 28400,
          description: "Entry-level 2 camera HD CCTV system with Dahua technology, includes DVR and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 12
        },
        {
          id: 10,
          name: "2 HD CCTV Cameras Package HIKVISION",
          price: 27800,
          originalPrice: 28500,
          description: "Basic 2 camera HD security system with Hikvision technology, includes DVR and professional installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 8
        },
        {
          id: 11,
          name: "2 FHD CCTV Camera Package Dahua",
          price: 29500,
          originalPrice: 30600,
          description: "Full HD 2 camera security system with Dahua DVR, includes 150 feet copper wire and installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 10
        },
        {
          id: 12,
          name: "2 FHD CCTV Camera Package HIKVISION",
          price: 29800,
          originalPrice: 31000,
          description: "Premium 2 camera Full HD security system with Hikvision technology and complete installation",
          category: "CCTV Package",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 7
        },
        {
          id: 13,
          name: "Time Attendance Machine K40 ZKTECO",
          price: 21500,
          originalPrice: 23500,
          description: "Biometric fingerprint attendance system with 1000 fingerprint templates, 80,000 transaction capacity",
          category: "Attendance Machine",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/K40-securityexperts.pk_.jpg",
          stock: 15
        },
        {
          id: 14,
          name: "Biometric Attendance Machine-K50_ZKTeco",
          price: 22500,
          originalPrice: 24500,
          description: "Advanced biometric attendance system with fingerprint and RFID card support, includes 1-year warranty",
          category: "Attendance Machine",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/K40-securityexperts.pk_.jpg",
          stock: 12
        },
        {
          id: 15,
          name: "Wireless N Router-TL-WR840N TP Link",
          price: 5500,
          originalPrice: 6500,
          description: "Basic wireless router with N300 speed, perfect for small homes and basic internet usage",
          category: "Network Equipment",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 25
        },
        {
          id: 16,
          name: "N300 Wireless Wifi Router Tenda",
          price: 4500,
          originalPrice: 5500,
          description: "Budget-friendly wireless router with 300Mbps speed, suitable for basic home internet needs",
          category: "Network Equipment",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 30
        },
        {
          id: 17,
          name: "F16 IP65 Rated Outdoor Fingerprint Access Control Terminal",
          price: 27500,
          originalPrice: 29000,
          description: "Waterproof outdoor fingerprint access control terminal with IP65 rating for secure entry management",
          category: "Access Control",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/K40-securityexperts.pk_.jpg",
          stock: 8
        },
        {
          id: 18,
          name: "Biometric Attendance Machine ZKTeco-MB20",
          price: 31500,
          originalPrice: 34000,
          description: "Advanced biometric attendance system with large capacity and multiple authentication methods",
          category: "Attendance Machine",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/K40-securityexperts.pk_.jpg",
          stock: 7
        },
        {
          id: 19,
          name: "UA860 Fingerprint Time & Attendance Terminal",
          price: 33500,
          originalPrice: 38000,
          description: "Professional time and attendance terminal with fingerprint and card authentication options",
          category: "Attendance Machine",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/K40-securityexperts.pk_.jpg",
          stock: 6
        },
        {
          id: 20,
          name: "Dahua KTA03 Video Intercom KIT",
          price: 34500,
          originalPrice: 37000,
          description: "Complete video intercom system for homes and offices, includes monitor and door station",
          category: "Video Intercom",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 5
        },
        {
          id: 21,
          name: "4TB WD Purple Surveillance Hard Drive",
          price: 18500,
          originalPrice: 19800,
          description: "Specialized 4TB hard drive designed for 24/7 surveillance recording with enhanced durability",
          category: "Accessories",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 15
        },
        {
          id: 22,
          name: "6TB WD Purple Surveillance Hard Drive",
          price: 28500,
          originalPrice: 29900,
          description: "High-capacity 6TB surveillance-grade hard drive, optimized for DVRs and NVRs with 24/7 operation",
          category: "Accessories",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 12
        },
        {
          id: 23,
          name: "TP-Link Archer C6 AC1200 Wireless Router",
          price: 8500,
          originalPrice: 9500,
          description: "Dual-band AC1200 wireless router with Gigabit Ethernet ports for high-speed home networking",
          category: "Network Equipment",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 20
        },
        {
          id: 24,
          name: "Dahua 2MP HD Bullet Camera",
          price: 6500,
          originalPrice: 7500,
          description: "2 Megapixel HD bullet security camera with night vision and weatherproof design",
          category: "CCTV Camera",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 25
        },
        {
          id: 25,
          name: "Hikvision 2MP HD Dome Camera",
          price: 6800,
          originalPrice: 7800,
          description: "2 Megapixel HD dome security camera with IR night vision for indoor surveillance",
          category: "CCTV Camera",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 22
        },
        {
          id: 26,
          name: "Dahua XVR5108HS-4KL-I2 8 Channel DVR",
          price: 24500,
          originalPrice: 26000,
          description: "Advanced 8-channel DVR with 4K support, AI features, and remote viewing capability",
          category: "DVR",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 10
        },
        {
          id: 27,
          name: "Hikvision DS-7208HUHI-K2 8 Channel DVR",
          price: 25800,
          originalPrice: 27500,
          description: "Professional 8-channel DVR with H.265+ compression and smart features for efficient recording",
          category: "DVR",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 8
        },
        {
          id: 28,
          name: "IMOU Ranger 2 Wi-Fi Camera",
          price: 8500,
          originalPrice: 9500,
          description: "360° pan/tilt wireless security camera with motion detection and two-way audio",
          category: "Wireless Camera",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 18
        },
        {
          id: 29,
          name: "TP-Link Tapo C200 Wi-Fi Camera",
          price: 7500,
          originalPrice: 8500,
          description: "Pan/tilt home security camera with 1080p resolution, night vision, and motion detection",
          category: "Wireless Camera",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 20
        },
        {
          id: 30,
          name: "5-Amp 12V DC Power Supply",
          price: 3500,
          originalPrice: 4000,
          description: "High-quality 5-Amp 12V DC power supply for CCTV cameras and security systems",
          category: "Accessories",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 30
        },
        {
          id: 31,
          name: "8-Port PoE Network Switch",
          price: 12500,
          originalPrice: 13800,
          description: "8-port Power over Ethernet switch for IP cameras and other PoE devices",
          category: "Network Equipment",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 15
        },
        {
          id: 32,
          name: "4-Channel Network Video Recorder (NVR)",
          price: 18500,
          originalPrice: 19800,
          description: "4-channel NVR for IP camera systems with remote viewing and playback capabilities",
          category: "NVR",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 12
        },
        {
          id: 33,
          name: "270 Feet BNC Copper Wire Bundle",
          price: 4500,
          originalPrice: 5000,
          description: "High-quality copper wire bundle with pre-attached BNC connectors for CCTV camera installation",
          category: "Accessories",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts.pk_.jpg",
          stock: 25
        },
        {
          id: 34,
          name: "21.5-inch LED Monitor for CCTV",
          price: 16500,
          originalPrice: 17800,
          description: "High-resolution LED monitor ideal for viewing CCTV camera feeds and playback",
          category: "Accessories",
          image: "https://securityexperts.pk/wp-content/uploads/2024/12/CCTV-Camera-Dahua-price-in-Lahore-Analog-2-cctv-cameras-price-in-Pakistan-securityexperts-2.jpg",
          stock: 10
        }
      ]

      // Add more products to make 35 total

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
