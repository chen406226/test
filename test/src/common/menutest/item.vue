<script>
export default {
  functional: true,
  name:'menuItem',
  props:{
    com: Object,
  },
  render (h,cont) {
    return cont.props.com
  }
}
</script>