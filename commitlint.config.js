/**
 * Commitlint 配置文件
 * 可扩展的自定义提交信息校验规则
 *
 * 规则说明：
 * - type: 提交类型 (feat|fix|docs|style|refactor|perf|test|chore|revert)
 * - subject: 提交描述，建议不超过50个字符
 * - body: 详细描述（可选）
 * - footer: 页脚（可选），用于关闭 issue 或注明 breaking change
 *
 * 示例：
 * feat: 添加用户登录功能
 * fix: 修复导航栏高度问题
 * docs: 更新 README 文档
 * chore: 升级依赖版本
 */

export default {
  // 自定义规则
  rules: {
    // 提交类型检查
    'type-enum': [
      2, // 2 表示 error，1 表示 warning
      'always',
      [
        'feat', // 新功能
        'fix', // bug 修复
        'docs', // 文档更新
        'style', // 代码风格（不影响功能，如格式、分号等）
        'refactor', // 代码重构（既不是新增功能也不是修复 bug）
        'perf', // 性能优化
        'test', // 测试相关
        'chore', // 构建流程、依赖管理、工具链等
        'ci', // CI/CD 相关
        'revert', // 回退之前的提交
        'build', // 构建相关
      ],
    ],

    // 提交类型必需
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],

    // 主题（描述）检查
    'subject-empty': [2, 'never'], // 主题不能为空
    'subject-full-stop': [2, 'never', '.'], // 主题末尾不要加句号
    'subject-case': [1, 'always', 'lower-case'], // 主题使用小写（warning）

    // 头部（type + subject）长度
    'header-max-length': [2, 'always', 100], // 最长 100 字符

    // Body 检查（可选）
    'body-leading-blank': [2, 'always'], // body 前面必须有空行
    'body-max-line-length': [1, 'always', 100], // body 每行最长 100 字符

    // Footer 检查（可选）
    'footer-leading-blank': [2, 'always'], // footer 前面必须有空行
    'footer-max-line-length': [1, 'always', 100], // footer 每行最长 100 字符
  },

  // 提示信息
  helpUrl: 'https://www.conventionalcommits.org/',

  // 解析器配置（可选）
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['#'],
    },
  },
}
