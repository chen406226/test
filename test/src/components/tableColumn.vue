<script>
export default {
  // scopedSlots: self.$scopedSlots,
  name:'tableColumn',
  props:{
    label:{
      type:String
    }
  },
  render (h,cont) {

    let children = false
    if (this.$attrs.hasOwnProperty('children')||this.$props&&this.$props.hasOwnProperty('children')) {
      children = this.$attrs.children||this.$props&&this.$props.children
    }
    this.label = this.$props&&this.$props.label || this.$attrs.label
    let self = this
    if (children) {
      // console.log(this.$slots,this.$scopedSlots,'scopeslots')
      let list = children.map((item)=>{
        return(<el-table-column scopedSlots={this.$scopedSlots} {...{props: {...item},attrs:{...item}}}>
        </el-table-column> )
        // return(<el-table-column scopedSlots={{...this.$scopedSlots,default:function(props){
        //   return self.$scopedSlots.default({...props,prop:item.prop})
        // 第二种方法 重写， 把prop带进去， 因为那边的item外层没有prop属性， 所以用scope.prop替换item.prop  ckey
        // }}} {...{props: {...item},attrs:{...item}}}>
        // </el-table-column> )
      })
      return (<el-table-column  {...{props: {...this.$attrs,}}}  label={this.label}>
        {list}
      </el-table-column>)
    }else{
      // console.log(this.$slots,this.$scopedSlots,'ccccccccc')
      return (<el-table-column cell-click={()=>{console.log('click')}} scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
      </el-table-column>)
    }
  }
}
    // if (this.$attrs.hasOwnProperty('children')||this.$props&&this.$props.hasOwnProperty('children')) {
    //   children = this.$attrs.children||this.$props&&this.$props.children
    // }
    // this.label = this.$props&&this.$props.label || this.$attrs.label
    // console.log(this.$slots,this.$scopedSlots)
    // if (children) {
    //   let list = children.map((item)=>{
    //     return(<tableColumn scopedSlots={this.$scopedSlots} {...{props: {...item}}} {...{attrs:{...item}}}>
    //       { this.$slots.default }
    //     </tableColumn> )
    //   })
    //   return (<el-table-column {...{props: {...this.$attrs,}}} scopedSlots={this.$scopedSlots} label={this.label}>
    //     {list}
    //   </el-table-column>)
    // }else{
    //   return (<el-table-column scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
    //     { this.$slots.default }
    //     {
    //       this.$scopedSlots.default({
    //         row: '23443'
    //       })
    //     } 
    //   </el-table-column>)
    // }
    //  return (<el-table-column scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
    //     {
    //     this.$scopedSlots.default({
    //         row: '23443'
    //       })
    //     }
    //   </el-table-column>)
</script>
