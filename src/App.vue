<template>
  <div id="app">
    {{groupsQuestionData}}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['groupsQuestionData'])
  },
  methods: {
    ...mapActions([
      'loadGroupsQuestionData'
    ])
  },
  mounted() {
    this.loadGroupsQuestionData()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  padding: 0 5px 0 5px;
}
</style>
