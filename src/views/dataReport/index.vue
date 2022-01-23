<template>
  <div class="app-container">
    <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px" size="medium"
             @submit.prevent>
      <div class="card-container">
        <el-card style="{width: 1560px !important}" shadow="never">
          <div slot="header" class="clear-fix">
            <span>收起</span>
            <i class="float-right el-icon-arrow-down"></i>
          </div>
          <el-row>
            <el-col :span="24" class="grid-cell">
              <el-row>
                <el-col :span="5" class="grid-cell">
                  <el-form-item label="认定对象名称:" label-width="110px" prop="identifiedName"
                                class="label-center-align">
                    <el-input v-model="formData.identifiedName" style="width: 150px" type="text" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="grid-cell" :offset="1">
                  <el-form-item label="科别:" label-width="45px" prop="category">
                    <el-select v-model="formData.category" style="width: 150px" clearable
                               :multiple-limit="1">
                      <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="grid-cell">
                  <el-form-item label="类型:" label-width="45px" prop="select70598">
                    <el-select v-model="formData.sort" style="width: 150px" clearable
                               :multiple-limit="1">
                      <el-option v-for="(item, index) in sortOptions" :key="index" :label="item.sort"
                                 :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="grid-cell">
                  <el-form-item label="单位名称:" label-width="75px" prop="unitName">
                    <el-input v-model="formData.unitName" style="width: 150px" type="text" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="grid-cell">
                  <el-form-item label="伤残病时间：" style="width: 300px" label-width="100px" prop="sickTime"
                                class="label-center-align">
                    <el-date-picker
                      v-model="formData.sickTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1" label-width="75px" class="grid-cell">
                  <el-form-item label="审核进度:" prop="examineProgress">
                    <el-select v-model="formData.examineProgress" style="width: 115px" clearable>
                      <el-option v-for="(item, index) in examineProgress" :key="index" :label="item.label"
                                 :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" class="grid-cell">
                  <el-form-item label="委托任务:" label-width="75px" prop="taskType">
                    <el-select v-model="formData.taskType" style="width: 150px" clearable>
                      <el-option v-for="(item, index) in taskType" :key="index" :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" class="grid-cell">
                  <el-form-item label="收件时间：" label-width="100px" prop="receivingTime">
                    <el-date-picker
                      v-model="formData.receivingTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="14" :push="1" class="grid-cell">
                  <el-row>
                    <el-col :span="3" class="grid-cell">
                      <div class="static-content-item">
                        <el-button type="primary">查询</el-button>
                      </div>
                    </el-col>
                    <el-col :span="3" class="grid-cell">
                      <div class="static-content-item">
                        <el-button>重置</el-button>
                      </div>
                    </el-col>
                    <el-col :span="3" class="grid-cell">
                      <div class="static-content-item">
                        <el-button>收起</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-form>
    <el-row>
      <el-col :span="12" class="grid-cell">
        <el-row>
          <el-col :span="2" class="grid-cell">
            <div class="static-content-item">
              <el-button type="primary" @click="openAdd">新增</el-button>
            </div>
          </el-col>
          <el-col :span="3" class="grid-cell">
            <div class="static-content-item">
              <el-button type="primary">上报</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="grid-cell">
        <div class="table-container">
          <el-table
            :data="list"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              fixed="left"
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-button @click="detailClick(scope.row.reportId)" type="text" size="small">详情</el-button>
                <el-button @click="reportClick(scope.row.reportId)" type="text" size="small">重新上报</el-button>
                <el-button @click="deleteClick(scope.row.reportId)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="identifiedName"
              label="认定工伤决定书编号">
            </el-table-column>
            <el-table-column
              prop="taskType"
              label="任务类型">
            </el-table-column>
            <el-table-column
              prop="unitName"
              label="单位名称">
            </el-table-column>
            <el-table-column
              prop="identifiedNumber"
              label="认定对象名称">
            </el-table-column>
            <el-table-column
              prop="sort"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="nativePlace"
              label="籍贯">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="联系方式">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="上报时间">
            </el-table-column>
            <el-table-column
              prop="examineProgress"
              label="审核进度">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="reviewAndSignatureId"
              label="劳动能力伤残等级结论书">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--新增与编辑组件-->
    <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData"
          :categoryOptions="categoryOptions" :sortOptions="sortOptions"
          :remoteClose="remoteClose" :examineProgress="examineProgress"
          :taskType="taskType">
    </edit>
  </div>
