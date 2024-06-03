<template>
    <div>
      <div class="bigbox">
        <div class="linebox">
          <div class="input-group">
            <div class="label">
              <div class="label1">工具名称</div>
              <div class="label2">(Name)</div>
            </div>
            <div>
              <el-select v-model="chosenName" @change = "materialNameChange" filterable placeholder="Please enter name!">
    <el-option
      v-for="item in materialnamelist"   :value="item">
    </el-option>
  </el-select>
            </div>
          </div>
        </div>
        <div class="linebox">
            <div class="input-group" @click="modelSelect">
          <div class="label">
            <div class="label1">工具类型</div>
            <div class="label2">(Type)</div>
          </div>
          <div>
            <div >
                <el-select @visible-change = "modelSelect" v-model="materialModel" filterable placeholder="Please select model!">
                    <el-option
                        v-for="item in modelList"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
          </div>
          
          
        </div>
        </div>
        
        <button class="checkBtn" @click="querybtn">查询(query)</button>
        <button class="checkBtn" @click="exportbtn">导出(export)</button>
      </div>
      <div class="bigbox">
        <div class="bigtempbox">
          <div class="tempbox">
            <div class="columnbox1">
              <div class="title">工具名称</div>
            </div>
            <div class="columnbox2">
              <div class="title">工具型号</div>
            </div>
            <div class="columnbox3">
              <div class="title">数量</div>
            </div>
            <div class="columnbox5">
              <div class="title">安全量</div>
            </div>
            <div class="columnbox4">
              <div class="title">单位</div>
            </div>
          </div>
          <div class="tempbox">
            <div class="columnbox1">
              <div class="title">(Name)</div>
            </div>
            <div class="columnbox2">
              <div class="title">(Type)</div>
            </div>
            <div class="columnbox3">
              <div class="title">(Num)</div>
            </div>
            <div class="columnbox5">
              <div class="title">(Safety)</div>
            </div>
            <div class="columnbox4">
              <div class="title">(Unit)</div>
            </div>
          </div>
          <div v-for="(item, index) in allMaterialStorage" :key="index" :data-index="index" :data-id="item.id" @click="naviToRequestPage(index)" class="tempbox">
            <div class="contentlinebox" :data-index="index" :data-id="item.id">
              <div class="columnbox1">
                <div class="content">{{ item.materialName }}</div>
              </div>
              <div class="columnbox2">
                <div class="content">{{ item.materialModel }}</div>
              </div>
              <div :class="{ 'columnbox3-1': item.Num < item.safetyStock, 'columnbox3-2': item.Num >= item.safetyStock }">
                <div class="content">{{ item.Num }}</div>
              </div>
              <div class="columnbox5">
                <div class="content" :data-index="index">{{ item.safetyStock }}</div>
              </div>
              <div class="columnbox4">
                <div class="content" :data-index="index">{{ item.pcs }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import XLSX from "xlsx/dist/xlsx.full.min.js"
import store from '@/store'; // 导入 Vuex store
   
    export default {

        components: {

                },
        data(){
        return {
      chosenName: null,
      materialnameshow: false,
      materialnamelist: [], // Assuming this is an array of material names
      materialModel:null,
      modelList: [], // Assuming this is an array of model names
      allMaterialStorage: [], // Assuming this is an array of material storage data
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value:''
    };
    
  },
  methods: {
    materialNameChange(e){
        //材料名称选择
        console.log(e)
        this.chosenName = e
        this.materialModel = null
        this.queryMaterialModelList(e)
    },
    modelSelect(visible) {
      // Handle model selection
      if(this.chosenName == null & visible){
        this.$message('请先选择工具名称！(Please select tool name first!)')
      }
    },
    modelChange(value) {
      this.modelIndex = value;
      // Handle model change
    },
    querybtn() {
        this.queryAllData(this.chosenName, this.materialModel)
    },
    naviToRequestPage(index) {
      console.log(index)
      if(store.getters.department == 'EVK' || store.getters.auth > 10){
        this.$router.push({
        name:'toolGiveoutRequestpage',
        params:{
            RequestData:this.allMaterialStorage[index]
        }
      })
      console.log(this.allMaterialStorage[index])
        
      }else{
        this.$message.error('你无权限！(You do not have permission!)')
      }
      
    },
    querymaterialnamelist(){
        //查询所有物料名称
        this.$axios.post('/electrode/login/',{demo:'materialName'},{
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                    console.log(response.data);
                    this.materialnamelist = response.data
                    })
                .catch(error => {
                    console.log(error);
                        });
                        },
    queryMaterialModelList(materialName){
        //查询物料类型
        this.$axios.post(
            '/electrode/login/',
            {
                demo:'modelName',
                chosenName:materialName
            },
            {headers:{
                'Content-Type': 'application/json',
            }}
        ).then(
            response => {
                console.log(response.data);
                this.modelList = response.data
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },    
    queryAllData(materialName,materialModel){
      //查询所有工具库存
      this.$axios.post(
              '/electrode/login/',
              {
                  demo:'queryStorage',
                  materialName:materialName,
                  materialModel:materialModel
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  this.allMaterialStorage = response.data
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
    } ,
    exportbtn(){

            // 创建一个工作簿对象
            const workbook = XLSX.utils.book_new();

            // 将JSON数据转换为工作表数据
            const worksheetData = this.allMaterialStorage.map(obj => [obj.id, obj.materialName, obj.materialModel, obj.Num, obj.pcs, obj.safetyStock]);

            // 创建工作表
            const worksheet = XLSX.utils.aoa_to_sheet([['id', 'materialName', 'materialModel', 'Num', 'pcs', 'safetyStock'], ...worksheetData]);

            // 将工作表添加到工作簿中
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            // 导出Excel文件
            XLSX.writeFile(workbook, "toolstorage.xlsx");
    }
  },
  mounted() {
    this.querymaterialnamelist()
    this.queryAllData(null,null)


  }
    }
   
</script>


<style scoped>
/* Add your component-specific styles here */

.bigbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.linebox {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  /* width: 100%; */
}

.label {
  display: flex;
  width: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #333333;
  margin-right: 20px;
  text-align: justify;
}

.label1 {
  width: 100%;
  text-align-last: justify;
}

.label2 {
  font-size: 10px;
}

.input {
  flex-basis: 50%;
  justify-content: top;
  align-self: start;
  width: 200px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px;
  text-align: center;
}

.materialnameoptions {
  flex-direction: column;
  width: 300px;
  background-color: #FBFAFA;
  z-index: 99999999;
  text-align: center;
  overflow: scroll;
  border: 1px solid #BBBBBB;
  border-radius: 20px;
}

.materialname {
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.picker {
  flex-basis: 40%;
  width: 150px;
  height: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px;
}

.picker-content1 {
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  color: #808080;
}

.picker-content {
  font-size: 16px;
  color: #333333;
  text-align: center;
  line-height: 20px;
}

.checkBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
  background-color: #39c0f8;
  border-radius: 10px;
  font-size: large;
}

.bigtempbox {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
}

.tempbox {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.contentlinebox {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.columnbox1 {
  width: 35%;
  display: flex;
  flex-direction: column;
}

.columnbox2 {
  width: 25%;
  display: flex;
  flex-direction: column;
}

.columnbox3 {
  width: 12.5%;
  display: flex;
  flex-direction: column;
}

.columnbox3-1 {
  width: 12.5%;
  display: flex;
  flex-direction: column;
  background-color: yellow;
}

.columnbox3-2 {
  width: 12.5%;
  display: flex;
  flex-direction: column;
}

.columnbox4 {
  width: 12.5%;
  display: flex;
  flex-direction: column;
}

.columnbox5 {
  width: 15%;
  display: flex;
  flex-direction: column;
}

.title {
  background-color: #c7e8f7;
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-left: 3px solid white;
  border-right: 3px solid white;
  font-size: 13px;
}

.content {
  width: 100%;
  height: 30px;
  overflow-wrap: break-word;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #c7e8f7;
  font-size: 13px;
}
</style>


