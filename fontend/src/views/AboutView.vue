<template>
  <add-info></add-info>
</template>

<script>
import AddInfo from "@/components/AddInfo.vue";
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    AddInfo
  },
})
export default class HomeView extends Vue {}
</script>