<template>
        <div class="container mb-5 mt-lg-5">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto p-4">
                <h4 class="p-text pb-4 pt-4">Sign Up</h4>

                    <form @submit.prevent="submit">

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                              <label>Username</label>
                                <input placeholder="Username" id="username" type="text" class="form-control" v-model="form.username" required autocomplete="username">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                              <label>Email</label>
                                <input placeholder="Email" id="email" type="text" class="form-control" v-model="form.email" required autocomplete="email">
                            </div>
                        </div>
                       

                       <div class="form-group row">
                          <div class="col-md-12">
                            <label>Password</label>
                            <input v-model="form.password" id="password" type="password" class="form-control" name="password" autocomplete="off">
                          </div>
                        </div><br>

                        <div class="form-group row mb-0">
                            <div class="col-md-12">
                                <button id="signup" data-style="slide-right" type="submit" class="ladda-button btn sign_btn font-weight-bold btn-block">
                                    Sign up
                                </button>
                            </div>
                        </div>

                        <p class="text-center pt-4 text-secondary">Already have an account? <nuxt-link class="font-weight-bold resend-link" to="/login">
                            Log in
                        </nuxt-link></p>

                    </form>
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
                password: "",
                username: "",
                email: ""
            },
            is_disabled: false,
            loading: false,
        }
    },

    methods: {
        async submit() {
          var l = Ladda.create(document.querySelector('#signup'));
          l.start();
          try {
          let response = await this.$axios.$post(this.$config.apiURL+'/register', this.form);

          if (response) {
            let login = await this.$auth.loginWith('local', { data: this.form })
            if(login) {
              this.$router.push('/dashboard');
            }
          }
        } catch (e) {
          l.stop();
          if(e.response.status == 422) {
            for (let item in e.response.data.errors) {
              this.$toast.error(e.response.data.errors[item]);
            }
          }
          if(e.response.status == 500 || e.response.status == 400) {
            this.$toast.error(e.response.data.message);
          }
        }
    },
  }
}
</script>

<style scoped>

.card{
  border-radius: 10px;
}

.login_div{
    padding: 20px 80px;
  }

  .resend-link {
  color: #F2AF2E;
}



.p-text {
  font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 20px;
letter-spacing: -0.408px;
color: #000000;

}

@media (max-width: 768.98px) {
  .login_div{
    padding: 30px 20px;
  }
}
</style>
