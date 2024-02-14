import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import { ContractComponent } from '#root/app/contract/contract.component.js'
import { getToken } from '#root/app/auth/auth.service.js'
import ContractRepository from '#root/app/contract/contract.repository.js'
import { getLocalStorage, setLocalStorage } from '#root/app/util.js'
import { getResponsibleListIdFromLeads, sortByParam } from '#root/app/contract/contract.helper.js'

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
      setLocalStorage('sort', { sortKey: ask ? 'ask' : 'desk', sortBy: ask || desk })

      root.dispatchEvent(new CustomEvent('sort', {
        detail: { ask, desk }
      }))
    })
  }
}
/**
 * @param { boolean } fullRender
 * @param contract
 * @returns {Promise<void>}
 */
export const updateList = async (contract, fullRender = true) => {
  const leads = getLocalStorage('leads');
  const responsibleList = getLocalStorage('responsibleList');

  if (fullRender) {
    await contract.renderList(leads, responsibleList)
  } else {
    await contract.reRenderListBody(leads, responsibleList)
  }
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
    const pagination = getLocalStorage('pagination')
    let leads = await repository.fetchLeads(pagination)

    setLocalStorage('leads', leads)

    const responsibleIdList = getResponsibleListIdFromLeads(leads)
    const responsibleList = await repository.fetchContacts(responsibleIdList)

    setLocalStorage('responsibleList', responsibleList)

    await updateList(contract)
    setupSortButtons(contract)

    contract.addEventListener('sort', async (e) => {
      const { ask, desk } = e.detail
      const param = ask ? 'ask': 'desc'
      leads = sortByParam(leads, param, ask || desk)
      setLocalStorage('leads', leads)

      await updateList(contract, false)
    })

  } catch (error) {
    contract.renderError()
    console.error(error)
  }
}