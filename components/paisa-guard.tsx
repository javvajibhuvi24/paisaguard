'use client'

import Link from 'next/link'
import { useState } from 'react'
import { analyze, type AnalysisTask, type AnalysisResult } from '@/lib/ai'
import { redactPII } from '@/lib/redact'
import { usePrivacyPreferences } from '@/components/privacy-preferences'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Bell, Check, ChevronDown, CircleHelp, Cloud, FileText, Fingerprint, LayoutDashboard, LockKeyhole, Menu, Plus, Settings2, Shield, ShieldCheck, Sparkles, Upload, Wallet, X, Zap } from 'lucide-react'

type LogEntry = { id: number; task: string; time: string; source: AnalysisResult['source']; redactions: string[] }

export function BrandMark({ small = false }: { small?: boolean }) {
  return <Link href="/" className="flex items-center gap-2.5"><span className={`grid place-items-center rounded-xl bg-emerald-400 text-[#071817] ${small ? 'size-8' : 'size-9'}`}><ShieldCheck size={small ? 17 : 19} strokeWidth={2.3} /></span><span className="text-[17px] font-semibold tracking-[-0.04em]">paisa<span className="text-emerald-400">guard</span></span></Link>
}

export function Navbar({ active }: { active?: 'app' | 'settings' }) {
  return <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#081719]/90 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 md:px-8"><BrandMark /><nav aria-label="Main navigation" className="flex items-center gap-0.5 sm:gap-1"><Link aria-label="Dashboard" title="Dashboard" className={`nav-link ${active === 'app' ? 'nav-link-active' : ''}`} href="/app"><LayoutDashboard size={16}/><span className="hidden md:inline">Dashboard</span></Link><Link aria-label="Settings" title="Settings" className={`nav-link ${active === 'settings' ? 'nav-link-active' : ''}`} href="/settings"><Settings2 size={16}/><span className="hidden md:inline">Settings</span></Link></nav><button onClick={() => window.alert('Google sign-in will be connected here.')} className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:border-emerald-300/50"><span className="grid size-5 place-items-center rounded-full bg-white text-[11px] font-bold text-slate-700">G</span><span className="hidden sm:inline">Sign in with Google</span><span className="sm:hidden">Sign in</span></button></div></header>
}

function Footer() { return <footer className="border-t border-white/[0.07] px-5 py-7 text-center text-xs text-slate-500">Your financial data belongs to you. Always. <span className="mx-2 text-slate-700">·</span> Made for a more private tomorrow.</footer> }

export function LandingPage() {
  const features = [
    { icon: LockKeyhole, title: 'On-device first', text: 'Your analysis runs right on your device whenever it can. Your data stays yours.' },
    { icon: Zap, title: 'Smart cloud fallback', text: 'Need a little more? Cloud AI steps in only when needed, with your details removed.' },
    { icon: Fingerprint, title: 'PII auto-redaction', text: 'Phone numbers, account details and UPI IDs are detected and scrubbed automatically.' },
  ]
  return <div className="min-h-screen bg-[#081719] text-white"><Navbar/><main><section className="relative overflow-hidden px-5 pb-20 pt-20 md:pb-28 md:pt-28"><div className="hero-glow"/><div className="relative mx-auto max-w-[940px] text-center"><div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-[11px] font-medium tracking-wide text-emerald-200"><Shield size={14}/> FINANCIAL CLARITY, WITHOUT THE TRADE-OFF</div><h1 className="mx-auto max-w-[850px] text-5xl font-semibold leading-[1.08] tracking-[-0.065em] sm:text-6xl md:text-[76px]">Your money data never has to <span className="text-emerald-300">leave your device.</span></h1><p className="mx-auto mt-6 max-w-[590px] text-base leading-7 text-slate-400 md:text-lg">Meet your private AI financial assistant. Understand your spending, spot subscriptions, and get answers — with privacy built in from the very first tap.</p><div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/app" className="primary-button">Try PaisaGuard <ArrowRight size={16}/></Link><span className="flex items-center gap-1.5 text-xs text-slate-500"><LockKeyhole size={13}/> No bank connection required</span></div><div className="mx-auto mt-14 flex max-w-fit items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-left"><div className="grid size-9 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300"><ShieldCheck size={18}/></div><div><p className="text-xs font-medium text-slate-200">Privacy is the default</p><p className="mt-0.5 text-[11px] text-slate-500">You choose what leaves your device.</p></div><div className="ml-4 hidden h-8 w-px bg-white/10 sm:block"/><div className="hidden items-center gap-1.5 text-[11px] text-emerald-300 sm:flex"><span className="size-1.5 rounded-full bg-emerald-300"/> Protected</div></div></div></section><section className="mx-auto max-w-[1100px] px-5 pb-20 md:pb-28"><div className="grid gap-4 md:grid-cols-3">{features.map(({icon:Icon,title,text},i)=><article key={title} className="feature-card"><div className="mb-8 flex items-center justify-between"><span className="grid size-11 place-items-center rounded-xl border border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300"><Icon size={20}/></span><span className="text-xs text-slate-600">0{i+1}</span></div><h2 className="text-lg font-medium tracking-tight">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></article>)}</div></section><section className="border-y border-white/[0.07] bg-white/[0.018] px-5 py-20 md:py-24"><div className="mx-auto max-w-[1000px]"><div className="mb-12 text-center"><p className="eyebrow">SIMPLE BY DESIGN</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">A smarter way to check in.</h2></div><div className="grid gap-8 md:grid-cols-3">{[{n:'01',t:'Share a statement',d:'Paste a bank SMS or drop in a statement. No account linking needed.'},{n:'02',t:'We protect your details',d:'Sensitive information is detected and redacted before any cloud request.'},{n:'03',t:'Get the full picture',d:'See spending patterns, recurring charges, and plain-language answers.'}].map((s)=><div key={s.n} className="flex gap-4"><span className="mt-0.5 text-xs font-semibold text-emerald-300">{s.n}</span><div><h3 className="font-medium">{s.t}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{s.d}</p></div></div>)}</div></div></section><section className="px-5 py-20 text-center md:py-24"><div className="mx-auto max-w-[650px]"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-300"><Sparkles size={22}/></div><h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">Your money. Your privacy.</h2><p className="mt-3 text-sm text-slate-400">Start with a statement. Leave with a little more peace of mind.</p><Link href="/app" className="primary-button mt-7">Try PaisaGuard <ArrowRight size={16}/></Link></div></section></main><Footer/></div>
}

