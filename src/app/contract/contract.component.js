import {
  ContractComponentError,
  ContractComponentLoader,
  ContractItem,
  ContractList
} from '#root/app/contract/contact.templates.jsx'
import { findResponsibleById } from '#root/app/contract/contract.helper.js'

export class ContractComponent extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = ContractComponentLoader()
  }


  /**
   * @description first render function
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

  async reRenderListBody (leads, responsibleList) {
    const itemsTree = leads.map((item) => {
      return ContractItem(item, findResponsibleById(responsibleList, item.responsible_user_id))
    })

    this.querySelector('tbody').innerHTML = itemsTree.join('\n')
  }

  renderError () {
    this.innerHTML = ContractComponentError()
  }
}