<template>
  <div class="hello">
    <el-row>
      <el-button @click="bTc">舒服</el-button>
      <el-button @click="deleteC">隐藏地址列</el-button>
      <el-button @click="pushC">插入地址列</el-button>
      <el-button @click="cMenu">菜单</el-button>
    </el-row>
    <el-row>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="列拖拽"></el-checkbox>
        <el-checkbox label="行拖拽"></el-checkbox>
        <el-checkbox label="行拖拽复制"></el-checkbox>
        <el-checkbox label="行拖拽复制询问"></el-checkbox>
        <el-checkbox label="列固定"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <CSelect :value="mmmm" :top="top" :left="left" :menuItems="menur" ref="Cselect"></CSelect>
    <CSelect :top="topc" :left="leftc" :menuItems="menurc" ref="Cselectc"></CSelect>
<!--    <menutest>-->
<!--        <menuItem v-for="item in menur" :com="item"></menuItem>-->
<!--    </menutest>-->
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
      :data="tableData"
      ref="ctable"
      @dragChange="dragChange"
      :key="tableKey"
      row-key="id"
      :rowDrag="rowDrag"
      :columnDrag="columnDrag"
      :rowDropCopy="rowDropCopy"
      :headerTipInfo="headerTipInfo"
      @row-contextmenu="rightClick"
      @fixRow-contextmenu="fixRightClick"
      @selection-change="handleSelectionChange"
      @rowDropOnEnd="rowDropOnEnd"
      :rowFixData="rowFixData"
      :rowDragOptions="{animation: 300}"
      :columnDragOptions="{animation: 300}"
      :levelFlag="{0:'年',1:'月',2:'周'}"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      max-height="700"
      :column-data="tablehead2"
      style="width: 1200px">
      <tableColumn type="selection" width="55" fixed>
      </tableColumn>
          <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
      <tableColumn v-for="item in tablehead1c" :key="item.label" v-bind="item" >
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
// import tableColumn from './tableColumn'
import tableColumn from '../common/table/src/table-column.js'
// import Tt from './tt'
import Tt from '../common/select/src/ListItem'
import Ctable from '../common/table/src/table'
// import CSelect from '../common/select/src/select'
import CSelect from '../common/select/src/Cmenu'
import {deepD,da,da2} from './data'
import menutest from '../common/menutest/index'
import menuItem from '../common/menutest/item.vue'

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
  watch:{
    checkList:{
      deep: true,
      handler(n,o) {
        if (n.includes('列拖拽')) {this.columnDrag = true}else{this.columnDrag = false}
        if (n.includes('行拖拽')) {this.rowDrag = true}else{this.rowDrag = false}
        if (n.includes('行拖拽复制询问')) {this.rowDropCopy = {type: 'inquiry'}}else{
          if (n.includes('行拖拽复制')) {this.rowDropCopy = {type: 'auto', suffix:['Name'],suffixV:'-Copy'}}else{this.rowDropCopy = {disabled:true}}
        }
        if (n.includes('列固定')) {
          this.tablehead2[0]['fixed']=true
          // this.dododo()
        }else{
          this.tablehead2[0]['fixed']=false
          // this.dododo()
        }
        this.tableKey +=1
      },
      immediate:true
    }
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
      console.log(this.$refs.ctable,'cccccccccc@@@@@@@@@@@@@@@@@@@@@@@@@@@@cccccccccccccccccc')
      this.$refs.ctable&&this.$refs.ctable.reView()

    },
    overrideRowDropOnEnd($ev) {
      console.log($ev,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    overrideColumnDropOnEnd({newIndex},m) {
      console.log(newIndex,m,'vvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    rowDropOnEnd($ev,d) {
      console.log($ev,d,'###################')
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
    rightClick(row,c,e){
      console.log(e,this.$refs.Cselect.$el.childNodes[0].getBoundingClientRect().width)
      this.top = e.y
      this.left = e.x - (this.$refs.Cselect.$el.childNodes[0].getBoundingClientRect().width)/2
      e.stopPropagation()
      e.preventDefault()
      this.cashFixRow = row
      this.cMenu()
    },
    fixRightClick(row,c,e){
      this.topc = e.y
      this.leftc = e.x - (this.$refs.Cselectc.$el.childNodes[0].getBoundingClientRect().width)/2
      e.stopPropagation()
      e.preventDefault()
      this.cashFixRow = row
      this.cMenuc()
    },
    cMenu (){
      this.$refs.Cselect.toggleMenu()
    },
    cMenuc (){
      this.$refs.Cselectc.toggleMenu()
    },
    bTc(){
      window.ssD = self = this.tableData
      // this.tableData
      let currRow = this.tableData.splice(0, 1)[0]

      this.tableData.splice(1, 0, currRow)
      console.log(this.tableData==self,this.tableData)
      // this.tableData.forEach((item)=>console.log(item.name))
    },
          handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    dragChange(n,o,d) {
      console.log(n,o,d,this.tableData==d)
      this.tableData = d
    },
    renderHeader: function renderHeader(h, _ref) {
      var store = _ref.store;
      return h("span", {
        "attrs": {

        },
        "nativeOn": {
          "click": ()=>{}
        }
      });
    },
  },
  data() {
    return {
      mmmm:1,
      // menur: [(<div onClick={()=>{console.log('流口水',this)}}>流口水的肌肤</div>)],
      menur: [(<Tt autoClose={true} onClick={(e,$close)=>{console.log('流口水',this,e);if(!this.cashFixRow)return; this.rowFixData.push(this.cashFixRow)}}>固定这行</Tt>)
      ],
      menurc:[(<Tt autoClose={true} onClick={(e,$close)=>{console.log('士大夫',this,e);this.rowFixData.pop()}}>取消固定</Tt>)],
      rowDrag:false,
      tableKey:1,
      columnDrag:false,
      cashFixRow:null,
      rowDropCopy:{},
      multipleSelection: [],
      headerTipInfo: {
        className: 's',
        effect: 'dark',
        content: '全选仅选择最外层',
        placement: 'top'
      },
      rowFixData:[
        // {
        //   date: '2016-05-04',
        //   name: '43',
        //   id: 43,
        //   province: '行固定',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }
      ],
      top: null,
      topc: null,
      left:null,
      leftc:null,
      checkList: ['列拖拽','行拖拽','行固定','列固定','行拖拽复制','行拖拽复制询问'],
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
          // {label:"日期",prop:'date',align:'center',width:250},
          // {label:"姓名",prop:'name',align:'center',width:250},
          // {label:"省份",prop:'province',align:'center',width:200},
          // {label:"市区",prop:'city',align:'center',width:200},
          // {label:"地址",prop:'address',width:300,align:'center',},
          // {label:"邮编",prop:'zip',align:'center',width:150}
                             {label: '日期', prop: 'date', align: 'center', width: 400},
        {label: '姓ddfgffdgfd名', prop: 'name', align: 'center', width: 50},
        {label: '省份', prop: 'province', align: 'center', width: 100},
        {label: '市区', prop: 'city', align: 'center', width: 200},
        {label: '地址', prop: 'address', width: 300, align: 'center'},
        {label: '邮编', prop:'zip', align: 'center', width: 150}
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
