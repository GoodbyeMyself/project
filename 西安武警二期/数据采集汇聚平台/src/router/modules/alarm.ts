import { AppRouteRecord } from '@/types/router'

export const alarmRoutes: AppRouteRecord = {
  path: '/alarm-notification',
  name: 'AlarmNotification',
  component: '/index/index',
  meta: {
    title: '报警与通知',
    icon: 'ri:alarm-warning-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'center',
      name: 'AlarmNotificationCenter',
      component: '/article/publish',
      meta: {
        title: '告警与通知中心',
        icon: 'ri:notification-badge-line',
        keepAlive: true
      }
    },
    {
      path: 'alarm-group',
      name: 'AlarmGroupManage',
      component: '/article/list',
      meta: {
        title: '告警组管理',
        icon: 'ri:team-line',
        keepAlive: true
      }
    },
    {
      path: 'message-handle',
      name: 'MessageHandleManage',
      component: '/article/comment',
      meta: {
        title: '消息通知处理',
        icon: 'ri:mail-open-line',
        keepAlive: true
      }
    },
    {
      path: 'alarm-rule',
      name: 'AlarmRuleManage',
      component: '/article/detail',
      meta: {
        title: '告警规则管理',
        icon: 'ri:alarm-line',
        keepAlive: true
      }
    }
  ]
}
