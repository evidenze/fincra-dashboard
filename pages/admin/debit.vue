<template>
  <div>
    <div class="pt-4 d-flex pl-3">
      <div class="ml-auto mr-auto align-self-center">
        <p class="font-weight-bold pt-3">Debit customer's wallet</p>
      </div>
      <div>
        <div style="width:24px;height: 24px;"></div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4 mr-auto ml-auto mt-3">
          <div class="row mt-4">
            <div class="col-md-12 ml-auto mr-auto">
              <form @submit.prevent="debitWallet">
                <div class="form-group row">
                  <div class="col-md-12">
                    <input min="0" placeholder="Amount" v-model="amount" type="number" class="auth-input form-control"
                      autocomplete="off">
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-12">
                    <input placeholder="Wallet ID" v-model="wallet_id" type="text" class="auth-input form-control"
                      autocomplete="off">
                  </div>
                </div>

                <div class="form-group row mb-0 mt-3">
                  <div class="col-md-12">
                    <button id="debit-button" data-style="slide-right" type="submit"
                      class="ladda-button btn sign_btn btn-block mb-3">Debit Wallet</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Ladda from 'ladda';

export default {
  layout: 'admin',
  middleware({ $auth, redirect }) {
    if ($auth.user.is_admin !== true) {
      return redirect('/dashboard');
    }
  },
  data() {
    return {
      amount: '',
      wallet_id: '',
      loading: false,
      disabled: false
    }
  },

  methods: {
    async debitWallet() {
      var l = Ladda.create(document.querySelector('#debit-button'));
      l.start();
      try {
        let response = await this.$axios.$post(`${this.$config.apiURL}/admin/debit`, {
          amount: this.amount,
          wallet_id: this.wallet_id
        });

        if (response) {
          l.stop();
          this.$toast.success(response.message);
          this.$router.push('/admin/dashboard');
        }

      } catch (e) {
        l.stop();
        console.log(e.response);
        if (e.response.status == 422) {
          for (let item in e.response.data.errors) {
            this.$toast.error(e.response.data.errors[item]);
          }
        }
        if (e.response.status == 400) {
          this.$toast.error(e.response.data.error);
        }
      }
    },
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.login_div {
  padding: 20px 80px;
}

@media (max-width: 768.98px) {
  .login_div {
    padding: 30px 20px;
  }
}
</style>