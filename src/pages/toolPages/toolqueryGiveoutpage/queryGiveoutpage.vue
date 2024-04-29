<template>
    <div>
      <div class="queryGiveoutpage_bigbox">
        <div class="queryGiveoutpage_linebox">
          <div class="queryGiveoutpage_input-group">
            <div class="queryGiveoutpage_label">
              <div class="queryGiveoutpage_label1">工具名称</div>
              <div class="queryGiveoutpage_label2">(Tool name)</div>
            </div>
            <div>
              <el-select class = 'queryGiveoutpage_selectbox'  
              v-model="chosenName" 
              @change = "materialNameChange" 
              filterable clearable placeholder="Please enter name!">
                  <el-option v-for="item in materialnamelist"   :value="item">
                  </el-option>
              </el-select>
            </div>
          </div>
        </div>
  
        <div class="queryGiveoutpage_linebox">
          <div class="queryGiveoutpage_input-group">
            <div class="queryGiveoutpage_label">
              <div class="queryGiveoutpage_label1">领用人</div>
              <div class="queryGiveoutpage_label2">(User)</div>
            </div>
            <div >
                <el-select class = 'queryGiveoutpage_selectbox' 
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
  
        <div class="queryGiveoutpage_input-group">
          <div class="queryGiveoutpage_label">
            <div class="queryGiveoutpage_label1">起始时间</div>
            <div class="queryGiveoutpage_label2">(StartDate)</div>
          </div>
          <el-date-picker
      v-model="startDate" @change = "startDateChange" value-format = "timestamp"
      type="date" 
      placeholder="Please select startdate!">
    </el-date-picker>
        </div>
  
        <div class="queryGiveoutpage_input-group" >
          <div class="queryGiveoutpage_label">
            <div class="queryGiveoutpage_label1">结束时间</div>
            <div class="queryGiveoutpage_label2">(EndDate)</div>
          </div>
          <el-date-picker
            v-model="endDate" @change = "endDateChange" value-format = "timestamp"
            type="date"
            placeholder="Please select enddate!">
          </el-date-picker>
        </div>
  
        <div class="queryGiveoutpage_checkBtn" @click="queryBtn">查询(Query)</div>
        <button class="queryGiveoutpage_checkBtn" @click="exportbtn">导出(export)</button>
      </div>
  
      <div class="queryGiveoutpage_bigbox">
        <div class="queryGiveoutpage_bigtempbox">
          <div class="queryGiveoutpage_tempbox">
            <div class="queryGiveoutpage_columnbox1">
              <div class="queryGiveoutpage_title">工具名称</div>
            </div>
            <div class="queryGiveoutpage_columnbox2">
              <div class="queryGiveoutpage_title">工具型号</div>
            </div>
            <div class="queryGiveoutpage_columnbox3">
              <div class="queryGiveoutpage_title">数量</div>
            </div>
            <div class="queryGiveoutpage_columnbox4">
              <div class="queryGiveoutpage_title">单位</div>
            </div>
            <div class="queryGiveoutpage_columnbox5">
              <div class="queryGiveoutpage_title">领用人</div>
            </div>
            <div class="queryGiveoutpage_columnbox6">
              <div class="queryGiveoutpage_title">领用时间</div>
            </div>
            <div class="queryGiveoutpage_columnbox7">
              <div class="queryGiveoutpage_title">操作</div>
            </div>
          </div>
  
          <div class="queryGiveoutpage_tempbox" v-for="(item, index) in queryGiveoutArr" :key="index">
            <div class="queryGiveoutpage_endErrorContainer" :data-index="index">
              <div class="queryGiveoutpage_columnbox1">
                <div class="queryGiveoutpage_content">{{item.materialName}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox2">
                <div class="queryGiveoutpage_content">{{item.materialModel}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox3">
                <div class="queryGiveoutpage_content">{{item.giveoutNum}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox4">
                <div class="queryGiveoutpage_content">{{item.giveoutPcs}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox5">
                <div class="queryGiveoutpage_content">{{item.userName}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox6">
                <div class="queryGiveoutpage_content">{{item.selecttime}}</div>
              </div>
              <div class="queryGiveoutpage_columnbox7">
                <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定删除领用数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delBtn(index)">确 定</el-button>
        </span>
      </el-dialog>
                <div class="queryGiveoutpage_content" @click="dialogVisible = true">删除</div>
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
      console.log('startDateSec',this.startDateSec)
      console.log('endDateSec',this.endDateSec)
      if((this.startDateSec =='Please select startdate!' & this.endDateSec != 'Please select enddate!')|| (this.startDateSec !='Please select startdate!' & this.endDateSec == 'Please select enddate!')){
      this.startDateSec='Please select startdate!',
      this.endDateSec='Please select enddate!',
      this.$message.error('结束时间和起始时间必须同时选择！！！')}
      this.queryGiveout(this.chosenName,this.userName,this.startDateSec,this.endDateSec)
    },

    delBtn:antiShake(function(index){
      this.dialogVisible = false
      if(store.getters.auth > 1){
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteGiveoutInfo',
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

    queryGiveout(materialName,userName,stratTime,endTime){
      this.$axios.post('/electrode/login/',
          {demo:'queryGiveout',
          materialName:materialName,
          userName:userName,
          stratTime:stratTime,
          endTime:endTime
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
                console.error('Error fetching material names:', error);
                      });
    },
    exportbtn(){

      // 创建一个工作簿对象
      const workbook = XLSX.utils.book_new();
          
      // 将JSON数据转换为工作表数据
      const worksheetData = this.queryGiveoutArr.map(obj => [obj.id, obj.materialName, obj.materialModel, obj.giveoutNum, obj.giveoutPcs, obj.userName, obj.editName, obj.selecttime, obj.giveoutTime]);
          
      // 创建工作表
      const worksheet = XLSX.utils.aoa_to_sheet([['id', 'materialName', 'materialModel', 'giveoutNum', 'giveoutPcs', 'userName', 'editName', 'selecttime', 'giveoutTime'], ...worksheetData]);
          
      // 将工作表添加到工作簿中
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          
      // 导出Excel文件
      XLSX.writeFile(workbook, "toolGiveoutHistory.xlsx");
      }
    },
    mounted() {
    this.querymaterialnamelist()
    this.queryusernamelist()
    this.queryGiveout(null,null,'Please select startdate!',null)
    }
  };
  </script>
  
  <style scoped>
    @import url('./queryGiveoutpage.css')
  </style>  