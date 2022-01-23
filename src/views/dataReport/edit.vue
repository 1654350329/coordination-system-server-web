<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose">
    <el-form status-icon
             ref="formData"
             :model="title.formData"
             label-width="150px"
             label-position="right"
             style="width:400px">
      <el-form-item label="任务类型:" prop="taskType">
        <el-select v-model="formData.taskType" style="width:250px" clearable>
          <el-option v-for="(item, index) in taskType" :key="index" :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认定工伤决定书编号:" prop="identifiedNumber">
        <el-input v-model="formData.identifiedNumber" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="认定对象名称:" prop="identifiedName">
        <el-input v-model="formData.identifiedName" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-input v-model="formData.sex" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证:" prop="idCart">
        <el-input v-model="formData.idCart" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="单位名称:" prop="unitName">
        <el-input v-model="formData.unitName" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型:" prop="sort">
        <el-select v-model="formData.sort" style="width:250px" clearable
                   :multiple-limit="1">
          <el-option v-for="(item, index) in sortOptions" :key="index" :label="item.sort"
                     :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科别:" prop="category">
        <el-select v-model="formData.category" style="width:250px" clearable
                   :multiple-limit="1">
          <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="伤残病时间:" prop="sickTime">
        <el-date-picker
          v-model="formData.sickTime"
          type="date"
          placeholder="选择日期"
          style="width:250px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="伤残情况:" prop="sickCondition">
        <el-input v-model="formData.sickCondition" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="收件时间:" prop="receivingTime">
        <el-date-picker
          style="width:250px"
          v-model="formData.receivingTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯:" prop="nativePlace">
        <el-input v-model="formData.nativePlace" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" prop="phoneNumber">
        <el-input v-model="formData.phoneNumber" type="text" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="formData.address" type="text" clearable></el-input>
      </el-form-item>
      <!--      // :http-request="uploadMainImg"-->
      <el-form-item label="认定工伤决定书:" prop="input41730">
        <el-upload
          :action="baseUrl+url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="formData.fileList"
          list-type="picture"
          :headers="headers"
          :on-success="uploadSuccess"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="病例复印件:" prop="input41730">
        <el-upload
          :action="baseUrl+url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="formData.copyFileList"
          list-type="picture"
          :headers="headers"
          :on-success="copyUploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {getToken} from "@/utils/auth"
import api from '@/api/dataReport'

export default {
  name: "edit",
  props: {
    categoryOptions: {
      type: Array,
      default: []
    },
    sortOptions: {
      type: Array,
      default: []
    },
    taskType: {
      type: Array,
      default: []
    },
    examineProgress: {
      type: Array,
      default: []
    },
    visible: {//弹出隐藏
      type: Boolean,
      default: false
    },
    title: {//标题
      type: String,
      default: '',
    },
    formData: {//表单数据
      type: Object,
      default: {}
    },
    remoteClose: Function//用于关闭窗口
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      fastUrl: process.env.FAST_BASE_URL,
      url: '/file-info/upload-image',
      headers: {
        Authorization: getToken()
      }
    }
  }
  ,
  methods: {
    uploadSuccess(response, file, fileList) {
      const {data} = response
      data.type = 1
      this.formData.fileList.push({name: data.fileName, url: 'http://192.168.110.31/' + data.filePath})
      this.formData.bizFile.push(data)
    },
    copyUploadSuccess(response, file, fileList) {
      const {data} = response
      data.type = 2
      this.formData.copyFileList.push({name: data.fileName, url: 'http://192.168.110.31/' + data.filePath})
      this.formData.bizFile.push(data)
    },
    handleRemove(file, fileList) {
      var bizFile = this.formData.bizFile;
      let index = bizFile.findIndex((biz => {
        if (file.response != null) {
          return biz.filePath === file.response.data.filePath
        } else {
          return 'http://192.168.110.31/' + biz.filePath === file.url
        }
      }))
      bizFile.splice(index, 1);
      this.formData.bizFile = bizFile;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleClose() {
      //表单清空
      // this.$refs['formData'].resetFields()
      //this.visible//错误的，因为它是父组件传递过来的，子组件不能直接改 //因为visible是父组件的属性，所以要让父组件去改变值
      this.$parent.remoteClose()
    },
    submitForm() {
      debugger
      if (this.formData.reportId == null) {
        return api.addDataReport(this.formData).then(response => {
          //表单清空
          // this.$refs['formData'].resetFields()
          // this.visible//错误的，因为它是父组件传递过来的，子组件不能直接改 //因为visible是父组件的属性，所以要让父组件去改变值
          this.$parent.remoteClose()
          this.$message({
            message: '保存成功',
            type: 'success'
          });

        }).catch(error => {
          this.$message.error('保存失败');
        })
      } else {
        return api.updateDataReport(this.formData).then(response => {
          //表单清空
          // this.$refs['formData'].resetFields()
          // this.visible//错误的，因为它是父组件传递过来的，子组件不能直接改 //因为visible是父组件的属性，所以要让父组件去改变值
          this.$parent.remoteClose()
          this.$message({
            message: '保存成功',
            type: 'success'
          });

        }).catch(error => {
          this.$message.error('保存失败');
        })
      }


    }
  }
}
</script>

<style scoped>

</style>
