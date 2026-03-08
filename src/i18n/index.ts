import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      app: {
        title: 'Skills Manager',
        version: 'v1.0.0',
        terminal: 'npx skills --help',
      },
      nav: {
        list: 'List Skills',
        rankings: 'Rankings',
        add: 'Add Skills',
        find: 'Find Skills',
        check: 'Check Updates',
        update: 'Update All',
        init: 'Create Skill',
        remove: 'Remove Skills',
      },
      pages: {
        list: {
          title: 'Installed Skills',
          description: 'View all installed skills in your project and global scope',
          empty: 'No skills installed yet.',
        },
        add: {
          title: 'Add Skills',
          description: 'Install skills from GitHub, npm, or local path',
          sourceLabel: 'Skill Source',
          sourcePlaceholder: 'e.g., vercel-labs/agent-skills, https://github.com/..., ./my-local-skills',
          agentsLabel: 'Target Agents',
          globalLabel: 'Install globally (-g)',
          commandPreview: 'Command Preview:',
          installBtn: 'Install Skills',
          installing: 'Installing...',
        },
        find: {
          title: 'Find Skills',
          description: 'Search for skills from the registry',
          searchPlaceholder: 'Search skills (e.g., typescript, frontend, api...)',
          searchBtn: 'Search',
          leaveEmpty: 'Leave empty for interactive search',
        },
        check: {
          title: 'Check for Updates',
          description: 'Check if any installed skills have updates available',
          info: 'This will check all installed skills against their remote repositories for newer versions.',
          checkBtn: 'Check for Updates',
          checking: 'Checking...',
        },
        update: {
          title: 'Update Skills',
          description: 'Update all installed skills to their latest versions',
          info: 'This will update all installed skills to the latest available versions.',
          updateBtn: 'Update All Skills',
          updating: 'Updating...',
        },
        init: {
          title: 'Create New Skill',
          description: 'Create a new SKILL.md template',
          nameLabel: 'Skill Name (optional)',
          namePlaceholder: 'my-awesome-skill',
          createBtn: 'Create SKILL.md',
          creating: 'Creating...',
        },
        remove: {
          title: 'Remove Skills',
          description: 'Remove installed skills from agents',
          skillsLabel: 'Skills to Remove',
          nameLabel: 'Or enter skill name',
          namePlaceholder: 'skill-name',
          globalLabel: 'Remove from global (-g)',
          removeBtn: 'Remove Skills',
          removing: 'Removing...',
        },
        rankings: {
          title: 'Skill Rankings',
          description: 'Discover popular skills from the community',
          installs: 'Installs',
          stars: 'Stars',
          trending: 'Trending',
          install: 'Install',
        },
      },
      terminal: {
        title: 'Terminal Output',
        running: 'Running command...',
      },
      common: {
        project: 'project',
        global: 'global',
      },
      language: {
        switch: 'Switch Language',
        zh: '中文',
        en: 'English',
      },
    },
  },
  zh: {
    translation: {
      app: {
        title: '技能管理器',
        version: 'v1.0.0',
        terminal: 'npx skills --help',
      },
      nav: {
        list: '技能列表',
        rankings: '排行榜',
        add: '添加技能',
        find: '搜索技能',
        check: '检查更新',
        update: '更新全部',
        init: '创建技能',
        remove: '移除技能',
      },
      pages: {
        list: {
          title: '已安装技能',
          description: '查看项目中安装的所有技能（项目级别和全局）',
          empty: '暂无已安装的技能',
        },
        add: {
          title: '添加技能',
          description: '从 GitHub、npm 或本地路径安装技能',
          sourceLabel: '技能来源',
          sourcePlaceholder: '例如：vercel-labs/agent-skills, https://github.com/..., ./my-local-skills',
          agentsLabel: '目标代理',
          globalLabel: '全局安装 (-g)',
          commandPreview: '命令预览：',
          installBtn: '安装技能',
          installing: '安装中...',
        },
        find: {
          title: '搜索技能',
          description: '从注册表搜索技能',
          searchPlaceholder: '搜索技能（例如：typescript, frontend, api...）',
          searchBtn: '搜索',
          leaveEmpty: '留空以进行交互式搜索',
        },
        check: {
          title: '检查更新',
          description: '检查已安装的技能是否有可用更新',
          info: '这将检查所有已安装的技能与其远程仓库的更新版本。',
          checkBtn: '检查更新',
          checking: '检查中...',
        },
        update: {
          title: '更新技能',
          description: '将所有已安装的技能更新到最新版本',
          info: '这将把已安装的所有技能更新到最新可用版本。',
          updateBtn: '更新全部技能',
          updating: '更新中...',
        },
        init: {
          title: '创建新技能',
          description: '创建新的 SKILL.md 模板',
          nameLabel: '技能名称（可选）',
          namePlaceholder: 'my-awesome-skill',
          createBtn: '创建 SKILL.md',
          creating: '创建中...',
        },
        remove: {
          title: '移除技能',
          description: '从代理中移除已安装的技能',
          skillsLabel: '要移除的技能',
          nameLabel: '或输入技能名称',
          namePlaceholder: 'skill-name',
          globalLabel: '从全局移除 (-g)',
          removeBtn: '移除技能',
          removing: '移除中...',
        },
        rankings: {
          title: '技能排行榜',
          description: '发现社区热门技能',
          installs: '安装量',
          stars: '星标',
          trending: '趋势',
          install: '安装',
        },
      },
      terminal: {
        title: '终端输出',
        running: '正在运行命令...',
      },
      common: {
        project: '项目',
        global: '全局',
      },
      language: {
        switch: '切换语言',
        zh: '中文',
        en: 'English',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
