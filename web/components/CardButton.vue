<template>
  <div class="tape__wrapper is-card">
    <button
      class="tape is-card"
      type="button"
      @click="selectCard(card.number)"
      v-html="text"
      ></button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['card'],
  methods: mapActions([
    'selectCard'
  ]),
  data(){
    return {
      text: (this.card.number !== 'INIT') ? `ARROWPASS<BR>${this.card.number}` : '| EMPTY |'
    }
  }
}
</script>

<style lang="css">
.tape__wrapper.is-card{
  max-width: none;
}
.tape.is-card{
  background: #a9eca9;
  border-color:#217521;
  line-height: 1.8;
}
</style>
