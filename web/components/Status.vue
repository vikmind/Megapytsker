<template lang="html">
  <span class="status__item"
        :class="{
          'is-on': ($store.state.status[param] == true),
          'is-off': ($store.state.status[param] == false)
        }">
    {{title}}
  </span>
</template>

<script>
export default {
  props: ['title', 'param']
}
</script>

<style lang="css">
.status__item{
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  white-space: nowrap;
}
.status__item::after{
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.5);
  background-color: #F0E668;
}
.status__item.is-on::after{
  background-color: #7ED321;
}
.status__item.is-off::after{
  background-color: #D0011B;
}
</style>
