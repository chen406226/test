<template>
  <div class="el-table"
       :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border || isGroup,
      'el-table--hidden': isHidden,
      'el-table--group': isGroup,
      'el-table--fluid-height': maxHeight,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex,
      'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }, tableSize ? `el-table--${ tableSize }` : '']"
       @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
        v-if="showHeader"
        v-mousewheel="handleHeaderFooterMousewheel"
        class="el-table__header-wrapper"
        ref="headerWrapper">
      <table-header
          ref="tableHeader"
          :store="store"
          :border="border"
          :default-sort="defaultSort"
          :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-header>
    </div>
    <!-- <span>{{layout.headerHeight}}</span> -->
    <div
        class="el-table__body-wrapper ctable-bodyWrapper"
        ref="bodyWrapper"
        :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
        :style="[bodyHeight]">
      <table-body
          :context="context"
          :store="store"
          :listTree="listTree"
          :key="rowDrogKey"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
           width: bodyWidth
        }">
      </table-body>
      <div v-if="rowFixData && rowFixData.length" class="ctable-bodyWrapper-cover scroll-body" :class="[rowFixFold?'fold':'']" :style="{top: cTop + 'px'}">
        <div class="table-body-cover">
          <table-body
              :store="store"
              :key="rowDrogKey"
              :listTree="listTree"
              :rowFixed="true"
              :stripe="stripe"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :highlight="highlightCurrentRow"
              :style="{
              width: bodyWidth
            }">
          </table-body>
        </div>
        <span @click="rowFixFold=!rowFixFold" :style="`left:${resizeState.width/2-15 + cLeft}px;`" class="arrow-cover"><span class="arrow-body"><i class="el-icon-d-arrow-right"></i></span></span>
      </div>
      <div
          v-if="!data || data.length === 0"
          class="el-table__empty-block"
          ref="emptyBlock"
          :style="emptyBlockStyle">
        <span class="el-table__empty-text" >
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
          v-if="$slots.append"
          class="el-table__append-wrapper"
          ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        v-mousewheel="handleHeaderFooterMousewheel"
        class="el-table__footer-wrapper"
        ref="footerWrapper">
      <table-footer
          :store="store"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :default-sort="defaultSort"
          :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-footer>
    </div>
    <div
        v-if="fixedColumns.length > 0"
        v-mousewheel="handleFixedMousewheel"
        class="el-table__fixed"
        ref="fixedWrapper"
        :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
          v-if="showHeader"
          class="el-table__fixed-header-wrapper"
          ref="fixedHeaderWrapper" >
        <table-header
            ref="fixedTableHeader"
            fixed="left"
            :border="border"
            :store="store"
            :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
          class="el-table__fixed-body-wrapper"
          ref="fixedBodyWrapper"
          :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
            fixed="left"
            :store="store"
            :key="rowDrogKey"
            :listTree="listTree"
            :stripe="stripe"
            :highlight="highlightCurrentRow"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :style="{
            width: bodyWidth
          }">
        </table-body>
        <div v-if="rowFixData && rowFixData.length" class="ctable-bodyWrapper-cover"  :class="[rowFixFold?'hidden-fold':'']" :style="{top: cTop + 'px'}">
          <table-body
              :store="store"
              :listTree="listTree"
              :key="rowDrogKey"
              :rowFixed="true"
              fixed="left"
              :stripe="stripe"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :highlight="highlightCurrentRow"
              :style="{
              width: bodyWidth
            }">
          </table-body>
        </div>
        <div
            v-if="$slots.append"
            class="el-table__append-gutter"
            :style="{ height: layout.appendHeight + 'px'}"></div>
      </div>
      <div
          v-if="showSummary"
          v-show="data && data.length > 0"
          class="el-table__fixed-footer-wrapper"
          ref="fixedFooterWrapper">
        <table-footer
            fixed="left"
            :border="border"
            :sum-text="sumText || t('el.table.sumText')"
            :summary-method="summaryMethod"
            :store="store"
            :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
        v-if="rightFixedColumns.length > 0"
        v-mousewheel="handleFixedMousewheel"
        class="el-table__fixed-right"
        ref="rightFixedWrapper"
        :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
           class="el-table__fixed-header-wrapper"
           ref="rightFixedHeaderWrapper">
        <table-header
            ref="rightFixedTableHeader"
            fixed="right"
            :border="border"
            :store="store"
            :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
          class="el-table__fixed-body-wrapper"
          ref="rightFixedBodyWrapper"
          :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
            fixed="right"
            :store="store"
            :key="rowDrogKey"
            :listTree="listTree"
            :stripe="stripe"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :highlight="highlightCurrentRow"
            :style="{
            width: bodyWidth
          }">
        </table-body>
        <div v-if="rowFixData && rowFixData.length" class="ctable-bodyWrapper-cover" :class="[rowFixFold?'hidden-fold':'']" :style="{top: cTop + 'px'}">
          <table-body
              :store="store"
              :key="rowDrogKey"
              :listTree="listTree"
              :rowFixed="true"
              fixed="right"
              :stripe="stripe"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :highlight="highlightCurrentRow"
              :style="{
              width: bodyWidth
            }">
          </table-body>
        </div>
        <div
            v-if="$slots.append"
            class="el-table__append-gutter"
            :style="{ height: layout.appendHeight + 'px' }"></div>
      </div>
      <div
          v-if="showSummary"
          v-show="data && data.length > 0"
          class="el-table__fixed-footer-wrapper"
          ref="rightFixedFooterWrapper">
        <table-footer
            fixed="right"
            :border="border"
            :sum-text="sumText || t('el.table.sumText')"
            :summary-method="summaryMethod"
            :store="store"
            :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
        v-if="rightFixedColumns.length > 0"
        class="el-table__fixed-right-patch"
        ref="rightFixedPatch"
        :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"></div>
    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
