import {
  ModulePageConfig,
  ModuleFieldConfig,
  ModuleColumnConfig,
  createAction,
  createLogColumns,
  createLogFields,
  createRows,
  createStandardColumns,
  createStandardFields
} from './module-schema'

const queryAction = (label: string) => createAction('query', label, 'info', true)
const exportAction = (label: string) => createAction('export', label, 'success', true)
const addAction = (label: string) => createAction('add', label, 'primary')
const editAction = (label: string) => createAction('edit', label, 'warning', true)
const deleteAction = (label: string) => createAction('delete', label, 'danger', true)
const detailAction = (label = '查看详情') => createAction('detail', label, 'info', true)
const onlineAction = (label: string) => createAction('online', label, 'success', true)
const offlineAction = (label: string) => createAction('offline', label, 'warning', true)
const copyAction = (label: string) => createAction('copy', label, 'primary', true)
const moveAction = (label: string) => createAction('move', label, 'info', true)
const addDirectoryAction = (label: string) => createAction('addDirectory', label, 'primary')
const editDirectoryAction = (label: string) => createAction('editDirectory', label, 'warning', true)
const deleteDirectoryAction = (label: string) => createAction('deleteDirectory', label, 'danger', true)
const uploadAction = (label: string) => createAction('upload', label, 'primary')
const downloadAction = (label: string) => createAction('download', label, 'success', true)
const newFolderAction = (label: string) => createAction('newFolder', label, 'primary')
const editFolderAction = (label: string) => createAction('editFolder', label, 'warning', true)
const deleteFolderAction = (label: string) => createAction('deleteFolder', label, 'danger', true)
const assignAction = (label: string) => createAction('assign', label, 'primary')
const portalAction = (label: string) => createAction('portal', label, 'primary', true)
const subscribeAction = (label: string) => createAction('subscribe', label, 'success', true)
const unsubscribeAction = (label: string) => createAction('unsubscribe', label, 'danger', true)
const applyAction = (label: string) => createAction('apply', label, 'warning', true)
const cancelApplyAction = (label: string) => createAction('cancelApply', label, 'info', true)
const backHomeAction = (label: string) => createAction('backHome', label, 'info', true)
const groupUsersAction = (label: string) => createAction('groupUsers', label, 'primary', true)

const standardStats = (a: string, b: string, c: string, d: string) => [
  { label: '纳管对象', value: a, description: '当前页面关注的对象总量' },
  { label: '运行状态', value: b, description: '已纳入监控的实时状态' },
  { label: '待处理事项', value: c, description: '需要人工确认的工作项' },
  { label: '最近变更', value: d, description: '近 24 小时变更或告警' }
]

const buildCrudPage = ({
  title,
  category,
  entityLabel,
  description,
  summary,
  stats,
  sections,
  timeline,
  rows,
  ownerLabel = '负责人',
  queryLabel = `查询${title}`,
  addLabel = `新增${entityLabel}`,
  editLabel = `修改${entityLabel}`,
  deleteLabel = `删除${entityLabel}`,
  extraToolbarActions = [],
  extraRowActions = [],
  extraFields = [],
  extraColumns = []
}: {
  title: string
  category: string
  entityLabel: string
  description: string
  summary: string
  stats: ModulePageConfig['stats']
  sections: ModulePageConfig['sections']
  timeline: string[]
  rows: Array<Record<string, string>>
  ownerLabel?: string
  queryLabel?: string
  addLabel?: string
  editLabel?: string
  deleteLabel?: string
  extraToolbarActions?: ReturnType<typeof createAction>[]
  extraRowActions?: ReturnType<typeof createAction>[]
  extraFields?: ModuleFieldConfig[]
  extraColumns?: ModuleColumnConfig[]
}): ModulePageConfig => ({
  title,
  category,
  description,
  summary,
  stats,
  sections,
  timeline,
  panels: [
    {
      key: 'main',
      title: `${title}台账`,
      description: `围绕${title}提供查询、维护与状态联动能力。`,
      toolbarActions: [
        queryAction(queryLabel),
        addAction(addLabel),
        editAction(editLabel),
        deleteAction(deleteLabel),
        ...extraToolbarActions
      ],
      rowActions: [detailAction(), editAction(editLabel), deleteAction(deleteLabel), ...extraRowActions],
      fields: createStandardFields(entityLabel, ownerLabel, extraFields),
      columns: createStandardColumns(entityLabel, ownerLabel, extraColumns),
      rows: createRows(rows)
    }
  ]
})

const buildReadPage = ({
  title,
  category,
  entityLabel,
  description,
  summary,
  stats,
  sections,
  timeline,
  rows,
  ownerLabel = '负责人',
  queryLabel = `查询${title}`,
  extraToolbarActions = [],
  extraRowActions = [],
  extraFields = [],
  extraColumns = []
}: {
  title: string
  category: string
  entityLabel: string
  description: string
  summary: string
  stats: ModulePageConfig['stats']
  sections: ModulePageConfig['sections']
  timeline: string[]
  rows: Array<Record<string, string>>
  ownerLabel?: string
  queryLabel?: string
  extraToolbarActions?: ReturnType<typeof createAction>[]
  extraRowActions?: ReturnType<typeof createAction>[]
  extraFields?: ModuleFieldConfig[]
  extraColumns?: ModuleColumnConfig[]
}): ModulePageConfig => ({
  title,
  category,
  description,
  summary,
  stats,
  sections,
  timeline,
  panels: [
    {
      key: 'main',
      title: `${title}视图`,
      description: `以只读方式呈现${title}运行与配置情况。`,
      toolbarActions: [queryAction(queryLabel), ...extraToolbarActions],
      rowActions: [detailAction(), ...extraRowActions],
      fields: createStandardFields(entityLabel, ownerLabel, extraFields),
      columns: createStandardColumns(entityLabel, ownerLabel, extraColumns),
      rows: createRows(rows)
    }
  ]
})

