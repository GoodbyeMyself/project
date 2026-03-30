import {
  ModulePageConfig,
  createAction,
  createRows,
  createStandardColumns,
  createStandardFields
} from './module-schema'

const makeStats = (a: string, b: string, c: string, d: string) => [
  { label: '纳管对象', value: a, description: '当前模块纳管对象总量' },
  { label: '运行状态', value: b, description: '当前实时状态汇总' },
  { label: '待处理事项', value: c, description: '需要人工处理的问题项' },
  { label: '最近变更', value: d, description: '近 24 小时关键变更' }
]

const resolveActionKey = (label: string) => {
  if (label.includes('查询')) return 'query'
  if (label.includes('新增') || label.includes('新建') || label.includes('创建')) return 'add'
  if (label.includes('修改') || label.includes('编辑')) return 'edit'
  if (label.includes('删除')) return 'delete'
  if (label.includes('上线') || label.includes('启用')) return 'online'
  if (label.includes('下线') || label.includes('停用')) return 'offline'
  if (label.includes('复制')) return 'copy'
  if (label.includes('移动')) return 'move'
  if (label.includes('下载') || label.includes('导出')) return 'download'
  if (label.includes('上传') || label.includes('导入')) return 'upload'
  if (label.includes('审批')) return 'approve'
  if (label.includes('详情')) return 'detail'
  return 'execute'
}

const buildActions = (labels: string[]) =>
  labels.map((label) => createAction(resolveActionKey(label), label, 'primary', true))

const buildPage = ({
  title,
  category,
  description,
  summary,
  sections,
  timeline,
  stats,
  entityLabel,
  toolbarActions,
  rowActions,
  rows
}: {
  title: string
  category: string
  description: string
  summary: string
  sections: ModulePageConfig['sections']
  timeline: string[]
  stats: ModulePageConfig['stats']
  entityLabel: string
  toolbarActions: string[]
  rowActions: string[]
  rows: Array<Record<string, string>>
}): ModulePageConfig => ({
  title,
  category,
  description,
  summary,
  sections,
  timeline,
  stats,
  panels: [
    {
      key: 'main',
      title: `${title}业务面板`,
      description: `${title}全部能力在此统一操作。`,
      toolbarActions: buildActions(toolbarActions),
      rowActions: buildActions(['查看详情', ...rowActions]),
      fields: createStandardFields(entityLabel, '责任人'),
      columns: createStandardColumns(entityLabel, '责任人'),
      rows: createRows(rows)
    }
  ]
})

