<script>
import CtableColumn from '@/common/table/src/table-column'
export default {
  // scopedSlots: self.$scopedSlots,
  name:'tableColumn',
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
    let self = this
    if (this.$attrs.prop=='name') {
      console.log('dsffdfffffffffffffffffff')
      // console.log(this,this.$attrs.prop)
    }
    if (this.$props.prop=='name') {
      // console.log(this,'fsdddddddddddddddd')
    }
    if (children) {
      // console.log(this.$slots,this.$scopedSlots,'scopeslots')
      let list = children.map((item)=>{
        // return(<el-table-column scopedSlots={this.$scopedSlots} {...{props: {...item},attrs:{...item}}}>
        // </el-table-column> )
        // 第三种 递归
        return(<tableColumn scopedSlots={this.$scopedSlots} {...{props: {...item},attrs:{...item}}}>
        </tableColumn> )

        // 第二种方法 重写， 把prop带进去， 因为那边的item外层没有prop属性， 所以用scope.prop替换item.prop  ckey
        // return(<CtableColumn scopedSlots={{...this.$scopedSlots,default:function(props){
        //   return self.$scopedSlots.default({...props,prop:item.prop})
        // }}} {...{props: {...item},attrs:{...item}}}>
        // </el-table-column> )
      })
      return (<CtableColumn  {...{props: {...this.$attrs,...this.$props}}}  label={this.label}>
        {list}
      </CtableColumn>)
    }else{
      // console.log('dsfffff')
      // console.log(this.$slots,this.$scopedSlots,'ccccccccc')
      return (<CtableColumn cellClick={()=>{console.log('click')}} scopedSlots={this.$scopedSlots} {...{props: {...this.$attrs,...this.$props}}} label={this.label}>
      </CtableColumn>)
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