const buildTaskPage = ({
  title,
  category,
  taskLabel,
  description,
  summary,
  stats,
  sections,
  timeline,
  taskRows,
  directoryRows
}: {
  title: string
  category: string
  taskLabel: string
  description: string
  summary: string
  stats: ModulePageConfig['stats']
  sections: ModulePageConfig['sections']
  timeline: string[]
  taskRows: Array<Record<string, string>>
  directoryRows: Array<Record<string, string>>
}): ModulePageConfig => ({
  title,
  category,
  description,
  summary,
  stats,
  sections,
  timeline,
  panels: [
    {
      key: 'tasks',
      title: `${taskLabel}清单`,
      description: `提供${taskLabel}新增、发布、移动、复制和上下线能力。`,
      toolbarActions: [
        queryAction(`查询${taskLabel}`),
        addAction(`新增${taskLabel}`),
        editAction(`修改${taskLabel}`),
        deleteAction(`删除${taskLabel}`),
        onlineAction('任务上线'),
        offlineAction('任务下线'),
        copyAction('复制任务'),
        moveAction('移动任务')
      ],
      rowActions: [
        detailAction(),
        editAction(`修改${taskLabel}`),
        deleteAction(`删除${taskLabel}`),
        onlineAction('上线'),
        offlineAction('下线'),
        copyAction('复制'),
        moveAction('移动')
      ],
      fields: createStandardFields(taskLabel, '责任人', [
        { key: 'schedule', label: '执行策略' },
        { key: 'target', label: '目标节点' }
      ]),
      columns: createStandardColumns(taskLabel, '责任人', [
        { key: 'schedule', label: '执行策略', minWidth: 150 },
        { key: 'target', label: '目标节点', minWidth: 140 }
      ]),
      rows: createRows(taskRows)
    },
    {
      key: 'directories',
      title: `${taskLabel}目录`,
      description: `维护${taskLabel}所属目录结构与归档关系。`,
      toolbarActions: [
        queryAction(`查询${taskLabel}目录`),
        addDirectoryAction(`新增${taskLabel}目录`),
        editDirectoryAction(`修改${taskLabel}目录`),
        deleteDirectoryAction(`删除${taskLabel}目录`)
      ],
      rowActions: [detailAction(), editDirectoryAction('修改目录'), deleteDirectoryAction('删除目录')],
      fields: createStandardFields('目录', '目录负责人', [{ key: 'path', label: '目录路径' }]),
      columns: createStandardColumns('目录', '目录负责人', [
        { key: 'path', label: '目录路径', minWidth: 220 }
      ]),
      rows: createRows(directoryRows)
    }
  ]
})

const buildLogPage = ({
  title,
  description,
  summary,
  stats,
  sections,
  timeline
}: {
  title: string
  description: string
  summary: string
  stats: ModulePageConfig['stats']
  sections: ModulePageConfig['sections']
  timeline: string[]
}): ModulePageConfig => ({
  title,
  category: '节点侧能力',
  description,
  summary,
  stats,
  sections,
  timeline,
  panels: [
    {
      key: 'operation',
      title: '操作日志',
      description: '支持查询操作日志与导出操作日志。',
      toolbarActions: [queryAction('查询操作日志'), exportAction('导出操作日志')],
      rowActions: [detailAction('查看日志详情'), exportAction('导出该条日志')],
      fields: createLogFields(),
      columns: createLogColumns(),
      rows: createRows([
        {
          name: '新增交换节点 XN-EDGE-03',
          status: '运行中',
          owner: '平台管理员',
          group: '交换节点管理',
          updatedAt: '2026-03-30 09:15:00',
          description: '完成新增交换节点及心跳链路绑定。'
        },
        {
          name: '修改实时任务 CDC-ORDER-01',
          status: '已上线',
          owner: '值班工程师',
          group: 'CDC管理',
          updatedAt: '2026-03-30 10:20:00',
          description: '调整订阅表范围与断点位点。'
        }
      ])
    },
    {
      key: 'login',
      title: '登录日志',
      description: '支持查询登录日志与导出登录日志。',
      toolbarActions: [queryAction('查询登录日志'), exportAction('导出登录日志')],
      rowActions: [detailAction('查看登录详情'), exportAction('导出该条日志')],
      fields: createLogFields(),
      columns: createLogColumns(),
      rows: createRows([
        {
          name: '平台管理员登录管理中心',
          status: '健康',
          owner: 'platform-admin',
          group: '统一登录',
          updatedAt: '2026-03-30 08:00:00',
          description: '来源 IP 10.12.4.11，登录终端为管理控制台。'
        },
        {
          name: '节点维护员登录交换节点',
          status: '健康',
          owner: 'edge-operator',
          group: '节点登录',
          updatedAt: '2026-03-30 08:17:00',
          description: '来源 IP 10.12.4.27，二次认证通过。'
        }
      ])
    },
    {
      key: 'runtime',
      title: '运行日志',
      description: '支持查询运行日志与导出运行日志。',
      toolbarActions: [queryAction('查询运行日志'), exportAction('导出运行日志')],
      rowActions: [detailAction('查看运行详情'), exportAction('导出该条日志')],
      fields: createLogFields(),
      columns: createLogColumns(),
      rows: createRows([
        {
          name: '跨域数据交换流水 #20260330001',
          status: '运行中',
          owner: '交换引擎',
          group: '数据传输',
          updatedAt: '2026-03-30 10:35:00',
          description: '传输 6.8 GB，链路抖动在阈值内。'
        },
        {
          name: '主数据抽取批次 #20260330002',
          status: '告警中',
          owner: '调度引擎',
          group: '数据抽取',
          updatedAt: '2026-03-30 10:48:00',
          description: '源端表锁等待 17 秒，已触发重试策略。'
        }
      ])
    }
  ]
})

