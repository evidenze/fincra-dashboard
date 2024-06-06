<template>
  <div>
    <div class="pt-4 d-flex pl-3">
      <div class="ml-auto mr-auto align-self-center">
        <p class="font-weight-bold pt-3">Wallet</p>
      </div>
      <div>
        <div style="width:24px;height: 24px;"></div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-6 mr-auto ml-auto">

          <div class="balance-section mt-5 text-center">
            <div class="mr-auto ml-auto">
              <p>My wallet balance</p>
              <span class="money-text font-weight-bold">&#8358;{{ Intl.NumberFormat().format(this.$auth.user.balance)
                }}</span> &nbsp;&nbsp;
            </div>
          </div>


          <div class="mt-3">
            <div class="mb-2" style="cursor:pointer;">
              <nuxt-link to="/withdraw" class="sign_btn2 btn btn-block">Withdraw funds</nuxt-link>
            </div>
            <nuxt-link to="/fund-wallet" class="sign_btn btn btn-block">Fund wallet</nuxt-link>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware({ $auth, redirect }) {

  },

  data() {
    return {
      transactions: [],
    }
  },


  async fetch() {
    let transactions = await this.$axios.get(`${this.$config.apiURL}/transactions`);
    this.transactions = transactions.data.data;
    await this.$auth.fetchUser();
  },
  methods: {

  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.money-text {
  font-size: 22px;
}
</style>
