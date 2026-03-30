export interface ModuleActionConfig {
  key: string
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
  type?: 'text' | 'tag' | 'progress'
}

export interface ModulePanelRow extends Record<string, string | number | boolean | string[] | undefined> {
  id: number
}

export interface ModulePanelConfig {
  key: string
  title: string
  description: string
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
  { label: '异常', value: '异常' },
  { label: '待处理', value: '待处理' }
]

export const commonStatusOptions = statusOptions

export const createAction = (
  key: string,
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
  { key: 'name', label: `${entityLabel}名称`, minWidth: 200 },
  { key: 'code', label: `${entityLabel}编码`, minWidth: 160 },
  { key: 'status', label: '状态', width: 120, type: 'tag' },
  { key: 'owner', label: ownerLabel, minWidth: 140 },
  { key: 'group', label: '所属分组', minWidth: 140 },
  { key: 'updatedAt', label: '更新时间', minWidth: 170 },
  ...extraColumns
]