const buildPublishSubscribePage = (): ModulePageConfig => ({
  title: '任务发布订阅',
  category: '管理中心能力',
  description: '围绕共享交换任务的发布、订阅、申请和门户跳转构建发布订阅协同流程。',
  summary: '同一页面同时呈现发布任务、可订阅任务、我的订阅和待申请清单，方便模拟全流程操作。',
  stats: standardStats('26 个任务', '18 个已发布', '5 项待审批', '3 个订阅变更'),
  sections: [
    { title: '发布侧', items: ['新增发布任务', '修改发布任务', '删除发布任务', '查询发布任务', '跳转门户'] },
    { title: '订阅侧', items: ['查询可订阅任务', '新增我的订阅', '删除我的订阅', '查询我的订阅'] },
    { title: '申请侧', items: ['加入待申请清单', '取消待申请', '返回共享交换后台首页'] }
  ],
  timeline: ['维护发布任务清单', '从可订阅任务中挑选目标', '加入我的订阅或待申请清单', '从门户或后台返回总览页'],
  panels: [
    {
      key: 'publish',
      title: '发布任务',
      description: '管理对外发布的交换任务清单。',
      toolbarActions: [
        queryAction('查询发布任务'),
        addAction('新增发布任务'),
        editAction('修改发布任务'),
        deleteAction('删除发布任务'),
        portalAction('跳转门户')
      ],
      rowActions: [detailAction(), editAction('修改发布任务'), deleteAction('删除发布任务')],
      fields: createStandardFields('发布任务', '发布人', [{ key: 'target', label: '订阅范围' }]),
      columns: createStandardColumns('发布任务', '发布人', [{ key: 'target', label: '订阅范围', minWidth: 160 }]),
      rows: createRows([
        {
          name: '边缘日志共享服务',
          code: 'PUB-LOG-01',
          status: '已上线',
          owner: '交换运营组',
          group: '日志域',
          updatedAt: '2026-03-30 09:30:00',
          description: '对外提供节点日志共享订阅能力。',
          target: '全域订阅'
        },
        {
          name: '政务数据目录共享服务',
          code: 'PUB-RES-02',
          status: '运行中',
          owner: '资源目录组',
          group: '资源目录',
          updatedAt: '2026-03-30 10:05:00',
          description: '对接门户数据目录订阅。',
          target: '政务专网'
        }
      ])
    },
    {
      key: 'available',
      title: '可订阅任务',
      description: '展示当前可订阅的共享交换任务。',
      toolbarActions: [queryAction('查询可订阅任务'), portalAction('跳转门户')],
      rowActions: [detailAction(), subscribeAction('新增我的订阅'), applyAction('加入待申请清单')],
      fields: createStandardFields('可订阅任务', '发布人'),
      columns: createStandardColumns('可订阅任务', '发布人'),
      rows: createRows([
        {
          name: '主数据标准码表',
          code: 'SUB-STD-01',
          status: '已上线',
          owner: '标准中心',
          group: '标准交换域',
          updatedAt: '2026-03-30 08:50:00',
          description: '支持按主题申请订阅标准码表。'
        },
        {
          name: '边缘节点健康指标',
          code: 'SUB-EDGE-02',
          status: '运行中',
          owner: '运维中心',
          group: '监控交换域',
          updatedAt: '2026-03-30 09:40:00',
          description: '用于订阅边缘节点健康状态与吞吐指标。'
        }
      ])
    },
    {
      key: 'mySubscriptions',
      title: '我的订阅',
      description: '维护当前账号已成功订阅的任务。',
      toolbarActions: [queryAction('查询我的订阅'), backHomeAction('返回共享交换后台首页')],
      rowActions: [detailAction(), unsubscribeAction('删除我的订阅')],
      fields: createStandardFields('订阅任务', '订阅人'),
      columns: createStandardColumns('订阅任务', '订阅人'),
      rows: createRows([
        {
          name: '交换链路统计日报',
          code: 'MY-SUB-01',
          status: '运行中',
          owner: '当前用户',
          group: '统计分析域',
          updatedAt: '2026-03-30 07:45:00',
          description: '每日自动拉取链路与任务统计数据。'
        }
      ])
    },
    {
      key: 'pending',
      title: '待申请清单',
      description: '暂存待审批的订阅申请项。',
      toolbarActions: [queryAction('查询待申请清单'), backHomeAction('返回共享交换后台首页')],
      rowActions: [detailAction(), cancelApplyAction('取消待申请')],
      fields: createStandardFields('待申请任务', '申请人'),
      columns: createStandardColumns('待申请任务', '申请人'),
      rows: createRows([
        {
          name: '交换域目录访问申请',
          code: 'PEND-01',
          status: '待审核',
          owner: '当前用户',
          group: '资源目录域',
          updatedAt: '2026-03-30 10:00:00',
          description: '待审批后可接入跨域资源目录查询。'
        }
      ])
    }
  ]
})

const buildSecurityPage = (): ModulePageConfig => ({
  title: '安全管理',
  category: '管理中心能力',
  description: '覆盖加密配置与脱敏配置两类能力，用于保障数据共享交换平台的安全基线。',
  summary: '通过双面板结构管理加密策略与脱敏规则，支持按策略项查看、编辑与细节核验。',
  stats: standardStats('12 条策略', '9 条已生效', '2 项待审核', '1 条风险提示'),
  sections: [
    { title: '加密配置', items: ['算法选择', '密钥轮换策略', '链路加密开关'] },
    { title: '脱敏配置', items: ['字段脱敏模板', '脱敏范围定义', '结果预览校验'] }
  ],
  timeline: ['确定安全策略范围', '配置加密或脱敏规则', '发布生效并观察交换结果'],
  panels: [
    {
      key: 'encrypt',
      title: '加密配置',
      description: '维护链路与任务的加密策略。',
      toolbarActions: [queryAction('查询加密配置'), editAction('调整加密配置')],
      rowActions: [detailAction(), editAction('编辑加密项')],
      fields: createStandardFields('加密项', '安全负责人', [{ key: 'target', label: '加密算法' }]),
      columns: createStandardColumns('加密项', '安全负责人', [{ key: 'target', label: '加密算法', minWidth: 140 }]),
      rows: createRows([
        {
          name: '主链路 TLS 加密',
          code: 'SEC-ENC-01',
          status: '已上线',
          owner: '安全运维',
          group: '链路安全',
          updatedAt: '2026-03-30 09:18:00',
          description: '对跨域传输链路启用 TLS 1.3。',
          target: 'TLS 1.3'
        },
        {
          name: '任务级 AES 加密',
          code: 'SEC-ENC-02',
          status: '运行中',
          owner: '安全运维',
          group: '任务安全',
          updatedAt: '2026-03-30 10:12:00',
          description: '对敏感载荷采用 AES-256-GCM。',
          target: 'AES-256-GCM'
        }
      ])
    },
    {
      key: 'mask',
      title: '脱敏配置',
      description: '维护任务字段脱敏规则。',
      toolbarActions: [queryAction('查询脱敏配置'), editAction('调整脱敏配置')],
      rowActions: [detailAction(), editAction('编辑脱敏项')],
      fields: createStandardFields('脱敏项', '规则负责人', [{ key: 'target', label: '脱敏模板' }]),
      columns: createStandardColumns('脱敏项', '规则负责人', [{ key: 'target', label: '脱敏模板', minWidth: 140 }]),
      rows: createRows([
        {
          name: '身份证号脱敏',
          code: 'SEC-MSK-01',
          status: '已上线',
          owner: '数据治理组',
          group: '个人敏感信息',
          updatedAt: '2026-03-30 09:48:00',
          description: '保留前后两位，其余位屏蔽。',
          target: '证件模板'
        },
        {
          name: '手机号脱敏',
          code: 'SEC-MSK-02',
          status: '运行中',
          owner: '数据治理组',
          group: '联系方式',
          updatedAt: '2026-03-30 10:08:00',
          description: '保留前三后四，中间四位替换。',
          target: '号码模板'
        }
      ])
    }
  ]
})

