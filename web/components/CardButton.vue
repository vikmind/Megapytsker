<template>
  <div class="card__wrapper is-card">
    <button
      class="card"
      type="button"
      @click="selectCard(card)"
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
      text: (this.card !== 'INIT') ? `ARROWPASS<BR>${this.card}` : '| EMPTY |'
    }
  }
}
</script>

<style lang="scss">
body{
  counter-reset: card-button;
}
.card__wrapper{
  height: 100px;
  width: 160px;
  margin: 0 20px 20px 0;
  display: flex;
  flex: 1 0 160px;
  max-width: 160px;
  position: relative;
  &::before{
    position: absolute;
    z-index: 1;
    counter-increment: card-button;
    content: counter(card-button);
    margin: 3px 5px;
    font-size: .5em;
  }
}
.card{
  flex: 1;
  align-self: stretch;
  padding: 10px;
  border: 1px solid #979797;
  position: relative;

  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
  color: #3e3e3e;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 2px 2px 1px 0 #d9d9d9;
  transform: translate(-2px, -2px);
  transition: box-shadow .2s, transform .2s;
  will-change: transform;
}
.card:hover{
  box-shadow: 2px 3px 1px 0 #cfcfcf;
  transform: translate(-3px, -3px);
}
.card:focus{
  outline: none;
}
.card:active{
  box-shadow: 0 0 0 0 #cfcfcf;
  transform: translate(0, 0);
}
.card::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backrgound: #979797;
}
</style>
