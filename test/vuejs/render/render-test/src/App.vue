<template>
  <div id="app">
    <Anchor :level="1" title="特性1" :class="{'aa1': true}">特性1</Anchor>
    <Anchor :level="2" title="特性2" :class="{'aa2': true}">特性2</Anchor>
    <Anchor :level="3" title="特性3" :class="{'aa3': true}">特性3</Anchor>
    <Anchor :level="4" title="特性4" :class="{'aa4': true}">特性4</Anchor>
    <Anchor :level="5" title="特性5" :class="{'aa5': true}">特性5</Anchor>
    <Anchor :level="6" title="特性6" :class="{'aa6': true}">特性6</Anchor>
  </div>
</template>

<script>
import Anchor from './components/anchor'
export default {
  components: {Anchor},
  props: {},
  data () {
    return {}
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>

</style>
