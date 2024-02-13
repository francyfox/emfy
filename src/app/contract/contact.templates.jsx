// innerHTML более дорогая операция чем textContent, но писать сейчас отсележиваний мутаций dom долго
import { localeDate, localePrice } from '#root/app/util.js'

export const ContractComponentLoader = () => `<div class="flex items-center text-yellow gap-2 px-5">
          <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          Идет загрузка...
        </div>`

export const ContractComponentError = () => `<div class="flex items-center text-red gap-2 px-5">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 8a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5zm0-5.5a.5.5 0 0 0-.492.41L7.5 5v3.5l.008.09a.5.5 0 0 0 .984 0L8.5 8.5V5l-.008-.09A.5.5 0 0 0 8 4.5z" fill="currentColor"></path></g></svg>

          Произошла ошибка! Неудалось получить данные с amoCRM
        </div>`


/**
 * @param {TLead} item
 * @returns {string}
 * @constructor
 */
export const ContractItem = (item) => `<tr class="bg-white/20 border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text-white">
                        ${item.name}
                    </th>
                    <td class="px-6 py-4">
                        ${localePrice(item.price)}
                    </td>
                    <td class="px-6 py-4">
                        ${localeDate(item.created_at)}
                    </td>
                    <td class="px-6 py-4">
                        ${localeDate(item.updated_at)}
                    </td>
                </tr>`
export const ContractList = (body) => `        <div class="relative overflow-x-auto max-w-4xl">
            <table class="w-full overflow-hidden text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400 rd-3">
                <thead class="text-md text-gray-700 uppercase bg-gray-50/80 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center gap-2">
                                <div class="flex flex-col">
                                    <button type="button"
                                            class="flex justify-center items-center bg-white/2 border-slate-500" data-ask>
                                        <svg class="w-4 h-4 rotate-90" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                                            <path d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
                                                  fill="currentColor"></path>
                                        </svg>
                                    </button>
                                    <button type="button"
                                            class="flex justify-center items-center bg-white/2 border-slate-500" data-desk>
                                        <svg class="w-4 h-4 rotate--90" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                                            <path d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
                                                  fill="currentColor"></path>
                                        </svg>
                                    </button>
                                </div>
                                Названия
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Бюджет
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Создано
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Изменено
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Автор
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${body}
                </tbody>
            </table>
            <button data-show 
            type="button" 
            class=":uno: flex justify-center px-3 py-1 mt-3 text-sm font-bold text-white border-none bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 cursor-pointer rounded-1"
            >
                Показать все
            </button>
        </div>`