export type ModuleActionKey =
  | 'query'
  | 'export'
  | 'add'
  | 'edit'
  | 'delete'
  | 'detail'
  | 'online'
  | 'offline'
  | 'copy'
  | 'move'
  | 'assign'
  | 'portal'
  | 'subscribe'
  | 'unsubscribe'
  | 'apply'
  | 'cancelApply'
  | 'backHome'
  | 'groupUsers'
  | 'upload'
  | 'download'
  | 'newFolder'
  | 'editFolder'
  | 'deleteFolder'
  | 'addDirectory'
  | 'editDirectory'
  | 'deleteDirectory'
  | 'switch'

export interface ModuleActionConfig {
  key: ModuleActionKey
  label: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  plain?: boolean
}

export interface ModuleFieldOption {
  label: string
  value: string
}

export interface ModuleFieldConfig {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'select' | 'number'
  span?: number
  options?: ModuleFieldOption[]
}

export interface ModuleColumnConfig {
  key: string
  label: string
  minWidth?: number
  width?: number
  type?: 'text' | 'tag' | 'progress' | 'boolean'
}

export interface ModulePanelRow extends Record<string, string | number | boolean | string[] | undefined> {
  id: number
}

export interface ModulePanelConfig {
  key: string
  title: string
  description: string
  badge?: string
  toolbarActions: ModuleActionConfig[]
  rowActions: ModuleActionConfig[]
  fields: ModuleFieldConfig[]
  columns: ModuleColumnConfig[]
  rows: ModulePanelRow[]
}

export interface ModuleStatConfig {
  label: string
  value: string
  description: string
}

export interface ModuleSectionConfig {
  title: string
  items: string[]
}

export interface ModulePageConfig {
  title: string
  category: string
  description: string
  summary: string
  stats: ModuleStatConfig[]
  sections: ModuleSectionConfig[]
  timeline: string[]
  panels: ModulePanelConfig[]
}

const statusOptions: ModuleFieldOption[] = [
  { label: '运行中', value: '运行中' },
  { label: '已上线', value: '已上线' },
  { label: '已下线', value: '已下线' },
  { label: '健康', value: '健康' },
  { label: '告警中', value: '告警中' },
  { label: '待审核', value: '待审核' }
]

export const commonStatusOptions = statusOptions

export const createAction = (
  key: ModuleActionKey,
  label: string,
  type: ModuleActionConfig['type'] = 'primary',
  plain = false
): ModuleActionConfig => ({
  key,
  label,
  type,
  plain
})

export const createRows = <T extends Omit<ModulePanelRow, 'id'>>(rows: T[]): ModulePanelRow[] =>
  rows.map((row, index) => ({
    id: index + 1,
    ...row
  }))

export const createStandardFields = (
  entityLabel: string,
  ownerLabel = '负责人',
  extraFields: ModuleFieldConfig[] = []
): ModuleFieldConfig[] => [
  { key: 'name', label: `${entityLabel}名称` },
  { key: 'code', label: `${entityLabel}编码` },
  { key: 'status', label: '状态', type: 'select', options: commonStatusOptions },
  { key: 'owner', label: ownerLabel },
  { key: 'group', label: '所属分组' },
  { key: 'description', label: '说明', type: 'textarea', span: 24 },
  ...extraFields
]

export const createStandardColumns = (
  entityLabel: string,
  ownerLabel = '负责人',
  extraColumns: ModuleColumnConfig[] = []
): ModuleColumnConfig[] => [
  { key: 'name', label: `${entityLabel}名称`, minWidth: 180 },
  { key: 'code', label: `${entityLabel}编码`, minWidth: 160 },
  { key: 'status', label: '状态', width: 120, type: 'tag' },
  { key: 'owner', label: ownerLabel, minWidth: 140 },
  { key: 'group', label: '所属分组', minWidth: 140 },
  { key: 'updatedAt', label: '更新时间', minWidth: 170 },
  ...extraColumns
]

export const createLogFields = (): ModuleFieldConfig[] => [
  { key: 'name', label: '日志标题' },
  { key: 'status', label: '结果', type: 'select', options: commonStatusOptions },
  { key: 'owner', label: '操作人' },
  { key: 'group', label: '来源模块' },
  { key: 'description', label: '详情', type: 'textarea', span: 24 }
]

export const createLogColumns = (): ModuleColumnConfig[] => [
  { key: 'name', label: '日志标题', minWidth: 220 },
  { key: 'status', label: '结果', width: 120, type: 'tag' },
  { key: 'owner', label: '操作人', minWidth: 120 },
  { key: 'group', label: '来源模块', minWidth: 140 },
  { key: 'updatedAt', label: '发生时间', minWidth: 170 }
]
