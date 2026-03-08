import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BookPlus,
  List,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Terminal,
  Sparkles,
  CheckCircle,
  Globe,
  TrendingUp,
  Star,
  Download,
  GitBranch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type Page = 'list' | 'add' | 'find' | 'check' | 'update' | 'init' | 'remove' | 'rankings'

interface Skill {
  name: string
  description: string
  agent: string
  scope: 'project' | 'global'
}

interface RankingSkill {
  id: string
  name: string
  description: string
  agent: string
  installs: number
  stars: number
  category: string
  owner: string
  repo: string
}

type RankingType = 'installs' | 'stars' | 'trending'

const mockRankingSkills: RankingSkill[] = [
  { id: '1', name: 'frontend-design', description: 'Create production-grade frontend interfaces with high design quality', agent: 'claude-code', installs: 15420, stars: 892, category: 'Development', owner: 'vercel-labs', repo: 'agent-skills' },
  { id: '2', name: 'github', description: 'Interact with GitHub using gh CLI for PRs, issues, and more', agent: 'openclaw', installs: 12350, stars: 756, category: 'DevOps', owner: 'shadcn', repo: 'skills-github' },
  { id: '3', name: 'pdf', description: 'Read, write, and manipulate PDF documents', agent: 'claude-code', installs: 9870, stars: 543, category: 'Utilities', owner: 'anthropic', repo: 'skills-pdf' },
  { id: '4', name: 'xlsx', description: 'Create and manipulate Excel spreadsheets', agent: 'claude-code', installs: 8650, stars: 421, category: 'Utilities', owner: 'anthropic', repo: 'skills-xlsx' },
  { id: '5', name: 'web-search', description: 'Search the web for current information and news', agent: 'openclaw', installs: 7230, stars: 389, category: 'Research', owner: 'openai', repo: 'skills-websearch' },
  { id: '6', name: 'docker', description: 'Manage Docker containers and images', agent: 'codex', installs: 6890, stars: 312, category: 'DevOps', owner: 'docker', repo: 'skills-docker' },
  { id: '7', name: 'postgres', description: 'Interact with PostgreSQL databases', agent: 'cursor', installs: 5420, stars: 287, category: 'Database', owner: 'supabase', repo: 'skills-postgres' },
  { id: '8', name: 'react', description: 'Build React applications with modern best practices', agent: 'claude-code', installs: 4890, stars: 265, category: 'Development', owner: 'vercel', repo: 'skills-react' },
  { id: '9', name: 'docker', description: 'Docker container management and deployment', agent: 'windsurf', installs: 4120, stars: 198, category: 'DevOps', owner: 'circleci', repo: 'skills-ci' },
  { id: '10', name: 'bash', description: 'Execute shell commands and bash scripts', agent: 'cline', installs: 3650, stars: 176, category: 'Utilities', owner: 'shelljs', repo: 'skills-bash' },
]

const categories = ['All', 'Development', 'DevOps', 'Database', 'Utilities', 'Research']

const mockSkills: Skill[] = [
  { name: 'frontend-design', description: 'Create production-grade frontend interfaces', agent: 'claude-code', scope: 'project' },
  { name: 'github', description: 'Interact with GitHub using gh CLI', agent: 'openclaw', scope: 'global' },
  { name: 'weather', description: 'Get weather forecasts', agent: 'openclaw', scope: 'project' },
  { name: 'skill-creator', description: 'Guide for creating effective skills', agent: 'claude-code', scope: 'global' },
]

const agents = [
  'openclaw', 'claude-code', 'codex', 'cursor', 'opencode', 
  'windsurf', 'roo', 'continue', 'cline'
]

