import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template' // 如果settings里有值就用, 否则用后面的值

export default function getPageTitle(pageTitle) { // 获取页面标签栏上的标题
  if (pageTitle) { // 如果有具体页面-拼在前面
    return `${pageTitle} - ${title}`
  }
  return `${title}` // 如果没有具体页面-直接返回上面获取的标题
}
