<template>
  <div class="flex flex-col gap-5 pb-5">
    <ElCard>
      <template #header>
        <div class="flex-cb gap-3 flex-wrap">
          <div>
            <h3 class="m-0 text-base">字段映射配置</h3>
            <p class="m-0 mt-1 text-sm text-g-500">维护源字段、目标字段、转换规则与校验策略。</p>
          </div>
          <ElSpace wrap>
            <ElButton type="primary">新增映射</ElButton>
            <ElButton>导入映射</ElButton>
            <ElButton type="success" plain>保存配置</ElButton>
          </ElSpace>
        </div>
      </template>

      <ElTable :data="mappingList" border>
        <ElTableColumn prop="sourceField" label="源字段" min-width="180" />
        <ElTableColumn prop="targetField" label="目标字段" min-width="180" />
        <ElTableColumn prop="rule" label="转换规则" min-width="180" />
        <ElTableColumn prop="validate" label="校验规则" min-width="180" />
        <ElTableColumn prop="required" label="是否必填" width="100" />
        <ElTableColumn prop="remark" label="说明" min-width="220" />
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'FieldMappingConfig' })

  const mappingList = ref([
    {
      sourceField: 'src_person_name',
      targetField: 'personName',
      rule: 'trim + uppercaseFirst',
      validate: '长度 2-32，中文字符',
      required: '是',
      remark: '用于基础人员信息映射'
    },
    {
      sourceField: 'src_certificate_no',
      targetField: 'certificateNo',
      rule: 'removeSpace',
      validate: '身份证/警官证格式',
      required: '是',
      remark: '作为唯一标识字段'
    },
    {
      sourceField: 'src_region_code',
      targetField: 'regionCode',
      rule: 'dictionaryTransform',
      validate: '行政区划编码',
      required: '否',
      remark: '映射地区标准编码'
    }
  ])
</script>