export default function App() {
  const { t, i18n } = useTranslation()
  const [currentPage, setCurrentPage] = useState<Page>('list')
  const [inputValue, setInputValue] = useState('')
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [isGlobal, setIsGlobal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [rankingType, setRankingType] = useState<RankingType>('installs')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredRankings = mockRankingSkills
    .filter(skill => selectedCategory === 'All' || skill.category === selectedCategory)
    .sort((a, b) => {
      if (rankingType === 'installs') return b.installs - a.installs
      if (rankingType === 'stars') return b.stars - a.stars
      return (b.stars + b.installs) - (a.stars + a.installs)
    })

  const toggleAgent = (agent: string) => {
    setSelectedAgents(prev => 
      prev.includes(agent) 
        ? prev.filter(a => a !== agent)
        : [...prev, agent]
    )
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const runCommand = (cmd: string) => {
    setIsLoading(true)
    setOutput([])
    
    // Simulate command execution
    setTimeout(() => {
      setOutput([
        `> ${cmd}`,
        `Executing: ${cmd}...`,
        Math.random() > 0.3 ? 'Success!' : 'Command completed with warnings.',
        '',
        'Note: This is a UI demo. In production, this would execute the actual npx skills command.'
      ])
      setIsLoading(false)
    }, 1000)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'list':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                {t('pages.list.title')}
              </CardTitle>
              <CardDescription>{t('pages.list.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.description}</div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{skill.agent}</Badge>
                        <Badge variant="outline">{t(`common.${skill.scope}`)}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => {
                      setCurrentPage('remove')
                      setInputValue(skill.name)
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'add':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {t('pages.add.title')}
              </CardTitle>
              <CardDescription>{t('pages.add.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">{t('pages.add.sourceLabel')}</label>
                <Input 
                  placeholder={t('pages.add.sourcePlaceholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t('pages.add.agentsLabel')}</label>
                <div className="flex flex-wrap gap-2">
                  {agents.map(agent => (
                    <Badge 
                      key={agent}
                      variant={selectedAgents.includes(agent) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleAgent(agent)}
                    >
                      {agent}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isGlobal}
                    onChange={(e) => setIsGlobal(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{t('pages.add.globalLabel')}</span>
                </label>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                <div className="text-muted-foreground mb-2">{t('pages.add.commandPreview')}</div>
                <div className="text-primary">
                  npx skills add {inputValue || '<source>'}
                  {isGlobal ? ' -g' : ''}
                  {selectedAgents.map(a => ` -a ${a}`).join('')}
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => runCommand(`npx skills add ${inputValue}${isGlobal ? ' -g' : ''}${selectedAgents.map(a => ` -a ${a}`).join('')}`)}
                disabled={!inputValue || isLoading}
              >
                {isLoading ? t('pages.add.installing') : t('pages.add.installBtn')}
              </Button>
            </CardContent>
          </Card>
        )

      case 'find':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                {t('pages.find.title')}
              </CardTitle>
              <CardDescription>{t('pages.find.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder={t('pages.find.searchPlaceholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runCommand(`npx skills find ${inputValue}`)}
                />
                <Button onClick={() => runCommand(`npx skills find ${inputValue}`)} disabled={isLoading}>
                  {t('pages.find.searchBtn')}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {t('pages.find.leaveEmpty')}
              </div>
            </CardContent>
          </Card>
        )

      case 'check':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('pages.check.title')}
              </CardTitle>
              <CardDescription>{t('pages.check.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('pages.check.info')}
              </p>
              <Button 
                className="w-full" 
                onClick={() => runCommand('npx skills check')}
                disabled={isLoading}
              >
                {isLoading ? t('pages.check.checking') : t('pages.check.checkBtn')}
              </Button>
            </CardContent>
          </Card>
        )

      case 'update':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                {t('pages.update.title')}
              </CardTitle>
              <CardDescription>{t('pages.update.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('pages.update.info')}
              </p>
              <Button 
                className="w-full" 
                onClick={() => runCommand('npx skills update')}
                disabled={isLoading}
              >
                {isLoading ? t('pages.update.updating') : t('pages.update.updateBtn')}
              </Button>
            </CardContent>
          </Card>
        )

      case 'init':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookPlus className="w-5 h-5" />
                {t('pages.init.title')}
              </CardTitle>
              <CardDescription>{t('pages.init.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t('pages.init.nameLabel')}</label>
                <Input 
                  placeholder={t('pages.init.namePlaceholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => runCommand(`npx skills init ${inputValue}`)}
                disabled={isLoading}
              >
                {isLoading ? t('pages.init.creating') : t('pages.init.createBtn')}
              </Button>
            </CardContent>
          </Card>
        )

      case 'remove':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                {t('pages.remove.title')}
              </CardTitle>
              <CardDescription>{t('pages.remove.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t('pages.remove.skillsLabel')}</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {mockSkills.map(skill => (
                    <Badge 
                      key={skill.name}
                      variant={selectedSkills.includes(skill.name) ? 'destructive' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill.name)}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t('pages.remove.nameLabel')}</label>
                <Input 
                  placeholder={t('pages.remove.namePlaceholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isGlobal}
                    onChange={(e) => setIsGlobal(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{t('pages.remove.globalLabel')}</span>
                </label>
              </div>

              <Button 
                className="w-full" 
                onClick={() => runCommand(`npx skills remove ${inputValue || selectedSkills.join(' ')}${isGlobal ? ' -g' : ''}`)}
                disabled={!inputValue && selectedSkills.length === 0 || isLoading}
              >
                {isLoading ? t('pages.remove.removing') : t('pages.remove.removeBtn')}
              </Button>
            </CardContent>
          </Card>
        )

      case 'rankings':
        return (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t('pages.rankings.title')}
              </CardTitle>
              <CardDescription>{t('pages.rankings.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={rankingType === 'installs' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRankingType('installs')}
                >
                  <Download className="w-4 h-4 mr-1" />
                  {t('pages.rankings.installs')}
                </Button>
                <Button
                  variant={rankingType === 'stars' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRankingType('stars')}
                >
                  <Star className="w-4 h-4 mr-1" />
                  {t('pages.rankings.stars')}
                </Button>
                <Button
                  variant={rankingType === 'trending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRankingType('trending')}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {t('pages.rankings.trending')}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                {filteredRankings.map((skill, idx) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{skill.description}</div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{skill.agent}</Badge>
                          <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />{skill.owner}/{skill.repo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Download className="w-3 h-3" />
                          {skill.installs.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('pages.rankings.installs')}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3" />
                          {skill.stars.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('pages.rankings.stars')}</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setInputValue(`${skill.owner}/${skill.repo}`)
                          setCurrentPage('add')
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t('pages.rankings.install')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  const navItems = [
    { id: 'list', label: t('nav.list'), icon: List },
    { id: 'rankings', label: t('nav.rankings'), icon: TrendingUp },
    { id: 'add', label: t('nav.add'), icon: Plus },
    { id: 'find', label: t('nav.find'), icon: Search },
    { id: 'check', label: t('nav.check'), icon: CheckCircle },
    { id: 'update', label: t('nav.update'), icon: RefreshCw },
    { id: 'init', label: t('nav.init'), icon: BookPlus },
    { id: 'remove', label: t('nav.remove'), icon: Trash2 },
  ]

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">{t('app.title')}</h1>
            <p className="text-xs text-muted-foreground">{t('app.version')}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPage === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">
            <Terminal className="w-3 h-3" />
            <span>{t('app.terminal')}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-xs" title={t('language.switch')}>
            <Globe className="w-3 h-3 mr-1" />
            {i18n.language === 'zh' ? 'EN' : '中'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {renderPage()}

          {/* Output Terminal */}
          {(output.length > 0 || isLoading) && (
            <Card className="bg-zinc-900 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono">{t('terminal.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                  {isLoading && t('terminal.running')}
                  {output.join('\n')}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
