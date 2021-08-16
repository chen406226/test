
<script>
// import Operation from "../homepage/widget/Operation";
import CtableColumn from './table-column.js'

export default {
  name: 'CRTableColumn',
  props: {
    prop: {
      type: Object,
      default: () => {}
    }
  },
  render (createElement) {
    if (this.$props.prop.type && ['index'].includes(this.$props.prop.type)) {
      return (<CtableColumn {...{props: {...this.$props.prop}}}>
      </CtableColumn>)
    }
    this.$scopedSlots = {
      default: props => {
        if (typeof this.prop.render === "function") {
          return this.prop.render(createElement, props)
          // return this.prop.render(props) // 不分解出vue组件可以使用分解出去h is not function
          // return createElement(this.prop.render(props.row, props.$index, props),{props:{...props}})
        } else if (this.prop.render instanceof Object && this.prop.render.render) {
          return createElement(this.prop.render, {props: {row: props.row, $index: props.$index, props}})
          // return <Operation>fsd</Operation>
        } else {
          return (<span>{props.row[this.$props.prop.prop]}</span>)

        }
      }
    }
    return (<CtableColumn scopedSlots={this.$scopedSlots} {...{props: {...this.$props.prop}}}>
    </CtableColumn>)
  }
}
</script>
