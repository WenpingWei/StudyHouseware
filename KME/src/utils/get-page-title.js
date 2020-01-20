import defaultSettings from '@/settings'

const title = defaultSettings.title || '凯米尔云平台产品管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
