<template>
    <div>
      <div class="wrapper">
        <nav id="sidebar" class="sidebar shadow-sm">
         
          <nav class="sidenav">
            <nuxt-link to="/admin/dashboard">
              <i class="bi-grid side"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              Dashboard</nuxt-link
            >
            <nuxt-link to="/admin/credit">
              <i class="bi-wallet side"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              Credit</nuxt-link
            >
          
            <nuxt-link to="/admin/debit">
              <i class="bi-arrows-angle-contract side"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              Debit</nuxt-link
            >
          
            <nuxt-link @click.native="logout" to="#">
              <i class="bi-box-arrow-right side"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              Logout</nuxt-link
            >
          </nav>
  
          <nuxt-link to="/settings">
          <div class="bottom-image d-flex">
             <img src="/images/man.png" class="user-image">
             <div class="ml-3">
              <p class="text-white">{{ $auth.user.username }}</p>
              <small class="text-secondary">Joined in {{ $moment($auth.user.created_at).format('MMMM y') }}</small>
             </div>
          </div>
          </nuxt-link>
        </nav>
        <div class="main shadow-sm">
          <i @click="showSidebar" id="open-btn" class="open-btn navbar-brand bi-filter-left mb-3" style="font-size:30px"></i>
          <Nuxt />
        </div>
      </div>
      <div @click="closeSidebar" id="overlay" class="overlay"></div>
    </div>
  </template>
  
  
  <script>
  export default {
    methods: {
      showSidebar() {
        window.document.getElementById("sidebar").style.left = "0";
        window.document.getElementById("overlay").classList.add("active");
      },
  
      closeSidebar() {
        window.document.getElementById("sidebar").style.left = "-280px";
        window.document.getElementById("overlay").classList.remove("active");
      },
  
      async logout() {
        try {
          await this.$auth.logout();
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  a.nuxt-link-active {
    font-weight: bold;
  }
  a.nuxt-link-exact-active {
    color: #F2AF2E;
    opacity: 1;
  }
  
  .user-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  p {
    font-size: 15px;
  }
  
  .bottom-image {
    position: absolute;
    bottom: 45px;
  }
  
  @media (max-width: 768.98px) {
    a.nuxt-link-exact-active {
    color: #F2AF2E;
    border-top: 1px solid #F2AF2E;
  }
     
  }
  </style>
  