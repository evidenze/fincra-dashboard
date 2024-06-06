<template>
  <div class="login_div">
    <div>
      <div class="container mt-lg-5">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-4">

            <form @submit.prevent="submit" class="mt-4">
              <div class="form-group row">
                <div class="col-md-12">
                  <input placeholder="Email" v-model="form.email" id="email" type="email" class="form-control shadow-sm"
                    value="">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <div class="input-group">
                    <input placeholder="Password" v-model="form.password" id="password" type="password"
                      class="form-control shadow-sm" name="password" style="border-right:none;">
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i @click="togglePassword" style="color:#000" class="bi-eye-slash" id="togglePassword"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0 mt-4">
                <div class="col-md-12">
                  <button id="my-button" data-style="slide-right" type="submit"
                    class="ladda-button btn sign_btn btn-block mb-3"> Login </button>

                  <p class="text-center">Don't have an account? <nuxt-link class="font-weight-bold" to="/register">Sign
                      up </nuxt-link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as Ladda from 'ladda';

export default {
  auth: 'guest',

  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      register: {
        email: null,
      },
      is_disabled: false,
      loading: false
    }
  },

  methods: {
    togglePassword() {
      const togglePassword = document.querySelector("#togglePassword");
      const password = document.querySelector("#password");


      const type = password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);

      togglePassword.classList.toggle("bi-eye");

    },
    async submit() {
      var l = Ladda.create(document.querySelector('#my-button'));
      l.start();
      try {
        let response = await this.$auth.loginWith('local', { data: this.form })
      } catch (e) {
        l.stop();
        if (e.response.status == 422) {
          for (let item in e.response.data.errors) {
            this.$toast.error(e.response.data.errors[item]);
          }
        }
        if (e.response.status == 500 || e.response.status == 400) {
          this.$toast.error(e.response.data.message);
        }
      }
    },
  },
}
</script>

<style scoped>
.input-group-text {
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  border-left: none;
}

.nuxt-link-active {
  border-top: none;
}

body {
  background: #fffde7;
}

.card {
  border-radius: 10px;
}

nuxt-link:hover {
  text-decoration: none;
}

.login_div {
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
}

p {
  margin: 0;
}

h4 {
  margin: 0;
}

@media (max-width: 768.98px) {}
</style>
