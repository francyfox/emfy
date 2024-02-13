import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import {
  ContractComponentError,
  ContractComponentLoader,
  ContractItem,
  ContractList
} from '#root/app/contract/contact.templates.jsx'
import { getResponsibleListIdFromLeads } from '#root/app/contract/contract.service.js'

export class ContractComponent extends HTMLElement {
  /**
   * @type {apiV4Fetch | null}
   */
  _api = null

  constructor() {
    super()
    this.innerHTML = ContractComponentLoader()
  }

  set api(api) {
    this._api = api
  }

  /**
   * @param params
   * @returns {Promise<Array<TLead>>}
   */
  async fetchLeads (params) {
    const collection = await this._api('/leads', {
      method: 'GET',
      params
    })

    return collection._embedded.leads
  }

  /**
   * @param {Array<Number>} id
   * @returns {Promise<Array<TContact>>}
   */
  async fetchContacts (id) {
    const contact = await this._api('/contacts', {
      method: 'GET',
      params: {
        filter: {
          id
        }
      }
    })

    return contact._embedded.contacts
  }

  async renderList () {
    try {
      const leads = await this.fetchLeads({
        with: 'contacts, catalog_elements',
        page: 1,
        limit: 10,
        sort: 'name',
        order: 'asc'
      })

      const responsibleIdList = getResponsibleListIdFromLeads(leads)
      const responsibleList = await this.fetchContacts(responsibleIdList)

      const itemsTree = leads.map(item => ContractItem(item))
      this.innerHTML = ContractList(itemsTree.join('\n'))
    } catch (error) {
      this.innerHTML = ContractComponentError()
    }
  }
}