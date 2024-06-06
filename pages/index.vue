<template>
  <div class="container">
    <div>

    </div>
  </div>
</template>

<script>
  export default {
  layout: 'dashboard',
    middleware({redirect}) {
        return redirect('/dashboard');
    },

  methods: {

  }
}
</script>

<style>

</style>
