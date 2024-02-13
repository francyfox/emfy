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
 * @param { apiV4Fetch } api
 * @returns {Promise<void>}
 */
export const setupLeads = async (api) => {
  customElements.define('lead-list', ContractComponent)

  const contract = document.querySelector('lead-list')
  contract.api = api
  await contract.renderList()
}

/**
 * @param {Array<TLead>} leads
 * @returns {Array<number>}
 */
export const getResponsibleListIdFromLeads = (leads) => {
  return leads.map(lead => lead.responsible_user_id)
}

export const findResponsibleById = (leads, id) => {
  return leads.find(lead => lead.responsible_user_id === id)
}