export function PrivacyMeterBadge({ source }: { source: AnalysisResult['source'] }) { return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium ${source === 'on-device' ? 'bg-emerald-300/10 text-emerald-300' : 'bg-amber-300/10 text-amber-200'}`}><span className={`size-1.5 rounded-full ${source === 'on-device' ? 'bg-emerald-300' : 'bg-amber-300'}`}/>{source === 'on-device' ? 'Ran on-device' : 'Cloud fallback · PII redacted'}</span> }

function PrivacyLogItem({ item }: { item: LogEntry }) { return <div className="flex items-start gap-3 border-t border-white/[0.06] py-3.5 first:border-0"><span className={`mt-1 grid size-7 shrink-0 place-items-center rounded-lg ${item.source === 'on-device' ? 'bg-emerald-300/10 text-emerald-300' : 'bg-amber-300/10 text-amber-200'}`}><ShieldCheck size={14}/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-1"><p className="text-xs font-medium text-slate-200">{item.task}</p><span className="text-[10px] text-slate-500">{item.time}</span></div><p className="mt-1 text-[11px] text-slate-500">{item.source === 'on-device' ? 'Processed on-device' : 'Cloud fallback'}{item.redactions.length > 0 ? ` · ${item.redactions.join(', ')} redacted` : ' · No PII found'}</p></div></div> }

function AnalysisFormattedContent({ content }: { content: string }) {
  const sections = content.split(/(?=\n?###\s+)/).filter(Boolean)

  return (
    <div className="space-y-3.5">
      {sections.map((section, idx) => {
        const lines = section.trim().split('\n').filter(Boolean)
        const firstLine = lines[0] || ''
        const isHeader = firstLine.startsWith('### ')
        const title = isHeader ? firstLine.replace('### ', '').trim() : null
        const bodyLines = isHeader ? lines.slice(1) : lines

        const keyValuePairs: { label: string; value: string }[] = []
        const bulletLines: string[] = []

        bodyLines.forEach(line => {
          const kvMatch = line.match(/^[-•]\s*([^:]+):\s*(.+)$/)
          if (kvMatch && !line.includes('http')) {
            keyValuePairs.push({ label: kvMatch[1].trim(), value: kvMatch[2].trim() })
          } else {
            bulletLines.push(line.replace(/^[-•]\s*/, '').trim())
          }
        })

        const isTip = title?.includes('Tip') || title?.includes('Recommendation')
        const isMetrics = title?.includes('Metrics') || title?.includes('Overview') || title?.includes('Highlights')

        return (
          <div
            key={idx}
            className={`rounded-xl border p-4 ${
              isTip
                ? 'border-emerald-400/25 bg-emerald-400/[0.06]'
                : 'border-white/[0.08] bg-white/[0.025]'
            }`}
          >
            {title && (
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isTip ? 'text-emerald-300' : 'text-slate-200'}`}>
                {title}
              </h4>
            )}

            {keyValuePairs.length > 0 && isMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {keyValuePairs.map((kv, kIdx) => (
                  <div key={kIdx} className="rounded-lg bg-black/30 border border-white/[0.06] p-2.5">
                    <p className="text-[10px] uppercase font-medium text-slate-400">{kv.label}</p>
                    <p className="text-xs font-semibold text-emerald-300 mt-0.5 truncate" title={kv.value}>{kv.value}</p>
                  </div>
                ))}
              </div>
            )}

            {keyValuePairs.length > 0 && !isMetrics && (
              <div className="divide-y divide-white/[0.06] mb-3">
                {keyValuePairs.map((kv, kIdx) => (
                  <div key={kIdx} className="flex flex-wrap items-center justify-between gap-2 py-2 first:pt-0 last:pb-0">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {kv.label}
                    </span>
                    <span className="text-xs font-medium text-emerald-300">
                      {kv.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {bulletLines.length > 0 && (
              <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                {bulletLines.map((bLine, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{bLine}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ResultCard({ result, task }: { result: AnalysisResult; task: AnalysisTask }) {
  return (
    <article className="surface-card p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-slate-100">
          <span className="grid size-7 place-items-center rounded-lg bg-white/[0.05] text-emerald-300">
            <Sparkles size={14} />
          </span>
          {task === 'summary' ? 'Spending summary' : task === 'subscriptions' ? 'Recurring payments' : 'Charge breakdown'}
        </span>
        <PrivacyMeterBadge source={result.source} />
      </div>
      <AnalysisFormattedContent content={result.result} />
      <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[11px] text-slate-500">
        <ShieldCheck size={14} className="text-emerald-300" />
        {result.redactions.length ? `${result.redactions.join(', ')} redacted before processing` : 'No personal information detected'}
      </div>
    </article>
  )
}

function LoadingSkeleton() { return <div className="surface-card animate-pulse p-6"><div className="h-3 w-32 rounded bg-white/10"/><div className="mt-6 h-3 w-full rounded bg-white/[0.06]"/><div className="mt-3 h-3 w-4/5 rounded bg-white/[0.06]"/><div className="mt-3 h-3 w-2/3 rounded bg-white/[0.06]"/></div> }

const SAMPLE = `HDFC Bank: Rs. 1,249.00 spent on your card ending 4821 at SWIGGY on 18 Nov. Available balance Rs. 48,290.
ICICI Bank: Rs. 499.00 debited for NETFLIX on 15 Nov.
SBI Alert: Rs. 350.00 spent at UBER on 17 Nov using UPI.
Axis Bank: Rs. 2,150.00 debited at AMAZON on 14 Nov.`

export function DashboardPage() {
  const { preferences } = usePrivacyPreferences()
  const [text,setText]=useState(''); const [active,setActive]=useState<AnalysisTask>('summary'); const [result,setResult]=useState<AnalysisResult|null>(null); const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const [logs,setLogs]=useState<LogEntry[]>([]); const [logOpen,setLogOpen]=useState(true)
  async function runAnalysis(task: AnalysisTask = active) { if (!text.trim()) {setError('Add a bank message or statement before analyzing.');return} setError('');setLoading(true);setActive(task);setResult(null);try {const analyzed=await analyze(text,task,preferences);setResult(analyzed);setLogs((items)=>[{id:Date.now(),task:task==='summary'?'Spending summary':task==='subscriptions'?'Subscription scan':'Charge explanation',time:new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit'}).format(new Date()),source:analyzed.source,redactions:analyzed.redactions},...items])} catch (error) {setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')} finally {setLoading(false)} }
  async function upload(file?: File) { if(!file)return; if(!/\.(txt|csv)$/i.test(file.name)){setError('Please choose a .txt or .csv file.');return} try {setText(await file.text());setError('')} catch {setError('We couldn’t read that file. Try another one.')} }
  const tabs: {key:AnalysisTask;label:string;icon:typeof Wallet}[]=[{key:'summary',label:'Summary',icon:Wallet},{key:'subscriptions',label:'Subscriptions',icon:Bell},{key:'charge',label:'Explain a charge',icon:CircleHelp}]
  const redacted=redactPII(text).redactions
  return <div className="min-h-screen bg-[#081719] text-white"><Navbar active="app"/><main className="mx-auto max-w-[1240px] px-5 pb-16 pt-9 md:px-8 md:pt-12"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">YOUR PRIVATE MONEY SPACE</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Good to see you.</h1><p className="mt-2 text-sm text-slate-400">Make sense of your spending, on your terms.</p></div><div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] text-slate-400"><span className="size-1.5 rounded-full bg-emerald-300"/> Privacy protection active</div></div><div className="grid items-start gap-5 lg:grid-cols-[1.04fr_.96fr]"><section className="surface-card overflow-hidden"><div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4"><div><h2 className="text-sm font-medium">Your transaction data</h2><p className="mt-1 text-[11px] text-slate-500">Paste a bank SMS or statement to get started.</p></div><span className="rounded-md bg-emerald-300/[0.09] px-2 py-1 text-[10px] font-medium text-emerald-300">PRIVATE</span></div><div className="p-5"><label htmlFor="statement" className="sr-only">Bank SMS or transaction statement</label><textarea id="statement" value={text} onChange={e=>setText(e.target.value)} placeholder={'Paste a bank SMS, transaction list, or statement here…\n\nYour data is analyzed locally first. Personal details are automatically redacted before cloud processing.'} className="min-h-[255px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#091416] p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-emerald-300/40"/><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-2"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/[0.09] px-3 py-2 text-xs text-slate-300 transition hover:bg-white/[0.04]"><Upload size={14} className="text-slate-400"/> Upload .txt or .csv<input aria-label="Upload .txt or .csv statement" type="file" accept=".txt,.csv,text/plain,text/csv" className="sr-only" onChange={e=>upload(e.target.files?.[0])}/></label><a href="/sample-statement.csv" download="sample-statement.csv" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.09] px-3 py-2 text-xs text-slate-300 transition hover:bg-white/[0.04] hover:text-emerald-300"><ArrowDown size={14} className="text-emerald-400"/> Download sample CSV</a></div><button className="text-[11px] text-slate-500 transition hover:text-emerald-300" onClick={()=>{setText(SAMPLE);setError('')}}>Use sample SMS</button></div>{error&&<div role="alert" className="mt-4 flex items-center justify-between rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2.5 text-xs text-rose-200">{error}<button aria-label="Dismiss error" onClick={()=>setError('')}><X size={14}/></button></div>}<div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4"><span className="text-[11px] text-slate-500">{text.length.toLocaleString()} characters · {redacted.length ? `${redacted.length} PII type${redacted.length>1?'s':''} detected` : 'No personal info detected'}</span><button disabled={loading} onClick={()=>runAnalysis()} className="primary-button !px-4 !py-2.5 disabled:cursor-wait disabled:opacity-60">{loading?<><span className="size-3.5 animate-spin rounded-full border-2 border-[#071817]/35 border-t-[#071817]"/>Analyzing</>:<>Analyze <ArrowRight size={15}/></>}</button></div></div></section><section className="min-w-0"><div className="flex gap-1 overflow-x-auto rounded-xl border border-white/[0.07] bg-white/[0.025] p-1">{tabs.map(({key,label,icon:Icon})=><button key={key} onClick={()=>{setActive(key);if(text.trim())runAnalysis(key)}} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium transition md:flex-1 md:justify-center ${active===key?'bg-white/[0.09] text-white shadow-sm':'text-slate-500 hover:text-slate-300'}`}><Icon size={14}/>{label}</button>)}</div><div className="mt-3">{loading?<LoadingSkeleton/>:result?<ResultCard result={result} task={active}/>:<div className="surface-card flex min-h-[210px] flex-col items-center justify-center px-6 py-9 text-center"><span className="grid size-11 place-items-center rounded-xl bg-emerald-300/[0.08] text-emerald-300"><FileText size={20}/></span><h3 className="mt-4 text-sm font-medium">Your insights will show up here</h3><p className="mt-2 max-w-[270px] text-xs leading-5 text-slate-500">Add a few transactions, then choose a view to get started.</p><button onClick={()=>setText(SAMPLE)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 hover:text-emerald-200">Try sample data <ArrowRight size={13}/></button></div>}</div><section className="surface-card mt-4 overflow-hidden"><button aria-expanded={logOpen} onClick={()=>setLogOpen(!logOpen)} className="flex w-full items-center justify-between px-5 py-4 text-left"><span className="flex items-center gap-2 text-sm font-medium"><ShieldCheck size={16} className="text-emerald-300"/> Privacy log <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] text-slate-400">{logs.length}</span></span><ChevronDown size={16} className={`text-slate-500 transition ${logOpen?'rotate-180':''}`}/></button>{logOpen&&<div className="px-5 pb-2">{logs.length?logs.map(item=><PrivacyLogItem key={item.id} item={item}/>):<p className="border-t border-white/[0.06] py-4 text-xs text-slate-500">Your analysis history will appear here. Nothing is stored yet.</p>}</div>}</section></section></div></main><Footer/></div>
}

export function SettingsPage() {
  const { preferences, updatePreferences } = usePrivacyPreferences()
  const { preferOnDevice: prefer, allowCloudFallback: cloud, maxOnDeviceInputLength: length } = preferences
  const [saved,setSaved]=useState(false)
  function Toggle({checked,onChange,label}:{checked:boolean;onChange:(value:boolean)=>void;label:string}) {return <button role="switch" aria-checked={checked} aria-label={label} onClick={()=>onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked?'bg-emerald-400':'bg-slate-700'}`}><span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${checked?'left-[22px]':'left-0.5'}`}/></button>}
  return <div className="min-h-screen bg-[#081719] text-white"><Navbar active="settings"/><main className="mx-auto max-w-[950px] px-5 pb-20 pt-9 md:px-8 md:pt-12"><div className="mb-8"><p className="eyebrow">YOUR PREFERENCES</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Privacy settings</h1><p className="mt-2 text-sm text-slate-400">You’re in control of how PaisaGuard handles your data.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_300px]"><section className="surface-card divide-y divide-white/[0.07]"><div className="p-5 md:p-6"><div className="mb-5"><h2 className="text-sm font-medium">AI processing</h2><p className="mt-1 text-xs text-slate-500">Choose where your financial insights are generated.</p></div><div className="flex items-center justify-between gap-4 py-3"><div className="flex items-start gap-3"><span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-emerald-300/10 text-emerald-300"><LockKeyhole size={15}/></span><div><p className="text-sm font-medium">Prefer on-device</p><p className="mt-1 text-xs leading-5 text-slate-500">Run analysis locally whenever possible.</p></div></div><Toggle label="Prefer on-device" checked={prefer} onChange={value=>updatePreferences({preferOnDevice:value})}/></div><div className="flex items-center justify-between gap-4 py-3"><div className="flex items-start gap-3"><span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-amber-300/10 text-amber-200"><Cloud size={15}/></span><div><p className="text-sm font-medium">Allow cloud fallback</p><p className="mt-1 text-xs leading-5 text-slate-500">Use cloud AI for longer inputs after PII redaction.</p></div></div><Toggle label="Allow cloud fallback" checked={cloud} onChange={value=>updatePreferences({allowCloudFallback:value})}/></div></div><div className="p-5 md:p-6"><div className="flex items-end justify-between gap-4"><div><h2 className="text-sm font-medium">Max on-device input length</h2><p className="mt-1 text-xs text-slate-500">Longer inputs may use cloud fallback.</p></div><span className="rounded-md bg-white/[0.06] px-2.5 py-1.5 font-mono text-xs text-emerald-300">{length.toLocaleString()} chars</span></div><label htmlFor="input-length" className="sr-only">Max on-device input length</label><input id="input-length" type="range" min="200" max="5000" step="100" value={length} onChange={e=>updatePreferences({maxOnDeviceInputLength:Number(e.target.value)})} className="mt-6 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-400"/><div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>200</span><span>5,000</span></div></div><div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-4 md:px-6"><span className="text-xs text-slate-500">Changes apply to your next analysis.</span><button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2200)}} className="rounded-lg bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/[0.13]">{saved?<><Check size={13} className="mr-1 inline"/>Saved</>:'Save preferences'}</button></div></section><aside className="surface-card h-fit p-5"><span className="grid size-9 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300"><ShieldCheck size={18}/></span><h2 className="mt-4 text-sm font-medium">Privacy, your way.</h2><p className="mt-2 text-xs leading-5 text-slate-400">Sensitive details are redacted before any information leaves your device. Your preferences stay on this device.</p><div className="mt-5 space-y-3 border-t border-white/[0.07] pt-4">{['On-device processing first','Automatic PII redaction','No bank login required'].map(x=><p key={x} className="flex items-center gap-2 text-[11px] text-slate-400"><Check size={13} className="text-emerald-300"/>{x}</p>)}</div></aside></div></main><Footer/></div>
}
