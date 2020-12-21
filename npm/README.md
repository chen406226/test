# celtable

## 安装
```
npm i celtable -S
```

## export components
```
CTable
  CTableColumn
  CTableColumns // column group 多层表头children

CMenu
  CMenuListItem
```

## CTable
### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-----| ----: | :----: | :----: | :----: |
| rowDrag | 行拖拽,依赖row-key | Boolean | :----: | false |
| columnDrag | 列拖拽 | Boolean | :----: | false |
| rowDropCopy | 行拖拽复制依赖rowDrag=true auto自动生成inquiry弹框询问 | Object | {type: 'auto'},{type: 'inquiry'} | null |
| rowFixData | 固定行数据 | Array | :----: | null |
| levelFlag | 父子层级特殊固定关系标记start=0,++（非固定层级关系慎用） EP:levelFlag="{0:'年',1:'月',2:'周'}" | Object | :----: | null |
| headerTipInfo | 特殊说明如树结构全选不包含子数据 | Object | 参考 el-tooptip {className: 's',effect: 'dark',content: '全选仅选择最外层',placement: 'top'}, | headerTipInfo: {effect: 'dark',placement: 'top'}, |

### Table Events

| 事件名	 | 说明 | 参数 |
| :-----| ----: | :----: |
| fixRow-contextmenu | 固定行右击 | row, column, event |
| fixRow-click | 固定行单击 | row, column, event |
| fixRow-dbclick | 固定行双击 | row, column, event |
| columnDropOnEnd | 列拖动结束回调 args1[sortable.onEnd] args2-newProp、oldProp  列prop值 | columnDropOnEnd({newIndex,oldIndex},{newProp,oldProp}) |
| rowDropOnEnd | 行拖动结束回调 (args1\<sortable.onEnd\>,args2) args2: {oldRow: 拖拽row, copyRow: 复制row 《1，Id变动原id+`-Copy`，2新增属性isDropCopyed: true》, parent: {row: 拖拽结束落点的父节点row, 根节点为null,newIndex: 拖拽结束落点的下标}} | args1,args2 |
| overrideRowDropOnEnd | 重写行拖拽(args1) | args1 sortable.onEnd |
| overrideColumnDropOnEnd | 重写列拖拽(args1) | args1 sortable.onEnd |

## CMenu
### CMenu Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-----| ----: | :----: | :----: | :----: |
| show | 显示&隐藏 | Boolean |  | false |
| top | 位置 | Number |  |  |
| left | 位置 | Number |  |  |
| right | 位置 | Number |  |  |
| bottom | 位置 | Number |  |  |
| menuItems | 自定义子内容 | Array\<CMenuListItem\> |  |  |
### CMenu 

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-----| ----: | :----: | :----: | :----: |
| show | 显示&隐藏 | Boolean |  | false |
| top | 位置 | Number |  |  |
| left | 位置 | Number |  |  |
| right | 位置 | Number |  |  |
| bottom | 位置 | Number |  |  |
| menuItems | 自定义子内容 | Array\<CMenuListItem\> |  |  |

