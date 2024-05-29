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
          <div class="toolMaintainRequestPage_label1">维修数量</div>
          <div class="toolMaintainRequestPage_label2">(Maintain num)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.maintainNum" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_linebox">
        <div class="toolMaintainRequestPage_input-group">
          <div class="toolMaintainRequestPage_label">
            <div class="toolMaintainRequestPage_label1">申请人</div>
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
          <div class="toolMaintainRequestPage_label1">所属区域</div>
          <div class="toolMaintainRequestPage_label2">(Working area)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input  v-model="RequestMaintainData.workingArea" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">问题描述</div>
          <div class="toolMaintainRequestPage_label2">(Problem detail)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
            <el-input  type="textarea" :rows="5" v-model="RequestMaintainData.problemDetail" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">备注</div>
          <div class="toolMaintainRequestPage_label2">(Comments)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
            <el-input  type="textarea" :rows="5" v-model="RequestMaintainData.EVKmaintainComment" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">申请维修时间</div>
          <div class="toolMaintainRequestPage_label2">(Apply time)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input v-model="RequestMaintainData.startTime" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">批准维修时间</div>
          <div class="toolMaintainRequestPage_label2">(Approve time)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input v-model="RequestMaintainData.approveTime" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">解决措施</div>
          <div class="toolMaintainRequestPage_label2">(Solution)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-input type="textarea" :rows="5" placeholder="Please enter problem solution!" v-model="problemSolution">
          </el-input>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">是否更换备件</div>
          <div class="toolMaintainRequestPage_label2">(Change part or not)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-radio-group v-model="partChangeChoose" @input = "partChangeStatus">
            <el-radio :label= true>是(Yes)</el-radio>
            <el-radio :label= false>否(No)</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="toolMaintainRequestPage_input-group">
          <div class="toolMaintainRequestPage_label">
            <div class="toolMaintainRequestPage_label1">截止时间</div>
            <div class="toolMaintainRequestPage_label2">(Deadline)</div>
          </div>
          <div class = 'toolMaintainRequestPage_selectbox' >
          <el-date-picker
      v-model="deadline" @change = "deadlineChange" value-format = "yyyy-MM-dd"
      type="date" 
      placeholder="Please select deadline!">
    </el-date-picker>
          </div>
        </div>
        <div class="toolMaintainRequestPage_input-group">
        <div class="toolMaintainRequestPage_label">
          <div class="toolMaintainRequestPage_label1">维修是否结束</div>
          <div class="toolMaintainRequestPage_label2">(Repair finish or not)</div>
        </div>
        <div class = 'toolMaintainRequestPage_selectbox' >
          <el-radio-group v-model="repairFinishChoose" @input = "repairFinishChange">
            <el-radio :label= true>是(Yes)</el-radio>
            <el-radio :label= false>否(No)</el-radio>
          </el-radio-group>
          <el-dialog
        title="提示"
        :visible.sync="repairChooseTrueVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定维修已结束？(Confirm maintain finished?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="repairChooseTrueVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="repairFinishTrue">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="repairChooseFalseVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定维修未结束？(Confirm maintain unfinished?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="repairChooseFalseVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="repairFinishFalse">确 定(confirm)</el-button>
        </span>
      </el-dialog>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定提交维修状态数据？(Confirm submit maintain status data?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="dataInsert">确 定(confirm)</el-button>
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
        partChange: null,
        problemSolution:null,
        deadline:null,
        deadlineStamp:null,
        repairFinish:null,
        repairChooseTrueVisible:false,
        repairChooseFalseVisible:false,
        repairFinishChoose:null,
        partChangeChoose:null
      };
    },
    methods: {
      deadlineChange(){
        this.deadlineStamp = new Date(this.deadline).getTime()/1000;
        console.log(this.deadlineStamp)
      },
      partChangeStatus(){
        if(this.partChangeChoose){
          this.partChange = true
        }
        if(!this.partChangeChoose){
          this.partChange = false
        }
      },
      repairFinishChange(){
        if(this.repairFinishChoose){
          this.repairChooseTrueVisible = true
        }
        if(!this.repairFinishChoose){
          this.repairChooseFalseVisible = true
        }
      },
      repairFinishTrue(){
        this.repairChooseTrueVisible = false
        this.repairFinish = true
      },
      repairFinishFalse(){
        this.repairChooseFalseVisible = false
        this.repairFinish = false
      },
      dataInsert:antiShake(function() {
        let that = this
        that.dialogVisible = false
        if(this.problemSolution == null){
          this.$message.error('请填写解决措施！(Please enter solution)')       
        }else if(this.partChangeChoose == null){
          this.$message.error('请选择是否需要更换备件！(Please select change part or not!)')
        }
        else if(this.deadline == null){
          this.$message.error('请选择截止时间！(Please select deadline!)')
        }else if(this.repairFinish == null){
          this.$message.error('请选择维修结束状态！(Please select maintain finished or not!)')
        }
        else{
         this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainStatusUpdateDetail',
                  toolMaintainRequestId:that.RequestMaintainData.id,
                  solution:that.problemSolution,
                  partChange:that.partChange,
                  deadline:that.deadline,
                  deadlineStamp:that.deadlineStamp,
                  repairFinish:this.repairFinish,
                  endTimeStamp:Math.floor(Date.now() / 1000),
                  userName:this.userName
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.RequestMaintainData = {},
                    that.problemSolution = null,
                    that.partChangeChoose = null,
                    that.deadline = null,
                    that.deadlineStamp = null,
                    that.repairFinishChoose = null
                    this.$message.success('数据提交成功！(Data submit successfully!)')
                  }else{
                    this.$message.error('数据提交失败，请重试！(Data submit failed, please try again!)')
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
        this.$confirm('确认关闭？(Confirm colsed?)')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }

    
  },
  mounted(){
        console.log(this.$route.params.RequestData)
        this.RequestMaintainData = this.$route.params.RequestData
        this.problemSolution = this.$route.params.RequestData.solution 
        if(this.$route.params.RequestData.partChange != null){
          this.partChangeChoose = Boolean(this.$route.params.RequestData.partChange)
          this.partChange = Boolean(this.$route.params.RequestData.partChange)
        }else{
          this.partChangeChoose = null
          this.partChange = null
        }
        
        this.deadline = this.$route.params.RequestData.deadlineDate
        if(this.$route.params.RequestData.repairFinish != null){
          this.repairFinishChoose = Boolean(this.$route.params.RequestData.repairFinish)
          this.repairFinish = Boolean(this.$route.params.RequestData.repairFinish)
        }else{
          this.repairFinishChoose = null
          this.repairFinish = null
        }
        this.userName = store.getters.username;
        this.deadlineStamp = this.$route.params.RequestData.deadlineStamp
    }}
  </script>
  
  <style scoped>
  /* 在这里添加样式规则，以适应 Vue 的样式语法 */
  @import url('./toolMaintainStatusUpdateDetail.css')
  </style>
  