export default {
  "getOrderList":{
    "mock": true,
    "status": 200,
    "msg": "",
    "data":{
      list:new Array(10).fill({}).map((item,index)=>{
        return {
          orderCode:`SH_${new Date().getTime()}_${index}`,
          title:"掘金会员",
          createtime:"2020-05-03",
          state:1,
          price:19.8,
          timeNum:12,
          userName:"虎克小哥哥",
          age:18,
          city:"上海"
        }
      }),
     total:20,
     pageSize:10,
     pageIndex:1
    }
  },
}