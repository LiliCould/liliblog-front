<script setup>
import { Content, Icon, Layout, Menu, MenuItem, Sider } from 'view-ui-plus'
import { computed, ref } from 'vue'
import LiliHeader from '@/components/LiliHeader.vue'

const isCollapsed = ref(false)

const menuitemClasses = computed(() => ['menu-item', isCollapsed.value ? 'collapsed-menu' : ''])

</script>

<template>
  <div class="layout">
    <Layout>
<!--      <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">-->
<!--        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">-->
<!--          <MenuItem name="1-1">-->
<!--            <Icon type="ios-navigate"></Icon>-->
<!--            <span>Option 1</span>-->
<!--          </MenuItem>-->
<!--          <MenuItem name="1-2">-->
<!--            <Icon type="ios-search"></Icon>-->
<!--            <span>Option 2</span>-->
<!--          </MenuItem>-->
<!--          <MenuItem name="1-3">-->
<!--            <Icon type="ios-settings"></Icon>-->
<!--            <span>Option 3</span>-->
<!--          </MenuItem>-->
<!--        </Menu>-->
<!--        <template #trigger></template>-->
<!--      </Sider>-->
      <Layout>
        <lili-header />
        <Content :style="{ margin: '20px', background: '#fff', minHeight: '220px' }">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition:
    font-size 0.2s ease,
    transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition:
    font-size 0.2s ease 0.2s,
    transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.dev-run-preview .dev-run-preview-edit {
  display: none;
}
</style>
