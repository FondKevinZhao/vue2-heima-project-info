import Layout from '@/layout'

// Layout组件中包含
export default {
  path: '/salarys', // 薪资
  component: Layout,
  children: [
    {
      path: '',
      name: 'Salarys',
      component: () => import('@/views/salarys'),
      meta: { title: '薪资', icon: 'money' }
    }
  ]
}
