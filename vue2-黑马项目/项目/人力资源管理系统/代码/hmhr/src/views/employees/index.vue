<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 通用工具栏组件使用 -->
      <page-tools>
        <!-- 自定义左侧内容 -->
        <template #slot-left>
          <span>共 19 条记录</span>
        </template>

        <!-- 自定义右侧内容 -->
        <template #slot-right>
          <el-button type="danger" size="small" @click="uploadExcelBtnFn">导入excel</el-button>
          <el-button type="success" size="small" @click="downloadExcel">导出excel</el-button>
          <el-button type="primary" size="small" @click="addEmpShowDialogFn">新增员工</el-button>
        </template>
      </page-tools>

      <!-- 员工列表-表格 -->
      <el-card style="margin-top: 10px;">
        <el-table border :data="employeesList" :default-sort="{prop: 'workNumber'}">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" prop="staffPhoto" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" sortable :sort-method="workNumberSortFn" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatter" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="{ row }">
              <span>{{ parseTime(row.timeOfEntry, '{yyyy}-{mm}-{dd}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页区域 -->
          <el-pagination
            :current-page="query.page"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>

      <!-- 新增员工弹框组件 -->
      <el-dialog
        title="新增员工"
        :visible.sync="showDialog"
        @close="addEmpDialogCloseFn"
      >
        <emp-dialog
          ref="addEmpDialog"
          :s-dialog.sync="showDialog"
          :tree-data="treeData"
          @addEmpEV="addEmpFn"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入组件
// import PageTools from '@/components/PageTools'
import { getEmployeeListAPI, departmentsListAPI, addEmployeeAPI } from '@/api'
import Employees from '@/api/constant/employees'
import EmpDialog from './components/empDialog'
// 树形结构的转换方法
import { transTree, parseTime } from '@/utils'

export default {
  components: {
    // PageTools // 导入自定义组件
    EmpDialog
  },
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10 // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0, // 数据总条数
      showDialog: false, // 添加员工组件的展示
      treeData: [] // 存储部门列表(树结构)
    }
  },
  created() {
    // 调用获取员工列表的方法
    this.getEmployeeList()
    // 调用获取部门列表的方法
    this.getDepartments()
  },

  methods: {
    parseTime,
    // 获取员工列表
    async getEmployeeList() {
      // 调用获取员工列表的 API
      const res = await getEmployeeListAPI(this.query)
      console.log(res)
      // 根据返回的状态码给用户提示
      if (!res.success) return this.$message.error(res.message)
      // 将返回的结果赋值 data 中的数据
      this.employeesList = res.data.rows
      this.total = res.data.total
    },

    // 获取部门列表
    async getDepartments() {
      const res = await departmentsListAPI()
      if (!res.success) return this.$message.error(res.message)
      this.treeData = transTree(res.data.depts, '')
      console.log(this.treeData)
    },

    // 格式化表格的某一项
    formatter(row, column, cellValue, index) {
      // 用数组的 find 方法找到 id = 1 的元素，再取出它的 value
      const obj = Employees.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : '未知'
    },

    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getEmployeeList()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getEmployeeList()
    },

    // 员工列-自定义排序
    workNumberSortFn(a, b) {
      // 打印a和b发现是表格数组里的对象
      // sort方法使用:
      // 如果return小于0, 那么 a 会被排列到 b 之前
      // 如果return等于0, 那么 a 和 b 位置不变
      // 如果return大于0, 那么 a 会被排列到 b 之后
      return parseInt(a.workNumber) - parseInt(b.workNumber)
    },

    // 新增员工->点击出弹窗
    addEmpShowDialogFn() {
      this.showDialog = true
    },

    // 新增员工->事件触发
    async addEmpFn(formData) {
      const res = await addEmployeeAPI(formData)

      if (res.success) {
        this.$message.success(res.message)
        // 提示后, 重新请求列表
        this.getEmployeeList()
      } else {
        this.$message.error(res.message)
      }
    },

    // 新增员工->弹窗关闭事件
    addEmpDialogCloseFn() {
      console.log(this.$refs.addEmpDialog)
      this.$refs.addEmpDialog.$refs.addForm.resetFields()
    },

    // 导入excel按钮->点击事件
    uploadExcelBtnFn() {
      this.$router.push('/excel')
    },

    transData(rows) {
      // // 写代码
      // const map = {
      //   'id': '编号',
      //   'password': '密码',
      //   'mobile': '手机号',
      //   'username': '姓名',
      //   'timeOfEntry': '入职日期',
      //   'formOfEmployment': '聘用形式',
      //   'correctionTime': '转正日期',
      //   'workNumber': '工号',
      //   'departmentName': '部门',
      //   'staffPhoto': '头像地址'
      // }

      // const headerKeys = Object.keys(rows[0])
      // const header = headerKeys.map(item => {
      //   return map[item]
      // })

      // const data = rows.map(obj => {
      //   return Object.values(obj)
      // })

      // return { header, data }

      // 考虑顺序 (页面上列保持一致顺序)
      // 4.0 准备一个列表头中文数组 (8个)
      const headerArr = ['序号', '姓名', '头像', '手机号', '工号', '聘用形式', '部门', '入职时间']
      // 4.1 数据key的映射关系(思路: 遍历上边数组里按照顺序, 取出中文的名字, 但是对应数组值的数组, 要从英文key对象中取出value值, 我要用中文key换到英文key然后去取到值)
      const myObj = {
        // 序号可以等遍历的时候直接用索引值, 而不是来自于英文对象里
        '姓名': 'username',
        '头像': 'staffPhoto',
        '手机号': 'mobile',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName',
        '入职时间': 'timeOfEntry'
      }
      // 4.2 按照顺序, 形成值的数组 (明确目标->想要数据结构->读代码(每个变量意思)读2-3遍->仿写3-5遍)
      const resultArr = rows.map((item, index) => {
        const valueArr = [] // 值小数组
        headerArr.forEach(zhKey => {
          if (zhKey === '序号') {
            valueArr.push(index + 1)
          } else {
            const enKey = myObj[zhKey]
            valueArr.push(item[enKey])
          }
        })
        return valueArr
      })

      return { header: headerArr, data: resultArr }
    },

    // 导出 Excel
    async downloadExcel() {
      const res = await getEmployeeListAPI()
      const res2 = await getEmployeeListAPI({
        page: 1,
        size: res.data.total
      })
      const excelObj = this.transData(res2.data.rows)
      import('@/vendor/Export2Excel').then(excel => {
      // excel表示导入的模块对象
        excel.export_json_to_excel({
          header: excelObj.header, // 表头 必填
          data: excelObj.data, // 具体数据 必填
          filename: '员工列表', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