const buildResourcePage = (): ModulePageConfig => ({
  title: '资源目录',
  category: '管理中心能力',
  description: '同时管理数据资源与资源目录，覆盖新增、修改、删除、查询和详情查看。',
  summary: '将资源对象和目录对象拆分展示，既能维护资源元数据，也能维护目录层级结构。',
  stats: standardStats('48 个资源', '12 个目录', '4 个待发布', '6 条资源变更'),
  sections: [
    { title: '数据资源', items: ['新增数据资源', '修改数据资源', '删除数据资源', '查询数据资源', '数据资源详情'] },
    { title: '资源目录', items: ['新增资源目录', '修改资源目录', '删除资源目录', '查询资源目录'] }
  ],
  timeline: ['维护目录层级', '新增或更新资源', '查看资源详情与对外发布情况'],
  panels: [
    {
      key: 'resource',
      title: '数据资源',
      description: '维护数据资源主数据与详情。',
      toolbarActions: [
        queryAction('查询数据资源'),
        addAction('新增数据资源'),
        editAction('修改数据资源'),
        deleteAction('删除数据资源')
      ],
      rowActions: [detailAction('数据资源详情'), editAction('修改数据资源'), deleteAction('删除数据资源')],
      fields: createStandardFields('数据资源', '资源负责人', [{ key: 'target', label: '资源目录' }]),
      columns: createStandardColumns('数据资源', '资源负责人', [{ key: 'target', label: '资源目录', minWidth: 160 }]),
      rows: createRows([
        {
          name: '边缘节点运行指标资源',
          code: 'RES-EDGE-01',
          status: '已上线',
          owner: '资源管理员',
          group: '监控资源',
          updatedAt: '2026-03-30 09:10:00',
          description: '提供节点 CPU、内存、磁盘与链路指标。',
          target: '运行监控目录'
        },
        {
          name: '共享任务作业资源',
          code: 'RES-TASK-02',
          status: '运行中',
          owner: '资源管理员',
          group: '任务资源',
          updatedAt: '2026-03-30 10:18:00',
          description: '提供任务级元数据、目录、上下线状态。',
          target: '业务任务目录'
        }
      ])
    },
    {
      key: 'catalog',
      title: '资源目录',
      description: '维护资源目录树与归属关系。',
      toolbarActions: [
        queryAction('查询资源目录'),
        addDirectoryAction('新增资源目录'),
        editDirectoryAction('修改资源目录'),
        deleteDirectoryAction('删除资源目录')
      ],
      rowActions: [detailAction(), editDirectoryAction('修改资源目录'), deleteDirectoryAction('删除资源目录')],
      fields: createStandardFields('资源目录', '目录负责人', [{ key: 'path', label: '目录路径' }]),
      columns: createStandardColumns('资源目录', '目录负责人', [{ key: 'path', label: '目录路径', minWidth: 220 }]),
      rows: createRows([
        {
          name: '运行监控目录',
          code: 'CAT-01',
          status: '已上线',
          owner: '目录管理员',
          group: '一级目录',
          updatedAt: '2026-03-30 08:40:00',
          description: '承载监控类资源。',
          path: '/监控/运行'
        },
        {
          name: '业务任务目录',
          code: 'CAT-02',
          status: '运行中',
          owner: '目录管理员',
          group: '一级目录',
          updatedAt: '2026-03-30 09:55:00',
          description: '承载共享交换任务与订阅资源。',
          path: '/业务/任务'
        }
      ])
    }
  ]
})

const buildFilePage = (): ModulePageConfig => ({
  title: '文件管理',
  category: '管理中心能力',
  description: '提供文件与文件夹的上传、编辑、删除、查询、移动、下载等能力。',
  summary: '将文件和文件夹拆分为两个面板，便于分别模拟文件流转与目录维护。',
  stats: standardStats('36 个文件', '9 个文件夹', '3 个下载任务', '2 个移动操作'),
  sections: [
    { title: '文件操作', items: ['上传文件', '编辑文件', '删除文件', '查询文件', '移动文件', '下载文件'] },
    { title: '目录操作', items: ['新建文件夹', '修改文件夹', '删除文件夹', '查询文件夹'] }
  ],
  timeline: ['维护文件夹结构', '上传或编辑文件', '按需移动或下载文件'],
  panels: [
    {
      key: 'files',
      title: '文件列表',
      description: '管理平台附件、模板与配置文件。',
      toolbarActions: [
        queryAction('查询文件'),
        uploadAction('上传文件'),
        editAction('编辑文件'),
        deleteAction('删除文件'),
        moveAction('移动文件'),
        downloadAction('下载文件')
      ],
      rowActions: [
        detailAction(),
        editAction('编辑文件'),
        deleteAction('删除文件'),
        moveAction('移动文件'),
        downloadAction('下载文件')
      ],
      fields: createStandardFields('文件', '文件负责人', [
        { key: 'group', label: '所属文件夹' },
        { key: 'target', label: '文件类型' }
      ]),
      columns: createStandardColumns('文件', '文件负责人', [{ key: 'target', label: '文件类型', minWidth: 120 }]),
      rows: createRows([
        {
          name: '交换任务模板.xlsx',
          code: 'FILE-01',
          status: '已上线',
          owner: '运维值班员',
          group: '模板文件夹',
          updatedAt: '2026-03-30 09:00:00',
          description: '任务导入模板文件。',
          target: 'Excel'
        },
        {
          name: '边缘节点清单.json',
          code: 'FILE-02',
          status: '运行中',
          owner: '运维值班员',
          group: '配置文件夹',
          updatedAt: '2026-03-30 10:11:00',
          description: '节点初始化配置清单。',
          target: 'JSON'
        }
      ])
    },
    {
      key: 'folders',
      title: '文件夹列表',
      description: '维护平台文件目录。',
      toolbarActions: [
        queryAction('查询文件夹'),
        newFolderAction('新建文件夹'),
        editFolderAction('修改文件夹'),
        deleteFolderAction('删除文件夹')
      ],
      rowActions: [detailAction(), editFolderAction('修改文件夹'), deleteFolderAction('删除文件夹')],
      fields: createStandardFields('文件夹', '目录负责人', [{ key: 'path', label: '目录路径' }]),
      columns: createStandardColumns('文件夹', '目录负责人', [{ key: 'path', label: '目录路径', minWidth: 220 }]),
      rows: createRows([
        {
          name: '模板文件夹',
          code: 'DIR-01',
          status: '已上线',
          owner: '文档管理员',
          group: '根目录',
          updatedAt: '2026-03-30 08:33:00',
          description: '存放任务模板与导入模板。',
          path: '/templates'
        },
        {
          name: '配置文件夹',
          code: 'DIR-02',
          status: '运行中',
          owner: '文档管理员',
          group: '根目录',
          updatedAt: '2026-03-30 09:59:00',
          description: '存放节点与链路配置快照。',
          path: '/configs'
        }
      ])
    }
  ]
})

