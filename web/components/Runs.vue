<template lang="html">
  <section class="tapeslist" v-if="runs.length">
    <h1 class="tapeslist__title">Runs</h1>
    <div class="run-block" v-for="run in runs">
      <h3>{{ run.tapeName }}</h3>
      <pre>{{ run.id }}</pre>
      <pre>{{ run.info }}</pre>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['runs'])
}
</script>

<style lang="css">
.run-block{
  width: 100%;
}
</style>
