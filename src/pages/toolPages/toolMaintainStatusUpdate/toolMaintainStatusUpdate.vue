<template>
  <div class="wholePage" @click="resetCurrentIndex">
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


      <div class="queryGiveoutpage_checkBtn" @click="queryBtn">查询(Query)</div>
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
            <div class="queryGiveoutpage_title">维修数量</div>
          </div>
          <div class="queryGiveoutpage_columnbox4">
            <div class="queryGiveoutpage_title">单位</div>
          </div>
          <div class="queryGiveoutpage_columnbox5">
            <div class="queryGiveoutpage_title">申请维修人</div>
          </div>
          <div class="queryGiveoutpage_columnbox6">
            <div class="queryGiveoutpage_title">申请维修时间</div>
          </div>
        </div>

        <div class="queryGiveoutpage_tempbox" v-for="(item, index) in queryGiveoutArr" :key="index">
          <div class="queryGiveoutpage_endErrorContainer" :data-index="index">
            <div class="queryGiveoutpage_columnbox1">
              <div class="queryGiveoutpage_content">{{item.toolName}}</div>
            </div>
            <div class="queryGiveoutpage_columnbox2">
              <div class="queryGiveoutpage_content">{{item.toolModel}}</div>
            </div>
            <div class="queryGiveoutpage_columnbox3">
              <div class="queryGiveoutpage_content">{{item.maintainNum}}</div>
            </div>
            <div class="queryGiveoutpage_columnbox4">
              <div class="queryGiveoutpage_content">{{item.toolPcs}}</div>
            </div>
            <div class="queryGiveoutpage_columnbox5">
              <div class="queryGiveoutpage_content">{{item.userName}}</div>
            </div>
            <div class="queryGiveoutpage_columnbox6">
              <div class="queryGiveoutpage_content" :data-index="index" @click.stop="touchEnd($event, index)">{{item.startTime}}</div>
            </div>
            <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="delDialogVisible = true">
              <div class="queryGiveoutpage_content">删除</div>
            </div>
  
            <div class="delBtn" v-if="currentItem === index" :data-index="index" :data-id="item.id" @click="naviToConfirmPage(index)">
              <div class="queryGiveoutpage_content">更新</div>
            </div>

          </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="delDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定删除维修请求数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delRequestData">确 定</el-button>
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

  queryGiveout(materialName,userName){
    this.$axios.post('/electrode/login/',
        {demo:'queryToolNeedMaintain',
        toolName:materialName,
        userName:userName,
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
  this.queryGiveout(null,null)
  }
};
</script>

<style scoped>
  @import url('./toolMaintainStatusUpdate.css')
</style>  