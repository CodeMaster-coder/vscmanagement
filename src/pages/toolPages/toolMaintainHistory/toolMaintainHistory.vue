<template>
  <div class="wholePage" @click="resetCurrentIndex">

    <div class="toolMaintainStatusUpdate_bigbox">
      <div class="toolMaintainStatusUpdate_bigtempbox">
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
          <div class="toolMaintainStatusUpdate_columnbox7">
            <div class="toolMaintainStatusUpdate_title">申请维修时间</div>
            <div class="toolMaintainStatusUpdate_title">applyTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox8">
            <div class="toolMaintainStatusUpdate_title">更换备件</div>
            <div class="toolMaintainStatusUpdate_title">partChange</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox9">
            <div class="toolMaintainStatusUpdate_title">解决措施</div>
            <div class="toolMaintainStatusUpdate_title">solution</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox10">
            <div class="toolMaintainStatusUpdate_title">修复日期</div>
            <div class="toolMaintainStatusUpdate_title">repairedTime</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox11">
            <div class="toolMaintainStatusUpdate_title">维修人</div>
            <div class="toolMaintainStatusUpdate_title">maintainName</div>
          </div>
          <div class="toolMaintainStatusUpdate_columnbox12">
            <div class="toolMaintainStatusUpdate_title">确认人</div>
            <div class="toolMaintainStatusUpdate_title">confirmName</div>
          </div>
        </div>

        <div class="toolMaintainStatusUpdate_tempbox2" v-for="(item, index) in queryGiveoutArr" :key="index">
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
            <div class="toolMaintainStatusUpdate_columnbox7">
              <div class="toolMaintainStatusUpdate_content">{{item.startTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox8">
              <div class="toolMaintainStatusUpdate_content">{{item.partChange}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox9">
              <div class="toolMaintainStatusUpdate_content">{{item.solution}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox10">
              <div class="toolMaintainStatusUpdate_content">{{item.endTime}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox11">
              <div class="toolMaintainStatusUpdate_content">{{item.maintainName}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox12">
              <div class="toolMaintainStatusUpdate_content" :data-index="index" @click.stop="">
                {{item.personalConfirmName}}
              </div>
            </div>  
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="delMaintainRequest(index)">
              <div class="toolMaintainStatusUpdate_content">删除(delete)</div>
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
      queryGiveoutArr:[],
      delDialogVisible:false,
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
                    this.$message.success('数据删除成功！(Delete data successfully!)')
                    this.reload()
                  }else{
                    this.$message.error('数据删除失败，请重试！(Delete data failed, please try again!)')
                  }
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    },

  queryBtn(){
    this.queryGiveout(this.chosenName,this.userName)
  },

  
  handleClose(done) {
    let that = this
      this.$confirm('确认关闭？(Confirm closed?)')
        .then(_ => {
          done();
        })
        .catch(_ => {});
  },



  naviToConfirmPage(index) {
      console.log(index)
      this.$router.push({
        name:'toolMaintainStatusUpdateDetail',
        params:{
            RequestData:this.queryGiveoutArr[index]
        }
      })
      console.log(this.queryGiveoutArr[index])
    },
  


  queryGiveout(){
    this.$axios.post('/electrode/login/',
        {demo:'queryToolMaintainHistory',
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
                this.$message.error('无数据！(No data1)')
                this.queryGiveoutArr = response.data
              }
                
                })
            .catch(error => {
              console.error('Error fetching material names:', error);
                    });
  }
  },
  mounted() {
  this.queryGiveout()
  }
};
</script>

<style scoped>
  @import url('./toolMaintainHistory.css')
</style>  