import request from '@/utils/request'

export default{
  uploadImg(file){
    return request({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url:`/file-info/upload-image`,method:'post',
      file//data:data简写
      }
    )
  }
}
