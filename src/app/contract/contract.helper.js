/**
 * @param {Array<TLead>} leads
 * @returns {Array<number>}
 */
export const getResponsibleListIdFromLeads = (leads) => {
  return [...new Set(leads.map(lead => lead.responsible_user_id))]
}

/**
 * @param leads
 * @param id
 * @returns {*}
 */
export const findResponsibleById = (leads, id) => {
  return leads.find(lead => lead.responsible_user_id === id)
}

/**
 * @param { string } key
 * @param { [] } items
 * @param { 'ask' | 'desk' } param
 * @returns { [] }
 */
export const sortByParam = (items, param, key) => {
  return items.sort((a, b) => {
    if (param === 'ask') {
      return a[key] > b[key] ? 1 : -1
    } else {
      return a[key] < b[key] ? 1 : -1
    }
  })
}