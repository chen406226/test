import _CTable from './common/table/index.js'
import _CTableColumn from './common/table-column/index'
import _CTableColumns from './common/table-column/cover'
import _CElTableColumns from './common/table-column/elcolumns'
import _CMenu from './common/menu/index.js'
import _CMenuListItem from './common/menu/item.js'

export const CTable = _CTable
export const CTableColumn = _CTableColumn
export const CTableColumns = _CTableColumns
export const CElTableColumns = _CElTableColumns
export const CMenu = _CMenu
export const CMenuListItem = _CMenuListItem

const components = [
  CTable,
  CTableColumn,
  CTableColumns,
  CElTableColumns,
  CMenu,
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
  version: '0.2.3',
  install,
  CTable,
  CTableColumn,
  CTableColumns,
  CElTableColumns,
  CMenu,
  CMenuListItem
}
