import { setLocalStorage } from '#root/app/util.js'

export const useContactStore = () => {
  const defaultState = {
    sort: {
      sortKey: '',
      sortBy: ''
    },
    pagination: {
      page: 1,
      limit: 10
    },
    leads: [],
    responsibleList: [],
  }

  setLocalStorage('sort', defaultState.sort)
  setLocalStorage('pagination', defaultState.pagination)

  return {
    defaultState
  }
}