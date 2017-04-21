<template lang="html">
  <section class="runs" v-if="runs.length">
    <h1 class="tapeslist__title">Runs</h1>
    <table class="run-block">
      <tr>
        <th>ID</th>
        <th>Time</th>
        <th>Name</th>
        <th>Info</th>
        <th></th>
        <th v-if="!!openedTapeId"></th>
      </tr>
      <tr v-for="run in runs">
        <td>{{ run.id }}</td>
        <td>{{ (new Date(run.createdAt)).toLocaleString() }}</td>
        <td>{{ run.tapeName }}</td>
        <td>{{ run.info }}</td>
        <td v-if="!!openedTapeId">
          <button @click="favRun(run.id)" class="button" :class="{'secondary': !run.isCanon, 'success': run.isCanon}">
            <Icon glyph="star" width="20" height="20"/>
          </button>
        </td>
        <td>
          <button @click="removeRun(run.id)" class="button alert">
            <Icon glyph="close" width="20" height="20"/>
          </button>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Icon from './Icon.vue';

export default {
  props: ['runs'],
  components: { Icon },
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
    line-height: 0;
    padding: 0.5em;
  }
}
</style>
