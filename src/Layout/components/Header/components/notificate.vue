<script setup lang="ts">
import NotificationContainer from './notification/index.vue'
import NotificationList from './notification/notification-list.vue'

const List = [
  {
    title: '通知',
    content: [
      {
        avatar: 'https://pica.zhimg.com/v2-a56b64418526d7c0c8f4ce46c25b06fe_1440w.jpg',
        title: '系统升级提醒',
        desc: '今晚 23:00-24:00 进行服务升级，期间可能短暂不可用。',
        time: '2023-10-01 10:00',
        tag: '重要',
        tagType: 'warning'
      },
      {
        avatar: 'https://pic2.zhimg.com/v2-9b47dec7b5251759eeb5257cfbb6d3e7_r.jpg',
        title: '安全提醒',
        desc: '检测到异常登录尝试，请及时检查账号安全设置。',
        time: '2023-10-02 11:00',
        tag: '紧急',
        tagType: 'danger'
      },
      {
        title: '新功能发布',
        desc: '数据大屏支持自定义主题与配色方案。',
        time: '2023-10-03 12:00',
        tag: '更新',
        tagType: 'success'
      },
      {
        avatar: 'https://pic1.zhimg.com/v2-9e716daacd3f1ed9987c6d2ae0e47e4a_1440w.jpg',
        title: '维护完成',
        desc: '日志服务已完成维护，性能恢复正常。',
        time: '2023-10-04 13:00',
        tag: '完成',
        tagType: 'info'
      },
      {
        title: '访问提醒',
        desc: '近期访问量提升，建议关注资源使用情况。',
        time: '2023-10-05 14:00'
      }
    ]
  },
  {
    title: '关注',
    content: [
      {
        avatar: 'https://pic2.zhimg.com/v2-2ee2b5efbffc1162c208c2685aabb4fb_r.jpg',
        title: '项目进度',
        desc: '「渠道投放」需求已进入联调阶段。',
        time: '2023-10-01 10:00',
        tag: '进度',
        tagType: 'info'
      },
      {
        avatar: 'https://pic4.zhimg.com/v2-2501a93fe6acebfc81f8c1c825df2367_r.jpg',
        title: '设计规范更新',
        desc: '组件库新增按钮样式与状态指引。',
        time: '2023-10-02 11:00',
        tag: '更新',
        tagType: 'success'
      },
      {
        title: '工单处理',
        desc: '编号 #4821 已指派给你，请尽快跟进。',
        time: '2023-10-03 12:00',
        tag: '待处理',
        tagType: 'warning'
      },
      {
        avatar: 'https://pic1.zhimg.com/v2-83d4420602c69b2611103f50037b537a_1440w.jpg',
        title: '日报提醒',
        desc: '今日日报未提交，请在 18:00 前完成。',
        time: '2023-10-04 13:00',
        tag: '提醒',
        tagType: 'warning'
      },
      {
        title: '伙伴回复',
        desc: '供应商已反馈报价详情，点击查看。',
        time: '2023-10-05 14:00'
      }
    ]
  },
  {
    title: '代办',
    content: [
      {
        avatar: 'https://pica.zhimg.com/v2-1218ebd63cbebccabf7a982446b30f6a_r.jpg',
        title: '审批待处理',
        desc: '「用户权限申请」等待你的审核。',
        time: '2023-10-01 10:00',
        tag: '待审',
        tagType: 'warning'
      },
      {
        avatar: 'https://pic4.zhimg.com/v2-57c2595305c41b944e470db795d000a5_1440w.jpg',
        title: '版本回归确认',
        desc: '请完成 v2.6.0 回归验收。',
        time: '2023-10-02 11:00',
        tag: '重要',
        tagType: 'danger'
      },
      {
        title: '客户回访',
        desc: '联系客户确认上线效果与问题反馈。',
        time: '2023-10-03 12:00',
        tag: '待办',
        tagType: 'info'
      },
      {
        avatar: 'https://pic1.zhimg.com/v2-5f78f05e8753f2771da04f4068f64adc_1440w.jpg',
        title: '数据检查',
        desc: '检查昨日统计口径是否一致。',
        time: '2023-10-04 13:00',
        tag: '核对',
        tagType: 'info'
      },
      {
        title: '资料补全',
        desc: '完善项目交付文档中的依赖说明。',
        time: '2023-10-05 14:00'
      }
    ]
  }
]

const actions = [
  {
    text: '清空已读',
    icon: 'trash-2'
  },
  {
    text: '查看全部',
    icon: 'ellipsis'
  }
]
</script>

<template>
  <NotificationContainer is-dot>
    <NotificationList :list="List as any" :actions="actions" />
  </NotificationContainer>
</template>

<style scoped></style>