export const modulePageConfigs: Record<string, ModulePageConfig> = {
  WarehouseSystemManagement: buildPage({
    title: '数仓体系',
    category: '数据资产基础能力',
    description: '围绕数仓目录与表信息提供完整生命周期管理。',
    summary: '覆盖数仓目录与表信息的新增、修改、删除、查询。',
    sections: [
      {
        title: '核心能力',
        items: ['新增数仓目录', '修改数仓目录', '删除数仓目录', '查询数仓目录', '新增表信息', '修改表信息', '删除表信息', '查询表信息']
      }
    ],
    timeline: ['维护数仓目录', '维护表信息', '发布数仓结构'],
    stats: makeStats('92 个目录与表', '76 个正常', '8 个待处理', '5 次结构调整'),
    entityLabel: '数仓对象',
    toolbarActions: ['新增数仓目录', '修改数仓目录', '删除数仓目录', '查询数仓目录', '新增表信息', '修改表信息', '删除表信息', '查询表信息'],
    rowActions: ['修改表信息', '删除表信息'],
    rows: [
      {
        name: '设备状态主题域',
        code: 'WH-001',
        status: '运行中',
        owner: '数仓组',
        group: '主题域',
        updatedAt: '2026-03-30 10:12:00',
        description: '设备状态数据主题域目录。'
      },
      {
        name: 'fact_device_status',
        code: 'TB-001',
        status: '已上线',
        owner: '数仓组',
        group: '事实表',
        updatedAt: '2026-03-30 09:58:00',
        description: '设备状态事实表。'
      }
    ]
  }),
  DataGovernanceManagement: buildPage({
    title: '数据治理',
    category: '治理能力',
    description: '覆盖数据标准完善与数据资源目录完善两大治理能力。',
    summary: '支持标准与资源目录的新增、修改、删除、查询。',
    sections: [
      {
        title: '数据标准完善',
        items: ['新增数据标准', '修改数据标准', '删除数据标准', '查询数据标准']
      },
      {
        title: '数据资源目录完善',
        items: ['新增数据资源目录', '修改数据资源目录', '删除数据资源目录', '查询数据资源目录']
      }
    ],
    timeline: ['完善数据标准', '完善资源目录', '评估治理结果'],
    stats: makeStats('68 项治理对象', '54 项生效', '6 项待处理', '4 次治理发布'),
    entityLabel: '治理对象',
    toolbarActions: ['新增数据标准', '修改数据标准', '删除数据标准', '查询数据标准', '新增数据资源目录', '修改数据资源目录', '删除数据资源目录', '查询数据资源目录'],
    rowActions: ['修改数据标准', '删除数据标准', '修改数据资源目录', '删除数据资源目录'],
    rows: [
      {
        name: '设备主数据标准',
        code: 'STD-001',
        status: '已上线',
        owner: '治理组',
        group: '数据标准',
        updatedAt: '2026-03-30 09:43:00',
        description: '设备主数据标准定义。'
      },
      {
        name: '设备资源目录',
        code: 'RES-DIR-001',
        status: '运行中',
        owner: '治理组',
        group: '资源目录',
        updatedAt: '2026-03-30 10:01:00',
        description: '设备资源目录结构。'
      }
    ]
  }),
  DataProtectionManagement: buildPage({
    title: '数据保护',
    category: '安全能力',
    description: '覆盖权限管理、数据加密、数据脱敏、流量管理、数字水印防护。',
    summary: '支持权限审批日志、加密配置、脱敏配置、流量配置与水印防护全流程操作。',
    sections: [
      {
        title: '权限管理',
        items: ['角色权限关联配置', '权限日志查询', '权限申请审批流程']
      },
      {
        title: '数据加密',
        items: ['新增数据加密配置', '修改数据加密配置', '删除数据加密配置', '查询数据加密配置']
      },
      {
        title: '数据脱敏',
        items: ['新增数据脱敏配置', '修改数据脱敏配置', '删除数据脱敏配置', '查询数据脱敏配置']
      },
      {
        title: '流量与水印',
        items: ['数据流量配置', '数据流量查看', '新增数字水印防护', '下载数字水印防护', '删除数字水印防护', '查询数字水印防护']
      }
    ],
    timeline: ['配置权限', '配置加密脱敏', '配置流量与水印', '持续审计日志'],
    stats: makeStats('74 条防护项', '63 条生效', '7 条待审批', '3 条异常告警'),
    entityLabel: '防护项',
    toolbarActions: [
      '角色权限关联配置',
      '权限日志查询',
      '权限申请审批流程',
      '新增数据加密配置',
      '修改数据加密配置',
      '删除数据加密配置',
      '查询数据加密配置',
      '新增数据脱敏配置',
      '修改数据脱敏配置',
      '删除数据脱敏配置',
      '查询数据脱敏配置',
      '数据流量配置',
      '数据流量查看',
      '新增数字水印防护',
      '下载数字水印防护',
      '删除数字水印防护',
      '查询数字水印防护'
    ],
    rowActions: ['修改数据加密配置', '修改数据脱敏配置', '下载数字水印防护', '删除数字水印防护'],
    rows: [
      {
        name: '设备状态字段脱敏策略',
        code: 'MASK-001',
        status: '已上线',
        owner: '安全组',
        group: '脱敏',
        updatedAt: '2026-03-30 09:31:00',
        description: '对敏感字段进行掩码处理。'
      },
      {
        name: '核心链路水印策略',
        code: 'WATERMARK-001',
        status: '运行中',
        owner: '安全组',
        group: '数字水印',
        updatedAt: '2026-03-30 10:04:00',
        description: '对关键数据流添加数字水印。'
      }
    ]
  }),
  DataServiceManagement: buildPage({
    title: '数据服务',
    category: '服务能力',
    description: '覆盖第三方服务挂载、访问控制、实体表共享、模型共享能力。',
    summary: '服务挂载、订阅、网关控制、IP 黑白名单、模型发布与接口发布全部可操作。',
    sections: [
      {
        title: '第三方服务挂载',
        items: ['新增服务挂载', '修改服务挂载', '删除服务挂载', '查询服务挂载', '服务接口标准化', '服务权限与安全管理配置', '新增我的订阅', '删除我的订阅', '查询我的订阅']
      },
      {
        title: '数据服务访问控制',
        items: ['上线网关', '修改网关', '下线网关', '查询网关', '新增IP黑白名单', '修改IP黑白名单', '删除IP黑白名单', '查询IP黑白名单']
      },
      {
        title: '共享发布',
        items: ['数据实体共享配置', '新增数据模型发布', '修改数据模型发布', '删除数据模型发布', '查询数据模型发布', '新增接口服务发布', '修改接口服务发布', '删除接口服务发布', '查询接口服务发布']
      }
    ],
    timeline: ['挂载服务', '配置访问控制', '执行共享发布', '维护订阅关系'],
    stats: makeStats('81 条服务项', '69 条在线', '8 条待审批', '4 条访问告警'),
    entityLabel: '服务对象',
    toolbarActions: [
      '新增服务挂载',
      '修改服务挂载',
      '删除服务挂载',
      '查询服务挂载',
      '服务接口标准化',
      '服务权限与安全管理配置',
      '新增我的订阅',
      '删除我的订阅',
      '查询我的订阅',
      '上线网关',
      '修改网关',
      '下线网关',
      '查询网关',
      '新增IP黑白名单',
      '修改IP黑白名单',
      '删除IP黑白名单',
      '查询IP黑白名单',
      '数据实体共享配置',
      '新增数据模型发布',
      '修改数据模型发布',
      '删除数据模型发布',
      '查询数据模型发布',
      '新增接口服务发布',
      '修改接口服务发布',
      '删除接口服务发布',
      '查询接口服务发布'
    ],
    rowActions: ['修改服务挂载', '上线网关', '下线网关', '新增我的订阅', '删除我的订阅'],
    rows: [
      {
        name: '设备状态第三方服务挂载',
        code: 'SVC-MOUNT-001',
        status: '运行中',
        owner: '服务组',
        group: '挂载服务',
        updatedAt: '2026-03-30 09:46:00',
        description: '第三方设备状态查询服务。'
      },
      {
        name: '设备指标模型发布',
        code: 'MODEL-PUB-001',
        status: '已上线',
        owner: '服务组',
        group: '模型共享',
        updatedAt: '2026-03-30 10:06:00',
        description: '设备指标模型对外发布。'
      }
    ]
  })
}

export const modulePageList = Object.entries(modulePageConfigs).map(([routeName, config]) => ({
  routeName,
  ...config
}))
