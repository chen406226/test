<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="$listeners.click"
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
      indss: {
        type: [Number,String]
      },

    },
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
      hoverItem(){
        this.hover = true
      }
    },

    created() {
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