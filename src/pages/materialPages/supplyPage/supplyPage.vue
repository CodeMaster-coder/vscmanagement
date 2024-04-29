<template>
    <div class="bigbox">
      <div class="linebox">
        <div class="input-group">
          <div class="label">
            <div class="label1">耗材名称</div>
            <div class="label2">(Name)</div>
          </div>
          <div>
              <el-select class = 'selectbox' v-model="chosenName" @change = "materialNameChange" filterable placeholder="Please enter name!">
              <el-option v-for="item in materialnamelist"   :value="item">
              </el-option>
            </el-select>
            </div>
        </div>
      </div>
  
      <div class="input-group" >
        <div class="label">
          <div class="label1">耗材型号</div>
          <div class="label2">(Type)</div>
        </div>
        <div>
                <el-select class = 'selectbox' 
                @visible-change = "modelSelect" 
                v-model="materialModel" 
                @change = "modelChange" 
                filterable 
                placeholder="Please select model!">
                    <el-option
                        v-for="item in modelList"
                            :value="item">
                    </el-option>
                </el-select>
        </div>
      </div>
  
      <div class="input-group">
        <div class="label">
          <div class="label1">补库单位</div>
          <div class="label2">(Unit)</div>
        </div>
        <div class = 'selectbox' >
          <el-input placeholder="Supply unit" v-model="giveoutPcs" :disabled="true">
          </el-input>
        </div>
      </div>
  
      <div class="input-group">
        <div class="label">
          <div class="label1">补库数量</div>
          <div class="label2">(Num)</div>
        </div>
        
        <div class = 'selectbox' >
          <el-input placeholder="Please enter num!" type = "number" @input = "giveoutNumInput" v-model="giveoutNum" >
          </el-input>
        </div>
      </div>
  
      <button class="checkBtn" @click="giveoutBtn">添加(Add)</button>
  
      <div class="bigtempbox">
        <div class="tempbox">
          <div class="columnbox1">
            <div class="title">耗材名称</div>
          </div>
          <div class="columnbox2">
            <div class="title">耗材型号</div>
          </div>
          <div class="columnbox3">
            <div class="title">数量</div>
          </div>
          <div class="columnbox4">
            <div class="title">操作</div>
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
          <div class="columnbox4">
            <div class="title">(Edit)</div>
          </div>
        </div>
  
        <div v-for="(item, index) in supplyMaterialArr" :key="index" class="tempbox">
          <div class="columnbox1">
            <div class="content">{{ item.materialName }}</div>
          </div>
          <div class="columnbox2">
            <div class="content">{{ item.materialModel }}</div>
          </div>
          <div class="columnbox3">
            <div class="content">{{ item.giveoutNum }}</div>
          </div>
          <div class="columnbox4">
            <div class="content" @click="delbtn(index)">{{ item.edit }}</div>
          </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>确定提交补库数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="supplySubmitBtn">确 定</el-button>
        </span>
      </el-dialog>
      <button class="checkBtn" @click="dialogVisible = true">提交(Submit)</button>
      <button class="checkBtn" @click="resetBtn">重置(Reset)</button>
    </div>
  </template>
  
  <script>
  import store from '@/store';
  //引入防抖文件
  import { antiShake } from '@/utils.js/utils_antishake.js';  
  export default {
    data() {
      return {
        chosenName: '',
        materialModel: '',
        materialnamelist: [],
        modelList: [],
        giveoutPcs: '',
        giveoutNum: '',
        supplyMaterialArr: [],
        value:'',
        dialogVisible:false
      };
    },
    methods: {
        materialNameChange(e){
        //材料名称选择
        console.log(e)
        this.chosenName = e
        this.materialModel = ''
        this.queryMaterialModelList(e)
      },
      modelSelect(visible) {
        // 处理耗材型号选择
        if(this.chosenName == '' & visible){
            this.$message('请先选择耗材名称！')
        }
      },
      modelChange(e) {
        // 处理耗材型号变化
        this.materialModel = e
        this.$axios.post(
          '/glue/login/',
          {
            demo:'pcsQuery',
            materialName:this.chosenName,
            materialModel:e,
          },{
            headers: {
            'Content-Type': 'application/json',
            },
                }).then(response => {
                    console.log(response.data);
                    this.giveoutPcs = response.data[0]
                    })
                .catch(error => {
                    console.log(error);
                        });

      },
      giveoutNumInput(e) {
        // 处理补库数量输入
        console.log(e)
        this.giveoutNum = e
      },
        
      giveoutBtn() {
          // 处理添加
      if (this.chosenName === '') {
        this.$message.error('Please enter name!');
      } else if (this.materialModel === '') {
        this.$message.error('Please select model!');
      } else if (this.giveoutNum === '') {
        this.$message.error('Please enter num!');
      } else {
        let supllyObj = {
          materialName: this.chosenName,
          materialModel: this.materialModel,
          giveoutPcs: this.giveoutPcs,
          giveoutNum: this.giveoutNum,
          supplyName: store.getters.username, // 从 Vuex 中获取用户信息
          supplyTime: Math.floor(Date.now() / 1000),
          edit: '删除'
        };
        this.supplyMaterialArr.push(supllyObj);
        this.chosenName = '';
        this.materialModel = '';
        this.giveoutNum = '';
        this.giveoutPcs = '';
        this.$message.success('添加成功！');
      }
    },

      querymaterialnamelist(){
        //查询所有物料名称
        this.$axios.post('/glue/login/',{demo:'materialName'},{
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
            '/glue/login/',
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
    delbtn(index){
      this.supplyMaterialArr.splice(index,1)
    },
    supplySubmitBtn:antiShake(function() {
      this.dialogVisible = false
      if(this.supplyMaterialArr.length > 0){
        this.$axios.post(
              '/glue/login/',
              {
                  demo:'supplyDataInsert',
                  supplyMaterialArr:this.supplyMaterialArr
              },
              {headers:{
                  'Content-Type': 'application/json',
              }}
          ).then(
              response => {
                  console.log(response.data);
                  if(response.data.status){
                    this.supplyMaterialArr = []
                    this.$message.success('补库数据提交成功！')
                  }else{
                    this.$message.error('补库数据提交失败，请重试！')
                  }
                  
              }
          ).catch(
              error => {
                  console.log(error)
              }
          )
      }else{
        this.$message.error("请至少添加一条补库数据！")
      }
    }),
    resetBtn(){
      this.supplyMaterialArr = []
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
    this.querymaterialnamelist()
    },
    beforeRouteEnter(to,from,next){
       if(store.getters.auth > 1){
        next();
       }
        
    },
  }
  </script>

  <style >
  @import url('./supplyPage.css')
  </style>