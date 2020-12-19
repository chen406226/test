import _CTable from './common/table/index.js'
import _CMenu from './common/menu/index.js'
import _CTableColumn from './common/table-column/index'
import _CTableColumns from './common/table-column/cover'
import _CMenuListItem from './common/menu/item.js'

export const CTable = _CTable
export const CTableColumn = _CTableColumn
export const CTableColumns = _CTableColumns
export const CMenu = _CMenu
export const CMenuListItem = _CMenuListItem

// Ctable.install = Vue => Vue.component(Ctable.name, Ctable)

const components = [
  CTable,
  CMenu,
  CTableColumn,
  CTableColumns,
  CMenuListItem
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default {
  version: '0.0.3',
  install,
  CTable,
  CMenu,
  CTableColumn,
  CTableColumns,
  CMenuListItem
}
