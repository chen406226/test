<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="doClick"
    class="el-select-dropdown__item c-menu-list-item"
    v-show="visible"
    >
    <slot>
    </slot>
  </li>
</template>

<script type="text/babel">
  export default {
    name: 'MenuListItem',
    componentName: 'MenuListItem',
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      autoClose: {
        type: Boolean,
        default: true
      },
    },
    inject: ['cMenuToggleMenu'],
    data() {
      return {
        index: -1,
        groupDisabled: false,
        hitState: false,
        hover: false
      };
    },

    computed: {

    },

    methods: {
      hoverItem() {
        this.hover = true
      },
      doClick(e) {
        if (this.autoClose) {
          this.cMenuToggleMenu()
          this.$listeners.click(e,()=>{})
          return
        }
        this.$listeners.click(e,this.cMenuToggleMenu)
      },
    },

    created() {
    },
    mounted() {
    },

    beforeDestroy() {
    }
  };
</script>
<style lang="css" scoped>
.c-menu-list-item{
  width: calc(100% - 20px);
}
</style>
