<script>
import CtableColumn from './table-column.js'
export default {
  name:'CtableColumns',
  props:{
    label:{
      type:String
    },
    columnKey: String,

  },
  render (h,cont) {
    let children = false
    if (this.$attrs.hasOwnProperty('children')||this.$props&&this.$props.hasOwnProperty('children')) {
      children = this.$attrs.children||this.$props&&this.$props.children
    }
    this.label = this.$props&&this.$props.label || this.$attrs.label
    if (children) {
      let list = children.map((item)=>{
        return(<CtableColumns scopedSlots={this.$scopedSlots} {...{props: {...item},attrs:{...item}}}>
        </CtableColumns> )
      })
      return (<CtableColumn  {...{props: {...this.$attrs,...this.$props}}}  label={this.label}>
        {list}
      </CtableColumn>)
    }else{
      return (<CtableColumn cellClick={()=>{console.log('click')}} scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
      </CtableColumn>)
    }
  }
}

</script>