export const modulePageConfigs: Record<string, ModulePageConfig> = {
  NodeManagementAgent: buildReadPage({
    title: '管理代理',
    category: '节点侧能力',
    entityLabel: '代理策略',
    description: '面向节点侧提供指定代理能力，可为不同任务绑定不同代理实例与执行策略。',
    summary: '适合在节点端快速切换代理、绑定节点链路，并通过只读视图观察代理分配结果。',
    stats: standardStats('8 个代理', '6 个在线', '1 项待切换', '2 次代理调整'),
    sections: [{ title: '核心能力', items: ['指定代理', '代理绑定节点', '代理负载分配'] }],
    timeline: ['选择目标代理', '绑定任务或节点', '观察代理心跳与执行效果'],
    rows: [
      { name: '主交换代理', code: 'AGENT-01', status: '运行中', owner: '节点管理员', group: '主节点组', updatedAt: '2026-03-30 09:05:00', description: '负责主链路代理转发。' },
      { name: '应急接管代理', code: 'AGENT-02', status: '已上线', owner: '节点管理员', group: '容灾组', updatedAt: '2026-03-30 10:02:00', description: '用于异常切换时接管传输任务。' }
    ],
    extraToolbarActions: [assignAction('指定代理')]
  }),
  NodeSchedulingEngine: buildReadPage({
    title: '调度引擎',
    category: '节点侧能力',
    entityLabel: '调度策略',
    description: '负责节点侧数据抽取模式配置和交换触发模式配置。',
    summary: '通过统一视图维护抽取策略、触发方式以及节点端调度节奏。',
    stats: standardStats('14 条策略', '11 条生效', '2 项待确认', '1 个触发异常'),
    sections: [{ title: '核心能力', items: ['数据抽取模式配置', '交换触发模式配置'] }],
    timeline: ['定义抽取模式', '设置触发条件', '执行调度并回收结果'],
    rows: [
      { name: '增量抽取策略', code: 'SCHED-01', status: '已上线', owner: '调度负责人', group: '抽取模式', updatedAt: '2026-03-30 08:58:00', description: '按更新时间增量抽取源端数据。' },
      { name: '事件触发策略', code: 'SCHED-02', status: '运行中', owner: '调度负责人', group: '触发模式', updatedAt: '2026-03-30 10:07:00', description: '由实时消息触发交换流程。' }
    ],
    extraToolbarActions: [editAction('配置抽取模式'), editAction('配置触发模式')]
  }),
  NodeExchangeEngine: buildReadPage({
    title: '交换引擎',
    category: '节点侧能力',
    entityLabel: '交换任务',
    description: '节点侧交换引擎负责数据传输和数据处理，承担交换执行面的核心逻辑。',
    summary: '通过运行视图观察传输链路、处理步骤和节点端吞吐表现。',
    stats: standardStats('22 条链路', '18 条运行中', '1 项待重试', '3 次处理变更'),
    sections: [{ title: '核心能力', items: ['数据传输', '数据处理'] }],
    timeline: ['建立传输链路', '执行数据处理', '回传结果与统计信息'],
    rows: [
      { name: '跨域数据传输链路', code: 'ENG-01', status: '运行中', owner: '交换工程师', group: '数据传输', updatedAt: '2026-03-30 09:26:00', description: '负责主通道跨域交换。' },
      { name: '敏感字段处理流水线', code: 'ENG-02', status: '已上线', owner: '交换工程师', group: '数据处理', updatedAt: '2026-03-30 10:14:00', description: '执行脱敏、校验与标准化处理。' }
    ],
    extraToolbarActions: [detailAction('查看数据传输'), detailAction('查看数据处理')]
  }),
  NodeLogManagement: buildLogPage({
    title: '日志管理',
    description: '集中查看节点侧操作日志、登录日志、运行日志，并提供导出能力。',
    summary: '日志面板按日志类型分栏管理，便于值班人员手动查询和导出。',
    stats: standardStats('3 类日志', '2 类健康', '1 条告警', '9 条新增记录'),
    sections: [{ title: '日志能力', items: ['查询操作日志', '导出操作日志', '查询登录日志', '导出登录日志', '查询运行日志', '导出运行日志'] }],
    timeline: ['选择日志类型', '查询目标日志', '查看详情或导出结果']
  }),
  CenterShareManagement: buildReadPage({
    title: '数据共享交换管理',
    category: '管理中心能力',
    entityLabel: '交换监控',
    description: '用于管理中心视角查看整体交换情况监控。',
    summary: '展示跨节点交换、任务运行和域间流量的核心监控信息。',
    stats: standardStats('32 条交换流', '28 条健康', '2 项预警', '4 次峰值波动'),
    sections: [{ title: '核心能力', items: ['交换情况监控'] }],
    timeline: ['聚合交换指标', '查看异常点位', '下钻到具体节点或任务'],
    rows: [
      { name: '主交换域实时流量', code: 'MON-01', status: '健康', owner: '监控中心', group: '交换监控', updatedAt: '2026-03-30 10:00:00', description: '实时展示主域吞吐与延迟。' },
      { name: '跨域任务成功率', code: 'MON-02', status: '运行中', owner: '监控中心', group: '质量监控', updatedAt: '2026-03-30 10:22:00', description: '近一小时任务成功率 98.4%。' }
    ],
    extraToolbarActions: [detailAction('查看交换监控')]
  }),
  CenterNodeManagement: buildCrudPage({
    title: '交换节点管理',
    category: '管理中心能力',
    entityLabel: '交换节点',
    description: '管理中心对交换节点提供新增、修改、删除、查询和交换情况监控能力。',
    summary: '通过节点台账统一维护节点信息，并结合监控状态识别异常节点。',
    stats: standardStats('18 个节点', '15 个在线', '2 项待维护', '1 次节点告警'),
    sections: [{ title: '核心能力', items: ['交换情况监控', '新增交换节点', '修改交换节点', '删除交换节点', '查询交换节点'] }],
    timeline: ['登记节点', '配置接入参数', '监控运行情况并维护状态'],
    rows: [
      { name: '西安主交换节点', code: 'NODE-XA-01', status: '运行中', owner: '节点管理员', group: '西安交换域', updatedAt: '2026-03-30 09:12:00', description: '主交换节点，承担核心任务。' },
      { name: '边缘接入节点', code: 'NODE-EDGE-02', status: '告警中', owner: '节点管理员', group: '边缘交换域', updatedAt: '2026-03-30 10:16:00', description: '网络抖动高于阈值，待人工处理。' }
    ],
    extraToolbarActions: [detailAction('交换情况监控')]
  }),
  CenterChannelManagement: buildReadPage({
    title: '交换通道管理',
    category: '管理中心能力',
    entityLabel: '交换通道',
    description: '查询交换通道连通性、带宽与状态。',
    summary: '适合快速核对通道是否纳管、链路是否可用以及当前通道负载。',
    stats: standardStats('12 条通道', '10 条健康', '1 项带宽告警', '1 次链路切换'),
    sections: [{ title: '核心能力', items: ['查询交换通道'] }],
    timeline: ['选择通道范围', '查询通道状态', '查看链路明细'],
    rows: [
      { name: '政务专网主通道', code: 'CH-01', status: '健康', owner: '链路管理员', group: '主链路', updatedAt: '2026-03-30 08:41:00', description: '当前带宽使用率 62%。' },
      { name: '容灾备用通道', code: 'CH-02', status: '运行中', owner: '链路管理员', group: '备链路', updatedAt: '2026-03-30 09:57:00', description: '备用状态，随时可切换。' }
    ]
  }),
  CenterTopologyManagement: buildReadPage({
    title: '交换拓扑管理',
    category: '管理中心能力',
    entityLabel: '网络拓扑',
    description: '集中展示网络拓扑及拓扑详情信息。',
    summary: '用于掌握各交换域、节点、通道之间的拓扑关系和链路详情。',
    stats: standardStats('9 个拓扑域', '24 条链路', '1 个瓶颈节点', '2 条拓扑更新'),
    sections: [{ title: '核心能力', items: ['查询网络拓扑', '网络拓扑详情'] }],
    timeline: ['载入拓扑图', '定位目标节点', '查看拓扑详情'],
    rows: [
      { name: '西安核心交换拓扑', code: 'TOP-01', status: '健康', owner: '网络管理员', group: '核心区', updatedAt: '2026-03-30 08:55:00', description: '覆盖核心交换域与政务专网链路。' },
      { name: '边缘接入拓扑', code: 'TOP-02', status: '运行中', owner: '网络管理员', group: '边缘区', updatedAt: '2026-03-30 10:06:00', description: '覆盖边缘节点与主节点接入链路。' }
    ],
    extraToolbarActions: [detailAction('网络拓扑详情')]
  }),
  CenterEdgeNodeManagement: buildCrudPage({
    title: '边缘节点管理',
    category: '管理中心能力',
    entityLabel: '边缘节点',
    description: '维护边缘节点的新增、修改、删除和查询能力。',
    summary: '边缘节点台账与主节点分离，便于单独治理边缘接入质量。',
    stats: standardStats('11 个节点', '9 个在线', '1 项待部署', '1 次边缘变更'),
    sections: [{ title: '核心能力', items: ['新增边缘节点', '修改边缘节点', '删除边缘节点', '查询边缘节点'] }],
    timeline: ['登记边缘节点', '绑定所属域', '维护边缘节点生命周期'],
    rows: [
      { name: '灞桥边缘节点', code: 'EDGE-01', status: '运行中', owner: '边缘管理员', group: '西安边缘域', updatedAt: '2026-03-30 09:03:00', description: '负责本地边缘采集与交换。' },
      { name: '蓝田边缘节点', code: 'EDGE-02', status: '已上线', owner: '边缘管理员', group: '西安边缘域', updatedAt: '2026-03-30 10:18:00', description: '新增接入节点，待观察运行情况。' }
    ]
  }),
  CenterDomainManagement: buildCrudPage({
    title: '交换域管理',
    category: '管理中心能力',
    entityLabel: '交换域分组',
    description: '维护交换域分组，支持新增、修改、删除和查询。',
    summary: '通过域分组实现节点、资源和任务的逻辑归属管理。',
    stats: standardStats('7 个交换域', '6 个已生效', '1 项待调整', '2 次域策略变更'),
    sections: [{ title: '核心能力', items: ['新增交换域分组', '修改交换域分组', '删除交换域分组', '查询交换域分组'] }],
    timeline: ['建立域分组', '分配节点与资源', '持续维护域边界'],
    rows: [
      { name: '西安交换域', code: 'DOMAIN-01', status: '已上线', owner: '域管理员', group: '一级域', updatedAt: '2026-03-30 08:47:00', description: '核心业务交换域。' },
      { name: '边缘交换域', code: 'DOMAIN-02', status: '运行中', owner: '域管理员', group: '一级域', updatedAt: '2026-03-30 09:52:00', description: '负责边缘节点数据流转。' }
    ]
  }),
  CenterServerManagement: buildReadPage({
    title: '服务器管理',
    category: '管理中心能力',
    entityLabel: '服务器状态',
    description: '查询服务器运行状态与资源负载。',
    summary: '统一查看节点宿主机和平台服务器的 CPU、内存、磁盘与可用性。',
    stats: standardStats('14 台服务器', '12 台健康', '1 台高负载', '1 次资源扩容'),
    sections: [{ title: '核心能力', items: ['查询服务器状态'] }],
    timeline: ['选择服务器', '查询当前状态', '查看历史负载趋势'],
    rows: [
      { name: 'master-server-01', code: 'SRV-01', status: '健康', owner: '运维中心', group: '核心集群', updatedAt: '2026-03-30 09:08:00', description: 'CPU 42%，内存 58%。' },
      { name: 'worker-server-03', code: 'SRV-02', status: '告警中', owner: '运维中心', group: '执行集群', updatedAt: '2026-03-30 10:20:00', description: '磁盘使用率接近阈值。' }
    ]
  }),
  CenterCdcManagement: buildTaskPage({
    title: 'CDC管理',
    category: '管理中心能力',
    taskLabel: '实时任务',
    description: '围绕 CDC 实时任务提供任务管理和目录管理能力。',
    summary: '覆盖实时任务的增删改查、上线下线、移动复制，以及任务目录维护。',
    stats: standardStats('21 个实时任务', '16 个已上线', '3 项待处理', '2 条目录变更'),
    sections: [
      { title: '任务能力', items: ['新增实时任务', '修改实时任务', '删除实时任务', '查询实时任务', '任务上线', '任务下线', '移动任务', '复制任务'] },
      { title: '目录能力', items: ['新增任务目录', '修改任务目录', '删除任务目录', '查询任务目录'] }
    ],
    timeline: ['建立实时任务', '配置目录归属', '完成发布与上线'],
    taskRows: [
      { name: '订单 CDC 实时任务', code: 'CDC-01', status: '已上线', owner: '实时任务负责人', group: '订单目录', updatedAt: '2026-03-30 09:28:00', description: '同步订单表增量变更。', schedule: '实时订阅', target: 'worker-01' },
      { name: '用户 CDC 实时任务', code: 'CDC-02', status: '运行中', owner: '实时任务负责人', group: '用户目录', updatedAt: '2026-03-30 10:09:00', description: '同步用户表增量变更。', schedule: 'Binlog 监听', target: 'worker-02' }
    ],
    directoryRows: [
      { name: '订单目录', code: 'DIR-CDC-01', status: '已上线', owner: '目录管理员', group: '实时任务目录', updatedAt: '2026-03-30 08:36:00', description: '订单业务 CDC 目录。', path: '/cdc/orders' },
      { name: '用户目录', code: 'DIR-CDC-02', status: '运行中', owner: '目录管理员', group: '实时任务目录', updatedAt: '2026-03-30 09:46:00', description: '用户业务 CDC 目录。', path: '/cdc/users' }
    ]
  }),
  CenterBaseEnvironmentDashboard: buildReadPage({
    title: '基础环境面板',
    category: '管理中心能力',
    entityLabel: '环境面板',
    description: '提供基础环境查询能力，汇总节点、域、链路与服务器的关键指标。',
    summary: '适合作为基础环境总览入口，快速查看纳管环境状态。',
    stats: standardStats('5 类环境对象', '4 类健康', '1 项告警', '7 次查询'),
    sections: [{ title: '核心能力', items: ['环境查询'] }],
    timeline: ['选择环境范围', '查看聚合指标', '跳转明细模块'],
    rows: [
      { name: '主环境总览', code: 'ENV-01', status: '健康', owner: '环境管理员', group: '核心环境', updatedAt: '2026-03-30 09:25:00', description: '聚合节点、域、服务器与通道信息。' },
      { name: '边缘环境总览', code: 'ENV-02', status: '运行中', owner: '环境管理员', group: '边缘环境', updatedAt: '2026-03-30 10:04:00', description: '聚合边缘节点运行状态。' }
    ]
  }),
  CenterWorkflowConfig: buildTaskPage({
    title: '交换流程配置',
    category: '管理中心能力',
    taskLabel: '工作流',
    description: '维护共享交换工作流与工作流目录。',
    summary: '覆盖工作流的新增、修改、删除、查询、上线下线、移动任务与目录管理。',
    stats: standardStats('17 个工作流', '12 个已上线', '2 项待调整', '2 条目录变更'),
    sections: [
      { title: '工作流能力', items: ['新增工作流', '修改工作流', '删除工作流', '查询工作流', '工作流上线', '工作流下线', '移动工作流任务'] },
      { title: '目录能力', items: ['新增工作流任务目录', '修改工作流任务目录', '删除工作流任务目录', '查询工作流任务目录'] }
    ],
    timeline: ['设计工作流', '归档到目录', '上线执行并维护版本'],
    taskRows: [
      { name: '跨域日志汇聚工作流', code: 'WF-01', status: '已上线', owner: '流程管理员', group: '日志目录', updatedAt: '2026-03-30 09:21:00', description: '节点日志采集与归档流程。', schedule: '定时执行', target: 'master-01' },
      { name: '共享任务发布工作流', code: 'WF-02', status: '运行中', owner: '流程管理员', group: '任务目录', updatedAt: '2026-03-30 10:13:00', description: '发布、审批、上线一体化流程。', schedule: '事件触发', target: 'master-02' }
    ],
    directoryRows: [
      { name: '日志目录', code: 'WF-DIR-01', status: '已上线', owner: '目录管理员', group: '工作流目录', updatedAt: '2026-03-30 08:52:00', description: '日志类工作流目录。', path: '/workflow/logs' },
      { name: '任务目录', code: 'WF-DIR-02', status: '运行中', owner: '目录管理员', group: '工作流目录', updatedAt: '2026-03-30 10:01:00', description: '任务类工作流目录。', path: '/workflow/tasks' }
    ]
  }),
  CenterTaskManagement: buildTaskPage({
    title: '交换任务管理',
    category: '管理中心能力',
    taskLabel: '共享交换任务',
    description: '维护共享交换任务与任务目录。',
    summary: '覆盖共享交换任务的新增、修改、删除、查询、上线下线、复制移动与目录管理。',
    stats: standardStats('34 个任务', '24 个已上线', '4 项待处理', '3 次目录维护'),
    sections: [
      { title: '任务能力', items: ['新增共享交换任务', '修改共享交换任务', '删除共享交换任务', '查询共享交换任务', '任务上线', '任务下线', '复制任务', '移动任务'] },
      { title: '目录能力', items: ['新增任务目录', '修改任务目录', '删除任务目录', '查询任务目录'] }
    ],
    timeline: ['建立任务', '维护目录归属', '执行发布和上下线'],
    taskRows: [
      { name: '主数据同步任务', code: 'TASK-01', status: '已上线', owner: '任务管理员', group: '主数据目录', updatedAt: '2026-03-30 09:16:00', description: '同步主数据中心编码信息。', schedule: '每小时', target: 'worker-03' },
      { name: '监控指标归集任务', code: 'TASK-02', status: '运行中', owner: '任务管理员', group: '监控目录', updatedAt: '2026-03-30 10:15:00', description: '归集边缘节点运行指标。', schedule: '每 10 分钟', target: 'worker-04' }
    ],
    directoryRows: [
      { name: '主数据目录', code: 'TASK-DIR-01', status: '已上线', owner: '目录管理员', group: '共享任务目录', updatedAt: '2026-03-30 08:46:00', description: '主数据共享任务目录。', path: '/task/master-data' },
      { name: '监控目录', code: 'TASK-DIR-02', status: '运行中', owner: '目录管理员', group: '共享任务目录', updatedAt: '2026-03-30 10:03:00', description: '监控任务目录。', path: '/task/monitor' }
    ]
  }),
  CenterPublishSubscribe: buildPublishSubscribePage(),
  CenterEnvironmentMonitor: buildReadPage({
    title: '交换环境监控',
    category: '管理中心能力',
    entityLabel: '监控项',
    description: '集中监控 Master、Worker、Zookeeper 与数据库状态。',
    summary: '便于值班人员一页掌握交换环境关键组件的运行健康度。',
    stats: standardStats('4 类组件', '3 类健康', '1 类告警', '2 次状态波动'),
    sections: [{ title: '核心能力', items: ['监控Master状态', '监控Worker状态', '监控Zookeeper状态', '监控数据库状态'] }],
    timeline: ['加载组件状态', '识别异常服务', '下钻查看服务详情'],
    rows: [
      { name: 'Master 集群', code: 'MON-COMP-01', status: '健康', owner: '平台运维', group: 'Master', updatedAt: '2026-03-30 10:06:00', description: '2 主实例全部正常。' },
      { name: 'Worker 集群', code: 'MON-COMP-02', status: '运行中', owner: '平台运维', group: 'Worker', updatedAt: '2026-03-30 10:06:00', description: '1 台 Worker 等待任务分配。' },
      { name: 'Zookeeper 集群', code: 'MON-COMP-03', status: '健康', owner: '平台运维', group: 'Zookeeper', updatedAt: '2026-03-30 10:06:00', description: '3 节点选举稳定。' },
      { name: '平台数据库', code: 'MON-COMP-04', status: '告警中', owner: '平台运维', group: 'Database', updatedAt: '2026-03-30 10:06:00', description: '主库连接数接近阈值。' }
    ]
  }),
  CenterAlertConfig: buildCrudPage({
    title: '配置告警',
    category: '管理中心能力',
    entityLabel: '告警组',
    description: '维护告警组和告警组用户配置。',
    summary: '通过告警组台账维护告警通知范围、级别与接收人。',
    stats: standardStats('6 个告警组', '5 个生效', '1 项待配置', '3 条告警策略变更'),
    sections: [{ title: '核心能力', items: ['新增告警组', '修改告警组', '删除告警组', '查询告警组', '告警组用户配置'] }],
    timeline: ['建立告警组', '配置接收用户', '联动监控策略'],
    rows: [
      { name: '平台运维告警组', code: 'ALERT-01', status: '已上线', owner: '告警管理员', group: '运维告警', updatedAt: '2026-03-30 08:59:00', description: '接收平台运行告警。' },
      { name: '链路质量告警组', code: 'ALERT-02', status: '运行中', owner: '告警管理员', group: '链路告警', updatedAt: '2026-03-30 10:11:00', description: '接收链路时延与抖动告警。' }
    ],
    extraToolbarActions: [groupUsersAction('告警组用户配置')]
  }),
  CenterStatisticsAnalysis: buildReadPage({
    title: '统计分析',
    category: '管理中心能力',
    entityLabel: '分析指标',
    description: '展示统计分析数据并支持查询数据量分析数据。',
    summary: '适合从任务量、数据量、节点量和链路量等维度观察平台运行趋势。',
    stats: standardStats('16 个指标', '3 类趋势', '1 项异常', '8 份统计报表'),
    sections: [{ title: '核心能力', items: ['统计分析数据展示', '查询数据量分析数据'] }],
    timeline: ['选择统计口径', '查询数据量分析', '结合业务指标研判趋势'],
    rows: [
      { name: '当日交换数据量', code: 'STAT-01', status: '运行中', owner: '统计中心', group: '数据量分析', updatedAt: '2026-03-30 10:05:00', description: '累计交换 12.8 TB。' },
      { name: '近七日任务成功率', code: 'STAT-02', status: '健康', owner: '统计中心', group: '成功率分析', updatedAt: '2026-03-30 10:05:00', description: '平均成功率 98.2%。' }
    ],
    extraToolbarActions: [exportAction('导出分析结果')]
  }),
  CenterOrganizationManagement: buildCrudPage({
    title: '用户组织管理',
    category: '管理中心能力',
    entityLabel: '用户组织',
    description: '维护用户组织信息，支持新增、修改、删除、查询。',
    summary: '用于组织平台用户所属机构、部门和职责边界。',
    stats: standardStats('9 个组织', '8 个启用', '1 项待调整', '2 次组织变更'),
    sections: [{ title: '核心能力', items: ['新增用户组织', '修改用户组织', '删除用户组织', '查询用户组织'] }],
    timeline: ['建立组织', '分配用户归属', '维护组织层级'],
    rows: [
      { name: '平台运维中心', code: 'ORG-01', status: '已上线', owner: '组织管理员', group: '一级组织', updatedAt: '2026-03-30 08:50:00', description: '负责平台运维与调度。' },
      { name: '资源治理中心', code: 'ORG-02', status: '运行中', owner: '组织管理员', group: '一级组织', updatedAt: '2026-03-30 09:49:00', description: '负责资源目录与数据治理。' }
    ]
  }),
  CenterUserAccountManagement: buildCrudPage({
    title: '用户管理',
    category: '管理中心能力',
    entityLabel: '用户',
    description: '维护平台用户信息，支持新增、修改、删除、查询。',
    summary: '覆盖平台用户台账、角色归属与状态维护。',
    stats: standardStats('42 个用户', '37 个启用', '3 项待审核', '2 次用户调整'),
    sections: [{ title: '核心能力', items: ['新增用户', '修改用户', '删除用户', '查询用户'] }],
    timeline: ['创建用户', '配置角色组织', '维护用户状态'],
    rows: [
      { name: '平台管理员', code: 'USER-01', status: '已上线', owner: '系统管理员', group: '平台运维中心', updatedAt: '2026-03-30 08:30:00', description: '具备平台全局管理权限。' },
      { name: '资源审核员', code: 'USER-02', status: '运行中', owner: '系统管理员', group: '资源治理中心', updatedAt: '2026-03-30 09:58:00', description: '负责资源目录审核。' }
    ]
  }),
  CenterUserRoleManagement: buildCrudPage({
    title: '用户角色管理',
    category: '管理中心能力',
    entityLabel: '用户角色',
    description: '维护用户角色，支持新增、修改、删除、查询。',
    summary: '用于管理平台角色模型和角色能力边界。',
    stats: standardStats('11 个角色', '10 个启用', '1 项待调整', '2 条角色策略变更'),
    sections: [{ title: '核心能力', items: ['新增用户角色', '修改用户角色', '删除用户角色', '查询用户角色'] }],
    timeline: ['建立角色', '配置权限范围', '维护角色生命周期'],
    rows: [
      { name: '平台超级管理员', code: 'ROLE-01', status: '已上线', owner: '角色管理员', group: '管理角色', updatedAt: '2026-03-30 08:26:00', description: '具备全部平台能力。' },
      { name: '交换运营角色', code: 'ROLE-02', status: '运行中', owner: '角色管理员', group: '业务角色', updatedAt: '2026-03-30 09:54:00', description: '负责任务与发布订阅运营。' }
    ]
  }),
  CenterIpAccessManagement: buildCrudPage({
    title: 'IP黑白名单管理',
    category: '管理中心能力',
    entityLabel: 'IP名单',
    description: '维护 IP 黑白名单，支持新增、修改、删除、查询。',
    summary: '用于维护访问白名单、拦截黑名单和生效状态。',
    stats: standardStats('18 条名单', '16 条生效', '1 条待审核', '1 次名单调整'),
    sections: [{ title: '核心能力', items: ['名单新增IP', '名单修改IP', '名单删除IP', '名单查询IP'] }],
    timeline: ['录入 IP 规则', '确认名单类型', '发布并验证访问效果'],
    rows: [
      { name: '管理中心白名单', code: 'IP-01', status: '已上线', owner: '安全管理员', group: '白名单', updatedAt: '2026-03-30 08:39:00', description: '允许管理中心办公网段访问。', target: '10.12.4.0/24' },
      { name: '异常来源黑名单', code: 'IP-02', status: '运行中', owner: '安全管理员', group: '黑名单', updatedAt: '2026-03-30 10:17:00', description: '拦截异常尝试访问地址。', target: '10.12.99.18' }
    ],
    extraFields: [{ key: 'target', label: 'IP 地址' }],
    extraColumns: [{ key: 'target', label: 'IP 地址', minWidth: 160 }]
  }),
  CenterRouteManagement: buildReadPage({
    title: '路由管理',
    category: '管理中心能力',
    entityLabel: '任务路由',
    description: '提供任务路由配置能力。',
    summary: '用于查看共享交换任务在不同节点和通道间的路由策略。',
    stats: standardStats('13 条路由', '10 条已生效', '2 项待切换', '1 次切换演练'),
    sections: [{ title: '核心能力', items: ['任务路由配置'] }],
    timeline: ['查看路由策略', '评估路径优先级', '执行切换或回切'],
    rows: [
      { name: '主任务优先路由', code: 'ROUTE-01', status: '已上线', owner: '路由管理员', group: '主路由', updatedAt: '2026-03-30 09:14:00', description: '优先走政务专网主通道。' },
      { name: '容灾回退路由', code: 'ROUTE-02', status: '运行中', owner: '路由管理员', group: '备路由', updatedAt: '2026-03-30 10:10:00', description: '主通道异常时回退至备链路。' }
    ],
    extraToolbarActions: [moveAction('调整任务路由')]
  }),
  CenterSecurityManagement: buildSecurityPage(),
  CenterDataSourceManagement: buildCrudPage({
    title: '数据源管理',
    category: '管理中心能力',
    entityLabel: '数据源',
    description: '维护数据源，支持新增、编辑、删除和查看。',
    summary: '覆盖数据库、文件源和接口源等多类数据源对象。',
    stats: standardStats('23 个数据源', '19 个可用', '2 项待验证', '2 次连接变更'),
    sections: [{ title: '核心能力', items: ['新增数据源', '编辑数据源', '删除数据源', '查看数据源'] }],
    timeline: ['建立数据源', '校验连接性', '维护生命周期'],
    rows: [
      { name: '主库 PostgreSQL', code: 'DS-01', status: '已上线', owner: '数据源管理员', group: '数据库', updatedAt: '2026-03-30 09:07:00', description: '主业务库连接配置。' },
      { name: '边缘文件目录源', code: 'DS-02', status: '运行中', owner: '数据源管理员', group: '文件源', updatedAt: '2026-03-30 10:13:00', description: '边缘文件目录采集源。' }
    ],
    extraToolbarActions: [detailAction('查看数据源')]
  }),
  CenterResourceDirectory: buildResourcePage(),
  CenterFileManagement: buildFilePage()
}

export const modulePageList = Object.entries(modulePageConfigs).map(([routeName, config]) => ({
  routeName,
  ...config
}))
