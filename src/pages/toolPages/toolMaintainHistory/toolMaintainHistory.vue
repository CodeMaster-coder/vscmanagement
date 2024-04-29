<template>
    <div>
      <div class="toolMaintainHistory_bigbox">
        <div class="toolMaintainHistory_linebox">
          <div class="toolMaintainHistory_input-group">
            <div class="toolMaintainHistory_label">
              <div class="toolMaintainHistory_label1">工具名称</div>
              <div class="toolMaintainHistory_label2">(Tool name)</div>
            </div>
            <div>
              <el-select class = 'toolMaintainHistory_selectbox'  
              v-model="chosenName" 
              @change = "materialNameChange" 
              filterable clearable placeholder="Please enter name!">
                  <el-option v-for="item in materialnamelist"   :value="item">
                  </el-option>
              </el-select>
            </div>
          </div>
        </div>
  
        <div class="toolMaintainHistory_linebox">
          <div class="toolMaintainHistory_input-group">
            <div class="toolMaintainHistory_label">
              <div class="toolMaintainHistory_label1">领用人</div>
              <div class="toolMaintainHistory_label2">(User)</div>
            </div>
            <div >
                <el-select class = 'toolMaintainHistory_selectbox' 
                v-model="userName" 
                @change = "userNameChange" 
                filterable clearable
                placeholder="Please select name!">
                    <el-option
                        v-for="item in allusername"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
          </div>
        </div>
  
  
        <div class="toolMaintainHistory_checkBtn" @click="queryBtn">查询(Query)</div>
      </div>
  
      <div class="toolMaintainHistory_bigbox">
        <div class="toolMaintainHistory_bigtempbox">
          <div class="toolMaintainHistory_tempbox">
            <div class="toolMaintainHistory_columnbox1">
              <div class="toolMaintainHistory_title">工具名称</div>
            </div>
            <div class="toolMaintainHistory_columnbox2">
              <div class="toolMaintainHistory_title">工具型号</div>
            </div>
            <div class="toolMaintainHistory_columnbox3">
              <div class="toolMaintainHistory_title">数量</div>
            </div>
            <div class="toolMaintainHistory_columnbox4">
              <div class="toolMaintainHistory_title">领用人</div>
            </div>
            <div class="toolMaintainHistory_columnbox5">
              <div class="toolMaintainHistory_title">维修人</div>
            </div>
            <div class="toolMaintainHistory_columnbox6">
              <div class="toolMaintainHistory_title">维修起始时间</div>
            </div>
            <div class="toolMaintainHistory_columnbox7">
              <div class="toolMaintainHistory_title">维修结束时间</div>
            </div>
            <div class="toolMaintainHistory_columnbox8">
              <div class="toolMaintainHistory_title">操作</div>
            </div>
          </div>
  
          <div class="toolMaintainHistory_tempbox" v-for="(item, index) in queryGiveoutArr" :key="index">
            <div class="toolMaintainHistory_endErrorContainer" :data-index="index">
              <div class="toolMaintainHistory_columnbox1">
                <div class="toolMaintainHistory_content">{{item.toolName}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox2">
                <div class="toolMaintainHistory_content">{{item.toolModel}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox3">
                <div class="toolMaintainHistory_content">{{item.repairedNum}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox4">
                <div class="toolMaintainHistory_content">{{item.userName}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox5">
                <div class="toolMaintainHistory_content">{{item.maintainName}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox6">
                <div class="toolMaintainHistory_content">{{item.startTime}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox7">
                <div class="toolMaintainHistory_content">{{item.endTime}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox8">
                <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定删除维修历史数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delBtn(index)">确 定</el-button>
        </span>
      </el-dialog>
                <div class="toolMaintainHistory_content" @click="dialogVisible = true">删除</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import store from '@/store'; // 导入 Vuex store
  //引入防抖文件
  import { antiShake } from '@/utils.js/utils_antishake.js';  
  export default {
    data(){
      return{
        value:'',
        chosenName: null,
        materialnamelist:[],
        userName:null,
        allusername:[],
        startDate:'',
        endDate: '',
        startDateSec:'Please select startdate!',
        endDateSec:'Please select enddate!',
        queryGiveoutArr:[],
        dialogVisible:false,
        value1:''
      }
      
    },
    inject:['reload'],
    methods: {
    materialNameChange(e){
        //材料名称选择
        console.log(e)
        this.chosenName = e
    },
    userNameChange(e){
        this.userName = e
    },

    startDateChange(e){
      console.log(e)
      this.startDateSec = e/1000
    },

    endDateChange(e){
      if(e/1000 < this.startDate/1000){
        this.$message.error('结束日期不能小于起始日期！')
        this.startDateSec=null,
        this.endDateSec=null,
        this.startDate='',
        this.endDate=''
      }else{
        this.endDateSec = e/1000
      }
    },

    queryBtn(){
      this.queryGiveout(this.chosenName,this.userName,this.startDateSec,this.endDateSec)
    },

    delBtn:antiShake(function(index){
      this.dialogVisible = false
      if(store.getters.auth > 1){
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteMaintainHistory',
                         id:this.queryGiveoutArr[index].id
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                           this.$message.success('数据删除成功！')
                           this.reload()
                         }else{
                           this.$message.error('数据删除交失败，请重试！')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
      }else{
        this.$message.error('你没有权限！')
      }
      
    }),
    
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    querymaterialnamelist(){
        //查询所有物料名称
        this.$axios.post('/electrode/login/',{demo:'materialName'},{
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                    // console.log(response.data);
                    this.materialnamelist = response.data
                    // console.log(this.materialnamelist);
                    })
                .catch(error => {
                  console.error('Error fetching material names:', error);
                        });
    },
    
    queryusernamelist(){
      this.$axios.post('/glue/login/',{demo:'userName'},{
          headers: {
          'Content-Type': 'application/json',
          },
              }).then(response => {
                  console.log(response.data);
                  this.allusername = response.data
                  // console.log(this.materialnamelist);
                  })
              .catch(error => {
                console.error('Error fetching material names:', error);
                      });
    },

    queryGiveout(toolName,userName){
      this.$axios.post('/electrode/login/',
          {demo:'queryMaintainHistory',
          toolName:toolName,
          userName:userName,
          },
          {
          headers: {
          'Content-Type': 'application/json',
          },
              }).then(response => {
                if(response.data.length > 0){
                  console.log(response.data)
                  this.queryGiveoutArr = response.data
                }else{
                  this.$message.error('无数据！')
                  this.queryGiveoutArr = response.data
                }
                  
                  })
              .catch(error => {
                console.error('Error fetching tool names:', error);
                      });
    }
    },
    mounted() {
    this.querymaterialnamelist()
    this.queryusernamelist()
    this.queryGiveout(null,null)
    }
  };
  </script>
  
  <style scoped>
    @import url('./toolMaintainHistory.css')
  </style>  