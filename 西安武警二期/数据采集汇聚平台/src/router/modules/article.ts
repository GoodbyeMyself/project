import { AppRouteRecord } from '@/types/router'

export const articleRoutes: AppRouteRecord = {
  path: '/device-connection',
  name: 'DeviceConnectionManagement',
  component: '/index/index',
  meta: {
    title: '设备连接管理',
    icon: 'ri:hard-drive-3-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'center',
      name: 'DeviceConnectionCenter',
      component: '/article/list',
      meta: {
        title: '设备连接中心',
        icon: 'ri:link-m',
        keepAlive: true,
        authList: [
          { title: '新增', authMark: 'add' },
          { title: '编辑', authMark: 'edit' },
          { title: '删除', authMark: 'delete' },
          { title: '查看', authMark: 'view' }
        ]
      }
    },
    {
      path: 'detail-view',
      name: 'DeviceConnectionDetailView',
      component: '/article/detail',
      meta: {
        title: '设备详情查看',
        icon: 'ri:file-search-line',
        keepAlive: true,
        isHideTab: true,
        isHide: true,
        activePath: '/device-connection/center'
      }
    },
    {
      path: 'abnormal-device',
      name: 'AbnormalDeviceList',
      component: '/article/comment',
      meta: {
        title: '异常设备列表',
        icon: 'ri:error-warning-line',
        keepAlive: true
      }
    }
  ]
}
