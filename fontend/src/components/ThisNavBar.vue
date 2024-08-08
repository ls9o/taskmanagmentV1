<template>
  <!-- lloveanna -->
  <div class="container-fluid">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <router-link to="/" custom v-slot="{ href, navigate, isActive }">
          <a :href="href" @click="navigate" :class="['d-inline-flex', 'link-body-emphasis', 'text-decoration-none', { 'active': isActive }]">
            <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>
        </router-link>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <router-link to="/" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="['nav-link', 'px-2', { 'active': isActive }]">จัดซื้อจัดจ้าง</a>
          </router-link>
        </li>
        <li>
          <router-link to="/JobIn" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="['nav-link', 'px-2', { 'active': isActive }]">ภายใน</a>
          </router-link>
        </li>
        <li>
          <router-link to="/Addinfo" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="['nav-link', 'px-2', { 'active': isActive }]">Create info</a>
          </router-link>
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <!-- <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button> -->
      </div>
    </header>
  </div>
</template>

<script>
export default {
}
</script>

<style>
@import './Sass/Narbar.scss';
</style>
