<template>
<this-nav-bar></this-nav-bar>
  <router-view/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import ThisNavBar from './components/ThisNavBar.vue';

@Options({
  components: {
    ThisNavBar,
  },
})
export default class HomeView extends Vue {}
</script>
<style lang="scss">

</style>
