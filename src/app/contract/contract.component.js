import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import {
  ContractComponentError,
  ContractComponentLoader,
  ContractItem,
  ContractList
} from '#root/app/contract/contact.templates.jsx'
import { findResponsibleById, getResponsibleListIdFromLeads } from '#root/app/contract/contract.service.js'

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
    const filter = []
    filter['id'] = id

    const contact = await this._api('/contacts', {
      method: 'GET',
      params: {
        filter
      }
    })

    return contact._embedded.contacts
  }

  async renderList () {
    try {
      const leads = await this.fetchLeads({
        page: 1,
        limit: 10,
        sort: 'name',
        order: 'desc'
      })

      const responsibleIdList = getResponsibleListIdFromLeads(leads)
      const responsibleList = await this.fetchContacts(responsibleIdList)

      const itemsTree = leads.map((item) => {
        return ContractItem(item, findResponsibleById(responsibleList, item.responsible_user_id))
      })

      this.innerHTML = ContractList(itemsTree.join('\n'))
    } catch (error) {
      this.innerHTML = ContractComponentError()
    }
  }
}