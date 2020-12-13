<template>
  <div class="hello">
    <el-row>
      <el-button @click="bTc">舒服</el-button>
      <el-button @click="deleteC">隐藏列</el-button>
      <el-button @click="pushC">插入列</el-button>
      <el-button @click="cMenu">菜单</el-button>
    </el-row>
    <CSelect :value="mmmm" :menuItems="menur" ref="Cselect"></CSelect> 
    <menutest>
        <menuItem v-for="item in menur" :com="item"></menuItem>
    </menutest>
    <div>
      <!-- <menuItem :com="{a:'d'}"></menuItem> -->
      <span v-for="item in tablehead1c">
        {{item.label}}
      </span>
    </div>
    <!-- <img src="../assets/f1.svg" alt="" srcset=""> -->
    <!-- <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
    <Ctable
    v-if="false"
      :data="tableData"
      @dragChange="dragChange"
      row-key="id"
      :rowFixData="[]"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      max-height="700"
      :column-data="tablehead2"
      style="width: 1200px">
      <tableColumn v-for="item in tablehead2" :key="item.label" v-bind="item" >
        <template slot-scope="scope">
          <!-- <div @click="console(scope,item)">{{item.label}}</div> -->
          <span>{{scope.row[scope.column.property]}}</span>
          <!-- <div v-if="scope.column.property=='date' || true">
            {{scope.row[scope.column.property]}}
          </div>
          <div v-else>
            <el-input type='text' v-model="scope.row[scope.column.property]"></el-input>
          </div> -->
          <!-- <div v-if="scope.prop=='date'"> 第二种方法
            {{scope.row[scope.prop]}}
          </div>
          <div v-else>
            <el-input type='text' v-model="scope.row[scope.prop]"></el-input>
          </div> -->
        </template>
      </tableColumn>
    </Ctable>
      <!-- :rowDropCopy="{type: 'inquiry'}" -->
    <!-- <Ctable
      ref="ctable"
      :data="tableData1"
      @dragChange="dragChange"
      row-key="id"
      :rowFixData="[]"
      rowDrag
      columnDrag
      default-expand-all
      @columnDropOnEnd="columnDropOnEnd"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      max-height="700"
      style="width: 1200px">
      <tableColumn v-for="item in tablehead1c" :key="item.label" v-bind="item" >
        <template slot-scope="scope">
          <span>{{scope.row[scope.column.property]}}</span>
        </template>
      </tableColumn>
    </Ctable> -->
    <span>{{mmmm}}</span>
  </div>
</template>

<script>
import tableColumn from './tableColumn'
// import Tt from './tt'
import Tt from '../common/select/src/ListItem'
import Ctable from '../common/table/src/table'
// import CSelect from '../common/select/src/select'
import CSelect from '../common/select/src/Cmenu'
import {deepD,da,da2} from './data'
import menutest from '../common/menutest/index'
import menuItem from '../common/menutest/item.vue'
// import Menu from '../common/popmenu/menu.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    tableColumn,Ctable,menutest,menuItem,Tt,CSelect
  },
  computed: {
    // tablehead1c() {
    //   console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    //   return this.tablehead2.filter((item,index)=>{
    //     console.log(item,!item.hidden)
    //     return !item.hasOwnProperty('hidden')
    //   })
    // }
  },
  updated (){
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
  },
  mounted(){
    this.dododo()
    // setInterval(() => {
    //   this.mmmm +=1
    // }, 1000);
  },
  methods:{
    console(scope){
      console.log(scope)
    },
    dododo(){
      this.tablehead1c = this.tablehead2.filter(item=>!item?.hidden)
    },
    overrideRowDropOnEnd($ev) {
      console.log($ev,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    overrideColumnDropOnEnd({newIndex},m) {
      console.log(newIndex,m,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    rowDropOnEnd($ev) {
      console.log($ev,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    columnDropOnEnd({newIndex,oldIndex},{newProp,oldProp}) {
      // 内部已优化， 如有建议修改深复制的column数据，不要操作渲染依赖数据避免浪费
      let currRow = this.tablehead2.splice(oldIndex, 1)[0]
      this.tablehead2.splice(newIndex, 0, currRow)
      console.log(newIndex,oldIndex,newProp,oldProp,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    deleteC (){
      this.tablehead1[1].hidden=true
      this.tablehead2[4]['hidden']='sdf'
      this.dododo()
    },
    pushC(){
      this.tablehead1[1].hidden=false
      // this.tablehead2.pop()
      this.tablehead2[4]['hidden']=false
    this.dododo()

    },
    cMenu (){
      this.$refs.Cselect.toggleMenu()
    },
    bTc(){
      window.ssD = self = this.tableData
      // this.tableData
      let currRow = this.tableData.splice(0, 1)[0]

      this.tableData.splice(1, 0, currRow)
      console.log(this.tableData==self,this.tableData)
      // this.tableData.forEach((item)=>console.log(item.name))
    },
    dragChange(n,o,d) {
      console.log(n,o,d,this.tableData==d)
      this.tableData = d
    }
  },
  data() {
    return {
      mmmm:1,
      // menur: [(<div onClick={()=>{console.log('流口水',this)}}>流口水的肌肤</div>)],
      menur: [(<Tt onClick={()=>{console.log('流口水',this)}}>流口水的肌肤</Tt>),(<Tt onClick={()=>{console.log('士大夫',this)}}>的肌肤</Tt>)],
      tablehead1:[
        {label:"姓名",
          prop:'name',
          width: 150,
          columnKey:'name',
          align:'center',
        },
      {
        label:'地区',
        align:'center',
        columnKey:'area',

        children:[
          {label:"省份",prop:'province',columnKey:'province',align:'center',},
          {label:"市区",prop:'city',columnKey:'infoss',align:'center',},
          {label:"地址",prop:'address',columnKey:'idfnfo',align:'center',}
        ]
      },{
        columnKey:'info',
        label:'信息',
        align:'center',
        children:[
          {label:"邮编",prop:'zip',columnKey:'zip',align:'center',}
        ]
      }
      ],
      tablehead2:[
          {label:"日期",prop:'date',align:'center',width:250},
          {label:"姓名",prop:'name',align:'center',width:250},
          {label:"省份",prop:'province',align:'center',},
          {label:"市区",prop:'city',align:'center',},
          {label:"地址",prop:'address',width:300,align:'center',},
          {label:"邮编",prop:'zip',align:'center',}
      ],
      tablehead1c:[],
      // tableData:da2,
      tableData:deepD,
      tableData1:da
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
