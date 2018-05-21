<template>
	<div class="layout">
		<Menu mode="horizontal" theme="dark" active-name="1">
			<div class="layout-logo">
				
			</div>
			
		</Menu>
		<Row type="flex">
			<Col span="4" class="layout-menu-left">
			<Menu theme="dark" width="auto" @on-select="routeTo">
				<Submenu name="1">
					<template slot="title">
						<Icon type="home"></Icon>
						首页
					</template>
				</Submenu>
				<Submenu name="3">
					<template slot="title">
						<Icon type="ios-analytics"></Icon>
						数据请求
					</template>
					<MenuItem name="/home/ajax">ajax请求</MenuItem>
				</Submenu>
				<Submenu name="4">
					<template slot="title">
					<Icon type="star"></Icon>
					<span class="layout-text">UI</span>
					</template>
					<MenuItem name="/home/form" key="home/form">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">表单</span>
					</MenuItem>
					<MenuItem name="/home/table">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">表格</span>
					</MenuItem>
					<MenuItem name="/home/carousel">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">跑马灯</span>
					</MenuItem>
					<MenuItem name="/home/message">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">信息提示</span>
					</MenuItem>
					<MenuItem name="/home/tooltip">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">文字气泡</span>
					</MenuItem>
					<MenuItem name="/home/echarts">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">图表</span>
					</MenuItem>
					<MenuItem name="/home/upload">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">上传文件</span>
					</MenuItem>
					<MenuItem name="/home/datepicker">
					<Icon type="ios-navigate"></Icon>
					<span class="layout-text">日期选择</span>
					</MenuItem>
				</Submenu>
				<Submenu name="5">
					<template slot="title">
						<Icon type="settings"></Icon>
						硬件调用
					</template>
					<MenuItem name="">打印机</MenuItem>
					<MenuItem name="">读卡器</MenuItem>
				</Submenu>
			</Menu>
			</Col>
			<Col span="20">
			<div class="layout-content">
				<div class="layout-content-main">
					<router-view></router-view>
				</div>
			</div>
			<div class="layout-copy">
				2014 - 2017 &copy; 协购(上海)电子商务有限公司
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
export default {
  data() {
    return {
      page: ["form", "table", "rtf"],
      locale: "zh-CN"
    };
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    locale(val) {
      debugger;
      this.locale = val;
    }
  },
  methods: {
    routeTo(e) {
      console.log("1111", e);
      this.$router.push(e);
    }
  }
};
</script>
<<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.layout-logo{
	background:url('http://m.dianyinbao.net/site/Content/wdc/images/logo-dyb.png') center left no-repeat;
	background-size: 6rem 2.5rem;
	height:60px;
	width:100px;
	margin:0 0 0 24px;
}

</style>

