<template>
  <div>
    <div class="pt-4 d-flex justify-content-between p-3">
      <div class="ml-auto mr-auto align-self-center">
        <p class="font-weight-bold pt-2">Transactions</p>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-6 mr-auto ml-auto mt-3">

          <div v-if="$fetchState.pending" class="centered">
            <div class="d-flex align-item-center">
              <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div v-else-if="$fetchState.error" class="centered">
            <div class="d-flex align-item-center">
              <p class="text-secondary text-center">An error occured. Please try again.</p>
            </div>
          </div>

          <div v-else>
            <div class="mt-2">

              <div v-if="!transactions.length" class="centered d-lg-none">
                <p class="text-secondary text-center">No transactions yet</p>
              </div>

              <div v-if="!transactions.length" class="d-none d-lg-block text-center mt-5">
                <p class="text-secondary text-center">No transactions yet</p>
              </div>

              <div v-else class="border p-4 rounded">
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
                      class="mb-1 font-weight-bold text-dark align-self-center"> Credit</small>
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

  data() {
    return {
      transactions: [],
    }
  },

  async fetch() {
    let transactions = await this.$axios.get(this.$config.apiURL + '/transactions');
    this.transactions = transactions.data.data;
  },

  methods: {
    showWithdrawalModal() {
      this.$modal.show('withdraw-modal');
    },

    showFundingModal() {
      this.$modal.show('fund-modal');
    },

    async withdrawFunds() {
      var l = Ladda.create(document.querySelector('#withdraw-button'));
      l.start();
      try {
        let response = await this.$axios.$post(`${this.$config.apiURL}/transfers`, {
          amount: this.form.amount,
        });

        if (response) {
          l.stop();
          this.$toast.success(response.message);
          this.$modal.hide('withdraw-modal');
          this.$nuxt.refresh();
        }

      } catch (e) {

        l.stop();
        if (e.response.status == 422) {
          for (let item in e.response.data.errors) {
            this.$toast.error(e.response.data.errors[item]);
          }
        }
        if (e.response.status == 400) {
          this.$toast.error(e.response.data.message);
        }
      }
    },
  }
}
</script>

<style scoped>
.vertical {
  margin-top: 100px;
}

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
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

.transaction-image {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
}

.money-text {
  font-size: 35px;
}
</style>
