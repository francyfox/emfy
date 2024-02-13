import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import { ContractComponent } from '#root/app/contract/contract.component.jsx'

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
 * @param {TLeadsParams} params
 * @returns {Promise<Array<any, TLead>>}
 */
export const fetchLeads = async (
  params
) => await apiV4Fetch('/leads', {
  method: 'GET',
  params
})


export const setupLeads = async (api) => {
  customElements.define('lead-list', ContractComponent)

  const contract = document.querySelector('lead-list')
  await contract.renderList()
}