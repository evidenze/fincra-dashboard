<template>
  <div>

    <div class="container d-none d-lg-block p-5">
      <h4 class="small-head">Dashboard</h4>
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-4">
              <div class="card p-3" style="border-radius:8px;">
                <p class="dsk-text2">Wallet Balance</p>
                <p class="dsk-num2 pt-3 pb-3">&#8358;{{ Intl.NumberFormat().format($auth.user.balance) }}</p>
              </div>
            </div>
          </div>

          <div class="mt-4 mb-5">
            <div class="d-flex justify-content-between mb-4">
              <p class="font-weight-bold align-self-center">Your recent activities</p>
            </div>

            <div class="mt-5" v-if="!transactions.length">
              <p class="text-center text-secondary">No recent activities</p>
            </div>

            <div v-else>
              <div>
                <div v-for="transaction in transactions" :key="transaction.id">
                  <div class="d-flex w-100 justify-content-between">
                    <div class="d-flex">
                      <div v-if="transaction.type == 'credit'" class="dot align-self-center"></div>
                      <div v-else class="dot-red align-self-center"></div>
                      <div class="ml-3">
                        <small class="font-weight-bold">&#8358;{{ Intl.NumberFormat().format(transaction.amount)
                          }}</small><br>
                        <small class="text-secondary" v-text="$moment(transaction.created_at).format('llll')"></small>
                      </div>
                    </div>
                    <small v-if="transaction.type == 'debit'"
                      class="mb-1 font-weight-bold text-dark align-self-center">Debit</small>
                    <small v-if="transaction.type == 'credit'"
                      class="mb-1 font-weight-bold text-dark align-self-center">Credit</small>
                  </div>
                  <hr>
                </div>
              </div>
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
    async logout() {

      try {
        await this.$auth.logout();
        this.$router.push('/login')
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.user-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.debit {
  background: #dc3545;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  color: #fff;
  padding: 5px;
}

.credit {
  background: #198754;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  color: #fff;
  padding: 5px;
}
</style>
