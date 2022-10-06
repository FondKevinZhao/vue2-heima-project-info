<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="closeDialog"
    >
      <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
            <el-option v-for="item in employeesList" :key="item.id" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="enterFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 员工列表
    employeesList: {
      type: Array,
      default() {
        return [] // 独立作用域
      }
      // props的默认值如果类型校验是数组/对象->为了防止互相引用, 要在函数里返回一个新数组/对象
    },
    // 用于校验的code和name对象的数组
    originList: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    // 编辑状态
    isEdit: {
      type: Boolean,
      default: false
    },
    // 单击的部门id
    parentId: {
      type: String,
      default: ''
    }
  },
  data() {
    // 校验部门编码是否重复
    const validCode = (rule, value, callback) => {
    // 判断是否能否找到对应的部门，如果找到了则返回该对象
      let existCodeList = this.originList.map(item => item.code)
      // 如果是编辑状态，则将需要编辑的这一项排除在外
      if (this.isEdit) {
        existCodeList = this.originList.filter(item => item.id !== this.parentId).map(item => item.code)
      }
      // 如果存在该对象，则说明编码已经存在，抛出错误
      existCodeList.includes(value) ? callback(new Error('编码' + value + '已经存在')) : callback()
    }
    // 同级部门禁止出现重复部门
    const validName = (rule, value, callback) => {
    // 查找同级的分类
    // 先筛选属于这个pid下属的(parentId就是id)部门对象, 然后映射name名字数组
      let existNameList = this.originList.filter(item => item.pid === this.parentId).map(item => item.name)
      // 如果是编辑的情况
      if (this.isEdit) {
        // 找到部门的当前对象
        const dept = this.originList.find(item => item.id === this.parentId)
        // 取出父级的 id (当前对象的pid)
        const pid = dept.pid
        // 过滤，筛选出同一级别的数据, 但是id不包含当前编辑部门的id, 映射返回name名字数组
        existNameList = this.originList
          .filter(item => item.pid === pid && item.id !== this.parentId)
          .map(item => item.name)
      }
      // 判断最新输入的部门名称是否存在
      existNameList.includes(value) ? callback(new Error('这个部门下这个名字' + value + '已经被占用了')) : callback()
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消-点击事件
    cancelFn() {
      this.$emit('update:dialogVisible', false)
    },
    // 确定-点击事件
    enterFn() {
      this.$refs.deptForm.validate(async(valid) => {
        if (valid) {
          // 细节: 有可能会出现, 也有可能不会出现问题
          // 问题: 网络请求读取form对象是空值
          // 原因: 传递form对象, 在ajax要发起前一瞬间, 如果这边把form对象清空, 那边读到的就是空字符串给后台, 所以为了防止这个问题出现
          // 解决:
          // 1. 复制一个新的对象给外面请求接口用, 里面改变this.form不会影响到外面(拷贝)
          // 2. 清空的慢一些. 但是时间不太好掌握
          this.$emit('addDepartEV', { ...this.form })
          this.$emit('update:dialogVisible', false)
        }
      })
    },
    // 弹窗-关闭事件
    closeDialog() {
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style>

</style>
