import Layout from '@/layout'

// Layout组件中包含
export default {
  path: '/permission', // 权限
  component: Layout,
  children: [
    {
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限', icon: 'lock' }
    }
  ]
}
