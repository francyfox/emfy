export default class ContractRepository {
  /**
   * @type {apiV4Fetch}
   */
  _api

  /**
   * @param {apiV4Fetch } api
   */
  constructor(api) {
    this._api = api
  }

  /**
   * @param params
   * @returns {Promise<Array<TLead>>}
   */
  fetchLeads = async (params) => {
    const collection = await this._api('/leads', {
      method: 'GET',
      params,
    })

    return collection._embedded.leads
  }

  /**
   * @param {Array<Number>} id
   * @returns {Promise<Array<TContact>>}
   */
  fetchContacts = async (id) => {
    const contact = await this._api('/contacts', {
      method: 'GET',
      params: {
        filter: {
          responsible_user_id: id
        },
      }
    })

    return contact._embedded.contacts
  }
}