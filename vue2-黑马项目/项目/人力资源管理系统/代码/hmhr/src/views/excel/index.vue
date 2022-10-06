<template>
  <!-- Excel 导入功能组件 -->
  <upload-excel :on-success="handleSuccess" />
</template>

<script>
import { formatExcelDate, parseTime } from '@/utils'
import { importEmployeeAPI } from '@/api'
export default {
  name: 'Excel',
  methods: {
    // 将表格中的数据进行格式化
    transExcel(results) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }

      return results.map(item => {
        const obj = {}

        // 1. 取出这个对象所有的属性名： ['姓名'， ‘手机号’]
        // 2. 遍历这个数组，通过 中文名去 userRelations 找对应英文名， 保存值
        const contentKeys = Object.keys(item)
        contentKeys.forEach(key => {
        // 找到对应的英文名
          const transKey = userRelations[key]
          // 如果格式化的是时间，需要进行转换
          if (transKey === 'timeOfEntry' || transKey === 'correctionTime') {
            // 表格的天数->转成日期对象
            const transDate = new Date(formatExcelDate(item[key]))
            // 再把日期对象转成->'年-月-日'保存到对象属性里给后台
            obj[transKey] = parseTime(transDate, '{yyyy}-{mm}-{dd}')
          } else {
            obj[transKey] = item[key]
          }
        })

        return obj
      })
    },

    // 导入成功以后的回调函数
    async handleSuccess({ results, header }) {
      console.log(results)
      const arr = this.transExcel(results)
      const res = await importEmployeeAPI(arr).catch(err => err)
      if (!res.success) return this.$message.error(res.message)
      this.$router.back()
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="scss" scoped></style>
