<template>
  <JobIn></JobIn>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import JobIn from '../components/JobIn.vue';
@Options({
  components: {
    JobIn
  },
})
export default class HomeView extends Vue {}
</script>

<style>

</style>