import ElCheckbox from 'element-ui/packages/checkbox';
import { debounce, throttle } from 'throttle-debounce';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import Mousewheel from 'element-ui/src/directives/mousewheel';
import Locale from 'element-ui/src/mixins/locale';
import Migrating from 'element-ui/src/mixins/migrating';
import { createStore, mapStates, createlistTree} from './store/helper';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import { parseHeight } from './util';
import Sortable from 'sortablejs'

let tableIdSeed = 1;

export default {
  name: 'CTable',

  mixins: [Locale, Migrating],

  directives: {
    Mousewheel
  },

  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    coluData: {
      type: Array,
      default: function() {
        return []
      }
    },
    rowFixData: {
      type: Array,
      default: function() {
        return []
      }
    },

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },
    levelFlag: {
      type: Object
    },
    headerTipInfo: {
      type: Object
    },

    lazy: Boolean,
    rowDropCopy: {
      type: Object,
      default() {
        return {type: 'confirm', disabled: true}
      }
    },
    rowDragOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    columnDragOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    rowDrag: Boolean,
    columnDrag: Boolean,


    load: Function
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody,
    ElCheckbox
  },

  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      };
    },

    setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },

    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected, false);
      this.store.updateAllSelected();
    },

    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },

    clearSelection() {
      this.store.clearSelection();
    },

    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },

    clearSort() {
      this.store.clearSort();
    },

    handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },

    updateScrollY() {
      const changed = this.layout.updateScrollY();
      if (changed) {
        this.layout.notifyObservers('scrollable');
        this.layout.updateColumnsWidth();
      }
    },

    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },

    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },

    // TODO 使用 CSS transform
    syncPostion: throttle(20, function() {
      const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
      const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      this.cTop = scrollTop;
      this.cLeft = scrollLeft
      const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = 'right';
      } else if (scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else {
        this.scrollPosition = 'middle';
      }
    }),

    bindEvents() {
      this.bodyWrapper.addEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        addResizeListener(this.$el, this.resizeListener);
      }
    },

    unbindEvents() {
      this.bodyWrapper.removeEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        removeResizeListener(this.$el, this.resizeListener);
      }
    },

    resizeListener() {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;

      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },

    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },

    sort(prop, order) {
      this.store.commit('sort', { prop, order });
    },

    toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },

    rowDrop () {
      this.$nextTick(() => {
        let xTable = this.$refs.bodyWrapper
        this.sortable = Sortable.create(xTable.querySelector('.el-table__body-wrapper>.el-table__body tbody'), {
          // handle: '.drag-btn',
          animation: 300,
          handle: '.el-table__row',
          onEnd: ($sev) => {
            if (this.$listeners.hasOwnProperty('overrideRowDropOnEnd')) {
              this.$emit('overrideRowDropOnEnd',$sev)
              return
            }
            const { newIndex, oldIndex, item} = $sev
            let listTree = this.listTree
            let childrenKey = this.treeProps.children
            let nR = listTree.listTreeData[listTree.listIndexGetRowKey[newIndex]]
            let oR = listTree.listTreeData[listTree.listIndexGetRowKey[oldIndex]]
            if (nR.parent != null) {
              if (nR.fathers.includes(oR['row'][this.rowKey].toString())) {
                let wrapperElem = item.parentNode
                let prevTrElem = item.previousElementSibling
                // 错误的移动
                let oldTrElem = wrapperElem.children[oldIndex]
                wrapperElem.insertBefore(item, oldTrElem)
                this.$message({
                  type: 'warning',
                  message: '不可插入自己子集'
                })
                return
              }
            }

            let currRow
            let needCopy = false
            const {type = '', disabled = false, suffix = null, suffixV = '-Copy'} = this.rowDropCopy
            if (type == 'auto') {
              needCopy = true
            }
            if (!disabled && type != 'auto') {
              this.$confirm('已拖动, 是否需要复制?', '操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                let oldRow = null
                if (oR.parent == null) {
                  oldRow = this.data[oR.index]
                } else {
                  let oRp = listTree.listTreeData[oR.parent]
                  oldRow = oRp['row'][childrenKey][oR.index]
                }
                currRow = Object.assign({},oldRow,{
                  isDropCopyed: true
                })
                if (this.rowKey) {
                  currRow[this.rowKey] = currRow[this.rowKey] + '-Copy'
                }
                if (suffix && Array.isArray(suffix)) {
                  suffix.forEach(item => {
                    if (suffixV instanceof Function) {
                      currRow[item] = suffixV(currRow[item])
                    } else {
                      currRow[item] = currRow[item] + suffixV
                    }
                  })
                }
                let nRp = {row: null}
                let i = nR.index
                if (nR.parent == null) {
                  this.data.splice(nR.index, 0, currRow)
                } else {
                  if (newIndex>oldIndex && nR.parent!=oR.parent) {
                    i=i+1
                  }
                  nRp = listTree.listTreeData[nR.parent]
                  nRp['row'][childrenKey].splice(i, 0,currRow)
                }
                this.rowDrogKey += 1
                this.$nextTick(()=>{
                  this.updateDragDrop()
                })
                this.$emit('rowDropOnEnd',$sev,{copyRow: currRow, oldRow: oldRow, parent: {row: nRp['row'],newIndex: i}})
                this.$message({
                  type: 'success',
                  message: '复制成功!'
                });
              }).catch(() => {
                if (oR.parent == null) {
                  currRow = this.data.splice(oR.index, 1)[0]
                } else {
                  let oRp = listTree.listTreeData[oR.parent]
                  currRow = oRp['row'][childrenKey].splice(oR.index, 1)[0]
                }
                let nRp = {row: null}
                let i = nR.index
                if (nR.parent == null) {
                  this.data.splice(nR.index, 0, currRow)
                } else {
                  if (newIndex>oldIndex && nR.parent!=oR.parent) {
                    i=i+1
                  }
                  nRp = listTree.listTreeData[nR.parent]
                  nRp['row'][childrenKey].splice(i, 0,currRow)
                }
                this.rowDrogKey += 1
                this.$emit('rowDropOnEnd',$sev,{oldRow: currRow,copyRow: null, parent: {row: nRp['row'],newIndex: i}})
                this.$nextTick(()=>{
                  this.updateDragDrop()
                })
                // this.$message({
                //   type: 'info',
                //   message: '已取消复制'
                // });
              });
              return
            }
            let copyRow = null
            let oldRow = null
            if (oR.parent == null) {
              if (needCopy) {
                currRow = this.data[oR.index]
                oldRow = this.data[oR.index]
                currRow = Object.assign({},currRow,{
                  isDropCopyed: true
                })
                if (this.rowKey) {
                  currRow[this.rowKey] = currRow[this.rowKey]+'-Copy'
                }
              } else {
                currRow = this.data.splice(oR.index, 1)[0]
              }
            } else {
              let oRp = listTree.listTreeData[oR.parent]
              if (needCopy) {
                currRow = oRp['row'][childrenKey][oR.index]
                oldRow = oRp['row'][childrenKey][oR.index]
                currRow = Object.assign({},currRow,{
                  isDropCopyed: true
                })
                if (this.rowKey) {
                  currRow[this.rowKey] = currRow[this.rowKey]+'-Copy'
                }
              } else {
                currRow = oRp['row'][childrenKey].splice(oR.index, 1)[0]
              }
            }
            let i = nR.index
            let nRp = {row: null}
            if (nR.parent == null) {
              this.data.splice(nR.index, 0, currRow)
            } else {
              if (newIndex>oldIndex && nR.parent!=oR.parent) {
                i=i+1
              }
              nRp = listTree.listTreeData[nR.parent]
              nRp['row'][childrenKey].splice(i, 0,currRow)
            }
            this.$emit('rowDropOnEnd',$sev,{oldRow: oldRow || currRow, copyRow: oldRow==null?null:currRow, parent: {row: nRp['row'],newIndex: i}})

            this.rowDrogKey += 1
            this.$nextTick(()=>{
              this.updateDragDrop()
            })
            // this.store.commit('setData', this.data)
          },
          ...this.rowDragOptions
        })
      })
    },
    columnDrop () {
      this.$nextTick(() => {
        let xTable = this.$refs.headerWrapper
        this.sortable = Sortable.create(xTable.querySelector('.el-table__header thead tr:first-child'), {
          handle: 'th:not(.no-drop):not(.gutter)',
          animation: 300,
          onEnd: ($sev) => {
            let { item, newIndex, oldIndex } = $sev
            let c = this.store.states._columns
            if (newIndex >= c.length) newIndex = c.length -1
            $sev.newIndex = newIndex
            if (this.$listeners.hasOwnProperty('overrideColumnDropOnEnd')) {
              this.$emit('overrideColumnDropOnEnd',$sev,this.store.updateColumns)
              this.$nextTick(()=>{
                this.store.updateColumns()
                this.layout.updateElsHeight();
                this.layout.updateColumnsWidth();
                this.updateDragDrop()
              })
              return
            }

            let newProp = c[newIndex]['property']
            let oldProp = c[oldIndex]['property']
            let currRow = c.splice(oldIndex, 1)[0]
            c.splice(newIndex, 0, currRow)
            this.$emit('columnDropOnEnd',$sev,{newProp,oldProp,c})
            this.store.updateColumns()
            this.$nextTick(()=>{
              this.layout.updateElsHeight();
              this.layout.updateColumnsWidth();
            })
          },
          ...this.columnDragOptions
        })
      })
    },
    reView () {
      setTimeout(()=>{
        this.updateDragDrop()
      }, 200)
    },

    updateDragDrop() {
      if (this.sortable) {
        this.sortable.destroy()
      }
      if (this.rowDrag) {
        this.rowDrop()
      }
      if (this.columnDrag) {
        this.columnDrop()
      }
    }
  },

  computed: {
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight() {
      return this.height ||
          this.maxHeight ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
    },

    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },

    bodyHeight() {
      const { headerHeight = 0, bodyHeight, footerHeight = 0} = this.layout;
      if (this.height) {
        return {
          height: bodyHeight ? bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        const maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === 'number') {
          return {
            'max-height': (maxHeight - footerHeight - (this.showHeader ? headerHeight : 0)) + 'px'
          };
        }
      }
      return {};
    },

    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        let maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === 'number') {
          maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          maxHeight -= this.layout.footerHeight;
          return {
            'max-height': maxHeight + 'px'
          };
        }
      }
      return {};
    },

    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }
    },

    emptyBlockStyle() {
      if (this.data && this.data.length) return null;
      let height = '100%';
      if (this.layout.appendHeight) {
        height = `calc(100% - ${this.layout.appendHeight}px)`;
      }
      return {
        width: this.bodyWidth,
        height
      };
    },

    ...mapStates({
      selection: 'selection',
      columns: 'columns',
      tableData: 'data',
      fixedColumns: 'fixedColumns',
      rightFixedColumns: 'rightFixedColumns'
    })
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey: {
      immediate: true,
      handler(value) {
        if (!this.rowKey) return;
        this.store.setCurrentRowKey(value);
      }
    },

    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      }
    },
    rowFixData: {
      immediate: true,
      handler(value) {
        this.store.commit('setFixData', value);
      }
    },

    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeysAdapter(newVal);
        }
      }
    }
  },
  updated () {
    // console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',this.listTree,this.$props.data)
  },
  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();


    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    // init filters
    this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;
    this.updateDragDrop()
  },

  destroyed() {
    this.unbindEvents();
    if (this.sortable) {
      this.sortable.destroy()
    }
  },

  data() {
    const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children
    });
    this.listTree = createlistTree()
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout,
      cTop: 0,
      cLeft: 0,
      rowDrogKey: 1,
      rowFixFold: false,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left'
    };
  }
};
</script>

