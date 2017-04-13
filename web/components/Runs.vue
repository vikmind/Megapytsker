<template lang="html">
  <section class="runs" v-if="runs.length">
    <h1 class="tapeslist__title">Runs</h1>
    <table class="run-block">
      <tr>
        <th>ID</th>
        <th>Time</th>
        <th>Name</th>
        <th></th>
        <th v-if="!!openedTapeId"></th>
      </tr>
      <tr v-for="run in runs">
        <td>{{ run.id }}</td>
        <td>{{ (new Date(run.createdAt)).toLocaleString() }}</td>
        <td>{{ run.tapeName }}</td>
        <td v-if="!!openedTapeId">
          <button @click="favRun(run.id)" class="button success">Y</button>
        </td>
        <td><button @click="removeRun(run.id)" class="button alert">X</button></td>
      </tr>
    </table>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['runs'],
  computed: mapState(['openedTapeId']),
  methods: mapActions(['removeRun', 'favRun']),
}
</script>

<style lang="scss">
.runs{
  .tapeslist + & {
    padding: 20px;
    margin-right: -20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    counter-reset: card-button;
  }
}
.run-block{
  th{
    text-align: left;
  }
  & td, & th{
    padding: 0 10px;
    vertical-align: middle;
    border-bottom: 1px solid #eee;
  }
  .button{
    margin-bottom: 0;
  }
}
</style>
