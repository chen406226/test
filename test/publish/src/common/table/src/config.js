import { getPropByPath } from 'element-ui/src/utils/util';

export const cellStarts = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};

export const cellFlagStr = {
  levelFlag: null
}

// 这些选项不应该被覆盖
export const cellForced = {
  selection: {
    renderHeader: function(h, { store }) {
      if (store.table.$props.hasOwnProperty('headerTipInfo') && store.table.$props.headerTipInfo) {
        const {effect='dark',className='',placement='top',content=''} = store.table.$props.headerTipInfo
        return <span>
          <el-checkbox
            disabled={ store.states.data && store.states.data.length === 0 }
            indeterminate={ store.states.selection.length > 0 && !this.isAllSelected }
            nativeOn-click={ this.toggleAllSelection }
            value={ this.isAllSelected } />
          <el-tooltip
            class={className}
            effect={effect}
            placement={placement}
            content={content}>
            <i class="el-icon-question" style="color: rgb(255, 153, 0);margin-left:4px;"></i>
          </el-tooltip>
        </span>
      } else {
        return <el-checkbox
        disabled={ store.states.data && store.states.data.length === 0 }
        indeterminate={ store.states.selection.length > 0 && !this.isAllSelected }
        nativeOn-click={ this.toggleAllSelection }
        value={ this.isAllSelected } />;
      }
    },
    renderCell: function(h, { row, column, store, $index }) {
      return <el-checkbox
        nativeOn-click={ (event) => event.stopPropagation() }
        value={ store.isSelected(row) }
        disabled={ column.selectable ? !column.selectable.call(null, row, $index) : false }
        on-input={ () => { store.commit('rowSelectedChanged', row); } } />;
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function(h, { column }) {
      return column.label || '#';
    },
    renderCell: function(h, { $index, column }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return <div>{ i }</div>;
    },
    sortable: false
  },
  expand: {
    renderHeader: function(h, { column }) {
      return column.label || '';
    },
    renderCell: function(h, { row, store }) {
      const classes = ['el-table__expand-icon'];
      if (store.states.expandRows.indexOf(row) > -1) {
        classes.push('el-table__expand-icon--expanded');
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return (<div class={ classes }
        on-click={callback}>
        <i class='el-icon el-icon-arrow-right'></i>
      </div>);
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

export function defaultRenderCell(h, { row, column, $index }) {
  const property = column.property;
  const value = property && getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
}

export function treeCellPrefix(h, { row, treeNode, store,levelFlag, isClast,rowFixed, fatherIsLast ,fatherTreeIsLast}) {
  if (!treeNode) return null;
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  // console.log(row.id,'ffffffffffffffffffffffffffffffffffffffffff',isClast,fatherIsLast,row,fatherTreeIsLast)
  let iconCoverClasses = ['c-icon-arrow-cover'];
  if (treeNode.indent) {
    iconCoverClasses.push('c-icon-arrow-cover-f')
  }

  let flagC = ''
  let flagT = ''
  if (levelFlag instanceof Object && levelFlag.hasOwnProperty(treeNode.level)) {
    flagC = 'flag flag-'+treeNode.level
    flagT = levelFlag[treeNode.level]
  }

  if (rowFixed) {
    ele.push(<div class={flagC+' row-fixed-flag'}>
      {
        treeNode.indent ? <span className="el-table__indent" style={{'padding-left': treeNode.indent + 'px'}}></span> : null
      }
      {flagT}
    </div>);
  }

  // 站位
  ele.push(<span class="c-icon-arrow-cover-zhanwei" style={{'padding-left': '20px'}}></span>);
  if (treeNode.indent) {
    ele.push(<span class="el-table__indent" style={{'padding-left': treeNode.indent + 'px'}}></span>);
    iconCoverClasses.push('c-icon-arrow-cover-level')
  }
  // console.log(treeNode, row ,store,row['name'],'noddddddddddddddddddddd')

  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = ['el-table__expand-icon', treeNode.expanded ? 'el-table__expand-icon--expanded' : ''];
    let iconClasses = ['el-icon-plus','c-icon-border'];
    if (treeNode.expanded) {
      iconClasses.splice(0,1,'el-icon-minus')
    }
    if (treeNode.loading) {
      iconClasses = ['el-icon-loading'];
    }
    // 固定行只显示
    if (rowFixed) {
      let iconClasses = ['el-icon-arrow-right'];
      ele.push(<div class={ expandClasses }
        on-click={ callback }>
        <i class={ iconClasses }></i>
      </div>);
      return ele
    }
    let cent = null
    if (treeNode.level>=3) {
      cent = []
      let n = treeNode.level
      do {
        cent.push(<div class={fatherTreeIsLast.includes((n-2).toString())?'w20':'w20 shu'}></div>)
        n--
      } while (n>=3);
    }
    let zhanwei = null
    if (treeNode.level>=1) {
      zhanwei = []
      let n = treeNode.level
      do {
        zhanwei.push(<div class="w20"></div>)
        n--
      } while (n>=1);
    }

    ele.push(<div class={iconCoverClasses}>
      {zhanwei}
      <div class={ expandClasses }
        on-click={ callback }>
        {
          flagT?
          <span class={flagC}>{flagT}</span> : null
        }
        <i class={ iconClasses }></i>
      </div>
      <div class='c-icon-arrow-bg'>
        <div class="veril"></div>
        {
          treeNode.level >=1 ? <div class={isClast?'l':'tu'}></div> : null
        }
        {
          treeNode.level >=2 ? <div class={fatherIsLast ? 'w20' : 'shu w20'}></div> : null
        }
        {
          cent
        }
      </div>
    </div>)
  } else {
    if (rowFixed) {
      ele.push(<span class="el-table__placeholder"></span>);
      return ele
    }
    let cent = null
    if (treeNode.level>=3) {
      cent = []
      let n = treeNode.level
      do {
        cent.push(<div class={fatherTreeIsLast.includes((n-2).toString())?'w20':'w20 shu'}></div>)
        n--
      } while (n>=3);
    }
    let zhanwei = null
    if (treeNode.level>=1) {
      zhanwei = []
      let n = treeNode.level
      do {
        zhanwei.push(<div class="w20"></div>)
        n--
      } while (n>=1);
    }
    // ele.push(<span class="el-table__placeholder"></span>);

    ele.push(<div class='c-icon-arrow-cover c-icon-arrow-cover-level'>
      {zhanwei}
      <span class="el-table__placeholder"></span>
      <div class='c-icon-arrow-bg no-expanded'>
        <div class='c-icon-child-end-node'></div>
        {
          treeNode.level >=1 ?<div class={isClast?'l':'tu'}></div> : null
        }
        {
          treeNode.level >=2 ?<div class={fatherIsLast?'w20':'shu w20'}></div> : null
        }
        {
          cent
        }
      </div>
    </div>);
  }
  return ele;
}
