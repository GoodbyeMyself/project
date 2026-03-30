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
  if (label.includes('新增') || label.includes('新建') || label.includes('创建') || label.includes('注册')) return 'add'
  if (label.includes('修改') || label.includes('编辑') || label.includes('更新')) return 'edit'
  if (label.includes('删除') || label.includes('注销')) return 'delete'
  if (label.includes('上线') || label.includes('发布') || label.includes('启用')) return 'online'
  if (label.includes('下线') || label.includes('停用')) return 'offline'
  if (label.includes('导入')) return 'upload'
  if (label.includes('导出') || label.includes('下载')) return 'download'
  if (label.includes('审批')) return 'approve'
  if (label.includes('执行') || label.includes('调度')) return 'execute'
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
  IndicatorManagement: buildPage({
    title: '指标管理',
    category: '指标体系能力',
    description: '覆盖指标创建、指标单位、指标维度、指标周期、指标模型。',
    summary: '支持指标创建编辑发布，单位维度周期维护，模型上线下线与运行记录。',
    sections: [
      {
        title: '指标创建',
        items: ['指标创建', '指标编辑', '指标发布', '指标下线', '指标删除']
      },
      {
        title: '指标单位',
        items: ['指标单位新增', '指标单位修改', '指标单位删除', '指标单位导入', '指标单位导出']
      },
      {
        title: '指标维度',
        items: ['手动枚举新增', '关联维表快速生成', '指标维度导入', '指标维度导出', '指标维度删除']
      },
      {
        title: '指标周期',
        items: ['指标周期新增', '指标周期修改', '指标周期删除']
      },
      {
        title: '指标模型',
        items: ['新增指标模型', '编辑指标模型', '指标模型上线', '指标模型下线', '指标模型删除', '指标调度', '指标运行记录']
      }
    ],
    timeline: ['定义指标', '维护单位维度周期', '发布指标模型', '监控模型运行'],
    stats: makeStats('213 项指标对象', '176 项运行中', '15 项待发布', '9 次模型变更'),
    entityLabel: '指标对象',
    toolbarActions: [
      '指标创建',
      '指标编辑',
      '指标发布',
      '指标下线',
      '指标删除',
      '指标单位新增',
      '指标单位修改',
      '指标单位删除',
      '指标单位导入',
      '指标单位导出',
      '手动枚举新增',
      '关联维表快速生成',
      '指标维度导入',
      '指标维度导出',
      '指标维度删除',
      '指标周期新增',
      '指标周期修改',
      '指标周期删除',
      '新增指标模型',
      '编辑指标模型',
      '指标模型上线',
      '指标模型下线',
      '指标模型删除',
      '指标调度',
      '指标运行记录'
    ],
    rowActions: ['指标编辑', '指标发布', '指标下线', '指标删除', '指标运行记录'],
    rows: [
      {
        name: '设备健康指数',
        code: 'INDEX-001',
        status: '已上线',
        owner: '指标组',
        group: '设备指标',
        updatedAt: '2026-03-30 09:42:00',
        description: '衡量设备整体健康情况。'
      },
      {
        name: '任务成功率模型',
        code: 'MODEL-001',
        status: '运行中',
        owner: '指标组',
        group: '指标模型',
        updatedAt: '2026-03-30 10:08:00',
        description: '用于计算任务成功率趋势。'
      }
    ]
  }),
  IndicatorBuild: buildPage({
    title: '指标构建',
    category: '指标计算能力',
    description: '覆盖指标计算任务的新增、修改、上线、下线、执行。',
    summary: '围绕指标计算任务实现完整状态流转和执行控制。',
    sections: [
      {
        title: '指标计算',
        items: ['新增指标计算任务', '修改指标计算任务', '上线指标计算任务', '下线指标计算任务', '执行指标计算任务']
      }
    ],
    timeline: ['创建计算任务', '修改任务配置', '上线执行', '下线回收'],
    stats: makeStats('48 个计算任务', '37 个在线', '6 个待执行', '4 次计算失败'),
    entityLabel: '计算任务',
    toolbarActions: ['新增指标计算任务', '修改指标计算任务', '上线指标计算任务', '下线指标计算任务', '执行指标计算任务'],
    rowActions: ['修改指标计算任务', '上线指标计算任务', '下线指标计算任务', '执行指标计算任务'],
    rows: [
      {
        name: '设备健康指数日计算',
        code: 'CALC-001',
        status: '运行中',
        owner: '计算组',
        group: '日调度',
        updatedAt: '2026-03-30 10:01:00',
        description: '每日汇总设备健康指数。'
      }
    ]
  }),
  IndicatorResource: buildPage({
    title: '指标资源',
    category: '资源治理能力',
    description: '覆盖指标资源注册、更新、停用、启用、注销、核验、查询、目录管理。',
    summary: '支持注册/发布审批、停启用审批、注销审批、标准化核验与目录全生命周期。',
    sections: [
      {
        title: '资源生命周期',
        items: ['指标资源注册', '注册审批', '指标资源更新', '发布审批', '指标资源停用', '停用审批', '指标资源启用', '启用审批', '指标资源注销', '注销审批']
      },
      {
        title: '核验与查询',
        items: ['标准化核验', '检验结果判断', '资源查询', '结果表详情']
      },
      {
        title: '目录管理',
        items: ['资源目录查询', '新增指标资源目录', '修改指标资源目录', '删除指标资源目录']
      }
    ],
    timeline: ['资源注册与审批', '资源更新与启停', '执行核验与查询', '维护资源目录'],
    stats: makeStats('132 项资源', '104 项启用', '12 项待审批', '7 次目录变更'),
    entityLabel: '指标资源',
    toolbarActions: [
      '指标资源注册',
      '注册审批',
      '指标资源更新',
      '发布审批',
      '指标资源停用',
      '停用审批',
      '指标资源启用',
      '启用审批',
      '指标资源注销',
      '注销审批',
      '标准化核验',
      '检验结果判断',
      '资源查询',
      '结果表详情',
      '资源目录查询',
      '新增指标资源目录',
      '修改指标资源目录',
      '删除指标资源目录'
    ],
    rowActions: ['指标资源更新', '指标资源停用', '指标资源启用', '指标资源注销', '结果表详情'],
    rows: [
      {
        name: '设备健康指标资源',
        code: 'RES-INDEX-001',
        status: '已上线',
        owner: '资源组',
        group: '设备资源',
        updatedAt: '2026-03-30 09:39:00',
        description: '设备健康指标资源已发布。'
      },
      {
        name: '任务效率指标资源',
        code: 'RES-INDEX-002',
        status: '运行中',
        owner: '资源组',
        group: '任务资源',
        updatedAt: '2026-03-30 10:03:00',
        description: '任务效率资源待审批。'
      }
    ]
  }),
  IndicatorReport: buildPage({
    title: '指标分析报告',
    category: '分析展示能力',
    description: '覆盖报告新建、编辑、预览、下载、删除。',
    summary: '支持指标体系分析报告全生命周期管理。',
    sections: [
      {
        title: '核心能力',
        items: ['新建报告', '编辑报告', '报告预览', '报告下载', '报告删除']
      }
    ],
    timeline: ['新建报告', '编辑报告', '预览校验', '下载归档'],
    stats: makeStats('39 份报告', '31 份有效', '4 份待完善', '3 次下载'),
    entityLabel: '分析报告',
    toolbarActions: ['新建报告', '编辑报告', '报告预览', '报告下载', '报告删除'],
    rowActions: ['编辑报告', '报告预览', '报告下载', '报告删除'],
    rows: [
      {
        name: '指标体系月度分析报告',
        code: 'REPORT-INDEX-001',
        status: '运行中',
        owner: '分析组',
        group: '月报',
        updatedAt: '2026-03-30 10:10:00',
        description: '展示月度指标趋势与异常分析。'
      }
    ]
  })
}

export const modulePageList = Object.entries(modulePageConfigs).map(([routeName, config]) => ({
  routeName,
  ...config
}))
