<template>
  <div class="contact-page">
    <b-container>
      <h1 class="page-title">Contact Us</h1>

      <b-row>
        <b-col lg="6" class="mb-5">
          <b-card class="h-100">
            <h4 class="mb-4">Send us a message</h4>
            <b-form @submit.prevent="submitForm">
              <b-form-group label="Your Name" label-for="name">
                <b-form-input id="name" v-model="form.name" placeholder="Enter your name" required />
              </b-form-group>

              <b-form-group label="Email Address" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </b-form-group>

              <b-form-group label="Subject" label-for="subject">
                <b-form-input id="subject" v-model="form.subject" placeholder="Enter message subject" required />
              </b-form-group>

              <b-form-group label="Message" label-for="message">
                <b-form-textarea
                  id="message"
                  v-model="form.message"
                  placeholder="Enter your message"
                  rows="5"
                  required
                />
              </b-form-group>

              <b-button type="submit" variant="primary" class="mt-3">Send Message</b-button>
            </b-form>
          </b-card>
        </b-col>

        <b-col lg="6">
          <b-card class="mb-4">
            <h4 class="mb-4">Contact Information</h4>
            <p class="lead">
              Have questions about our products or services? Contact us via any of the channels below.
            </p>

            <div class="d-flex align-items-center mb-3">
              <div class="contact-icon mr-3">
                <b-icon icon="envelope" font-scale="1.5" variant="primary" />
              </div>
              <div>
                <h5 class="mb-0">Email</h5>
                <p class="mb-0">
                  <a href="#">chipnest@chipnest.shop</a>
                </p>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <div class="contact-icon mr-3">
                <b-icon icon="clock" font-scale="1.5" variant="primary" />
              </div>
              <div>
                <h5 class="mb-0">Business Hours</h5>
                <p class="mb-0">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p class="mb-0">Sunday: Closed</p>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // In a real app, we would submit the form to a backend
      this.$bvToast.toast('Your message has been sent. We will get back to you soon!', {
        title: 'Success',
        variant: 'success',
        solid: true
      })

      // Reset the form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(21, 83, 142, 0.1);
}

.map-responsive {
  overflow: hidden;
  padding-bottom: 0;
  position: relative;
  height: 300px;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
