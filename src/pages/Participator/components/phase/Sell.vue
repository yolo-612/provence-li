<template>
  <div class="content">
    <div class="content_input">
			<div class="title">
					<p>{{ msg }}</p>
			</div>
    <!-- 
    // 销售单号
        string sellCode;
        // 销售员
        string sellName;
        // 销售日期
        string sellTime;
        // 销售地址
        string sellAddr;
        // 保质期
        string produDate;
  -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-suffix=":" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品ID" prop="commodityId">
          <el-input v-model="ruleForm.commodityId"> </el-input>
        </el-form-item>
        <el-form-item label="销售单号" prop="sellCode">
          <el-input v-model="ruleForm.sellCode"> </el-input>
        </el-form-item>
        <el-form-item label="销售员" prop="sellName">
          <el-input v-model="ruleForm.sellName"> </el-input>
        </el-form-item>
        <el-form-item label="销售日期" prop="sellTime">
          <el-input v-model="ruleForm.sellTime"> </el-input>
        </el-form-item>
        <el-form-item label="销售地址" prop="sellAddr">
          <el-input v-model="ruleForm.sellAddr"> </el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="produDate">
          <el-input v-model="ruleForm.produDate"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="float:left">上传</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="divide">
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      </div>
      <el-steps :space="200" :active="applyStatus" finish-status="success" align-center>
        <el-step title="上传中"></el-step>
				<el-step title="上传确认"></el-step>
				<el-step title="已上传"></el-step>
      </el-steps>
      <div class="link">
        <el-link type="primary" :underline="false" href="/#/custom">已有产品ID？去查询</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '@/js/info'

export default {
  name: 'Sell',
  data () {
    return {
    // 挤奶地址编号
    // string milkingAddrCode;
     // 挤奶员；
     // string milkingUser;
     // 挤奶卫生情况
     // string milkingEnv;
     // 挤奶时间
     // string milkingTime;
      msg: '销售阶段信息上传',
      ruleForm: {
        commodityId: '',
        sellCode: '',
        sellName: '',
        sellTime: '',
        sellAddr: '',
        produDate: ''
      },
      rules: {
        commodityId: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ],
        sellCode: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ],
        sellName: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ],
        sellTime: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ],
        sellAddr: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ],
        produDate: [
          { required: true, message: '请输入相应信息', trigger: 'blur' }
        ]
      },
      applyStatus: 1

    }
  },
  computed: {
  },
  methods: {
    submitForm (formName) {
// 先判断 产品id 是否存在在链上
// if (Info.isIdExist()) {
//   this.$message({
//     message: '产品id未上链',
//     type: 'error'
//   })
//   return
// }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.applyStatus = 2
          Info.setSellInfo(this.ruleForm.commodityId, this.ruleForm.sellCode, this.ruleForm.sellName, this.ruleForm.sellTime, this.ruleForm.sellAddr, this.ruleForm.produDate).then((res) => {
            console.log(res)
            this.applyStatus = 3
            this.$notify({
              title: '上传成功',
              message: '',
              type: 'success'
            })
            // 可以捕获事件
          }).catch((err) => {
// 为了防止 签名未确认等其他情况。
            console.log(err)
            this.$notify.error({
              title: '出现错误',
              message: '签名未确认或上传过程中出现了错误，请重试'
            })
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.content {
	width: 720px;
	height: 720px;
	box-sizing: border-box;
	padding: 0 50px;
	border-radius: 5px;
	box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: mymove 1s ease-in-out  alternate;
	overflow: hidden;
	transition: 1.5s;
}
.content_input {
	width: 500px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 30px;
	font-weight: bold;
	color: #606266;
}
.divide{
	width:100%;
	margin:50px 0 36px 0;
	/* margin:20px auto; */
}
.link{
  width: 360px;
  margin: 20px auto;
}

@keyframes mymove {
	0% {
		width: 0px;
		height: 5px;
	}

	10% {
		width: 50px;
		height: 5px;
	}

	15% {
		width: 100px;
		height: 5px;
	}

	20% {
		width: 150px;
		height: 5px;
	}

	25% {
		width: 200px;
		height: 5px;
	}

	30% {
		width: 250px;
		height: 5px;
	}

	35% {
		width: 300px;
		height: 5px;
	}

	40% {
		width: 350px;
		height: 5px;
	}

	45% {
		width: 450px;
		height: 5px;
	}

	50% {
		width: 500px;
		height: 5px;
	}

	55% {
		height: 30px;
	}

	60% {
		height: 60px;
	}

	65% {
		height: 90px;
	}

	70% {
		height: 120px;
	}

	75% {
		height: 150px;
	}

	80% {
		height: 180px;
	}

	85% {
		height: 210px;
	}

	90% {
		height: 240px;
	}

	95% {
		height: 240px;
	}

	100% {
		height: 300px;
	}
}
</style>