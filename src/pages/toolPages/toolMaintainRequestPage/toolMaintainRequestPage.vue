<template>
    <div class="toolMaintainRequestPage_bigbox">
      <div class="toolMaintainRequestPage_linebox">
        <div class="toolMaintainRequestPage_input-group">
          <div class="toolMaintainRequestPage_label">
            <div class="toolMaintainRequestPage_label1">工具名称</div>
            <div class="toolMaintainRequestPage_label2">(Name)</div>
          </div>
          <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.materialName" :disabled="true">
          </el-input>
        </div>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">工具型号</div>
          <div class="toolMaintainRequestPage_label2">(Type)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.materialModel" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">个人库存数量</div>
          <div class="toolMaintainRequestPage_label2">(User storage)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="number"  v-model="RequestMaintainData.giveoutNum" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">申请维修数量</div>
          <div class="toolMaintainRequestPage_label2">(Maintain num)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="number" placeholder="Please enter num!" v-model="maintainNum" @input="maintainNumInput">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">领用单位</div>
          <div class="toolMaintainRequestPage_label2">(Pcs)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.giveoutPcs
" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_linebox">
        <div class="toolMaintainRequestPage_input-group">
          <div class="toolMaintainRequestPage_label">
            <div class="toolMaintainRequestPage_label1">领用人</div>
            <div class="toolMaintainRequestPage_label2">(User)</div>
          </div>
          <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="userName" :disabled="true">
          </el-input>
        </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定提交领用请求数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dataInsert">确 定</el-button>
        </span>
      </el-dialog>
      <button class="toolMaintainRequestPage_checkBtn" @click="dialogVisible = true">提交(Submit)</button>
    </div>
  </template>
  
  <script>
  import store from '@/store'; // 导入 Vuex store
  //引入防抖文件
  import { antiShake } from '@/utils.js/utils_antishake.js';  
  export default {
    data() {
      return {
        RequestMaintainData: {},
        maintainNum: null,
        userName: null,  // 初始化为你的默认值
        dialogVisible: false
      };
    },
    methods: {
      maintainNumInput(e) {
        // 处理领用数量输入的逻辑
        // console.log(e)
        console.log(this.RequestMaintainData.giveoutNum)
        if(e > parseInt(this.RequestMaintainData.giveoutNum)){
          this.$message('申请维修数量不得大于个人库存数量！')
          this.maintainNum = null
        }
      },
      dataInsert:antiShake(function() {
        // 处理提交按钮点击的逻辑
        console.log(1)
        let that = this
        that.dialogVisible = false
        if(this.maintainNum != null){
                 
                 this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'maintainRequestDataInsert',
                         toolName:that.RequestMaintainData.materialName,
                         toolModel:that.RequestMaintainData.materialModel,
                         toolPcs:that.RequestMaintainData.giveoutPcs,
                         maintainNum:that.maintainNum,
                         userName:that.userName,
                         startTimeStamp:Math.floor(Date.now() / 1000)
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                           this.RequestMaintainData = {}
                           this.userName = null
                           this.maintainNum = null
                           this.$message('数据提交成功！')
                         }else{
                           this.$message('数据提交失败，请重试！')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
                    
               }else{
                this.$message('请输入领用数量！')
               }
      
    }),
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }

    
  },
  mounted(){
        console.log(this.$route.params.RequestData)
        this.RequestMaintainData = this.$route.params.RequestData
        this.userName = store.getters.username;
    }}
  </script>
  
  <style scoped>
  /* 在这里添加样式规则，以适应 Vue 的样式语法 */
  @import url('./toolMaintainRequestPage.css')
  </style>
  