import {
  ContractComponentError,
  ContractComponentLoader,
  ContractItem,
  ContractList
} from '#root/app/contract/contact.templates.jsx'
import { findResponsibleById } from '#root/app/contract/contract.service.js'

export class ContractComponent extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = ContractComponentLoader()
  }


  /**
   * @param {TLead[]} leads
   * @param {TContact[]} responsibleList
   * @returns {Promise<void>}
   */
  async renderList (leads, responsibleList) {
    const itemsTree = leads.map((item) => {
      return ContractItem(item, findResponsibleById(responsibleList, item.responsible_user_id))
    })

    this.innerHTML = ContractList(itemsTree.join('\n'))
  }

  renderError () {
    this.innerHTML = ContractComponentError()
  }
}