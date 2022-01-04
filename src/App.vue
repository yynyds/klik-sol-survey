<template>
  <div id="app">
    <el-tabs v-model="activeGroup">
      <el-tab-pane
          :label="`Group ${group.label}`"
          :name="group.label"
          v-for="group in groupsQuestionData"
          :key="group.groupId"
      >
        <div style="display: flex;justify-content: space-between;">
          <el-button :disabled="!dsbldBtnBack" @click="goTo(-1)">Back</el-button>
          <el-button :disabled="dsbldBtnBack" @click="goTo(1)">Accept & Go To Next Group</el-button>
        </div>
        Group {{group.label}}
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
              <el-radio-group v-model="scope.row.health" @change="updateHealth(group.groupId, scope.row)">
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
    activeGroup: null,
    frozenData: null
  }),
  watch: {
    groupsQuestionData(val) {
      this.activeGroup = val[0].label
    },
    // activeGroup(val) {
    //   const idx = this.groupsQuestionData.indexOf(this.groupsQuestionData.find(item => item.label === val))
    //   this.frozenData = this.groupsQuestionData[idx]['questions'] ? [...this.groupsQuestionData[idx].questions] : null
    // }
  },
  computed: {
    ...mapGetters(['groupsQuestionData']),
    dsbldBtnBack() {
      const idx = this.groupsQuestionData.indexOf(this.groupsQuestionData.find(item => item.label === this.activeGroup))
      return idx !== -1 && idx !== 0
    }
  },
  methods: {
    ...mapActions([
      'loadGroupsQuestionData',
      'updateHealthData'
    ]),
    updateHealth(groupId, row) {
      const formData = {
        groupId,
        ...row
      }
      this.updateHealthData(formData)
    },
    goTo(idxNumber) {
      const currentSelectedIdxGroup = this.groupsQuestionData.indexOf(this.groupsQuestionData.find(item => item.label === this.activeGroup))
      this.activeGroup = this.groupsQuestionData[currentSelectedIdxGroup + idxNumber].label
    }
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
