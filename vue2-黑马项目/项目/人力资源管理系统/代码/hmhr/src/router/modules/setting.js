import Layout from '@/layout'

// Layout组件中包含
export default {
  path: '/setting', // 角色设置
  component: Layout,
  children: [
    {
      path: '',
      name: 'Setting',
      component: () => import('@/views/setting'),
      meta: { title: '角色设置', icon: 'setting' }
    }
  ]
}
