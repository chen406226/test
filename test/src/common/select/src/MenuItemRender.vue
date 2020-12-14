<script>
export default {
  functional: true,
  name:'menuItemRender',
  props:{
    com: Object,
  },
  render (h,cont) {
    return cont.props.com
  }
}
</script>
