import { reactive } from 'vue'

export const store = reactive({
  session: null,
  usersWeightHistory: [],
  userLastWeekWeight: [],
  userLastWeekWeightChange: 0,
})