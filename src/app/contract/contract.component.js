import { apiV4Fetch } from '#root/app/auth/auth.const.js'
import {
  ContractComponentError,
  ContractComponentLoader,
  ContractItem,
  ContractList
} from '#root/app/contract/contact.templates.jsx'

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
   * @returns {Promise<Array<any, TLead>>}
   */
  async fetchLeads (params) {
    const collection = await this._api('/leads', {
      method: 'GET',
      params
    })

    return collection._embedded.leads
  }

  async renderList () {
    try {
      const data = await this.fetchLeads({
        with: 'contacts',
        page: 1,
        limit: 5,
        sort: 'name',
        order: 'desc'
      })

      const itemsTree = data.map(item => ContractItem(item))
      this.innerHTML = ContractList(itemsTree.join('\n'))
    } catch (error) {
      this.innerHTML = ContractComponentError()
    }
  }
}