</template>

<script>
import api from '@/api/dataReport'
import Edit from './edit'

export default {
  name: "dataReport",
  components: {Edit},
  props: {},
  data() {
    return {
      edit: {
        title: '',
        visible: false,
        formData: {
          fileList: [],//认定工伤决定书
          copyFileList: [],//病例复印件
          bizFile: [{
            fileName: '/测试',
            filePath: '/测试',
            type: '2'
          }]
        }
      },
      list: [],
      formData: {
        examineProgress: [],
        imageUrl: null,//不然上传新图片不可立刻预览 }
        address: '',
        bizFile: [],
        category: '',
        idCart: '',
        identifiedName: '',
        identifiedNumber: '',
        nativePlace: '',
        phoneNumber: '',
        receivingTime: '',
        reportId: '',
        sex: '',
        sickCondition: '',
        sickTime: '',
        sort: 0,
        taskType: '',
        unitName: ''
      },
      rules: {},
      startTime: '',
      examineProgress: [
        {
          "label": "初始",
          "value": 0
        }, {
          "label": "上报",
          "value": 1
        }, {
          "label": "初审",
          "value": 2
        }, {
          "label": "鉴定",
          "value": 3
        }, {
          "label": "一核",
          "value": 4
        }, {
          "label": "二核",
          "value": 5
        }, {
          "label": "审签",
          "value": 6
        }],
      taskType: ['委托任务', '下发任务'],
      categoryOptions: ['烧伤科', '骨科', '精神科'],
      sortOptions: [{
        key: 0,
        sort: '工'
      }, {
        key: 1,
        sort: '病'
      }],
      multipleSelection: []
    }
  },
  created() {
    this.getList();
  }
  ,
  methods: {
    //重新上报
    reportClick(reportId) {
      return api.getDataReportDetail(reportId).then(response => {
        this.edit.visible = true
        this.edit.title = '重新上报'
        const data = response.data;
        this.edit.formData = data

        var list = new Array();
        var copyList = new Array();
        for (let i = 0; i < data.bizFile.length; i++) {
          const fileInfo = data.bizFile[i];
          if (fileInfo.type === "1") {
            list.push({name: fileInfo.fileName, url: 'http://192.168.110.31/' + fileInfo.filePath})
          }
          if (fileInfo.type === "2") {
            copyList.push({name: fileInfo.fileName, url: 'http://192.168.110.31/' + fileInfo.filePath})
          }
        }
        this.edit.formData.copyFileList = copyList;
        this.edit.formData.fileList = list;
        console.log(JSON.stringify(this.edit.formData))
      })
    }
    ,
    //触发关闭弹出的新增修改子组件窗口
    remoteClose() {
      //一定要加上这个，不然有时候表单输入不了值
      this.edit.formData = {}
      this.edit.visible = false
      this.getList();
    }
    ,
    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    }
    ,
    getList() {
      return api.getList(null, 1, 10).then(response => {
        this.list = response.data.records;
      })
    }
    ,
    detailClick(reportId) {
      return api.getDataReportDetail(reportId).then(response => {
        this.edit.visible = true
        this.edit.title = '重新上报'
        this.edit.formData = response.data
      })
    }
    ,
    deleteClick(reportId) {
      return api.getList(null, 1, 10).then(response => {
        this.list = response.data.records;
      })
    }
    ,
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  .el-input {
    width: 120px;
  }
}
</style>
<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
  width: 100% !important;
}

.el-form-item--medium {
  .el-radio {
    line-height: 36px !important;
  }

  .el-rate {
    margin-top: 8px;
  }
}

.el-form-item--small {
  .el-radio {
    line-height: 32px !important;
  }

  .el-rate {
    margin-top: 6px;
  }
}

.el-form-item--mini {
  .el-radio {
    line-height: 28px !important;
  }

  .el-rate {
    margin-top: 4px;
  }
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}

</style>

<style lang="scss" scoped>
div.table-container {
  table.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    td.table-cell {
      display: table-cell;
      height: 36px;
      border: 1px solid #e1e2e3;
    }
  }
}

div.tab-container {
}

.label-left-align :deep(.el-form-item__label) {
  text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
  text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
  text-align: right;
}

.custom-label {
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;

  :deep(.el-divider--horizontal) {
    margin: 0;
  }
}

</style>
