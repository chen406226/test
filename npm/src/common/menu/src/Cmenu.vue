<script src="../../../main.js"></script>
<template>
  <div
    class="el-select cmenu"
    :class="[selectSize ? 'el-select--' + selectSize : '',popperAppendToBody ? 'cmenu-fixed' : '']"
    @click.stop="toggleMenu"
    :style="popperAppendToBody ? `top:${top}px;left:${left}px;right:${right}px;bottom:${bottom}px;`:''"
    v-clickoutside="handleClose">
    <transition
      name="el-zoom-in-top"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible">
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': false }"
          >
          <MenuItemRender :indss="index" :com="item" v-for="(item, index) in menuItems" :key="index"></MenuItemRender>
          <slot></slot>
        </el-scrollbar>
      </el-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
  import ElSelectMenu from './menu-dropdown.vue';
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
  import MenuItemRender from './MenuItemRender';

  export default {
    name: 'Cmenu',

    componentName: 'Cmenu',

    computed: {
      selectSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },
    },
    components: {
      ElSelectMenu,MenuItemRender
    },
    directives: { Clickoutside },
    provide() {
      return {
        cMenuToggleMenu: this.toggleMenu
      };
    },
    props: {
      menuItems: {
        type: Array,
        default() {
          return []
        }
      },
      top: [Number,String],
      left: [Number,String],
      right: [Number,String],
      bottom: [Number,String],
      size: String,
      popperAppendToBody: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        options: [],
        selected: this.multiple ? [] : {},
        inputWidth: 0,
        visible: false,
      };
    },

    watch: {

      visible(val) {
        this.$emit('visible-change', val);
      },
    },

    methods: {
      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },
      handleClose() {
        this.visible = false;
      },

      handleOptionSelect(option, byClick) {
        if (this.multiple) {
          this.$emit('input', value);
          this.emitChange(value);
        } else {
          this.emitChange(option.value);
          this.visible = false;
        }

      },


      toggleMenu() {
        this.visible = !this.visible;
      },


      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },

      handleResize() {
        this.resetInputWidth();
      },

    },

    created() {
      if (this.multiple && !Array.isArray(this.value)) {
        this.$emit('input', []);
      }
      if (!this.multiple && Array.isArray(this.value)) {
        this.$emit('input', '');
      }
      this.$on('handleOptionClick', this.handleOptionSelect);
      this.$on('setSelected', this.setSelected);
    },

    mounted() {
      addResizeListener(this.$el, this.handleResize);
    },

    beforeDestroy() {
      if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
    }
  };
</script>

<style lang="css" scoped>
.cmenu-fixed {
  position: fixed;
  z-index: 99999;
}
</style>
