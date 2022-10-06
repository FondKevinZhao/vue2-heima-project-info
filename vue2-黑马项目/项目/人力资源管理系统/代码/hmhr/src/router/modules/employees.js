import Layout from '@/layout'

// Layout组件中包含
export default {
  path: '/employees', // 员工
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
