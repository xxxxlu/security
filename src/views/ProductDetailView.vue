<template>
  <div class="product-detail">
    <b-container v-if="product">
      <b-breadcrumb>
        <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ product.name }}</b-breadcrumb-item>
      </b-breadcrumb>

      <b-row>
        <b-col md="5">
          <b-img :src="product.image" :alt="product.name" fluid class="mb-3 product-detail-img" />
        </b-col>
        <b-col md="7">
          <h1 class="mb-3">{{ product.name }}</h1>
          <p class="mb-4">{{ product.description }}</p>

          <div class="product-price mb-4">
            <span class="price h4">{{ currency }}{{ product.price.toLocaleString() }}</span>
            <span v-if="product.originalPrice > product.price" class="original-price ml-3">
              {{ currency }}{{ product.originalPrice.toLocaleString() }}
            </span>
            <b-badge variant="success" class="ml-3" v-if="product.originalPrice > product.price">
              {{ Math.round((product.originalPrice - product.price) / product.originalPrice * 100) }}% OFF
            </b-badge>
          </div>

          <div class="mb-4">
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Availability:</strong> <span class="text-success">In Stock ({{ product.stock }} available)</span></p>
          </div>

          <div class="product-actions">
            <b-form-group label="Quantity:">
              <b-form-spinbutton v-model="quantity" min="1" :max="product.stock" class="mb-3" style="width: 150px;"></b-form-spinbutton>
            </b-form-group>

            <b-button variant="primary" class="mr-2" @click="addToCart" :disabled="product.stock <= 0">
              <b-icon icon="cart-plus" class="mr-1"></b-icon> Add to Cart
            </b-button>
            <b-button variant="success" to="/checkout" :disabled="product.stock <= 0">
              <b-icon icon="credit-card" class="mr-1"></b-icon> Buy Now
            </b-button>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <h3 class="section-title">Product Details</h3>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Description" active>
                <b-card-text>
                  <p>{{ product.description }}</p>
                  <h5>Features:</h5>
                  <ul>
                    <li>High quality cameras with night vision</li>
                    <li>Easy installation and setup</li>
                    <li>Mobile app for remote monitoring</li>
                    <li>Motion detection and alerts</li>
                    <li>Weatherproof and durable design</li>
                    <li>HD video quality</li>
                  </ul>
                </b-card-text>
              </b-tab>
              <b-tab title="Specifications">
                <b-card-text>
                  <b-row>
                    <b-col sm="3"><strong>Brand:</strong></b-col>
                    <b-col>{{ product.name.includes('HIKVISION') ? 'HIKVISION' : 'Dahua' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Model:</strong></b-col>
                    <b-col>{{ product.name.includes('HD') ? 'HD Series' : 'FHD Series' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Cameras:</strong></b-col>
                    <b-col>{{ product.name.match(/\d+/)[0] }} cameras</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Resolution:</strong></b-col>
                    <b-col>{{ product.name.includes('HD') ? '1280x720p' : '1920x1080p' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Storage:</strong></b-col>
                    <b-col>1TB HDD included</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Warranty:</strong></b-col>
                    <b-col>1 Year</b-col>
                  </b-row>
                </b-card-text>
              </b-tab>
              <b-tab title="Reviews">
                <b-card-text>
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary"></b-avatar>
                      <div class="ml-3">
                        <h5 class="mb-0">Shahid Ahmed</h5>
                        <b-form-rating readonly value="5" variant="warning" class="p-0" size="sm"></b-form-rating>
                      </div>
                    </div>
                    <p>Great product, easy installation and excellent quality. Very satisfied with my purchase.</p>
                  </div>
                  <hr />
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary"></b-avatar>
                      <div class="ml-3">
                        <h5 class="mb-0">Fatima Khan</h5>
                        <b-form-rating readonly value="4" variant="warning" class="p-0" size="sm"></b-form-rating>
                      </div>
                    </div>
                    <p>Good quality cameras, the night vision is excellent. Support is also helpful.</p>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>

      <h3 class="section-title mt-5">Related Products</h3>
      <b-row>
        <b-col v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" md="3" sm="6" class="mb-4">
          <b-card no-body class="product-card h-100 overflow-hidden">
            <div class="p-3">
              <router-link :to="'/product/' + relatedProduct.id">
                <b-img :src="relatedProduct.image" :alt="relatedProduct.name" fluid class="product-img"></b-img>
              </router-link>
              <router-link :to="'/product/' + relatedProduct.id" class="text-dark">
                <h6>{{ relatedProduct.name }}</h6>
              </router-link>
              <div>
                <span class="price">{{ currency }}{{ relatedProduct.price.toLocaleString() }}</span>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <div class="text-center py-5">
        <b-spinner label="Loading..." variant="primary"></b-spinner>
        <p class="mt-3">Loading product details...</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductDetailView',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products']),
    product() {
      return this.products.find(p => p.id === parseInt(this.id, 10))
    },
    relatedProducts() {
      if (!this.product) return []
      return this.products
        .filter(p => p.id !== parseInt(this.id, 10) && p.category === this.product.category)
        .slice(0, 4)
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', { product: this.product, quantity: this.quantity })
      this.$bvToast.toast(`${this.product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.product-detail-img {
  max-height: 400px;
  object-fit: contain;
  width: 100%;
}

.product-price {
  display: flex;
  align-items: center;
}

.review {
  margin-bottom: 1.5rem;
}
</style>
