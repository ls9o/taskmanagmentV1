<template>
    <ProCureMent msg="Welcome to Your Vue.js + TypeScript App"/>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProCureMent from '../components/ProCureMent.vue'; // @ is an alias to /src

@Options({
  components: {
    ProCureMent,
  },
})
export default class HomeView extends Vue {}
</script>
