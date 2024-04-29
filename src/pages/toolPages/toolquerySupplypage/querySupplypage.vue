<template>
    <div>
        <div class="bigbox">
        <div class="querySupplypage_linebox">
          <div class="querySupplypage_input-group">
            <div class="querySupplypage_label">
              <div class="querySupplypage_label1">工具名称</div>
              <div class="querySupplypage_label2">(Tool name)</div>
            </div>
            <div>
              <el-select class = 'querySupplypage_selectbox'  
              v-model="chosenName" 
              @change = "materialNameChange" 
              filterable clearable placeholder="Please enter name!">
                  <el-option v-for="item in materialnamelist"   :value="item">
                  </el-option>
              </el-select>
            </div>
          </div>
        </div>
  
        <div class="querySupplypage_input-group">
          <div class="querySupplypage_label">
            <div class="querySupplypage_label1">起始时间</div>
            <div class="querySupplypage_label2">(StartDate)</div>
          </div>
          <el-date-picker
      v-model="startDate" @change = "startDateChange" value-format = "timestamp"
      type="date" 
      placeholder="Please select startdate!">
    </el-date-picker>
        </div>
  
        <div class="querySupplypage_input-group" >
          <div class="querySupplypage_label">
            <div class="querySupplypage_label1">结束时间</div>
            <div class="querySupplypage_label2">(EndDate)</div>
          </div>
          <el-date-picker
            v-model="endDate" @change = "endDateChange" value-format = "timestamp"
            type="date"
            placeholder="Please select enddate!">
          </el-date-picker>
        </div>
  
        <div class="querySupplypage_checkBtn" @click="queryBtn">查询(Query)</div>
        <div class="querySupplypage_checkBtn" @click="exportbtn">导出(export)</div>
    </div>
  
    <div class="querySupplypage_bigbox">
      <div class="querySupplypage_bigtempbox">
        <div class="querySupplypage_tempbox">
          <div class="querySupplypage_columnbox1">
            <div class="querySupplypage_title">工具名称</div>
          </div>
          <div class="querySupplypage_columnbox2">
            <div class="querySupplypage_title">型号</div>
          </div>
          <div class="querySupplypage_columnbox3">
            <div class="querySupplypage_title">数量</div>
          </div>
          <div class="querySupplypage_columnbox4">
            <div class="querySupplypage_title">单位</div>
          </div>
          <div class="querySupplypage_columnbox5">
            <div class="querySupplypage_title">补库人</div>
          </div>
          <div class="querySupplypage_columnbox6">
            <div class="querySupplypage_title">领用时间</div>
          </div>
          <div class="querySupplypage_columnbox7">
            <div class="querySupplypage_title">操作</div>
          </div>
        </div>
  
        <div class="querySupplypage_tempbox">
          <div class="querySupplypage_columnbox1">
            <div class="querySupplypage_title">(Tool name)</div>
          </div>
          <div class="querySupplypage_columnbox2">
            <div class="querySupplypage_title">(Type)</div>
          </div>
          <div class="querySupplypage_columnbox3">
            <div class="querySupplypage_title">(Num)</div>
          </div>
          <div class="querySupplypage_columnbox4">
            <div class="querySupplypage_title">(Unit)</div>
          </div>
          <div class="querySupplypage_columnbox5">
            <div class="querySupplypage_title">(Handler)</div>
          </div>
          <div class="querySupplypage_columnbox6">
            <div class="querySupplypage_title">(GiveoutTime)</div>
          </div>
          <div class="querySupplypage_columnbox7">
            <div class="querySupplypage_title">(Edit)</div>
          </div>
        </div>
  
        <div v-for="(item, index) in querySupplyArr" :key="item.id" class="querySupplypage_tempbox">
          <div class="querySupplypage_endErrorContainer" :data-index="index">
            <div class="querySupplypage_columnbox1">
              <div class="querySupplypage_content">{{ item.materialName }}</div>
            </div>
            <div class="querySupplypage_columnbox2">
              <div class="querySupplypage_content">{{ item.materialModel }}</div>
            </div>
            <div class="querySupplypage_columnbox3">
              <div class="querySupplypage_content">{{ item.giveoutNum }}</div>
            </div>
            <div class="querySupplypage_columnbox4">
              <div class="querySupplypage_content">{{ item.giveoutPcs }}</div>
            </div>
            <div class="querySupplypage_columnbox5">
              <div class="querySupplypage_content">{{ item.supplyName }}</div>
            </div>
            <div class="querySupplypage_columnbox6">
              <div class="querySupplypage_content">{{ item.supplyTimestamp }}</div>
            </div>
            <div class="querySupplypage_columnbox7">
                <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定删除补库数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delBtn(index)">确 定</el-button>
        </span>
      </el-dialog>
              <div class="querySupplypage_content" :data-id="item.id" :data-index="index" @click="dialogVisible = true">删除</div>
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
  import XLSX from "xlsx/dist/xlsx.full.min.js"
  export default {
    data() {
      return {
        chosenName: null,
        materialnamelist: [],
        startDate:'',
        endDate: '',
        startDateSec:'Please select startdate!',
        endDateSec:'Please select enddate!',
        querySupplyArr: [], // 请确保有对应的数据
        dialogVisible:false
      };
    },
    inject:['reload'],
    methods: {
      materialNameChange(e){
      //材料名称选择
      console.log(e)
      this.chosenName = e
      },
      handleClose(done) {
      let that = this
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
      startDateChange(e){
      console.log(e)
      this.startDateSec = e/1000
      },
  
      endDateChange(e){
        if(e/1000 < this.startDate/1000){
          this.$message.error('结束日期不能小于起始日期！')
          this.startDateSec=null,
          this.endDateSec=null,
          this.startDate='',
          this.endDate=''
        }else{
          this.endDateSec = e/1000
        }
      },
      queryBtn() {
        // 处理查询事件
      console.log('startDateSec',this.startDateSec)
      console.log('endDateSec',this.endDateSec)
      if((this.startDateSec =='Please select startdate!' & this.endDateSec != 'Please select enddate!')|| (this.startDateSec !='Please select startdate!' & this.endDateSec == 'Please select enddate!')){
      this.startDateSec='Please select startdate!',
      this.endDateSec='Please select enddate!',
      this.$message.error('结束时间和起始时间必须同时选择！！！')}
      this.querySupply(this.chosenName,this.startDateSec,this.endDateSec)
      },
      delBtn:antiShake(function(index) {
        if(store.getters.auth > 1){
            // 处理删除事件
            this.dialogVisible = false
            this.$axios.post(
                     '/electrode/login/',
                     {
                         demo:'deleteSupplyInfo',
                         id:this.querySupplyArr[index].id
                     },
                     {headers:{
                         'Content-Type': 'application/json',
                     }}
                 ).then(
                     response => {
                         console.log(response.data);
                         if(response.data.status){
                           this.$message.success('数据删除成功！')
                           this.reload()
                         }else{
                           this.$message.error('数据删除交失败，请重试！')
                         }
                     }
                 ).catch(
                     error => {
                         console.log(error)
                     }
                 )
        }else{
          this.$message.error('你没有权限！')
        }
        
      }),
      querymaterialnamelist(){
        //查询所有物料名称
        this.$axios.post('/electrode/login/',{demo:'materialName'},{
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                    console.log(response.data);
                    this.materialnamelist = response.data
                    console.log(this.materialnamelist);
                    })
                .catch(error => {
                  console.error('Error fetching material names:', error);
                        });
      },
      querySupply(materialName,stratTime,endTime){
        this.$axios.post('/electrode/login/',
            {demo:'querySupply',
            materialName:materialName,
            stratTime:stratTime,
            endTime:endTime
            },
            {
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                  if(response.data.length > 0){
                    this.querySupplyArr = response.data
                  }else{
                    this.$message.error('无数据！')
                  }
                    
                    })
                .catch(error => {
                  console.error('Error fetching material names:', error);
                        });
      },
      exportbtn(){

        // 创建一个工作簿对象
        const workbook = XLSX.utils.book_new();

        // 将JSON数据转换为工作表数据
        const worksheetData = this.querySupplyArr.map(obj => [obj.id, obj.materialName, obj.materialModel, obj.giveoutPcs, obj.giveoutNum, obj.supplyName, obj.supplyTime, obj.supplyTimestamp]);

        // 创建工作表
        const worksheet = XLSX.utils.aoa_to_sheet([['id', 'materialName', 'materialModel', 'giveoutPcs', 'giveoutNum', 'supplyName', 'supplyTime', 'supplyTimestamp'], ...worksheetData]);

        // 将工作表添加到工作簿中
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 导出Excel文件
        XLSX.writeFile(workbook, "toolSupplyHistory.xlsx");
        }
    },
    mounted() {
      // 发起查询操作等
      this.querymaterialnamelist()
      this.querySupply(null,'Please select startdate!',null)

    }
  };
  </script>
  
  <style scoped>
  /* 你的样式定义 */
  @import url('./querySupplypage.css')
  </style>
  