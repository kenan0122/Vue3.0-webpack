<template>
  <section>
    <!-- 头部from部分 -->
    <div class="box-form">
      <!-- 输入框更新自动节流查询 -->
      <input type="text" v-model="userName">
    </div>
    <!-- 粗糙的table部分 -->
    <div class="box-table">
      <table>
        <thead>
          <tr>
            <th>订单编号</th>
            <th>商品名称</th>
            <th>下单时间</th>
            <th>订单状态</th>
            <th>商品价格</th>
            <th>续费时长</th>
            <th>用户名称</th>
            <th>用户性别</th>
            <th>用户地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in page.data" :key="index">
            <td>{{item.orderCode}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.age}}</td>
            <td>{{item.city}}</td>
            <td>{{stateObj[item.state||'0']}}</td>
            <td>{{item.title}}</td>
            <td>{{item.price}}</td>
            <td>{{item.createtime}}</td>
            <td>{{item.timeNum}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页部分 -->
      <ul class="box-page">
        <li><a>上一页</a></li>
        <li v-for="(item,index) in page.pageList"
            :key="index"><a>{{index+1}}</a>
        </li>
        <li><a>下一页</a></li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { ref,onMounted,customRef,watch, onUnmounted } from 'vue';
  // 没配相应路径需要自己配
  import user from '../../services/interface/user';

  /**节流 */
  function useThrottle(value, delay = 1000) {
    let timeout;
    return customRef((track, trigger) => {
      return {
        get() {
          // 必须调用此函数才会触发更新
          track(); 
          return value;
        },
        set(newValue) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            value = newValue;
            // 必须调用次函数才会触发更新
            trigger();
          }, delay);
        }

      }
    })
  }
  export default {
    setup() {
      const stateObj = ref({0: '未知订单',1: '已收款'});
      // 视图更新后节流更新
      const userName = ref(useThrottle(''));
      const page = ref({pageList:[],total:0,pageSize: 10,pageIndex: 1});
      
      // 视图初始化
      onMounted(() => {
        // 查询数据源
        const onQuery=()=> {
          user.getOrderList({pageSize: 10, pageIndex:1}).then((res) => {
            page.value = {
              data: res.list,
              pageList: new Array(Math.ceil(res.total/res.pageSize)),
              total: res.total,
              pageSize: res.pageSize,
              pageIndex: res.pageIndex
            }
          })
        }

        // http请求数据
        onQuery();
        // 监听某个响应对象
        const stop = watch(()=>
          userName.value, 
          (userName, prevUserName) => {
            console.log('重新查询数据');
            onQuery();
          });
      })

      // 视图销毁后关闭监听对象
      onUnmounted(() => {
        stop();
      })

      return {
        stateObj,
        userName,
        page
      }
    }
  }
</script>

<style>
body {
  padding: 50px;
  color: #42b983;
  background-color: #282c34;
  text-align: center;
}
.box-form{
  padding: 20px;
}
.box-form input{
  border: none;
  padding: 4px;
}
.box-table{
  width: 100%;
}
.box-table table{
  display: inline-table;
}
.box-page li{
 list-style: none;
 display: inline-block;
 border: 1px #fff solid;
 border-radius: 6px;
 min-width: 32px;
 padding: 0 6px;
 color: #fff;
 cursor: pointer;
}
table tr>th{
  text-align: left;
  padding: 0px 16px;
}
tbody>tr>td{
 padding: 16px;
 overflow-wrap: break-word;
}
</style>
