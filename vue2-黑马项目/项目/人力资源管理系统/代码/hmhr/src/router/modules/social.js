import Layout from '@/layout'

// Layout组件中包含
export default {
  path: '/social', // 社保
  component: Layout,
  children: [
    {
      path: '',
      name: 'Social',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
