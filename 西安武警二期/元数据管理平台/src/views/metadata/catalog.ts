export interface MetadataSection {
  key: string
  title: string
  description: string
  capabilities: string[]
}

export interface MetadataModule {
  key: string
  title: string
  path: string
  icon: string
  description: string
  sections: MetadataSection[]
}

export interface SuggestedAction {
  code: string
  label: string
}

export const metadataCatalog: MetadataModule[] = [
  {
    key: 'metadata-definition',
    title: '元数据定义',
    path: 'definition',
    icon: 'ri:file-list-3-line',
    description: '负责元模板、元数据项和关联映射的定义、编辑与管理。',
    sections: [
      {
        key: 'template-management',
        title: '元模板管理',
        description: '围绕模板与目录进行全生命周期管理，并支持订阅与稽核结果查看。',
        capabilities: [
          '模版创建',
          '模版编辑',
          '模版删除',
          '模版查询',
          '模版导入',
          '模版导出',
          '添加订阅',
          '删除订阅',
          '稽核结果',
          '新增模版目录',
          '修改模版目录',
          '删除模版目录',
          '查询模版目录'
        ]
      },
      {
        key: 'metadata-item-edit',
        title: '元数据定义与编辑',
        description: '维护元数据项基础内容，支持创建、修改与删除。',
        capabilities: ['元数据项创建', '元数据项修改', '元数据项删除']
      },
      {
        key: 'metadata-mapping',
        title: '元数据关联映射',
        description: '用于配置和维护不同元数据之间的关联映射关系。',
        capabilities: ['配置元数据关联映射', '维护元数据关联映射']
      }
    ]
  },
  {
    key: 'metadata-registration',
    title: '元数据注册登记',
    path: 'registration',
    icon: 'ri:registered-line',
    description: '提供元数据注册、查询、更新维护的登记能力。',
    sections: [
      {
        key: 'metadata-register',
        title: '元数据注册',
        description: '支持元数据手工录入与批量导入。',
        capabilities: ['元数据录入', '元数据导入']
      },
      {
        key: 'metadata-query',
        title: '元数据查询',
        description: '支持元数据检索与结果导出。',
        capabilities: ['数据查询', '数据导出']
      },
      {
        key: 'metadata-maintain',
        title: '元数据更新维护',
        description: '支持元数据修改、删除和版本定版。',
        capabilities: ['元数据修改', '元数据删除', '元数据版本定版']
      }
    ]
  },
  {
    key: 'metadata-collection',
    title: '元数据采集',
    path: 'collection',
    icon: 'ri:inbox-archive-line',
    description: '覆盖自动化采集、接口采集、模版采集和任务管理。',
    sections: [
      {
        key: 'auto-collection',
        title: '自动化内生采集',
        description: '提供采集概览、采集管理、同步管理及目录管理能力。',
        capabilities: [
          '采集数据概览',
          '数据采集管理新增',
          '数据采集管理修改',
          '数据采集管理删除',
          '数据同步管理',
          '新增自动化采集目录',
          '修改自动化采集目录',
          '删除自动化采集目录',
          '查询自动化采集目录'
        ]
      },
      {
        key: 'standard-interface-collection',
        title: '标准化接口采集',
        description: '支持 API 查询接口采集和流式消息接口采集。',
        capabilities: ['API 查询接口采集', '流式消息接口采集']
      },
      {
        key: 'standard-template-collection',
        title: '标准模版采集',
        description: '管理采集工作、映射、预览与更新记录。',
        capabilities: ['采集工作列表', '采集数据映射', '数据预览', '更新记录']
      },
      {
        key: 'collection-task-management',
        title: '采集任务管理',
        description: '涵盖任务检索、创建、同步、统计、调度与异常处理。',
        capabilities: ['任务检索', '任务创建', '同步配置', '任务统计', '采集记录', '任务调度', '异常任务']
      }
    ]
  },
  {
    key: 'metadata-governance',
    title: '元数据管理',
    path: 'governance',
    icon: 'ri:database-2-line',
    description: '负责标准、探查、基础、图管理及前台应用管理。',
    sections: [
      {
        key: 'metadata-standard',
        title: '元数据标准管理',
        description: '用于元数据标准的创建、配置、分类、导入导出。',
        capabilities: ['元数据标准新建', '元数据标准配置', '元数据标准删除', '元数据标准分类', '元数据标准导入', '元数据标准导出']
      },
      {
        key: 'metadata-exploration',
        title: '元数据探查',
        description: '支持基础探查与高级搜索。',
        capabilities: ['元数据探查', '元数据高级搜索']
      },
      {
        key: 'metadata-base-management',
        title: '元数据基础管理',
        description: '覆盖平台、业务域、业务分类、标签与基础目录管理。',
        capabilities: [
          '新建平台',
          '配置平台',
          '删除平台',
          '新建业务域',
          '修改业务域',
          '删除业务域',
          '新建业务分类',
          '编辑业务分类',
          '删除业务分类',
          '新建标签',
          '编辑标签',
          '删除标签',
          '新增基础管理目录',
          '修改基础管理目录',
          '删除基础管理目录',
          '查询基础管理目录'
        ]
      },
      {
        key: 'metadata-graph-management',
        title: '元数据图管理',
        description: '用于图本体构建及图样式管理。',
        capabilities: ['图本体构建', '图样式管理']
      },
      {
        key: 'frontend-app-management',
        title: '前台应用管理',
        description: '支持数据链路回溯管理和数据影响分析管理。',
        capabilities: ['数据链路回溯管理', '数据影响分析管理']
      }
    ]
  },
  {
    key: 'metadata-ontology',
    title: '元数据本体构建',
    path: 'ontology',
    icon: 'ri:git-merge-line',
    description: '提供图模型设计、图谱实体构建和图谱边构建能力。',
    sections: [
      {
        key: 'graph-model-design',
        title: '元数据图模型设计',
        description: '支持自定义实体模型与实体关系定义。',
        capabilities: ['自定义实体模型', '实体关系定义']
      },
      {
        key: 'graph-entity-build',
        title: '元数据图谱实体构建',
        description: '覆盖实体构建、目录管理、模型导入导出、转换检查与 DDL 脚本生成。',
        capabilities: [
          '图谱实体构建',
          '新增图谱实体目录',
          '修改图谱实体目录',
          '删除图谱实体目录',
          '查询图谱实体目录',
          '导入模型',
          '下载导入模板',
          '模型转换',
          '模型比较',
          '模型检查',
          '生成DDL脚本'
        ]
      },
      {
        key: 'graph-edge-build',
        title: '元数据图谱边构建',
        description: '支持图谱边构建以及目录新增删除。',
        capabilities: ['图谱边构建', '新增图谱边目录', '删除图谱边目录']
      }
    ]
  },
  {
    key: 'metadata-quality-analysis',
    title: '元数据资源质量分析',
    path: 'quality',
    icon: 'ri:line-chart-line',
    description: '围绕规则、任务与数据表开展元数据质量分析。',
    sections: [
      {
        key: 'quality-overview',
        title: '元数据质量概览',
        description: '展示规则类型、任务状态更新和失效任务情况。',
        capabilities: ['数据核验规则类型', '核验任务状态更新', '失效核验任务']
      },
      {
        key: 'rule-template',
        title: '规则模板',
        description: '提供模板列表与模板详情。',
        capabilities: ['模版列表', '模版详情']
      },
      {
        key: 'rule-management',
        title: '规则管理',
        description: '提供规则列表与规则详情。',
        capabilities: ['规则列表', '规则详情']
      },
      {
        key: 'verification-task',
        title: '核验任务',
        description: '提供任务列表与任务详情。',
        capabilities: ['任务列表', '任务详情']
      },
      {
        key: 'validation-data-table',
        title: '检验数据表',
        description: '支持数据表检索与详情查看。',
        capabilities: ['数据表检索', '数据表详情']
      }
    ]
  },
  {
    key: 'metadata-application',
    title: '元数据应用',
    path: 'application',
    icon: 'ri:apps-2-line',
    description: '提供基础应用与智能应用能力。',
    sections: [
      {
        key: 'metadata-basic-application',
        title: '元数据基础应用',
        description: '用于档案、资源目录和图谱分析。',
        capabilities: ['元数据档案', '元数据资源目录创建', '元数据资源目录编辑', '元数据资源目录删除', '元数据资源目录查询', '元数据图谱分析']
      },
      {
        key: 'metadata-smart-application',
        title: '元数据智能应用',
        description: '支持数据链路回溯与数据影响分析。',
        capabilities: ['数据链路回溯', '数据影响分析']
      }
    ]
  },
  {
    key: 'metadata-service',
    title: '元数据服务',
    path: 'service',
    icon: 'ri:service-line',
    description: '提供接口、搜索与信息服务。',
    sections: [
      {
        key: 'metadata-api-service',
        title: '元数据接口服务',
        description: '支持接口服务、表资源服务、文件资源服务新增。',
        capabilities: ['元数据接口服务新增', '元数据表资源服务新增', '元数据文件资源服务新增']
      },
      {
        key: 'metadata-search-service',
        title: '元数据搜索服务',
        description: '支持分类检索与结果展示。',
        capabilities: ['分类检索', '结果展示']
      },
      {
        key: 'metadata-info-service',
        title: '元数据信息服务',
        description: '提供服务信息配置与服务调度配置。',
        capabilities: ['服务信息配置', '服务调度配置']
      }
    ]
  }
]

