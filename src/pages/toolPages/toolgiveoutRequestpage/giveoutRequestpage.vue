<template>
    <div class="bigbox">
      <div class="linebox">
        <div class="input-group">
          <div class="label">
            <div class="label1">工具名称</div>
            <div class="label2">(Name)</div>
          </div>
          <div class = 'selectbox' >
          <el-input  v-model="RequestData.materialName" :disabled="true">
          </el-input>
        </div>
        </div>
      </div>
      <div class="input-group">
        <div class="label">
          <div class="label1">工具型号</div>
          <div class="label2">(Type)</div>
        </div>
        <div class = 'selectbox' >
          <el-input  v-model="RequestData.materialModel" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="input-group">
        <div class="label">
          <div class="label1">库存数量</div>
          <div class="label2">(Storage)</div>
        </div>
        <div class = 'selectbox' >
          <el-input type="number"  v-model="RequestData.Num" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="input-group">
        <div class="label">
          <div class="label1">领用数量</div>
          <div class="label2">(Num)</div>
        </div>
        <div class = 'selectbox' >
          <el-input type="number" placeholder="Please enter num!" v-model="giveoutNum" @input="giveoutNumInput">
          </el-input>
        </div>
      </div>
      <div class="input-group">
        <div class="label">
          <div class="label1">领用单位</div>
          <div class="label2">(Pcs)</div>
        </div>
        <div class = 'selectbox' >
          <el-input  v-model="RequestData.pcs" :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="linebox">
        <div class="input-group">
          <div class="label">
            <div class="label1">领用人</div>
            <div class="label2">(User)</div>
          </div>
          <div class = 'selectbox' >
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
        <span>确定提交领用请求数据？(Confirm submit data?)</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消(cancel)</el-button>
          <el-button type="primary" @click="dataInsert">确 定(confirm)</el-button>
        </span>
      </el-dialog>
      <button class="checkBtn" @click="dialogVisible = true">提交(Submit)</button>
    </div>
  </template>
  
  <script>
  import store from '@/store'; // 导入 Vuex store
  //引入防抖文件
  import { antiShake } from '@/utils.js/utils_antishake.js';  
  export default {
    data() {
      return {
        RequestData: {},
        giveoutNum: null,
        userName: null,  // 初始化为你的默认值
        dialogVisible: false
      };
    },
    methods: {
      giveoutNumInput(e) {
        // 处理领用数量输入的逻辑
        console.log(e)
        if(e > this.RequestData.Num){
          this.$message.error('领用数量不得大于库存数量！(Apply num should not greater than storage num!)')
          this.giveoutNum = null
        }
      },
      dataInsert:antiShake(function() {
        // 处理提交按钮点击的逻辑
        console.log(1)
        let that = this
        that.dialogVisible = false
        if(this.giveoutNum != null){
                 
                 this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'requestGiveoutDataInsert',
                         materialName:that.RequestData.materialName,
                         materialModel:that.RequestData.materialModel,
                         giveoutNum:that.giveoutNum,
                         userName:that.userName,
                         giveoutPcs:that.RequestData.pcs,
                         giveoutTime:Math.floor(Date.now() / 1000)
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                           this.RequestData = {}
                           this.userName = null
                           this.giveoutNum = null
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
                    
               }else{
                this.$message.error('请输入领用数量！(Please enter apply num!)')
               }
      
    }),
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？(Confirm closed?)')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }

    
  },
  mounted(){
        console.log(this.$route.params.RequestData)
        this.RequestData = this.$route.params.RequestData
        this.userName = store.getters.username;
        this.department = store.getters.department;
        
    }}
  </script>
  
  <style scoped>
  /* 在这里添加样式规则，以适应 Vue 的样式语法 */
  @import url('./giveoutRequestpage.css')
  </style>
  