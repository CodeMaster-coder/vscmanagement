<template>
    <div class="toolMaintainRequestPage_bigbox">
      <div class="toolMaintainRequestPage_linebox">
        <div class="toolMaintainRequestPage_input-group">
          <div class="toolMaintainRequestPage_label">
            <div class="toolMaintainRequestPage_label1">工具名称</div>
            <div class="toolMaintainRequestPage_label2">(Name)</div>
          </div>
          <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.toolName" :disabled="true">
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
          <el-input  v-model="RequestMaintainData.toolModel" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">领用单位</div>
          <div class="toolMaintainRequestPage_label2">(Pcs)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.toolPcs" :disabled="true">
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
          <el-input  v-model="RequestMaintainData.userName" :disabled="true">
          </el-input>
        </div>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">申请维修数量</div>
          <div class="toolMaintainRequestPage_label2">(Maintain num)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="number"  v-model="RequestMaintainData.maintainNum" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">是否修好</div>
          <div class="toolMaintainRequestPage_label2">(Repaired or not)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-radio-group v-model="repaired" @change="repairedStatusChange">
            <el-radio :label= true>是</el-radio>
            <el-radio :label= false>否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">修好数量</div>
          <div class="toolMaintainRequestPage_label2">(Repaired num)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="number" :disabled="!repaired" placeholder="Please enter num!" v-model="repairedNum" @input="repairedNumInput">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">是否报废</div>
          <div class="toolMaintainRequestPage_label2">(Scrap or not)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-radio-group v-model="scrap" @change="scrapStatusChange">
            <el-radio :label= true>是</el-radio>
            <el-radio :label= false>否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">报废数量</div>
          <div class="toolMaintainRequestPage_label2">(Scrap num)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="number" :disabled="!scrap" placeholder="Please enter num!" v-model="scarpNum" @input="scarpNumInput">
          </el-input>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定提交维修状态数据？</span>
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
        repairedNum: null,
        scarpNum: null,
        userName: null,  // 初始化为你的默认值
        dialogVisible: false,
        repaired: false,
        scrap: false
      };
    },
    methods: {
      repairedNumInput(e) {
          //修好数量输入
        if(this.scrap & this.scarpNum != null){
          if((parseInt(this.scarpNum) + parseInt(e)) > this.RequestMaintainData.maintainNum){
            this.$message.error('修好数量和报废数量不得大于报修数量!')
            this.repairedNum = null
          }
        }else{
          if(e > this.RequestMaintainData.maintainNum){
            this.$message.error('修好数量不得大于报修数量!')
            this.repairedNum = null
          }
        }
      },
      scarpNumInput(e) {
          //报废数量输入
        if(this.repaired & this.repairedNum != null){
          if((parseInt(this.repairedNum) + parseInt(e)) > this.RequestMaintainData.maintainNum){
            console.log(this.repairedNum + e)
            this.$message.error('修好数量和报废数量不得大于报修数量!')
            this.scarpNum = null
          }
        }else{
          if(e > this.RequestMaintainData.maintainNum){
            this.$message.error('报废数量不得大于报修数量!')
            this.scarpNum = null
          }
        }
      },
      repairedStatusChange(){
        if(!this.repaired){
          this.repairedNum = null
        }
      },
      scrapStatusChange(){
        if(!this.scrap){
          this.scarpNum = null
        }
      },
      dataInsert:antiShake(function() {
        if(!this.repaired){
          this.repairedNum = 0
        }
        if(!this.scrap){
          this.scarpNum = 0
        }
        // 处理提交按钮点击的逻辑
        console.log(this.repairedNum + this.scarpNum)
        let that = this
        that.dialogVisible = false
        if(this.repaired == false & this.scrap == false){
          this.$message.error('修好数量和报废数量至少填写一项！')       
        }else if(parseInt(this.repairedNum) + parseInt(this.scarpNum) != that.RequestMaintainData.maintainNum){
          this.$message.error('修好数量和报废数量之和必须等于维修申请数量！')
        }
        else{
         this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainStatusUpdate',
                  toolMaintainRequestId:that.RequestMaintainData.id,
                  toolName:that.RequestMaintainData.toolName,
                  toolModel:that.RequestMaintainData.toolModel,
                  toolPcs:that.RequestMaintainData.toolPcs,
                  maintainRequestUsername:that.RequestMaintainData.userName,
                  userName:that.userName,
                  maintainNum:that.RequestMaintainData.maintainNum,
                  repaired:that.repaired,
                  repairedNum:that.repairedNum,
                  scrap:that.scrap,
                  scarpNum:that.scarpNum,
                  maintainStartTime:that.RequestMaintainData.startTime,
                  maintainStartTimeStamp:that.RequestMaintainData.startTimeStamp,
                  timeStamp:Math.floor(Date.now() / 1000)
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.RequestMaintainData = {},
                    this.repairedNum = null,
                    this.scarpNum = null,
                    this.userName = null,  // 初始化为你的默认值
                    this.dialogVisible = false,
                    this.repaired = false,
                    this.scrap = false
                    this.$message.success('数据提交成功！')
                  }else{
                    this.$message.error('数据提交失败，请重试！')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
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
  @import url('./toolMaintainStatusConfirm.css')
  </style>
  