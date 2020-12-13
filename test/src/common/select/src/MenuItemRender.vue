<script>
export default {
  functional: true,
  name:'menuItemRender',
  props:{
    com: Object,
    indss: {
      type: [Number,String]
    },
  },
  render (h,cont) {
    console.log(cont.props.com)
    cont.props.com.insdex='sdflkfdslksfdlsfldll'
    return cont.props.com
  }
}
</script>