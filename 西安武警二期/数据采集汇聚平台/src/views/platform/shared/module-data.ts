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
  if (label.includes('上传')) return 'upload'
  if (label.includes('下载')) return 'download'
  if (label.includes('详情')) return 'detail'
  if (label.includes('启动')) return 'start'
  if (label.includes('停止')) return 'stop'
  if (label.includes('已读')) return 'markRead'
  if (label.includes('预览')) return 'preview'
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
  rows,
  extraFields = [],
  extraColumns = []
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
  extraFields?: Array<{ key: string; label: string }>
  extraColumns?: Array<{ key: string; label: string; minWidth?: number }>
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
      fields: createStandardFields(entityLabel, '责任人', extraFields),
      columns: createStandardColumns(entityLabel, '责任人', extraColumns),
      rows: createRows(rows)
    }
  ]
})

export const modulePageConfigs: Record<string, ModulePageConfig> = {
  DeviceConnectionManagement: buildPage({
    title: '设备连接管理',
    category: '数据采集基础能力',
    description: '管理设备连接全生命周期，支持异常设备筛查与设备详情查看。',
    summary: '覆盖新增、编辑、删除、查询、显示异常设备、设备详情。',
    sections: [
      {
        title: '核心能力',
        items: ['新增设备连接', '编辑设备连接', '删除设备连接', '设备连接信息查询', '显示异常设备', '设备详情']
      }
    ],
    timeline: ['登记设备连接', '查询连接信息', '筛查异常设备', '下钻设备详情'],
    stats: makeStats('186 个连接', '159 个正常', '11 个异常', '6 条连接变更'),
    entityLabel: '设备连接',
    toolbarActions: ['新增设备连接', '编辑设备连接', '删除设备连接', '设备连接信息查询', '显示异常设备', '设备详情'],
    rowActions: ['编辑设备连接', '删除设备连接', '设备详情'],
    rows: [
      {
        name: '前沿摄像头采集链路',
        code: 'DEV-LINK-001',
        status: '运行中',
        owner: '设备运维组',
        group: '视频设备',
        updatedAt: '2026-03-30 09:41:00',
        description: '负责前沿点位摄像头采集。'
      },
      {
        name: '气象传感器采集链路',
        code: 'DEV-LINK-002',
        status: '异常',
        owner: '设备运维组',
        group: '传感设备',
        updatedAt: '2026-03-30 10:06:00',
        description: '发现心跳超时，待排查。'
      }
    ]
  }),
  CollectionStorageManagement: buildPage({
    title: '数据采集与存储',
    category: '数据采集核心能力',
    description: '覆盖任务管理、协议适配、传输定义、调度管理、采集监控全流程。',
    summary: '子功能统一收敛到一个业务面板，支持全部 PRD 操作点手工验证。',
    sections: [
      {
        title: '数据采集任务管理',
        items: ['新增采集任务', '修改采集任务', '删除采集任务', '查询采集任务', '任务上线', '任务下线', '新增任务目录', '修改任务目录', '删除任务目录', '查询任务目录', '复制任务', '移动任务']
      },
      {
        title: '数据采集协议适配',
        items: ['Hbase 输入', '关系型数据库表输入', 'Kafka0.9 输入', '华为 Elasticsearch 输入', 'SQL 输入', 'Excel 读取']
      },
      {
        title: '数据传输定义',
        items: ['配置输入传输', '配置输出传输']
      },
      {
        title: '调度与监控',
        items: ['数据采集调度配置', '预览数据采集调度', '查看全部设备数据采集监控', '查看单个设备数据采集监控']
      }
    ],
    timeline: ['创建采集任务', '配置协议和传输', '配置调度', '监控采集执行'],
    stats: makeStats('63 个采集任务', '52 个在线', '7 个待处理', '5 次调度变更'),
    entityLabel: '采集任务',
    toolbarActions: [
      '新增采集任务',
      '修改采集任务',
      '删除采集任务',
      '查询采集任务',
      '任务上线',
      '任务下线',
      '新增任务目录',
      '修改任务目录',
      '删除任务目录',
      '查询任务目录',
      '复制任务',
      '移动任务',
      'Hbase 输入',
      '关系型数据库表输入',
      'Kafka0.9 输入',
      '华为 Elasticsearch 输入',
      'SQL 输入',
      'Excel 读取',
      '配置输入传输',
      '配置输出传输',
      '数据采集调度配置',
      '预览数据采集调度',
      '查看全部设备数据采集监控',
      '查看单个设备数据采集监控'
    ],
    rowActions: ['任务上线', '任务下线', '复制任务', '移动任务'],
    rows: [
      {
        name: '边缘视频采集任务',
        code: 'COL-TASK-001',
        status: '已上线',
        owner: '采集团队',
        group: '视频目录',
        updatedAt: '2026-03-30 09:23:00',
        description: '采集边缘视频流元信息。'
      },
      {
        name: '设备状态采集任务',
        code: 'COL-TASK-002',
        status: '运行中',
        owner: '采集团队',
        group: '状态目录',
        updatedAt: '2026-03-30 10:08:00',
        description: '采集设备运行状态与指标。'
      }
    ]
  }),
  ProcessingAnalysisManagement: buildPage({
    title: '数据处理与分析',
    category: '数据处理核心能力',
    description: '覆盖处理定义、标准化处理、异常处理、调度管理、监控日志。',
    summary: '处理任务、目录、代码集、异常规则、调度预览与监控分析全部可操作。',
    sections: [
      {
        title: '数据处理定义',
        items: ['新增数据处理任务', '修改数据处理任务', '删除数据处理任务', '查询数据处理任务', '新增数据处理任务目录', '修改数据处理任务目录', '删除数据处理任务目录', '查询数据处理任务目录', '数据处理任务上线', '数据处理任务下线', '移动数据处理任务', '复制数据处理任务']
      },
      {
        title: '数据标准化处理',
        items: ['新增标准目录', '修改标准目录', '删除标准目录', '查询标准目录', '新增代码集', '修改代码集', '删除代码集', '查询代码集', '移动代码集目录', '新增标准代码', '修改标准代码', '删除标准代码', '查询标准代码', '数据标准化配置']
      },
      {
        title: '异常与调度监控',
        items: ['清洗配置', '过滤配置', '唯一标识配置', 'SQL 转换配置', '数据校验配置', '数据处理调度配置', '预览数据处理调度', '查看数据处理概览', '查看数据处理量分析']
      }
    ],
    timeline: ['定义处理任务', '配置标准化和异常规则', '处理调度上线', '查看处理日志与分析'],
    stats: makeStats('47 个处理任务', '39 个在线', '6 个异常', '4 次标准变更'),
    entityLabel: '处理任务',
    toolbarActions: [
      '新增数据处理任务',
      '修改数据处理任务',
      '删除数据处理任务',
      '查询数据处理任务',
      '新增数据处理任务目录',
      '修改数据处理任务目录',
      '删除数据处理任务目录',
      '查询数据处理任务目录',
      '数据处理任务上线',
      '数据处理任务下线',
      '移动数据处理任务',
      '复制数据处理任务',
      '新增标准目录',
      '修改标准目录',
      '删除标准目录',
      '查询标准目录',
      '新增代码集',
      '修改代码集',
      '删除代码集',
      '查询代码集',
      '移动代码集目录',
      '新增标准代码',
      '修改标准代码',
      '删除标准代码',
      '查询标准代码',
      '数据标准化配置',
      '清洗配置',
      '过滤配置',
      '唯一标识配置',
      'SQL 转换配置',
      '数据校验配置',
      '数据处理调度配置',
      '预览数据处理调度',
      '查看数据处理概览',
      '查看数据处理量分析'
    ],
    rowActions: ['数据处理任务上线', '数据处理任务下线', '复制数据处理任务', '移动数据处理任务'],
    rows: [
      {
        name: '视频元数据标准化任务',
        code: 'PROC-TASK-001',
        status: '已上线',
        owner: '处理组',
        group: '标准化目录',
        updatedAt: '2026-03-30 09:11:00',
        description: '将视频元数据标准化入库。'
      }
    ]
  }),
  RealtimeRemoteControl: buildPage({
    title: '实时监控与远程控制',
    category: '实时控制能力',
    description: '覆盖设备监控信息查询与设备远程控制管理能力。',
    summary: '支持设备监控查询、数据分析、启动停止、设备分组管理。',
    sections: [
      {
        title: '设备监控信息查询',
        items: ['查看设备监控信息', '查询设备分析数据', '查询设备数据量分析']
      },
      {
        title: '设备远程控制管理',
        items: ['设备启动', '设备停止', '创建设备分组', '修改设备分组', '删除设备分组', '查询设备信息']
      }
    ],
    timeline: ['监控设备运行', '分析设备数据', '执行远程控制', '维护设备分组'],
    stats: makeStats('312 台设备', '278 台在线', '14 台异常', '8 次远程操作'),
    entityLabel: '设备对象',
    toolbarActions: ['查看设备监控信息', '查询设备分析数据', '查询设备数据量分析', '设备启动', '设备停止', '创建设备分组', '修改设备分组', '删除设备分组', '查询设备信息'],
    rowActions: ['设备启动', '设备停止', '查询设备信息'],
    rows: [
      {
        name: '前沿网关 A01',
        code: 'CTRL-DEV-001',
        status: '运行中',
        owner: '远控组',
        group: '前沿分组',
        updatedAt: '2026-03-30 09:56:00',
        description: '远程控制前沿网关设备。'
      }
    ]
  }),
  AlarmNotificationManagement: buildPage({
    title: '报警与通知',
    category: '告警能力',
    description: '覆盖告警组管理、消息通知处理管理、告警规则管理。',
    summary: '支持告警组维护、消息已读删除、规则巡检与告警报告下载。',
    sections: [
      { title: '告警组管理', items: ['创建告警组', '修改告警组', '删除告警组', '查询告警组', '告警组用户配置'] },
      { title: '消息通知处理管理', items: ['查询消息', '删除消息', '消息标记已读'] },
      { title: '告警规则管理', items: ['新增告警规则', '修改告警规则', '删除告警规则', '查询告警规则', '一键巡检告警规则', '查询告警报告', '下载告警报告'] }
    ],
    timeline: ['维护告警组', '处理消息', '巡检告警规则', '导出告警报告'],
    stats: makeStats('38 条规则', '31 条生效', '4 条待处理', '9 条消息未读'),
    entityLabel: '告警对象',
    toolbarActions: ['创建告警组', '修改告警组', '删除告警组', '查询告警组', '告警组用户配置', '查询消息', '删除消息', '消息标记已读', '新增告警规则', '修改告警规则', '删除告警规则', '查询告警规则', '一键巡检告警规则', '查询告警报告', '下载告警报告'],
    rowActions: ['修改告警规则', '删除告警规则', '下载告警报告'],
    rows: [
      {
        name: '采集延迟阈值规则',
        code: 'ALARM-RULE-001',
        status: '已上线',
        owner: '规则管理员',
        group: '采集规则',
        updatedAt: '2026-03-30 09:42:00',
        description: '采集延迟超过阈值触发告警。'
      }
    ]
  }),
  DataVisualizationManagement: buildPage({
    title: '数据可视化',
    category: '展示能力',
    description: '提供数据展示与设备状态查询能力。',
    summary: '通过可视化看板展示业务指标并支持设备状态查询。',
    sections: [{ title: '核心能力', items: ['数据展示', '查询设备状态'] }],
    timeline: ['加载指标', '切换设备视图', '查看异常详情'],
    stats: makeStats('14 块看板', '12 块正常', '1 块异常', '3 次看板更新'),
    entityLabel: '可视化看板',
    toolbarActions: ['数据展示', '查询设备状态'],
    rowActions: ['查询设备状态'],
    rows: [
      {
        name: '采集处理总览看板',
        code: 'VIS-001',
        status: '运行中',
        owner: '可视化组',
        group: '综合看板',
        updatedAt: '2026-03-30 10:07:00',
        description: '展示采集量、处理量、告警量。'
      }
    ]
  }),
  DataRetentionManagement: buildPage({
    title: '数据留存管理',
    category: '数据保障能力',
    description: '覆盖分区和索引同步、数据恢复、数据备份全流程。',
    summary: '支持分区索引查询、恢复执行、备份文件与文件夹维护。',
    sections: [
      { title: '分区和索引同步', items: ['数据查询'] },
      { title: '数据恢复', items: ['数据恢复'] },
      { title: '数据备份', items: ['上传文件', '编辑文件', '删除文件', '查询文件', '移动文件', '新建文件夹', '修改文件夹', '删除文件夹', '查询文件夹', '下载文件'] }
    ],
    timeline: ['查询同步状态', '执行恢复', '维护备份文件和目录'],
    stats: makeStats('126 份备份对象', '108 份健康', '9 份待恢复', '4 次恢复演练'),
    entityLabel: '留存对象',
    toolbarActions: ['数据查询', '数据恢复', '上传文件', '编辑文件', '删除文件', '查询文件', '移动文件', '新建文件夹', '修改文件夹', '删除文件夹', '查询文件夹', '下载文件'],
    rowActions: ['数据恢复', '下载文件', '删除文件'],
    rows: [
      {
        name: '设备状态备份包',
        code: 'BACKUP-001',
        status: '运行中',
        owner: '备份组',
        group: '每日备份',
        updatedAt: '2026-03-30 09:59:00',
        description: '每日设备状态备份文件。'
      }
    ]
  }),
  DataReportingManagement: buildPage({
    title: '数据上报管理',
    category: '上报能力',
    description: '覆盖制定上报计划、选择上报计划、合规性校验、监控告警。',
    summary: '通过一体化面板管理上报计划生命周期并监控告警。',
    sections: [{ title: '核心能力', items: ['制定上报计划', '选择上报计划', '合规性校验', '监控告警'] }],
    timeline: ['制定计划', '选择执行计划', '执行合规校验', '监控告警'],
    stats: makeStats('22 个上报计划', '17 个启用', '3 个待校验', '2 条上报告警'),
    entityLabel: '上报计划',
    toolbarActions: ['制定上报计划', '选择上报计划', '合规性校验', '监控告警'],
    rowActions: ['合规性校验'],
    rows: [
      {
        name: '日报上报计划',
        code: 'REPORT-001',
        status: '运行中',
        owner: '上报组',
        group: '日报',
        updatedAt: '2026-03-30 10:03:00',
        description: '每日上报采集与处理统计。'
      }
    ]
  }),
  NotificationDispatchManagement: buildPage({
    title: '通知下发管理',
    category: '通知能力',
    description: '覆盖通知内容定制、通知记录与追踪、用户权限授权。',
    summary: '支持资源和目录维护、下发任务维护、权限配置。',
    sections: [
      { title: '通知内容定制', items: ['新增数据资源', '修改数据资源', '删除数据资源', '查询数据资源', '数据资源详情', '新增资源目录', '修改资源目录', '删除资源目录', '查询资源目录'] },
      { title: '通知记录与追踪', items: ['新增下发任务', '修改下发任务', '删除下发任务', '查询下发任务'] },
      { title: '用户权限授权', items: ['权限配置'] }
    ],
    timeline: ['维护通知资源', '维护下发任务', '配置权限并发布'],
    stats: makeStats('53 条下发对象', '45 条正常', '4 条待发布', '6 次权限调整'),
    entityLabel: '通知对象',
    toolbarActions: ['新增数据资源', '修改数据资源', '删除数据资源', '查询数据资源', '数据资源详情', '新增资源目录', '修改资源目录', '删除资源目录', '查询资源目录', '新增下发任务', '修改下发任务', '删除下发任务', '查询下发任务', '权限配置'],
    rowActions: ['数据资源详情', '修改下发任务', '删除下发任务', '权限配置'],
    rows: [
      {
        name: '晨检通知下发任务',
        code: 'DISPATCH-001',
        status: '已上线',
        owner: '通知组',
        group: '晨检任务',
        updatedAt: '2026-03-30 09:51:00',
        description: '晨检结果通知下发。'
      }
    ]
  })
}

export const modulePageList = Object.entries(modulePageConfigs).map(([routeName, config]) => ({
  routeName,
  ...config
}))
