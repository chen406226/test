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
    <Cmenu :value="mmmm" :top="top" :left="left" :show.sync="shows" :menuItems="menur" ref="Cselect"></Cmenu>
    <Cmenu :top="topc" :left="leftc" :menuItems="menurc" :show.sync="showsc" ref="Cselectc"></Cmenu>
    <div>
      <span v-for="item in tablehead1c">
        {{item.label}}
      </span>
    </div>
    <CTable
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
      @cell-click="cellClick"
      @rowDropOnEnd="rowDropOnEnd"
      :rowDragOptions="{animation: 300}"
      :columnDragOptions="{animation: 300}"
      :rowFixData="rowFixData"
      :levelFlag="{0:'年',1:'月',2:'周'}"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      max-height="700"
      :column-data="tablehead2"
      style="width: 1200px">
      <CtableColumns v-for="item in tablehead1c" :key="item.label" v-bind="item" >
        <template slot-scope="scope">
          <span>{{scope.row[scope.column.property]}}</span>
        </template>
      </CtableColumns>
    </CTable>
  </div>
</template>

<script>
import {CMenuListItem} from 'celtable'
import {deepD,da,da2} from './data'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    CMenuListItem
  },
  computed: {
  },
  watch:{
    checkList:{
      deep: true,
      handler(n,o) {
        if (!this.$refs.ctable) {
          return
        }
        if (n.includes('列拖拽')) {this.columnDrag = true}else{this.columnDrag = false}
        if (n.includes('行拖拽')) {this.rowDrag = true}else{this.rowDrag = false}
        if (n.includes('行拖拽复制询问')) {this.rowDropCopy = {type: 'inquiry'}}else{
          if (n.includes('行拖拽复制')) {this.rowDropCopy = {type: 'auto'}}else{this.rowDropCopy = {disabled:true}}
        }
        if (n.includes('列固定')) {
          this.tablehead2[0]['fixed']=true
          // this.dododo()
        }else{
          this.tablehead2[0]['fixed']=false
        }
        this.dododo()
        // this.tableKey +=1
      },
      immediate:true
    }
  },
  updated (){
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
  },
  mounted(){
    console.log(this.$refs.ctable,'iiiiiiiiiiiiiiiiiiiii')
    this.dododo()
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
      // this.$refs.Cselect.toggleMenu()
      this.shows = true
    },
    cMenuc (){
      // this.$refs.Cselectc.toggleMenu()
      this.showsc = true

    },
    cellClick () {
      console.log('celclick')
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
      menur: [(<CMenuListItem autoClose={true} onClick={(e,$close)=>{console.log('流口水',this,e);if(!this.cashFixRow)return; this.rowFixData.push(this.cashFixRow)}}>固定这行</CMenuListItem>)
      ],
      menurc:[(<CMenuListItem autoClose={true} onClick={(e,$close)=>{console.log('士大夫',this,e);this.rowFixData.pop()}}>取消固定</CMenuListItem>)],
      rowDrag:true,
      tableKey:1,
      columnDrag:true,
      cashFixRow:null,
      rowDropCopy:{},
      shows:false,
      showsc:false,
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
      headerTipInfo: {
        className: 's',
        effect: 'dark',
        content: '全选仅选择最外层',
        placement: 'top'
      },
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
          {label:"日期",prop:'date',align:'center',width:250},
          {label:"姓名",prop:'name',align:'center',width:250},
          {label:"省份",prop:'province',align:'center',width:200},
          {label:"市区",prop:'city',align:'center',width:200},
          {label:"地址",prop:'address',width:300,align:'center',},
          {label:"邮编",prop:'zip',align:'center',width:150}
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
