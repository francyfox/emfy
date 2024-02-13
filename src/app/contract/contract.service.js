import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import { ContractComponent } from '#root/app/contract/contract.component.js'

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
 *   created_by: number,
 *   created_at: number,
 *   updated_at: number
 * }} TLead
 */

/**
 * @param { apiV4Fetch } api
 * @returns {Promise<void>}
 */
export const setupLeads = async (api) => {
  customElements.define('lead-list', ContractComponent)

  const contract = document.querySelector('lead-list')
  contract.api = api
  await contract.renderList()
}