<template>
    <div class="wholePage" @click="resetCurrentIndex"> 
      <div class="toolScrapApprovePage_bigbox">
        <div class="toolScrapApprovePage_bigtempbox">
          <div class="toolScrapApprovePage_tempbox">
            <div class="toolScrapApprovePage_columnbox1">
              <div class="toolScrapApprovePage_title">工具名称</div>
            </div>
            <div class="toolScrapApprovePage_columnbox2">
              <div class="toolScrapApprovePage_title">工具型号</div>
            </div>
            <div class="toolScrapApprovePage_columnbox3">
              <div class="toolScrapApprovePage_title">报废数量</div>
            </div>
            <div class="toolScrapApprovePage_columnbox4">
              <div class="toolScrapApprovePage_title">单位</div>
            </div>
            <div class="toolScrapApprovePage_columnbox5">
              <div class="toolScrapApprovePage_title">报废申请人</div>
            </div>
            <div class="toolScrapApprovePage_columnbox6">
              <div class="toolScrapApprovePage_title">报废申请时间</div>
            </div>
            <div class="toolScrapApprovePage_columnbox7">
              <div class="toolScrapApprovePage_title">工具归属人</div>
            </div>
          </div>
  
          <div class="toolScrapApprovePage_tempbox" v-for="(item, index) in queryGiveoutArr" :key="index">
            <div class="toolScrapApprovePage_endErrorContainer" :data-index="index">
              <div class="toolScrapApprovePage_columnbox1">
                <div class="toolScrapApprovePage_content">{{item.toolName}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox2">
                <div class="toolScrapApprovePage_content">{{item.toolModel}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox3">
                <div class="toolScrapApprovePage_content">{{item.scrapRequestNum}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox4">
                <div class="toolScrapApprovePage_content">{{item.toolPcs}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox5">
                <div class="toolScrapApprovePage_content">{{item.scrapRequestName}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox6">
                <div class="toolScrapApprovePage_content">{{item.scrapRequestTime}}</div>
              </div>
              <div class="toolScrapApprovePage_columnbox7" @click.stop="touchEnd($event, index)">
                <div class="toolScrapApprovePage_content">{{item.toolUserName}}</div>
              </div>
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="delDialogVisible = true">
                <div class="toolScrapApprovePage_content">删除</div>
              </div>
  
              <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="approveDialogVisible = true">
                <div class="toolScrapApprovePage_content">批准</div>
              </div>
  
            </div>
          </div>
          <el-dialog
        title="提示"
        :visible.sync="delDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定删除报废请求数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delRequestData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="approveDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定批准报废请求数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="approveDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="approveRequestData">确 定</el-button>
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
        value:'',
        chosenName: null,
        materialnamelist:[],
        userName:null,
        allusername:[],
        queryGiveoutArr:[],
        delDialogVisible:false,
        approveDialogVisible:false,
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
    materialNameChange(e){
        //材料名称选择
        console.log(e)
        this.chosenName = e
    },
    userNameChange(e){
        this.userName = e
    },
    touchEnd(event,index) {
        // console.log(index)
        // 触摸结束的方法
      // this.touchex = event.changedTouches[0].screenX;
      // 如果需要设置其他数据，可以像上面一样直接修改
      // this.touchey = event.changedTouches[0].clientY;
      // if (this.touchsx - this.touchex >= 50) {
        if (store.getters.auth > 1) {
          this.currentItem = index;
          this.index = index
        } else {
          // 如果没有权限，可以通过某种方式给出提示
          this.$message.error('你没有权限！');
        }
      // }
      console.log(this.currentItem)
  
      },
  
    queryBtn(){
      this.queryGiveout(this.chosenName,this.userName)
    },
  
    
    handleClose(done) {
      let that = this
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    delRequestData:antiShake(function() {
        // 删除请求数据的方法
        console.log(this.index)
        this.delDialogVisible = false
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteScrapRequestData',
                         id:this.queryGiveoutArr[this.index].id,
                         scrapData:this.queryGiveoutArr[this.index]
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                          this.$message.success('维修请求数据删除成功！')
                          this.reload()
                         }else{
                           this.$message.error('维修请求数据删除失败！')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
      }),

    approveRequestData:antiShake(function(){
      // 批准请求数据的方法
      console.log(this.index)
      this.approveDialogVisible = false
      this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'approveScrapRequestData',
                         scrapData:this.queryGiveoutArr[this.index],
                         timeStamp:Math.floor(Date.now() / 1000),
                         scrapApproveName:this.userName
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                          this.$message.success('报废请求数据批准成功！')
                          this.reload()
                         }else{
                           this.$message.error('报废请求数据批准失败！')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )

    }

    ),
  
    querymaterialnamelist(){
        //查询所有物料名称
        this.$axios.post('/electrode/login/',{demo:'toolName'},{
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
  
    naviToConfirmPage(index) {
        console.log(index)
        this.$router.push({
          name:'toolMaintainStatusConfirm',
          params:{
              RequestData:this.queryGiveoutArr[index]
          }
        })
        console.log(this.queryGiveoutArr[index])
      },
    
    queryusernamelist(){
      this.$axios.post('/electrode/login/',{demo:'toolUserName'},{
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
  
    queryGiveout(){
      this.$axios.post('/electrode/login/',
          {demo:'queryToolScrapRequest',
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
    }
    },
    mounted() {
    this.querymaterialnamelist()
    this.queryusernamelist()
    this.queryGiveout()
    this.userName = store.getters.username;
    }
  };
  </script>
  
  <style scoped>
    @import url('./toolScrapApprovePage.css')
  </style>  