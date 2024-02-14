import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import { ContractComponent } from '#root/app/contract/contract.component.js'
import { getToken } from '#root/app/auth/auth.service.js'
import ContractRepository from '#root/app/contract/contract.repository.js'

/**
 * @typedef {{
 * page: number,
 * limit: number,
 * order: object
 * }} TLeadsParams
 */

/**
 * @typedef {{
 *   id: number,
 *   name: string,
 *   price: number,
 *   responsible_user_id: number,
 *   _embedded: { tags: Array<{ id: number, name: string, color: null | string }> }
 *   created_by: number,
 *   created_at: number,
 *   updated_at: number
 * }} TLead
 */

/**
 * @typedef {{
 *   id: number,
 *   name: string,
 *   first_name: string,
 *   last_name: string
 * }} TContact
 */

/**
 * @callback SortLeadsCallback
 * @param { string | undefined } ask
 * @param { string | undefined } desk
 */

/**
 * @param { HTMLElement } root
 */
export const setupSortButtons = (root) => {
  const buttons = document.querySelectorAll('[data-ask], [data-desk]');

  for (const button of buttons) {
    button.addEventListener('click', async (e) => {
      const hasDataAttr = e.target.hasAttribute('ask') || e.target.hasAttribute('desk')
      const target = hasDataAttr? e.target : e.target.closest('button')
      const { ask, desk } = target.dataset;

      root.dispatchEvent(new CustomEvent('sort', {
        detail: { ask, desk }
      }))
    })
  }
}
/**
 * @param leads
 * @param repository
 * @param contract
 * @returns {Promise<void>}
 */
export const updateList = async ({ leads, repository, contract }) => {
  const responsibleIdList = getResponsibleListIdFromLeads(leads)
  const responsibleList = await repository.fetchContacts(responsibleIdList)

  await contract.renderList(leads, responsibleList)
  setupSortButtons(contract)
}

/**
 * @returns {Promise<void>}
 */
export const setupLeads = async () => {
  customElements.define('lead-list', ContractComponent)

  const api = apiV4Fetch(getToken().access_token)
  const repository = new ContractRepository(api)
  const contract = document.querySelector('lead-list')

  try {
    let leads = await repository.fetchLeads({
      page: 1,
      limit: 10,
    })

    await updateList({ leads, repository, contract }) // TODO: DUPLICATED CODE

    contract.addEventListener('sort', async (e) => {
      const { ask, desk } = e.detail
      const param = ask ? 'ask': 'desc'
      leads = sortByParam(leads, param, ask || desk)

      await updateList({ leads, repository, contract })
    })

  } catch (error) {
    contract.renderError()
    console.error(error)
  }
}

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
