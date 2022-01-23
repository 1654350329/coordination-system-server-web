import request from '@/utils/request'

export default{
  getList(query,current=1,size=10){
      return request({
        url:'/data-report/dataReportPage',
        method:'post',
        data:{
          ...query,
          current,
          size
        }
      })
  },
  addDataReport(data){
    return request({
      url:'/data-report/addDataReport',
      method:'post',
      data
    })
  },
  getDataReportDetail(reportId) {
    return request({
      url:'/data-report/getDataReportDetail/'+reportId,
      method:'post',
    })
  },
  updateDataReport(data) {
    return request({
      url:'/data-report/updateDataReport',
      method:'post',
      data
    })
  }
}
