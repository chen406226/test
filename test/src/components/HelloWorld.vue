<template>
  <div class="hello">
    <el-button @click="bTc">舒服</el-button>
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
      @dragChange="dragChange"
      row-key="id"
      :rowFixData="[]"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      max-height="500"
      :column-data="tablehead2"
      style="width: 700px">
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
  </div>
</template>

<script>
import tableColumn from './tableColumn'
import Ctable from '../common/table/src/table'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    tableColumn,Ctable
  },
  methods:{
    console(scope){
      console.log(scope)
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
      tablehead1:[
        {label:"姓名",
          prop:'name',
          fixed: 'left',
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
          {label:"日期",prop:'date',align:'center',width:200},
          {label:"姓名",prop:'name',align:'center',},
          {label:"省份",prop:'province',align:'center',},
          {label:"市区",prop:'city',align:'center',},
          {label:"地址",prop:'address',width:300,align:'center',},
          {label:"邮编",fixed:'right',prop:'zip',align:'center',}
      ],
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          id: 12,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          children: [{
            date: '2013-05-02',
            name: '张三丰',
            id: 13,
            province: '上海',
            city: '普陀区',
            children: [{
              date: '2013-05-02',
              name: '李四',
              id: 18,
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }],
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }],
          zip: 200333
        }, {
        //   date: '2016-05-02',
        //   name: '张三',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-04',
        //   name: '李四',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-01',
        //   name: '陈毅',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-08',
        //   name: '特朗普',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-06',
        //   name: '一万卡',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
          date: '2016-05-07',
          id: 14,
          name: '夫拉基',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
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