const sectionContextMap = metadataCatalog.reduce<
  Record<string, { module: MetadataModule; section: MetadataSection }>
>((acc, module) => {
  module.sections.forEach((section) => {
    acc[section.key] = { module, section }
  })
  return acc
}, {})

export const metadataStatistics = (() => {
  const moduleCount = metadataCatalog.length
  const sectionCount = metadataCatalog.reduce((sum, module) => sum + module.sections.length, 0)
  const capabilityCount = metadataCatalog.reduce(
    (sum, module) => sum + module.sections.reduce((inner, section) => inner + section.capabilities.length, 0),
    0
  )

  return {
    moduleCount,
    sectionCount,
    capabilityCount
  }
})()

const actionLexicon: SuggestedAction[] = [
  { code: 'create', label: '新建/创建' },
  { code: 'edit', label: '编辑/修改' },
  { code: 'delete', label: '删除' },
  { code: 'query', label: '查询/检索' },
  { code: 'import', label: '导入' },
  { code: 'export', label: '导出/下载' },
  { code: 'config', label: '配置/映射' },
  { code: 'schedule', label: '调度/同步' },
  { code: 'analysis', label: '分析/比较/检查' },
  { code: 'detail', label: '列表/详情/展示' }
]

const actionKeywordMap: Record<string, string[]> = {
  create: ['新增', '新建', '创建', '录入', '构建'],
  edit: ['编辑', '修改', '维护', '更新'],
  delete: ['删除'],
  query: ['查询', '检索', '搜索', '探查'],
  import: ['导入'],
  export: ['导出', '下载'],
  config: ['配置', '映射', '定义', '分类', '定版'],
  schedule: ['调度', '同步'],
  analysis: ['分析', '比较', '检查', '核验', '回溯'],
  detail: ['列表', '详情', '展示', '记录', '概览']
}

export function getSectionContext(sectionKey: string) {
  return sectionContextMap[sectionKey]
}

export function getSuggestedActions(capabilities: string[]): SuggestedAction[] {
  const matchedActions = new Set<string>()

  capabilities.forEach((capability) => {
    Object.entries(actionKeywordMap).forEach(([code, keywords]) => {
      if (keywords.some((keyword) => capability.includes(keyword))) {
        matchedActions.add(code)
      }
    })
  })

  return actionLexicon.filter((action) => matchedActions.has(action.code))
}

export function getAllSections() {
  return metadataCatalog.flatMap((module) =>
    module.sections.map((section) => ({
      moduleKey: module.key,
      moduleTitle: module.title,
      modulePath: module.path,
      section
    }))
  )
}