<style lang="css">
.ctable-bodyWrapper {
  position: relative;
}
.ctable-bodyWrapper-cover {
  box-shadow: 1px 1px 6px rgba(0, 0, 0, .13);
  position: absolute;
  left: 0;
  z-index: 1;
  top: 0;
}
.c-icon-arrow-bg {
  height: 46px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.c-icon-arrow-cover{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  align-items: center;
}
.el-table .c-icon-arrow-cover div.el-table__expand-icon{
  margin: 0;
}
.c-icon-arrow-cover-level .w20{
  width: 20px;
}
.c-icon-border {
  border: 1px dashed #666;
}
div.el-table__expand-icon:not(.el-table__expand-icon--expanded) + div.c-icon-arrow-bg div:first-child{
  background: none;
}
.c-icon-arrow {
  position: relative;
  width: 20px;
  align-items: center;
  height: 20px;
  text-align: center;
  display: inline-block;
}
.c-icon-arrow-bg{
  display: flex;
  flex-direction: row-reverse;
}
.c-icon-arrow-bg div.veril{
  background-image: url('../../../assets/f1.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg div.shu{
  background-image: url('../../../assets/shu.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg div.l {
  background-image: url('../../../assets/c9.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg div.tu {
  background-image: url('../../../assets/tu.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg .c-icon-child-end-node{
  background-image: url('../../../assets/cm.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg.no-expanded .middle{
  background-image: url('../../../assets/cm.svg');
  background-size: 100% 100% ;
  background-repeat: no-repeat;
}
.c-icon-arrow-bg div{
  width: 20px;
  height: 100%;
}
.ctable-bodyWrapper-cover.scroll-body .arrow-cover i{
  transform: rotate(-90deg);
}
.ctable-bodyWrapper-cover.scroll-body .arrow-cover {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-top: 15px solid #f5f7fa;
  border-bottom: 0;
  opacity: 0;
  border-left: 10px solid transparent;
  width: 20px;
  border-right: 10px solid transparent;
  cursor: pointer;
  transition: all .5s ease-out;
}
.ctable-bodyWrapper-cover.scroll-body:hover .arrow-cover{
  bottom: -15px;
  opacity: 1;
}
.ctable-bodyWrapper-cover.scroll-body .arrow-cover:hover {
  border-top-color: rgba(0,0,0,.2);
}
.ctable-bodyWrapper-cover.scroll-body .arrow-cover .arrow-body{
  z-index: 1;
  position: absolute;
  width: 40px;
  line-height: 15px;
  height: 15px;
  top: -15px;
  left: -10px;
}
div.ctable-bodyWrapper-cover.fold .table-body-cover{
  height: 1px;
  overflow: hidden;
}
div.ctable-bodyWrapper-cover .table-body-cover{
  position: relative;
  z-index: 2;
}
div.ctable-bodyWrapper-cover.hidden-fold{
  height: 1px;
  overflow: hidden;
}
.ctable-bodyWrapper-cover.scroll-body.fold .arrow-cover{
  bottom: -15px;
  opacity: 1;
}.ctable-bodyWrapper-cover.scroll-body.fold .arrow-cover i{
   transform: rotate(90deg);
 }
.el-table__expand-icon .flag {
  display: inline-block;
  overflow: hidden;
  transition: all .5s ease-in-out;
  transform: scale(0);
  position: absolute;
  max-width: 40px;
  top: -16px;
}
.ctable-bodyWrapper-cover .row-fixed-flag {
  position: absolute;
  left: 4px;
}
.el-table__expand-icon--expanded.el-table__expand-icon:hover span.flag {
  transform: rotate(-90deg) scale(1);
}
.el-table__expand-icon:hover .flag {
  display: inline-block;
  overflow: hidden;
  transform: scale(1.1);

}

.el-table--scrollable-x.el-table--border {
  border-right: 1px solid #EBEEF5;
}


</style>
