<template>
  <div id="app">
    <el-tabs v-model="activeGroup">
      <el-tab-pane
          :label="`Group ${group.label}`"
          :name="group.label"
          v-for="group in groupsQuestionData"
          :key="group.groupId"
      >
        <el-table
            :data="group.questions"
            style="width: 100%">
          <el-table-column
              label="№"
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="health"
              header-align="center"
              align="center"
              label="Health">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.health">
                <el-radio label="0">NONE</el-radio>
                <el-radio label="1">MILD</el-radio>
                <el-radio label="2">MOD</el-radio>
                <el-radio label="3">SEV</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
              prop="symptoms"
              header-align="center"
              align="center"
              label="Symptoms">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    activeGroup: null
  }),
  watch: {
    groupsQuestionData(val) {
      this.activeGroup = val[0].label
    }
  },
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
