/* Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License. */

import { useConfigStore } from "@/store/config"
import { RouterLink } from "vue-router"
import type { NavBar } from "@/store/config/type"

export default defineComponent({
  name: 'MenuBar',
  setup() {
    const { t } = useLocaleHooks()
    const configStore = useConfigStore()

    const renderLabel = (label: string, link: string) => {
      return h(
        RouterLink,
        {
          to: {name: link}
        },
        { default: () => label }
      )
    }

    const menuOptions = computed(() => ([
      {
        label: () => renderLabel(t('layout.playground'), 'playground'),
        key: 'playground',
      },
      {
        label: () => renderLabel(t('layout.metadata'), 'metadata'),
        key: 'metadata',
      },
      {
        label: () => renderLabel(t('layout.cdc_ingestion'), 'cdc_ingestion'),
        key: 'cdc_ingestion',
      },
      {
        label: () => renderLabel(t('layout.system'), 'system'),
        key: 'system',
      },
    ]))

    const activeKey = ref<string>('playground')

    const handleUpdateValue = (value: string) => {
      activeKey.value = value
      configStore.setCurrentNavActive(value as NavBar)
    }

    onMounted(() => {
      activeKey.value = configStore.getCurrentNavActive
    })

    return {
      activeKey,
      menuOptions,
      handleUpdateValue
    }
  },
  render () {
    return (
      <n-menu 
        v-model:value={this.activeKey}
        mode="horizontal"
        options={this.menuOptions}
        on-update:value={this.handleUpdateValue}
      />
    )
  }
})
