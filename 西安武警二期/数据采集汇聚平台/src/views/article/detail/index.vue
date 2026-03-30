<template>
  <div class="flex flex-col gap-4 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3">
          <div>
            <h3 class="m-0 text-base font-medium">{{ pageConfig.title }}</h3>
            <p class="m-0 mt-1 text-sm text-g-700">{{ pageConfig.description }}</p>
          </div>
          <ElTag :type="pageConfig.tagType">{{ pageConfig.tagText }}</ElTag>
        </div>
      </template>

      <ElDescriptions :column="2" border>
        <ElDescriptionsItem v-for="item in pageConfig.summary" :key="item.label" :label="item.label">
          {{ item.value }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>

    <ElRow :gutter="20">
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">{{ pageConfig.leftTitle }}</span></template>
          <ElDescriptions :column="1" border>
            <ElDescriptionsItem v-for="item in pageConfig.leftItems" :key="item.label" :label="item.label">
              {{ item.value }}
            </ElDescriptionsItem>
          </ElDescriptions>
        </ElCard>
      </ElCol>
      <ElCol :xs="24" :lg="12">
        <ElCard>
          <template #header><span class="font-medium">{{ pageConfig.rightTitle }}</span></template>
          <ElTimeline>
            <ElTimelineItem v-for="item in pageConfig.timeline" :key="`${item.timestamp}-${item.content}`" :timestamp="item.timestamp" :type="item.type">
              {{ item.content }}
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  defineOptions({ name: 'ArticleDetailBusinessPage' })

  type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
  type TimelineType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

  interface DescriptionItem {
    label: string
    value: string
  }

  interface TimelineItem {
    timestamp: string
    content: string
    type: TimelineType
  }

  interface DetailPageConfig {
    title: string
    description: string
    tagText: string
    tagType: TagType
    leftTitle: string
    rightTitle: string
    summary: DescriptionItem[]
    leftItems: DescriptionItem[]
    timeline: TimelineItem[]
  }

  const route = useRoute()

  const pageConfig = computed<DetailPageConfig>(() => {
    if (route.name === 'DataStandardizationManage') {
      return {
        title: '标准化处理',
        description: '展示标准化规则、字段映射、转换策略与最近执行记录。',
        tagText: '标准化任务',
        tagType: 'success',
        leftTitle: '标准化配置',
        rightTitle: '最近执行记录',
        summary: [
          { label: '处理名称', value: '目标画像标准化' },
          { label: '规则编号', value: 'STD-20260330-03' },
          { label: '输入来源', value: '关系型数据库表输入' },
          { label: '当前状态', value: '启用' },
          { label: '标准字段数', value: '28 项' },
          { label: '最近处理量', value: '8,420 条' },
          { label: '异常映射', value: '2 项' },
          { label: '更新时间', value: '2026-03-30 15:48:00' }
        ],
        leftItems: [
          { label: '字段映射', value: '姓名 -> name，证件号 -> cert_no，采集时间 -> collect_time' },
          { label: '清洗策略', value: '去重、空值剔除、时间格式统一、地区编码标准化' },
          { label: '输出表', value: 'ods_person_profile_std' },
          { label: '调度方式', value: '每 10 分钟执行一次' }
        ],
        timeline: [
          { timestamp: '16:20', content: '完成本轮标准化处理，入库 2,146 条', type: 'success' },
          { timestamp: '16:05', content: '发现 2 条地区编码缺失，已进入补录队列', type: 'warning' },
          { timestamp: '15:50', content: '字段映射规则已更新并重新生效', type: 'primary' }
        ]
      }
    }

    if (route.name === 'AlarmRuleManage') {
      return {
        title: '告警规则管理',
        description: '查看告警规则定义、触发条件、通知动作与规则变更记录。',
        tagText: '规则已启用',
        tagType: 'danger',
        leftTitle: '规则条件',
        rightTitle: '规则变更记录',
        summary: [
          { label: '规则名称', value: '设备心跳超时告警' },
          { label: '规则编号', value: 'ALARM-RULE-01' },
          { label: '监控对象', value: '边境雷达设备组' },
          { label: '触发级别', value: '严重' },
          { label: '触发条件', value: '30 秒未收到设备心跳' },
          { label: '通知方式', value: '站内信、短信' },
          { label: '最近触发', value: '2026-03-30 14:20:00' },
          { label: '当前状态', value: '启用' }
        ],
        leftItems: [
          { label: '关联告警组', value: '边境设备值守组' },
          { label: '抑制时长', value: '5 分钟' },
          { label: '升级策略', value: '连续触发 3 次后升级为平台级告警' },
          { label: '恢复条件', value: '连续 2 个心跳周期恢复正常后自动关闭' }
        ],
        timeline: [
          { timestamp: '2026-03-30 15:10', content: '通知动作由站内信扩展为站内信 + 短信', type: 'primary' },
          { timestamp: '2026-03-29 11:30', content: '触发阈值从 60 秒调整为 30 秒', type: 'warning' },
          { timestamp: '2026-03-28 09:00', content: '规则创建并首次发布', type: 'success' }
        ]
      }
    }

    return {
      title: '设备详情查看',
      description: '展示设备基础信息、连接参数、运行状态与最近告警记录。',
      tagText: '设备详情',
      tagType: 'primary',
      leftTitle: '连接参数',
      rightTitle: '最近告警记录',
      summary: [
        { label: '设备名称', value: '边境雷达一号' },
        { label: '设备编号', value: 'DEV-20260330-01' },
        { label: '设备IP', value: '10.1.1.21' },
        { label: '连接协议', value: 'MQTT' },
        { label: '所属分组', value: '一线雷达设备组' },
        { label: '当前状态', value: '在线' },
        { label: '最近心跳', value: '2026-03-30 16:28:10' },
        { label: '最近上报量', value: '12,480 条' }
      ],
      leftItems: [
        { label: '接入地址', value: 'mqtt://10.1.1.2:1883/device/radar/01' },
        { label: '认证方式', value: 'Token 鉴权' },
        { label: '采集频率', value: '5 秒/次' },
        { label: '超时阈值', value: '30 秒' }
      ],
      timeline: [
        { timestamp: '16:10', content: '设备连接恢复', type: 'success' },
        { timestamp: '15:45', content: '采集延迟波动', type: 'warning' },
        { timestamp: '14:20', content: '短时心跳丢失', type: 'danger' }
      ]
    }
  })
</script>
