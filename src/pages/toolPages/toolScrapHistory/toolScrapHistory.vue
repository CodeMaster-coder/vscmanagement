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
        <div class="toolMaintainHistory_checkBtn" @click="exportBtn">导出(Export)</div>
      </div>
  
      <div class="toolMaintainHistory_bigbox">
        <div class="toolMaintainHistory_bigtempbox">
          <div class="toolMaintainHistory_tempbox">
            <div class="toolMaintainHistory_columnbox1">
              <div class="toolMaintainHistory_title">工具名称</div>
              <div class="toolMaintainHistory_title">toolName</div>
            </div>
            <div class="toolMaintainHistory_columnbox2">
              <div class="toolMaintainHistory_title">工具型号</div>
              <div class="toolMaintainHistory_title">type</div>
            </div>
            <div class="toolMaintainHistory_columnbox3">
              <div class="toolMaintainHistory_title">数量</div>
              <div class="toolMaintainHistory_title">num</div>
            </div>
            <div class="toolMaintainHistory_columnbox4">
              <div class="toolMaintainHistory_title">领用人</div>
              <div class="toolMaintainHistory_title">userName</div>
            </div>
            <div class="toolMaintainHistory_columnbox5">
              <div class="toolMaintainHistory_title">报废人</div>
              <div class="toolMaintainHistory_title">scrapApplyName</div>
            </div>
            <div class="toolMaintainHistory_columnbox6">
              <div class="toolMaintainHistory_title">报废申请时间</div>
              <div class="toolMaintainHistory_title">scrapApplyTime</div>
            </div>
            <div class="toolMaintainHistory_columnbox7">
              <div class="toolMaintainHistory_title">报废审批时间</div>
              <div class="toolMaintainHistory_title">scrapApproveTime</div>
            </div>
            <div class="toolMaintainHistory_columnbox8">
              <div class="toolMaintainHistory_title">操作</div>
              <div class="toolMaintainHistory_title">edit</div>
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
                <div class="toolMaintainHistory_content">{{item.scrapNum}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox4">
                <div class="toolMaintainHistory_content">{{item.toolUserName}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox5">
                <div class="toolMaintainHistory_content">{{item.scrapApproveName}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox6">
                <div class="toolMaintainHistory_content">{{item.scrapRequestTime}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox7">
                <div class="toolMaintainHistory_content">{{item.scrapApproveTime}}</div>
              </div>
              <div class="toolMaintainHistory_columnbox8">
                <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定删除维修历史数据？(Confirm delete maintain history?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="delBtn(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
                <div class="toolMaintainHistory_content" @click="dialogVisible = true">删除(delete)</div>
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
  import XLSX from "xlsx/dist/xlsx.full.min.js"
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
        this.$message.error('结束日期不能小于起始日期！(The end date cannot be earlier than the start date!)')
        this.startDateSec=null,
        this.endDateSec=null,
        this.startDate='',
        this.endDate=''
      }else{
        this.endDateSec = e/1000
      }
    },

    queryBtn(){
      this.queryGiveout(this.chosenName,this.userName)
    },

    delBtn:antiShake(function(index){
      this.dialogVisible = false
      if(store.getters.auth > 1 & store.getters.department == 'EVK'){
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteScrapHistory',
                         id:this.queryGiveoutArr[index].id
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                           this.$message.success('数据删除成功！(Delete data successfully)')
                           this.reload()
                         }else{
                           this.$message.error('数据删除交失败，请重试！(Delete data failed, please try again!)')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
      }else{
        this.$message.error('你没有权限！(You do not have permission!)')
      }
      
    }),
    
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？(Confirm closed?)')
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
          {demo:'queryScrapHistory',
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
                  this.$message.error('无数据！(No data!)')
                  this.queryGiveoutArr = response.data
                }
                  
                  })
              .catch(error => {
                console.error('Error fetching tool names:', error);
                      });
    },
    exportBtn(){
      const workbook = XLSX.utils.book_new();

// 将JSON数据转换为工作表数据
const worksheetData = this.queryGiveoutArr.map(obj => [obj.id, obj.toolName, obj.toolModel, obj.toolPcs,  obj.scrapNum, 
obj.scrapApproveName, obj.scrapApproveTime, obj.scrapApproveTimeStamp,obj.toolUserName, obj.scrapRequestName,
obj.scrapRequestTime, obj.scrapRequestTimeStamp]);

// 创建工作表
const worksheet = XLSX.utils.aoa_to_sheet([['id', 'toolName', 'toolModel', 'toolPcs',  'scrapNum', 'scrapApproveName',
                    'scrapApproveTime', 'scrapApproveTimeStamp','toolUserName', 'scrapRequestName',
                    'scrapRequestTime', 'scrapRequestTimeStamp'], ...worksheetData]);

// 将工作表添加到工作簿中
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// 导出Excel文件
XLSX.writeFile(workbook, "toolScrapHistory.xlsx");
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
    @import url('./toolScrapHistory.css')
  </style>  