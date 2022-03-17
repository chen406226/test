
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
    console.log('sfdsfdfdfsd',this,this.$props,this.$props.prop.type && ['template'].includes(this.$props.prop.type))

if (this.$props.prop.type && ['index', 'selection'].includes(this.$props.prop.type)) {
      return (<CtableColumn {...{props: {...this.$props.prop}}}>
      </CtableColumn>)
    }

this.$scopedSlots = {
      default: props => {
        console.log('propsss',props,typeof this.prop.render,this.prop.render instanceof Object && this.prop.render.render)


        if (typeof this.prop.render === "function") {
          return this.prop.render(createElement, props,this.prop.render instanceof Object && this.prop.render.render)
          // return this.prop.render(props) // 不分解出vue组件可以使用分解出去h is not function
          // return createElement(this.prop.render(props.row, props.$index, props),{props:{...props}})
        } else if (this.prop.render instanceof Object && this.prop.render.render) {
        console.log('props',props,typeof this.prop.render,this.prop.render instanceof Object && this.prop.render.render)
    // if (props.column.type && ['template'].includes(props.column.type)) {
    //     console.log('propstemplate',props,typeof this.prop.render,this.prop.render instanceof Object && this.prop.render.render)
    //   return (<this.prop.render props={props} pro={props} {...{props: {row: props.row, $index: props.$index, props,attrs: props}}}></this.prop.render>)
    // }
        return createElement(this.prop.render, {props: {row: props.row, $index: props.$index, props,attrs: props}})
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
