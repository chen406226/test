<script>
export default {
  name:'CElTableColumns',
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
        return(<CElTableColumns scopedSlots={this.$scopedSlots} {...{props: {...item},attrs:{...item}}}>
        </CElTableColumns> )
      })
      return (<el-table-column  {...{props: {...this.$attrs,...this.$props}}}  label={this.label}>
        {list}
      </el-table-column>)
    }else{
      return (<el-table-column cellClick={()=>{console.log('click')}} scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
      </el-table-column>)
    }
  }
}

</script>
