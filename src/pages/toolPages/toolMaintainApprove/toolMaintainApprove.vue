<template>
    <div class="wholePage" @click="resetCurrentIndex">
      <div class="toolMaintainApprove_bigbox">
        <div :class="[normalListVisble? 'toolMaintainApprove_checkBtn' : 'toolMaintainApprove_checkBtn1']" @click="userNormalToolRequest">待维修审批(maintain wait approve)</div>
        <div :class="[maintainListVisible? 'toolMaintainApprove_checkBtn' : 'toolMaintainApprove_checkBtn1']" @click="userMaintainToolRequest">维修结束EVK确认(maintain finish EVK confirm)</div>
        <div :class="[scrapLsitVisible? 'toolMaintainApprove_checkBtn' : 'toolMaintainApprove_checkBtn1']" @click="userScrapToolRequest">维修结束个人确认(maintain finish final confirm)</div>
      </div>
  
      <div class="toolMaintainApprove_bigbox">
        <div v-show="normalListVisble" class="toolMaintainApprove_bigtempbox">
          <div class="toolMaintainApprove_tempbox">
            <div class="toolMaintainApprove_columnbox1">
              <div class="toolMaintainApprove_title">工具名称</div>
            </div>
            <div class="toolMaintainApprove_columnbox2">
              <div class="toolMaintainApprove_title">工具型号</div>
            </div>
            <div class="toolMaintainApprove_columnbox3">
              <div class="toolMaintainApprove_title">数量</div>
            </div>
            <div class="toolMaintainApprove_columnbox4">
              <div class="toolMaintainApprove_title">申请人</div>
            </div>
            <div class="toolMaintainApprove_columnbox5">
              <div class="toolMaintainApprove_title">所属区域</div>
            </div>
            <div class="toolMaintainApprove_columnbox6">
              <div class="toolMaintainApprove_title">问题描述</div>
            </div>
            <div class="toolMaintainApprove_columnbox7">
              <div class="toolMaintainApprove_title">维修申请时间</div>
            </div>
          </div>
          <div class="toolMaintainApprove_tempbox">
            <div class="toolMaintainApprove_columnbox1">
              <div class="toolMaintainApprove_title">toolName</div>
            </div>
            <div class="toolMaintainApprove_columnbox2">
              <div class="toolMaintainApprove_title">type</div>
            </div>
            <div class="toolMaintainApprove_columnbox3">
              <div class="toolMaintainApprove_title">num</div>
            </div>
            <div class="toolMaintainApprove_columnbox4">
              <div class="toolMaintainApprove_title">applyname</div>
            </div>
            <div class="toolMaintainApprove_columnbox5">
              <div class="toolMaintainApprove_title">area</div>
            </div>
            <div class="toolMaintainApprove_columnbox6">
              <div class="toolMaintainApprove_title">problemDetail</div>
            </div>
            <div class="toolMaintainApprove_columnbox7">
              <div class="toolMaintainApprove_title">maintainApplyName</div>
            </div>
          </div>
  
          <div class="toolMaintainApprove_tempbox" v-for="(item, index) in normalToolUserList" :key="index" @click="">
            <div class="toolMaintainApprove_endErrorContainer" :data-index="index">
              <div class="toolMaintainApprove_columnbox1">
                <div class="toolMaintainApprove_content">{{item.toolName}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox2">
                <div class="toolMaintainApprove_content">{{item.toolModel}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox3">
                <div class="toolMaintainApprove_content">{{item.maintainNum}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox4">
                <div class="toolMaintainApprove_content">{{item.userName}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox5">
                <div class="toolMaintainApprove_content">{{item.workingArea}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox6">
                <div class="toolMaintainApprove_content">{{item.problemDetail}}</div>
              </div>
              <div class="toolMaintainApprove_columnbox7" @click.stop="touchEnd($event, index)">
                <div class="toolMaintainApprove_content">{{item.startTime}}</div>
              </div>
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="scrapRequest(index)">
                <div class="toolScrapApprovePage_content">报废(scrap)</div>
              </div>
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="maintainVisible = true">
                <div class="toolScrapApprovePage_content">维修(maintain)</div>
              </div>
            </div>
            <el-dialog
        title="提示"
        :visible.sync="maintainVisible"
        width="50%"
        :before-close="handleClose">
        <span>EVK维修备注(EVK maintain comment)</span>
        <el-input v-model="EVKmaintainComment" placeholder="请输入内容(please enter comment)"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="maintainVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="approveToMaintain(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
          </div>
          
        </div>
        <div v-show="maintainListVisible" class="toolMaintainApprove_bigtempbox">
          <div class="toolMaintainStatusUpdate_tempbox1">
          <div class="toolMaintainStatusUpdate_columnbox1">
            <div class="toolMaintainStatusUpdate_title">工具名称</div>
            <div class="toolMaintainStatusUpdate_title">toolName</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox2">
            <div class="toolMaintainStatusUpdate_title">工具型号</div>
            <div class="toolMaintainStatusUpdate_title">type</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox3">
            <div class="toolMaintainStatusUpdate_title">维修数量</div>
            <div class="toolMaintainStatusUpdate_title">maintainNum</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox4">
            <div class="toolMaintainStatusUpdate_title">申请维修人</div>
            <div class="toolMaintainStatusUpdate_title">applyName</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox5">
            <div class="toolMaintainStatusUpdate_title">所属区域</div>
            <div class="toolMaintainStatusUpdate_title">area</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox6">
            <div class="toolMaintainStatusUpdate_title">问题描述</div>
            <div class="toolMaintainStatusUpdate_title">problemDetail</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox13">
            <div class="toolMaintainStatusUpdate_title">备注</div>
            <div class="toolMaintainStatusUpdate_title">comments</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox7">
            <div class="toolMaintainStatusUpdate_title">申请维修时间</div>
            <div class="toolMaintainStatusUpdate_title">applyTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox8">
            <div class="toolMaintainStatusUpdate_title">批准维修时间</div>
            <div class="toolMaintainStatusUpdate_title">approveTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox9">
            <div class="toolMaintainStatusUpdate_title">解决措施</div>
            <div class="toolMaintainStatusUpdate_title">solution</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox10">
            <div class="toolMaintainStatusUpdate_title">更换备件</div>
            <div class="toolMaintainStatusUpdate_title">partChange</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox11">
            <div class="toolMaintainStatusUpdate_title">修复日期</div>
            <div class="toolMaintainStatusUpdate_title">repairedTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox12">
            <div class="toolMaintainStatusUpdate_title">维修人</div>
            <div class="toolMaintainStatusUpdate_title">maintainName</div>
          </div>
        </div>

        <div class="toolMaintainStatusUpdate_tempbox2" v-for="(item, index) in normalToolUserList" :key="index">
          <div class="toolMaintainStatusUpdate_endErrorContainer" :data-index="index">
            <div class="toolMaintainStatusUpdate_columnbox1">
              <div class="toolMaintainStatusUpdate_content">{{item.toolName}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox2">
              <div class="toolMaintainStatusUpdate_content">{{item.toolModel}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox3">
              <div class="toolMaintainStatusUpdate_content">{{item.maintainNum}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox4">
              <div class="toolMaintainStatusUpdate_content">{{item.userName}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox5">
              <div class="toolMaintainStatusUpdate_content">{{item.workingArea}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox6">
              <div class="toolMaintainStatusUpdate_content">{{item.problemDetail}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox13">
              <div class="toolMaintainStatusUpdate_content">{{item.EVKmaintainComment}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox7">
              <div class="toolMaintainStatusUpdate_content">{{item.startTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox8">
              <div class="toolMaintainStatusUpdate_content">{{item.approveTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox9">
              <div class="toolMaintainStatusUpdate_content">{{item.solution}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox10">
              <div class="toolMaintainStatusUpdate_content">{{item.partChange}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox11">
              <div class="toolMaintainStatusUpdate_content">{{item.endTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox12">
              <div class="toolMaintainStatusUpdate_content" :data-index="index" @click.stop="touchEnd($event, index)">
                {{item.maintainName}}
              </div>
            </div>  
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="unfinishDialogVisible = true">
              <div class="toolMaintainStatusUpdate_content">未修复(unrepeaired)</div>
              
            </div>
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="finishDialogVisible = true">
              <div class="toolMaintainStatusUpdate_content">已修复(repaired)</div>
              
            </div>

          </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="unfinishDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定工具未修复？(Confirm unrepeaired?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="unfinishDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="maintainUnfinish(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="finishDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定工具已修复？(Confirm repeaired?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="finishDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="maintainFinish(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
        </div>

        <div v-show="scrapLsitVisible" class="toolMaintainApprove_bigtempbox">
                    <div class="toolMaintainStatusUpdate_tempbox1">
          <div class="toolMaintainStatusUpdate_columnbox1">
            <div class="toolMaintainStatusUpdate_title">工具名称</div>
            <div class="toolMaintainStatusUpdate_title">toolName</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox2">
            <div class="toolMaintainStatusUpdate_title">工具型号</div>
            <div class="toolMaintainStatusUpdate_title">type</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox3">
            <div class="toolMaintainStatusUpdate_title">维修数量</div>
            <div class="toolMaintainStatusUpdate_title">num</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox4">
            <div class="toolMaintainStatusUpdate_title">申请维修人</div>
            <div class="toolMaintainStatusUpdate_title">applyName</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox5">
            <div class="toolMaintainStatusUpdate_title">所属区域</div>
            <div class="toolMaintainStatusUpdate_title">area</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox6">
            <div class="toolMaintainStatusUpdate_title">问题描述</div>
            <div class="toolMaintainStatusUpdate_title">problemDetail</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox13">
            <div class="toolMaintainStatusUpdate_title">备注</div>
            <div class="toolMaintainStatusUpdate_title">comment</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox7">
            <div class="toolMaintainStatusUpdate_title">申请维修时间</div>
            <div class="toolMaintainStatusUpdate_title">applyTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox8">
            <div class="toolMaintainStatusUpdate_title">批准维修时间</div>
            <div class="toolMaintainStatusUpdate_title">approveTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox9">
            <div class="toolMaintainStatusUpdate_title">解决措施</div>
            <div class="toolMaintainStatusUpdate_title">solution</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox10">
            <div class="toolMaintainStatusUpdate_title">更换备件</div>
            <div class="toolMaintainStatusUpdate_title">partChange</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox11">
            <div class="toolMaintainStatusUpdate_title">修复日期</div>
            <div class="toolMaintainStatusUpdate_title">repairedTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox12">
            <div class="toolMaintainStatusUpdate_title">维修人</div>
            <div class="toolMaintainStatusUpdate_title">maintainName</div>
          </div>
        </div>

        <div class="toolMaintainStatusUpdate_tempbox2" v-for="(item, index) in normalToolUserList" :key="index">
          <div class="toolMaintainStatusUpdate_endErrorContainer" :data-index="index">
            <div class="toolMaintainStatusUpdate_columnbox1">
              <div class="toolMaintainStatusUpdate_content">{{item.toolName}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox2">
              <div class="toolMaintainStatusUpdate_content">{{item.toolModel}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox3">
              <div class="toolMaintainStatusUpdate_content">{{item.maintainNum}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox4">
              <div class="toolMaintainStatusUpdate_content">{{item.userName}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox5">
              <div class="toolMaintainStatusUpdate_content">{{item.workingArea}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox6">
              <div class="toolMaintainStatusUpdate_content">{{item.problemDetail}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox13">
              <div class="toolMaintainStatusUpdate_content">{{item.EVKmaintainComment}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox7">
              <div class="toolMaintainStatusUpdate_content">{{item.startTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox8">
              <div class="toolMaintainStatusUpdate_content">{{item.approveTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox9">
              <div class="toolMaintainStatusUpdate_content">{{item.solution}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox10">
              <div class="toolMaintainStatusUpdate_content">{{item.partChange}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox11">
              <div class="toolMaintainStatusUpdate_content">{{item.endTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox12">
              <div class="toolMaintainStatusUpdate_content" :data-index="index" @click.stop="touchEnd1($event, index)">
                {{item.maintainName}}
              </div>
            </div>  
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="unfinishDialogVisible = true">
              <div class="toolMaintainStatusUpdate_content">未修复(unrepeaired)</div>
              
            </div>
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="finishDialogVisible = true">
              <div class="toolMaintainStatusUpdate_content">已修复(repaired)</div>
              
            </div>

          </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="unfinishDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定工具未修复？(Confirm unrepeaired?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="unfinishDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="maintainUnfinishPersonal(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="finishDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定工具已修复？(Confirm repaired?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="finishDialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="maintainFinishPersonal(index)">确 定(confirm)</el-button>
        </span>
      </el-dialog>
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
        normalListVisble:true,
        maintainListVisible:false,
        scrapLsitVisible:false,
        value:'',
        normalToolUserList:[],
        queryGiveoutArr:[],
        dialogVisible:false,
        value1:'',
        currentItem:null,
        unfinishDialogVisible:false,
        finishDialogVisible:false,
        maintainVisible:false,
        EVKmaintainComment:null
      }
      
    },
    inject:['reload'],
    methods: {
      resetCurrentIndex() {
        // 重置当前索引的方法
        this.currentItem = null
        console.log(this.currentItem)
      },
      userNormalToolRequest(){
        this.normalListVisble = true,
        this.maintainListVisible = false,
        this.scrapLsitVisible = false,
        this.queryusertoollist('queryToolMaintainApply', this.userName)
      },
      userMaintainToolRequest(){
        this.normalListVisble = false,
        this.maintainListVisible = true,
        this.scrapLsitVisible = false,
        this.queryusertoollist('queryToolMaintainEZFinished', this.userName)
      },
      userScrapToolRequest(){
        this.normalListVisble = false,
        this.maintainListVisible = false,
        this.scrapLsitVisible = true,
        this.queryusertoollist('queryToolMaintainEVKFinished', this.userName)
      },
      touchEnd(event,index) {
        if(store.getters.auth > 1 & store.getters.department == 'EVK'){
          this.currentItem = index;
          this.index = index
        }else{
          this.$message.error('你没有权限！(You do not have permission!)')
        }
          
  
      },
      touchEnd1(event,index) {
          this.currentItem = index;
          this.index = index
      },
      naviToRequestPage(index) {
      console.log(index)
      this.$router.push({
        name:'toolMaintainRequestPage',
        params:{
            RequestData:this.normalToolUserList[index]
        }
      })
      console.log(this.normalToolUserList[index])
    },
    maintainUnfinish(index){
      let that = this
      that.unfinishDialogVisible = false
      console.log(index)
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainUnfinishEVK',
                  id:that.normalToolUserList[index].id,
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据更新成功！(Data update successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据更新失败，请重试！(Data update failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    maintainFinish(index){
      let that = this
      console.log(index)
      that.finishDialogVisible = false
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainFinishEVK',
                  id:that.normalToolUserList[index].id,
                  timeStamp:Math.floor(Date.now() / 1000),
                  userName:that.userName,
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据更新成功！(Data update successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据更新失败，请重试！(Data update failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    maintainUnfinishPersonal(index){
      let that = this
      that.unfinishDialogVisible = false
      console.log(index)
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainUnfinishPersonal',
                  id:that.normalToolUserList[index].id,
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据更新成功！(Data update successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据更新失败，请重试！(Data update failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    maintainFinishPersonal(index){
      let that = this
      console.log(index)
      that.finishDialogVisible = false
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'maintainFinishPersonal',
                  id:that.normalToolUserList[index].id,
                  timeStamp:Math.floor(Date.now() / 1000),
                  userName:that.userName,
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据更新成功！(Data update successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据更新失败，请重试！(Data update failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    delMaintainRequest(index){
      let that = this
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'deleteMaintainRequestData',
                  id:that.normalToolUserList[index].id,
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据删除成功！(Data delete successfully)')
                    this.reload()
                  }else{
                    this.$message.error('数据删除失败，请重试！(Data delete failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    approveToMaintain(index) {
      let that = this
      console.log(index)
      if(this.EVKmaintainComment == null){
        this.$message.error('请输入维修备注！(Please enter maintain comment!)')
      }else{
        this.$axios.post(
              '/electrode/login/',
              {
                  demo:'approveToolMaintain',
                  id:that.normalToolUserList[index].id,
                  userName:that.userName,
                  startTimeStamp:Math.floor(Date.now() / 1000),
                  EVKmaintainComment:this.EVKmaintainComment
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('数据更新成功！(Data update successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据更新失败，请重试！(Data update failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
      }

    },
    queryusertoollist(demo,username){
        //查询当前用户所有工具记录
        this.$axios.post('/electrode/login/',{demo:demo,username:username},{
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                    console.log(response.data);
                    this.normalToolUserList = response.data
                    // console.log(this.materialnamelist);
                    })
                .catch(error => {
                  console.error('Error fetching material names:', error);
                        });
    },
    scrapRequest(index){
      let that = this
      console.log(index)
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'scrapRequestDataInsert',
                  toolName:that.normalToolUserList[index].toolName,
                  toolModel:that.normalToolUserList[index].toolModel,
                  toolPcs:that.normalToolUserList[index].toolPcs,
                  maintainNum:that.normalToolUserList[index].maintainNum,
                  workingArea:that.normalToolUserList[index].workingArea,
                  scrapRequestName:that.userName,
                  userName:that.normalToolUserList[index].userName,
                  problemDetail: that.normalToolUserList[index].problemDetail,
                  toolMaintainRequestId: that.normalToolUserList[index].id,
                  startTimeStamp:Math.floor(Date.now() / 1000)
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.$message.success('报废申请成功！(Scrap apply successfully)')
                    this.reload()
                  }else{
                    this.$message.error('报废申请失败，请重试！(Scrap apply failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted() {
      this.userName = store.getters.username;
      this.queryusertoollist('queryToolMaintainApply')
    }
  };
  </script>
  
  <style scoped>
    @import url('./toolMaintainApprove.css')
  </style>  