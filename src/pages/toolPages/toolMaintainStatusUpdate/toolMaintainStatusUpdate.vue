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
            <div class="toolMaintainStatusUpdate_title">截止日期</div>
            <div class="toolMaintainStatusUpdate_title">deadlineDate</div>

          </div>
          <div class="toolMaintainStatusUpdate_columnbox12">
            <div class="toolMaintainStatusUpdate_title">状态</div>
            <div class="toolMaintainStatusUpdate_title">status</div>

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
              <div class="toolMaintainStatusUpdate_content">{{item.partChange == null ? item.partChange : Boolean(item.partChange)}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox11">
              <div class="toolMaintainStatusUpdate_content">{{item.deadlineDate}}</div>
            </div>
            <div class="toolMaintainStatusUpdate_columnbox12">
              <div :class="item.status===1?'toolMaintainStatusUpdate_content1' : item.status===2?'toolMaintainStatusUpdate_content2' : 'toolMaintainStatusUpdate_content3'" :data-index="index" @click.stop="touchEnd($event, index)">
                {{item.status}}
              </div>
            </div>  
            <div class="toolMaintainStatusUpdate_delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="naviToConfirmPage(index)">
              <div class="toolMaintainStatusUpdate_content">更新(update)</div>
            </div>

          </div>
        </div>
        
      </div>
      <button class="checkBtn" @click="toolMaintainExportBtn">导出(export)</button>
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
      queryGiveoutArr:[],
      delDialogVisible:false,
      value1:'',
      currentItem:null,
      allData:[]
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
        if (store.getters.auth > 1 & store.getters.department == 'EZ'|| store.getters.auth > 10) {
          this.currentItem = index;
          this.index = index
        } else {
          // 如果没有权限，可以通过某种方式给出提示
          this.$message.error('你没有权限！(You do not have permission!)');
        }
      // }
      console.log(this.currentItem)
  
      },
  delRequestData:antiShake(function() {
        // 删除请求数据的方法
        console.log(this.index)
        this.delDialogVisible = false
        this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteMaintainRequestData',
                         id:this.queryGiveoutArr[this.index].id
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
        {demo:'queryToolMaintainApproved',
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
  toolMaintainExportBtn(){
    this.$axios.post('/electrode/login/',
        {demo:'queryToolMaintainAllData',
        },
        {
        headers: {
        'Content-Type': 'application/json',
        },
            }).then(response => {
              if(response.data.length > 0){
                console.log(response.data)
                this.allData = response.data
                  // 创建一个工作簿对象
    const workbook = XLSX.utils.book_new();

// 将JSON数据转换为工作表数据
const worksheetData = response.data.map(obj => [obj.id,	obj.toolName
,	obj.toolModel,	obj.toolPcs,	obj.maintainNum,	obj.problemDetail,	obj.workingArea,	
  obj.userName,	obj.startTime,	obj.startTimeStamp,	obj.endTime,	obj.endTimeStamp,	
  obj.maintainName,	obj.approveTime,	obj.approveTimeStamp,	obj.approveName,	
obj.solution,	Boolean(obj.partChange),	obj.deadlineDate,	obj.deadlineDateStamp,	
obj.status,	Boolean(obj.repairFinish),	obj.EVKConfirmName,	obj.EVKConfirmTime,
obj.EVKConfirmTimeStamp,	obj.personalConfirmName,	
obj.personalConfirmTime,	obj.personalConfirmTimeStamp, obj.EVKmaintainComment]);

// 创建工作表
const worksheet = XLSX.utils.aoa_to_sheet([["id", "toolName", "toolModel", "toolPcs", "maintainNum", "problemDetail", "workingArea",
                "userName", "startTime", "startTimeStamp", "endTime", "endTimeStamp", "maintainName",
                "approveTime", "approveTimeStamp", "approveName", "solution", "partChange",
                "deadlineDate", "deadlineDateStamp", "status", "repairFinish", "EVKConfirmName",
                "EVKConfirmTime", "EVKConfirmTimeStamp", "personalConfirmName", "personalConfirmTime",
                "personalConfirmTimeStamp", "EVKmaintainComment"], ...worksheetData]);

// 将工作表添加到工作簿中
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// 导出Excel文件
XLSX.writeFile(workbook, "allMaintainData.xlsx");
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
  this.queryGiveout()
  }
};
</script>

<style scoped>
  @import url('./toolMaintainStatusUpdate.css')
</style>  