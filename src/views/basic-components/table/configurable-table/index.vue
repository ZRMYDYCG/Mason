<!--
   * 配置型表格, 基于 MasonTable 组件实现, 作为一个基础使用示例
-->
<script setup lang="ts">
import { ref, resolveComponent, h, onMounted } from 'vue'
import MasonSearchFormFilter from '@/components/SearchFormFilter/index.vue'
import MasonSearchFormFilterItem from '@/components/SearchFormFilter/components/search-form-filter-item.vue'
import MasonTable from '@/components/Table/index.vue'

const masonSearchFormFilterRef: any = ref(null)
const masonTableRef: any = ref(null)
const searchFormFilter = ref({
  title: '',
  author: '',
  dynasty: '',
  publishStatus: ''
})
const tableData = ref([])
const loadding = ref(false)

const mockData = [
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  },
  {
    title: '诗经',
    cover: 'https://picx.zhimg.com/v2-7bb915ba804de47f1b8f3a5770287515_1440w.jpg',
    author: '无名氏',
    dynasty: '周',
    publishStatus: '已出版',
    createTime: '2023-01-01'
  },
  {
    title: '离骚',
    cover: 'https://pic1.zhimg.com/v2-c90894747cc7ab35a83469a653b61e48_1440w.jpg',
    author: '屈原',
    dynasty: '战国',
    publishStatus: '已出版',
    createTime: '2023-01-02'
  }
]

const mockGetDataList = (searchParams: any, currentPage: number, pageSize: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = mockData.filter((item) => {
        return (
          (!searchParams.title || item.title.includes(searchParams.title)) &&
          (!searchParams.author || item.author.includes(searchParams.author)) &&
          (!searchParams.dynasty || item.dynasty.includes(searchParams.dynasty)) &&
          (!searchParams.publishStatus || item.publishStatus.includes(searchParams.publishStatus))
        )
      })

      // 分页
      const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      // 构建返回结果
      const result = {
        data: paginatedData,
        total: filteredData.length
      }

      resolve(result)
    }, 1000) // 1秒延迟模拟网络请求
  })
}

// 列表列配置
const columns = [
  {
    label: '序号',
    prop: '$index',
    width: 80
  },
  {
    label: '标题',
    prop: 'title'
  },
  {
    label: '封面',
    prop: 'cover',
    dataFormatConf: {
      renderType: 'html',
      withScopeRow: true,
      formatFunction: ({ value }) => {
        const ElImage = resolveComponent('ElImage')
        return h(ElImage, {
          src: value,
          fit: 'cover',
          'preview-src-list': [value],
          'preview-teleported': true,
          'hide-on-click-modal': true,
          class: 'cover',
          style: {
            width: '30px',
            height: '30px'
          }
        })
      }
    },
    minWidth: 60
  },
  {
    label: '作者',
    prop: 'author'
  },
  {
    label: '时期',
    prop: 'dynasty'
  },
  {
    label: '状态',
    prop: 'publishStatus',
    dataFormatConf: {
      withScopeRow: true,
      formatFunction: ({ value }) => {
        return `${value}`
      }
    }
  },
  {
    label: '创建日期',
    prop: 'createTime'
  },
  {
    label: '操作',
    prop: 'TABLE_COLUMN_OPTS',
    fixed: 'right',
    width: 200,
    overflowTooltip: false
  }
]
// 分页配置
const pagination = ref({
  layout: 'total, prev, pager, next, sizes, jumper',
  // 数据总条数
  total: 0,
  isShow: true
})

const getDataList = async () => {
  loadding.value = true
  const currentPage = masonTableRef.value?.currentPage || 1
  const pageSize = masonTableRef.value?.pageSize || 10

  try {
    const result = await mockGetDataList(searchFormFilter.value, currentPage, pageSize)
    tableData.value = result.data
    pagination.value.total = result.total
  } catch (error) {
    console.error('获取数据失败', error)
  } finally {
    loadding.value = false
  }
}

// 搜索
const handleSearch = async () => {
  masonTableRef.value.currentPage = 1
  await getDataList()
}

// 页码变化
const handlePageChange = async () => {
  console.log('handlePageChange')
  await getDataList()
}

// 每页条数选项变化
const handleSizeChange = async () => {
  await getDataList()
}

// 重置搜索表单
const handleReset = async () => {
  // 重置表单搜索条件
  masonTableRef.value.currentPage = 1
  masonSearchFormFilterRef.value.$refs.searchFormFilterRef.resetFields()
  await handleSearch()
}

const handleShowDetail = (row: any) => {
  console.log('查看详情', row)
}

onMounted(async () => {
  await getDataList()
})
</script>

<template>
  <div class="configurable-table">
    <el-card style="margin-bottom: 20px">
      <MasonSearchFormFilter
        ref="masonSearchFormFilterRef"
        :model="searchFormFilter"
        :label-width="80"
        :search-handle="handleSearch"
        :loading="loadding"
        :reset-handle="handleReset"
      >
        <template #default="{ isFoldFormFilter }">
          <MasonSearchFormFilterItem>
            <el-form-item label="标题:" prop="title">
              <el-input
                v-model.trim="searchFormFilter.title"
                clearable
                placeholder="请输入标题"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>
          <MasonSearchFormFilterItem>
            <el-form-item label="作者名称:" prop="author">
              <el-input
                v-model.trim="searchFormFilter.author"
                clearable
                placeholder="请输入作者"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>
          <MasonSearchFormFilterItem>
            <el-form-item label="时期:" prop="dynasty">
              <el-input
                v-model.trim="searchFormFilter.dynasty"
                clearable
                placeholder="请输入时期"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>
          <MasonSearchFormFilterItem v-show="!isFoldFormFilter">
            <el-form-item label="状态:" prop="publishStatus">
              <el-input
                v-model.trim="searchFormFilter.publishStatus"
                clearable
                placeholder="请输入状态"
                @clear="handleSearch"
              />
            </el-form-item>
          </MasonSearchFormFilterItem>
        </template>
      </MasonSearchFormFilter>
    </el-card>
    <el-card shadow="never" class="border-0">
      <el-row class="mb-2">
        <el-col>
          <el-button type="primary">
            <i class="iconfont icon-jiahao mr-1 text-sm" />
            新增
          </el-button>
        </el-col>
      </el-row>
      <MasonTable
        ref="masonTableRef"
        v-loading="loadding"
        :data="tableData"
        :columns="columns"
        stripe
        border
        :show-overflow-tooltip="true"
        :pagination="pagination as any"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      >
        <template #otherOperate="{ row }">
          <el-button type="primary" text size="small" @click="handleShowDetail(row)"
            >详情
          </el-button>
          <el-button type="primary" text size="small">编辑</el-button>
          <el-button type="primary" text size="small">删除</el-button>
        </template>
      </MasonTable>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
