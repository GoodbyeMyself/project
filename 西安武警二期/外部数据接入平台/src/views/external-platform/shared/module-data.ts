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
  if (label.includes('查询') || label.includes('查看')) return 'query'
  if (label.includes('新增') || label.includes('新建') || label.includes('创建')) return 'add'
  if (label.includes('修改') || label.includes('编辑') || label.includes('更新')) return 'edit'
  if (label.includes('删除') || label.includes('注销')) return 'delete'
  if (label.includes('上线') || label.includes('启用') || label.includes('发布')) return 'online'
  if (label.includes('下线') || label.includes('停用') || label.includes('取消发布')) return 'offline'
  if (label.includes('导入') || label.includes('上传')) return 'upload'
  if (label.includes('导出') || label.includes('下载')) return 'download'
  if (label.includes('复制')) return 'copy'
  if (label.includes('移动')) return 'move'
  if (label.includes('启动')) return 'start'
  if (label.includes('停止')) return 'stop'
  if (label.includes('详情') || label.includes('预览')) return 'detail'
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
  ExternalSourceManagement: buildPage({
    title: '接入来源管理',
    category: '接入基础能力',
    description: '覆盖数据源管理全生命周期及检测、安全配置、异常展示。',
    summary: '支持新增、编辑、删除、查看、异常数据源展示、详情、安全管理、检测。',
    sections: [
      {
        title: '数据源管理',
        items: ['新增数据源', '编辑数据源', '删除数据源', '查看数据源', '显示异常的数据源', '数据源详情', '安全管理配置', '数据源检测']
      }
    ],
    timeline: ['登记数据源', '执行连接检测', '维护安全配置', '处理异常数据源'],
    stats: makeStats('96 个数据源', '81 个正常', '7 个异常', '5 次连接变更'),
    entityLabel: '数据源',
    toolbarActions: ['新增数据源', '编辑数据源', '删除数据源', '查看数据源', '显示异常的数据源', '数据源详情', '安全管理配置', '数据源检测'],
    rowActions: ['编辑数据源', '删除数据源', '数据源详情', '数据源检测'],
    rows: [
      {
        name: '边缘库 PostgreSQL',
        code: 'DS-EXT-001',
        status: '运行中',
        owner: '来源组',
        group: '数据库源',
        updatedAt: '2026-03-30 09:35:00',
        description: '边缘库主数据源。'
      },
      {
        name: '传感流 Kafka',
        code: 'DS-EXT-002',
        status: '异常',
        owner: '来源组',
        group: '消息源',
        updatedAt: '2026-03-30 10:07:00',
        description: '消费延迟超阈值，待处理。'
      }
    ]
  }),
  ExternalTemplateConfig: buildPage({
    title: '数据模板配置',
    category: '模板配置能力',
    description: '覆盖模板管理、字段映射、模板下放、模板版本管理。',
    summary: '支持模板和模板目录管理，字段映射配置，模板下放与版本治理。',
    sections: [
      {
        title: '数据模板管理',
        items: ['新增模板', '编辑模板', '删除模板', '查看模板', '新增模板目录', '修改模板目录', '删除模板目录', '查询模板目录']
      },
      {
        title: '模板配置与下放',
        items: ['字段映射配置', '数据模板下放', '数据模板版本管理']
      }
    ],
    timeline: ['维护模板与目录', '配置字段映射', '下放模板并管理版本'],
    stats: makeStats('74 份模板', '61 份生效', '6 份待发布', '4 次版本变更'),
    entityLabel: '模板对象',
    toolbarActions: ['新增模板', '编辑模板', '删除模板', '查看模板', '新增模板目录', '修改模板目录', '删除模板目录', '查询模板目录', '字段映射配置', '数据模板下放', '数据模板版本管理'],
    rowActions: ['编辑模板', '删除模板', '查看模板', '数据模板版本管理'],
    rows: [
      {
        name: '设备状态接入模板',
        code: 'TPL-001',
        status: '已上线',
        owner: '模板组',
        group: '状态模板',
        updatedAt: '2026-03-30 09:48:00',
        description: '设备状态标准接入模板。'
      }
    ]
  }),
  ExternalAccessData: buildPage({
    title: '接入数据管理',
    category: '接入执行能力',
    description: '覆盖接入类型、策略、对账管理、清洗转换、概览、访问控制、接入管理。',
    summary: '支持结构化/非结构化对账上下线与复制，清洗过滤校验，访问控制和任务管理。',
    sections: [
      {
        title: '接入类型与策略',
        items: ['表接入', 'Hbase 接入', 'Kafka0.9 输入', '华为 Elasticsearch 输入', 'Sql 输入', 'Excel 读取', '数据接入策略配置']
      },
      {
        title: '对账与清洗',
        items: ['新增结构化对账', '修改结构化对账', '删除结构化对账', '查询结构化对账', '结构化任务上线', '结构化任务下线', '复制结构化对账任务', '新增非结构化对账', '修改非结构化对账', '删除非结构化对账', '查询非结构化对账', '非结构化对账任务上线', '非结构化对账任务下线', '复制非结构化对账任务', '清洗转换', '过滤', '唯一标识', 'SQL转换', '数据校验']
      },
      {
        title: '概览与访问',
        items: ['数据接入概览', '新增访问控制', '修改访问控制', '删除访问控制', '查询访问控制', '新增任务', '修改任务', '删除任务', '查询任务', '复制任务', '移动任务']
      }
    ],
    timeline: ['选择接入类型', '配置策略与对账', '执行清洗校验', '维护访问控制与接入任务'],
    stats: makeStats('153 个接入任务', '121 个运行中', '14 个异常', '9 次策略调整'),
    entityLabel: '接入任务',
    toolbarActions: [
      '表接入',
      'Hbase 接入',
      'Kafka0.9 输入',
      '华为 Elasticsearch 输入',
      'Sql 输入',
      'Excel 读取',
      '数据接入策略配置',
      '新增结构化对账',
      '修改结构化对账',
      '删除结构化对账',
      '查询结构化对账',
      '结构化任务上线',
      '结构化任务下线',
      '复制结构化对账任务',
      '新增非结构化对账',
      '修改非结构化对账',
      '删除非结构化对账',
      '查询非结构化对账',
      '非结构化对账任务上线',
      '非结构化对账任务下线',
      '复制非结构化对账任务',
      '清洗转换',
      '过滤',
      '唯一标识',
      'SQL转换',
      '数据校验',
      '数据接入概览',
      '新增访问控制',
      '修改访问控制',
      '删除访问控制',
      '查询访问控制',
      '新增任务',
      '修改任务',
      '删除任务',
      '查询任务',
      '复制任务',
      '移动任务'
    ],
    rowActions: ['修改任务', '删除任务', '结构化任务上线', '结构化任务下线', '复制任务', '移动任务'],
    rows: [
      {
        name: '结构化设备台账对账任务',
        code: 'ACC-001',
        status: '运行中',
        owner: '接入组',
        group: '结构化对账',
        updatedAt: '2026-03-30 10:02:00',
        description: '对账设备台账结构化数据。'
      },
      {
        name: '非结构化文档对账任务',
        code: 'ACC-002',
        status: '已上线',
        owner: '接入组',
        group: '非结构化对账',
        updatedAt: '2026-03-30 09:51:00',
        description: '非结构化文档抽取与对账。'
      }
    ]
  }),
  ExternalTaskManagement: buildPage({
    title: '接入任务管理',
    category: '任务运行能力',
    description: '覆盖血缘查看、运行状态、任务管理、任务状态控制。',
    summary: '支持血缘查询、实例监控、任务上下线和启动停止重试。',
    sections: [
      {
        title: '任务血缘查看',
        items: ['血缘查询', '查询数据库表详情']
      },
      {
        title: '任务运行状态',
        items: ['任务运行状态监控', '实例运行状态监控']
      },
      {
        title: '任务管理与控制',
        items: ['查询任务', '立即执行', '上线任务', '下线任务', '启动任务', '停止任务', '重试任务']
      }
    ],
    timeline: ['查看任务血缘', '监控运行状态', '执行任务管理', '控制任务状态'],
    stats: makeStats('88 个运行任务', '71 个在线', '9 个异常', '6 次状态控制'),
    entityLabel: '任务对象',
    toolbarActions: ['血缘查询', '查询数据库表详情', '任务运行状态监控', '实例运行状态监控', '查询任务', '立即执行', '上线任务', '下线任务', '启动任务', '停止任务', '重试任务'],
    rowActions: ['立即执行', '上线任务', '下线任务', '启动任务', '停止任务', '重试任务'],
    rows: [
      {
        name: '设备台账同步任务',
        code: 'TASK-EXT-001',
        status: '运行中',
        owner: '任务组',
        group: '同步任务',
        updatedAt: '2026-03-30 10:06:00',
        description: '同步设备台账并更新血缘。'
      }
    ]
  }),
  ExternalScheduleManagement: buildPage({
    title: '接入调度管理',
    category: '调度与监控能力',
    description: '覆盖告警管理、资源监控、任务编排、任务概览统计。',
    summary: '支持告警组用户配置、Master/Worker/Zookeeper/数据库/Carte 监控、任务编排目录管理。',
    sections: [
      {
        title: '告警管理',
        items: ['新增告警组', '修改告警组', '删除告警组', '查询告警组', '告警组用户配置']
      },
      {
        title: '资源监控',
        items: ['监控Master 状态', '监控 worker 状态', '监控 zookeeper 状态', '监控数据库状态', '监控 carte 状态']
      },
      {
        title: '任务编排与统计',
        items: ['新增任务编排', '修改任务编排', '删除任务编排', '查询任务编排', '立即执行', '上线任务编排', '下线任务编排', '新增任务编排目录', '修改任务编排目录', '查询任务编排目录', '复制任务编排', '移动任务编排', '任务概览统计']
      }
    ],
    timeline: ['维护告警组', '监控运行资源', '维护任务编排', '查看任务统计'],
    stats: makeStats('97 条调度对象', '82 条运行中', '8 条告警', '5 次编排变更'),
    entityLabel: '调度对象',
    toolbarActions: [
      '新增告警组',
      '修改告警组',
      '删除告警组',
      '查询告警组',
      '告警组用户配置',
      '监控Master 状态',
      '监控 worker 状态',
      '监控 zookeeper 状态',
      '监控数据库状态',
      '监控 carte 状态',
      '新增任务编排',
      '修改任务编排',
      '删除任务编排',
      '查询任务编排',
      '立即执行',
      '上线任务编排',
      '下线任务编排',
      '新增任务编排目录',
      '修改任务编排目录',
      '查询任务编排目录',
      '复制任务编排',
      '移动任务编排',
      '任务概览统计'
    ],
    rowActions: ['修改任务编排', '删除任务编排', '上线任务编排', '下线任务编排', '立即执行'],
    rows: [
      {
        name: '接入主流程编排',
        code: 'ORCH-001',
        status: '运行中',
        owner: '调度组',
        group: '任务编排',
        updatedAt: '2026-03-30 10:08:00',
        description: '接入任务主流程编排方案。'
      }
    ]
  }),
  ExternalShareManagement: buildPage({
    title: '数据共享管理',
    category: '共享发布能力',
    description: '覆盖服务网关、表资源、标签资源、指标资源、接口资源、文件资源服务。',
    summary: '支持网关上线下线与各类资源服务的增删改查、启停用、发布与取消发布。',
    sections: [
      {
        title: '服务网关',
        items: ['上线网关', '下线网关', '修改网关', '查询网关']
      },
      {
        title: '资源服务',
        items: ['新增表数据资源', '修改表数据资源', '删除表数据资源', '查询表数据资源', '启用表资源服务', '停用表资源服务', '发布表资源服务', '取消发布表资源服务', '新增标签数据资源服务', '修改标签数据资源服务', '删除标签数据资源服务', '查询标签数据资源服务', '启用标签资源服务', '停用标签资源服务', '发布标签资源服务', '取消发布标签资源服务', '新增数据指标服务', '修改数据指标服务', '删除数据指标服务', '查询数据指标服务', '启用数据指标资源服务', '停用数据指标资源服务', '发布数据指标资源服务', '取消发布数据指标资源服务', '新增数据接口服务', '修改数据接口服务', '删除数据接口服务', '查询数据接口服务', '启用数据接口资源服务', '停用数据接口资源服务', '发布数据接口资源服务', '取消发布数据接口资源服务', '新增数据文件服务', '修改数据文件服务', '删除数据文件服务', '查询数据文件服务', '启用数据文件资源服务', '停用数据文件资源服务', '发布数据文件资源服务', '取消发布数据文件资源服务']
      }
    ],
    timeline: ['维护网关状态', '维护资源服务', '发布共享能力', '管理启停用状态'],
    stats: makeStats('126 条共享服务', '102 条在线', '11 条待发布', '6 次发布变更'),
    entityLabel: '共享服务',
    toolbarActions: [
      '上线网关',
      '下线网关',
      '修改网关',
      '查询网关',
      '新增表数据资源',
      '修改表数据资源',
      '删除表数据资源',
      '查询表数据资源',
      '启用表资源服务',
      '停用表资源服务',
      '发布表资源服务',
      '取消发布表资源服务',
      '新增标签数据资源服务',
      '修改标签数据资源服务',
      '删除标签数据资源服务',
      '查询标签数据资源服务',
      '启用标签资源服务',
      '停用标签资源服务',
      '发布标签资源服务',
      '取消发布标签资源服务',
      '新增数据指标服务',
      '修改数据指标服务',
      '删除数据指标服务',
      '查询数据指标服务',
      '启用数据指标资源服务',
      '停用数据指标资源服务',
      '发布数据指标资源服务',
      '取消发布数据指标资源服务',
      '新增数据接口服务',
      '修改数据接口服务',
      '删除数据接口服务',
      '查询数据接口服务',
      '启用数据接口资源服务',
      '停用数据接口资源服务',
      '发布数据接口资源服务',
      '取消发布数据接口资源服务',
      '新增数据文件服务',
      '修改数据文件服务',
      '删除数据文件服务',
      '查询数据文件服务',
      '启用数据文件资源服务',
      '停用数据文件资源服务',
      '发布数据文件资源服务',
      '取消发布数据文件资源服务'
    ],
    rowActions: ['修改表数据资源', '删除表数据资源', '发布表资源服务', '取消发布表资源服务'],
    rows: [
      {
        name: '设备表资源共享服务',
        code: 'SHARE-TABLE-001',
        status: '已上线',
        owner: '共享组',
        group: '表资源服务',
        updatedAt: '2026-03-30 09:57:00',
        description: '设备表资源对外共享服务。'
      },
      {
        name: '设备指标资源共享服务',
        code: 'SHARE-METRIC-001',
        status: '运行中',
        owner: '共享组',
        group: '指标资源服务',
        updatedAt: '2026-03-30 10:09:00',
        description: '设备指标资源对外共享服务。'
      }
    ]
  })
}

export const modulePageList = Object.entries(modulePageConfigs).map(([routeName, config]) => ({
  routeName,
  ...config
}))
