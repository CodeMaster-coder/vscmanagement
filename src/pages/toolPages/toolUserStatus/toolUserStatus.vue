<template>
    <div class="wholePage" @click="resetCurrentIndex">
      <div class="toolUserStatus_bigbox">
        <div :class="[normalListVisble? 'toolUserStatus_checkBtn' : 'toolUserStatus_checkBtn1']" @click="userNormalToolRequest">正常(Normal)</div>
        <div :class="[maintainListVisible? 'toolUserStatus_checkBtn' : 'toolUserStatus_checkBtn1']" @click="userMaintainToolRequest">维修中(Maintaining)</div>
        <div :class="[scrapLsitVisible? 'toolUserStatus_checkBtn' : 'toolUserStatus_checkBtn1']" @click="userScrapToolRequest">报废(Scrap)</div>
      </div>
  
      <div class="toolUserStatus_bigbox">
        <div v-show="normalListVisble" class="toolUserStatus_bigtempbox">
          <div class="toolUserStatus_tempbox">
            <div class="toolUserStatus_columnbox1">
              <div class="toolUserStatus_title">工具名称</div>
            </div>
            <div class="toolUserStatus_columnbox2">
              <div class="toolUserStatus_title">工具型号</div>
            </div>
            <div class="toolUserStatus_columnbox3">
              <div class="toolUserStatus_title">数量</div>
            </div>
            <div class="toolUserStatus_columnbox4">
              <div class="toolUserStatus_title">单位</div>
            </div>
            <div class="toolUserStatus_columnbox5">
              <div class="toolUserStatus_title">领用人</div>
            </div>
            <div class="toolUserStatus_columnbox6">
              <div class="toolUserStatus_title">领用时间</div>
            </div>
            <!-- <div class="toolUserStatus_columnbox7">
              <div class="toolUserStatus_title">操作</div>
            </div> -->
          </div>
  
          <div class="toolUserStatus_tempbox" v-for="(item, index) in normalToolUserList" :key="index" @click="">
            <div class="toolUserStatus_endErrorContainer" :data-index="index">
              <div class="toolUserStatus_columnbox1">
                <div class="toolUserStatus_content">{{item.materialName}}</div>
              </div>
              <div class="toolUserStatus_columnbox2">
                <div class="toolUserStatus_content">{{item.materialModel}}</div>
              </div>
              <div class="toolUserStatus_columnbox3">
                <div class="toolUserStatus_content">{{item.giveoutNum}}</div>
              </div>
              <div class="toolUserStatus_columnbox4">
                <div class="toolUserStatus_content">{{item.giveoutPcs}}</div>
              </div>
              <div class="toolUserStatus_columnbox5">
                <div class="toolUserStatus_content">{{item.userName}}</div>
              </div>
              <div class="toolUserStatus_columnbox6" @click.stop="touchEnd($event, index)">
                <div class="toolUserStatus_content">{{item.selecttime}}</div>
              </div>
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="naviToScrapRequestPage(index)">
                <div class="toolScrapApprovePage_content">报废</div>
              </div>
  
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="naviToRequestPage(index)">
                <div class="toolScrapApprovePage_content">维修</div>
              </div>
            </div>
            
          </div>
          
        </div>
        <div v-show="maintainListVisible" class="toolUserStatus_bigtempbox">
          <div class="toolUserStatus_tempbox">
            <div class="toolUserStatus_columnbox1">
              <div class="toolUserStatus_title">工具名称</div>
            </div>
            <div class="toolUserStatus_columnbox2">
              <div class="toolUserStatus_title">工具型号</div>
            </div>
            <div class="toolUserStatus_columnbox3">
              <div class="toolUserStatus_title">数量</div>
            </div>
            <div class="toolUserStatus_columnbox4">
              <div class="toolUserStatus_title">单位</div>
            </div>
            <div class="toolUserStatus_columnbox5">
              <div class="toolUserStatus_title">领用人</div>
            </div>
            <div class="toolUserStatus_columnbox6">
              <div class="toolUserStatus_title">维修开始时间</div>
            </div>
            <!-- <div class="toolUserStatus_columnbox7">
              <div class="toolUserStatus_title">操作</div>
            </div> -->
          </div>
  
          <div class="toolUserStatus_tempbox" v-for="(item, index) in normalToolUserList" :key="index">
            <div class="toolUserStatus_endErrorContainer" :data-index="index">
              <div class="toolUserStatus_columnbox1">
                <div class="toolUserStatus_content">{{item.toolName}}</div>
              </div>
              <div class="toolUserStatus_columnbox2">
                <div class="toolUserStatus_content">{{item.toolModel}}</div>
              </div>
              <div class="toolUserStatus_columnbox3">
                <div class="toolUserStatus_content">{{item.maintainNum}}</div>
              </div>
              <div class="toolUserStatus_columnbox4">
                <div class="toolUserStatus_content">{{item.toolPcs}}</div>
              </div>
              <div class="toolUserStatus_columnbox5">
                <div class="toolUserStatus_content">{{item.userName}}</div>
              </div>
              <div class="toolUserStatus_columnbox6">
                <div class="toolUserStatus_content">{{item.startTime}}</div>
              </div>
              <!-- <div class="toolUserStatus_columnbox7">
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
                <div class="toolUserStatus_content" @click="dialogVisible = true">删除</div>
              </div> -->
            </div>
          </div>
          
        </div>

        <div v-show="scrapLsitVisible" class="toolUserStatus_bigtempbox">
          <div class="toolUserStatus_tempbox">
            <div class="toolUserStatus_columnbox1">
              <div class="toolUserStatus_title">工具名称</div>
            </div>
            <div class="toolUserStatus_columnbox2">
              <div class="toolUserStatus_title">工具型号</div>
            </div>
            <div class="toolUserStatus_columnbox3">
              <div class="toolUserStatus_title">数量</div>
            </div>
            <div class="toolUserStatus_columnbox4">
              <div class="toolUserStatus_title">领用人</div>
            </div>
            <div class="toolUserStatus_columnbox5">
              <div class="toolUserStatus_title">审批人</div>
            </div>
            <div class="toolUserStatus_columnbox6">
              <div class="toolUserStatus_title">报废时间</div>
            </div>
            <!-- <div class="toolUserStatus_columnbox7">
              <div class="toolUserStatus_title">操作</div>
            </div> -->
          </div>
  
          <div class="toolUserStatus_tempbox" v-for="(item, index) in normalToolUserList" :key="index">
            <div class="toolUserStatus_endErrorContainer" :data-index="index">
              <div class="toolUserStatus_columnbox1">
                <div class="toolUserStatus_content">{{item.toolName}}</div>
              </div>
              <div class="toolUserStatus_columnbox2">
                <div class="toolUserStatus_content">{{item.toolModel}}</div>
              </div>
              <div class="toolUserStatus_columnbox3">
                <div class="toolUserStatus_content">{{item.scrapNum}}</div>
              </div>
              <div class="toolUserStatus_columnbox4">
                <div class="toolUserStatus_content">{{item.toolUserName}}</div>
              </div>
              <div class="toolUserStatus_columnbox5">
                <div class="toolUserStatus_content">{{item.scrapApproveName}}</div>
              </div>
              <div class="toolUserStatus_columnbox6">
                <div class="toolUserStatus_content">{{item.scrapApproveTime}}</div>
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
        normalListVisble:true,
        maintainListVisible:false,
        scrapLsitVisible:false,
        value:'',
        normalToolUserList:[],
        queryGiveoutArr:[],
        dialogVisible:false,
        value1:'',
        currentItem:null
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
        this.queryusertoollist('userToolNormalStorage', this.userName)
      },
      userMaintainToolRequest(){
        this.normalListVisble = false,
        this.maintainListVisible = true,
        this.scrapLsitVisible = false,
        this.queryusertoollist('queryToolNeedMaintain', this.userName)
      },
      userScrapToolRequest(){
        this.normalListVisble = false,
        this.maintainListVisible = false,
        this.scrapLsitVisible = true,
        this.queryusertoollist('queryUserToolScrap', this.userName)
      },
      touchEnd(event,index) {
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
    naviToScrapRequestPage(index) {
      console.log(index)
      this.$router.push({
        name:'toolScrapRequest',
        params:{
            RequestData:this.normalToolUserList[index]
        }
      })
      console.log(this.normalToolUserList[index])
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
    },
    mounted() {
      this.userName = store.getters.username;
      this.queryusertoollist('userToolNormalStorage', this.userName)
    }
  };
  </script>
  
  <style scoped>
    @import url('./toolUserStatus.css')
  </style>  