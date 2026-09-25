import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { type Assignment as AssignmentType, courseCriteria, guidanceOptions, modes, readDraft, situationOptions, storageKey, suggestGoals, validateAssignment } from './assignment'
import './app.css'

type IconName = 'plus' | 'close' | 'check' | 'right' | 'left' | 'down' | 'users' | 'user' | 'settings' | 'edit' | 'list' | 'grid' | 'menu' | 'save' | 'download'
function Icon({ name }: { name: IconName }) { return <span aria-hidden="true" className="icon" style={{ '--icon': `url(/icons/${name}.svg)` } as CSSProperties} /> }
function Remove({ label, onClick }: { label: string; onClick: () => void }) { return <button type="button" className="icon-button remove" aria-label={label} onClick={onClick}><Icon name="close" /></button> }
function Section({ title, number, action, children, className = '' }: { title: string; number: string; action?: ReactNode; children: ReactNode; className?: string }) { return <section className={`panel ${className}`}><div className="section-heading"><h2><span className="section-number">{number}</span>{title}</h2>{action}</div>{children}</section> }
function App() {
  const [a, setA] = useState(readDraft)
  const [step, setStep] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [created, setCreated] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const [editingGoal, setEditingGoal] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const pageTitle = useRef<HTMLHeadingElement>(null)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timeout.current), [])
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(''), 4200); return () => clearTimeout(timer) }, [message])
  function update<K extends keyof AssignmentType>(key: K, value: AssignmentType[K]) { setA(prev => ({ ...prev, [key]: value })); setSaved(false); setCreated(false); setError('') }
  function changeStep(next: number) {
    if (next === 2) { const issue = validateAssignment(a); if (issue) { setError(issue); return } }
    setStep(next); setError(''); window.scrollTo({ top: 0 }); requestAnimationFrame(() => pageTitle.current?.focus({ preventScroll: true }))
  }
  function save(create = false) {
    if (create) { const issue = validateAssignment(a, true); if (issue) { setError(issue); return } }
    try { localStorage.setItem(storageKey, JSON.stringify(a)); setSaved(true); setCreated(create); setError(''); setMessage(create ? '과제가 생성되었습니다. 이 브라우저에 데모로 저장했어요.' : '임시 저장했습니다. 다음 접속에서도 이어서 작성할 수 있어요.') }
    catch { setError('저장 공간을 사용할 수 없습니다. 브라우저 설정을 확인해 주세요.') }
  }
  function addGoal() { if (!newGoal.trim()) return; update('goals', [...a.goals, newGoal.trim()]); setNewGoal('') }
  function openSuggestions() {
    if (!a.title.trim()) { setError('목표를 불러오기 전에 과제명을 입력해 주세요.'); return }
    setSelectedGoals([]); setLoading(true); setSuggestions([]); dialog.current?.showModal()
    timeout.current = setTimeout(() => { setSuggestions(suggestGoals(a.title)); setLoading(false) }, 600)
  }
  function toggleGuidance(value: string) { const current = a.guidance[a.mode]; update('guidance', { ...a.guidance, [a.mode]: current.includes(value) ? current.filter(x => x !== value) : [...current, value] }) }
  const total = a.criteria.reduce((s, c) => s + c.weight, 0)
  const nav: { label: string; icon: IconName }[] = [{ label: '수업 대시보드', icon: 'grid' }, { label: '프로젝트 과제 생성', icon: 'edit' }, { label: '학생별 평가 지원', icon: 'list' }, { label: '팀별 모니터링', icon: 'users' }, { label: '과목 설정', icon: 'settings' }]
  return <div className="app-shell">
    <a className="skip-link" href="#main">본문으로 이동</a>
    {sidebarOpen && <button className="sidebar-backdrop" aria-label="메뉴 닫기" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="수업 메뉴">
      <div className="brand"><span />TRACE</div>
      <button className="mobile-close icon-button" aria-label="메뉴 닫기" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button>
      <label className="course-label" htmlFor="course">현재 수업</label>
      <div className="course-select"><select id="course" defaultValue="network"><option value="network">2학년 네트워크 실습</option></select><Icon name="down" /></div>
      <nav>{nav.map((item, i) => <button key={item.label} className={`nav-item ${i === 1 ? 'active' : ''}`} aria-current={i === 1 ? 'page' : undefined} onClick={() => { if (i === 1) { setSidebarOpen(false); changeStep(1) } else setMessage(`${item.label} 화면은 다음 데모에서 연결됩니다.`) }}><span className="nav-icon"><Icon name={item.icon} /></span>{item.label}</button>)}</nav>
      <div className="profile"><span className="avatar"><Icon name="users" /></span><div><strong>한국 폴리텍</strong><span>강병준 교수님</span></div></div>
    </aside>
    <main id="main" className="main">
      <header className="page-header"><div className="title-row"><button className="mobile-menu icon-button" aria-label="수업 메뉴 열기" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button><h1 ref={pageTitle} tabIndex={-1}>프로젝트 과제 생성</h1><span className="draft-badge">{created ? '생성 완료' : '작성 중'}</span></div><p>과제를 설계하고, 학생의 수행을 지원할 AI 운영 방식을 정하세요.</p></header>
      <div className="workflow"><div className="step-tabs" aria-label="과제 생성 단계"><button className={step === 1 ? 'current' : 'complete'} aria-current={step === 1 ? 'step' : undefined} onClick={() => changeStep(1)}><span>{step === 2 ? <Icon name="check" /> : '1'}</span>과제 설계</button><span className="step-connector" /><button className={step === 2 ? 'current' : ''} aria-current={step === 2 ? 'step' : undefined} onClick={() => changeStep(2)}><span>2</span>AI 운영 방식</button></div><span className="step-count">STEP {String(step).padStart(2, '0')} <span>/ 02</span></span></div>
      <form onSubmit={e => { e.preventDefault(); if (step === 1) changeStep(2); else save(true) }} noValidate>
      {step === 1 ? <div className="design-grid">
        <Section number="01" title="기본 정보" className="basic-panel" action={<span className="subtle">과제의 시작을 정하세요</span>}>
          <div className="field"><label htmlFor="title">과제명 <span className="required-dot">*</span></label><input id="title" value={a.title} onChange={e => update('title', e.target.value)} placeholder="과제명을 입력하세요" /></div>
          <div className="field"><label htmlFor="description">과제 설명</label><textarea id="description" rows={3} value={a.description} onChange={e => update('description', e.target.value)} placeholder="학생이 해결할 문제와 수행 내용을 입력하세요" /></div>
          <div className="basic-bottom"><fieldset><legend>수행 기간</legend><div className="date-range"><input aria-label="시작일" type="date" value={a.start} onChange={e => update('start', e.target.value)} /><span>—</span><input aria-label="종료일" type="date" min={a.start} value={a.end} onChange={e => update('end', e.target.value)} /></div></fieldset><fieldset><legend>난이도</legend><div className="segmented">{['하','중','상'].map(level => <button type="button" key={level} aria-pressed={a.difficulty === level} className={a.difficulty === level ? 'selected' : ''} onClick={() => update('difficulty', level)}>{level}</button>)}</div></fieldset></div>
        </Section>
        <Section number="02" title="과제 목표" className="goals-panel" action={<button type="button" className="text-button" onClick={openSuggestions}><Icon name="download" />과목 설정에서 불러오기</button>}>
          <p className="section-note">이 과제를 통해 학생이 도달할 목표</p>
          <div className="goal-chips">{a.goals.map((goal, i) => <div className="goal-chip" key={i}>{editingGoal === i ? <input aria-label={`목표 ${i + 1} 수정`} autoFocus value={editText} onChange={e => setEditText(e.target.value)} onBlur={() => { if (editText.trim()) update('goals', a.goals.map((x,j) => i === j ? editText.trim() : x)); setEditingGoal(null) }} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } if (e.key === 'Escape') { setEditingGoal(null) } }} /> : <button type="button" className="chip-label" title="클릭해서 목표 수정" onClick={() => { setEditingGoal(i); setEditText(goal) }}>{goal}</button>}<Remove label={`목표 ${i + 1} 삭제`} onClick={() => update('goals', a.goals.filter((_,j) => i !== j))} /></div>)}</div>
          <div className="goal-add"><input aria-label="새 과제 목표" placeholder="목표를 직접 입력하세요" value={newGoal} onChange={e => setNewGoal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGoal() } }} /><button type="button" className="icon-button" aria-label="목표 추가" disabled={!newGoal.trim()} onClick={addGoal}><Icon name="plus" /></button></div>
          <p className="micro-note">목표를 누르면 수정할 수 있습니다.</p>
        </Section>
        <Section number="03" title="평가 요구사항" action={<span className="count-label">{a.requirements.length}개 항목</span>}>
          <div className="requirements">{a.requirements.map((value, i) => <div className="requirement-row" key={i}><span className="check-marker"><Icon name="check" /></span><textarea rows={2} aria-label={`요구사항 ${i + 1}`} value={value} onChange={e => update('requirements', a.requirements.map((x,j) => j === i ? e.target.value : x))} placeholder="학생이 반드시 수행해야 할 행동이나 조건" /><Remove label={`요구사항 ${i + 1} 삭제`} onClick={() => update('requirements', a.requirements.filter((_,j) => j !== i))} /></div>)}</div><button type="button" className="add-button" onClick={() => update('requirements', [...a.requirements, ''])}><Icon name="plus" />요구사항 추가</button>
        </Section>
        <Section number="04" title="요구 산출물" action={<span className="count-label">{a.outputs.length}개 산출물</span>}>
          <div className="output-head"><span>산출물명</span><span>형식</span><span>제출 조건</span><span /></div>{a.outputs.map((out,i) => <div className="output-row" key={i}><input aria-label={`산출물명 ${i + 1}`} value={out.name} placeholder="산출물명" onChange={e => update('outputs', a.outputs.map((x,j) => j === i ? {...x,name:e.target.value} : x))} /><select aria-label={`산출물 형식 ${i + 1}`} value={out.format} onChange={e => update('outputs', a.outputs.map((x,j) => j === i ? {...x,format:e.target.value} : x))}>{['PDF','문서','이미지','영상','코드','기타'].map(f => <option key={f}>{f}</option>)}</select><select aria-label={`산출물 제출 조건 ${i + 1}`} value={out.required} onChange={e => update('outputs', a.outputs.map((x,j) => j === i ? {...x,required:e.target.value} : x))}><option>필수</option><option>선택</option></select><Remove label={`산출물 ${i + 1} 삭제`} onClick={() => update('outputs', a.outputs.filter((_,j) => j !== i))} /></div>)}<button type="button" className="add-button" onClick={() => update('outputs', [...a.outputs, {name:'',format:'PDF',required:'필수'}])}><Icon name="plus" />산출물 양식 추가</button>
        </Section>
        <Section number="05" title="평가 기준" className="criteria-panel" action={<button type="button" className="text-button" onClick={() => { update('criteria', courseCriteria.map(c => ({...c}))); setMessage('과목 평가 기준을 불러왔습니다. 과제에 맞게 수정할 수 있어요.') }}><Icon name="download" />과목 기준 불러오기</button>}>
          <div className="criteria-layout"><div className="criteria-table"><div className="criteria-head"><span>평가 요소</span><span>반영 비율</span><span /></div>{a.criteria.map((c,i) => <div className="criteria-row" key={i}><label className="criteria-name"><span className={`color-dot color-${i % 5}`} /><input aria-label={`평가 요소 ${i + 1}`} value={c.name} placeholder="평가 요소" onChange={e => update('criteria', a.criteria.map((x,j) => j === i ? {...x,name:e.target.value} : x))} /></label><div className="percent-input"><input aria-label={`반영 비율 ${i + 1}`} type="number" min="1" max="100" value={c.weight || ''} onChange={e => update('criteria', a.criteria.map((x,j) => j === i ? {...x,weight:Number(e.target.value)} : x))} /><span>%</span></div><Remove label={`평가 요소 ${i + 1} 삭제`} onClick={() => update('criteria', a.criteria.filter((_,j) => j !== i))} /></div>)}<button type="button" className="add-button" onClick={() => update('criteria', [...a.criteria, {name:'',weight:0}])}><Icon name="plus" />평가 요소 추가</button></div><div className="weight-summary"><div className="weight-total"><span>반영 비율 합계</span><strong className={total !== 100 ? 'invalid' : ''}>{total}<small>%</small></strong></div><div className="weight-bar" aria-hidden="true">{a.criteria.map((c,i) => <span key={i} className={`color-${i % 5}`} style={{flex:Math.max(0,c.weight)}} />)}</div><p className={total !== 100 ? 'invalid' : ''}>{total === 100 ? <><Icon name="check" />평가 비율이 모두 채워졌습니다.</> : '반영 비율의 합계를 100%로 맞춰 주세요.'}</p><div className="weight-legend">{a.criteria.map((c,i) => <span key={i}><i className={`color-dot color-${i % 5}`} />{c.name || '새 평가 요소'} <b>{c.weight}%</b></span>)}</div></div></div>
        </Section>
      </div> : <div className="ai-page"><section className="panel ai-panel"><div className="section-heading"><h2>AI 운영 방식</h2><span className="subtle">과제에 맞는 지원 방식을 선택하세요</span></div><div className="mode-tabs" role="tablist" aria-label="AI 운영 방식">{modes.map((mode,i) => <button type="button" id={`mode-${i}`} role="tab" aria-controls="mode-panel" aria-selected={a.mode === mode} key={mode} className={a.mode === mode ? 'selected' : ''} onClick={() => update('mode',mode)} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const index = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; update('mode',modes[index]); document.getElementById(`mode-${index}`)?.focus() } }}><Icon name={i === 0 ? 'edit' : i === 1 ? 'settings' : 'check'} />{mode}</button>)}</div>
        <div id="mode-panel" role="tabpanel" aria-labelledby={`mode-${modes.indexOf(a.mode)}`} className="mode-content" key={a.mode}>
          <p className="mode-description">{a.mode === '교수자 직접' ? '교수자가 상황과 가이던스를 작성하고 적용 시점을 정합니다.' : a.mode === 'AI 자동' ? '학생의 수행 상태에 맞춰 AI가 상황과 가이던스를 제공합니다.' : 'AI의 제안을 검토하고 승인한 내용만 학생에게 적용합니다.'}</p>
          {a.mode === '교수자 직접' ? <div className="manual-fields"><div className="field"><label htmlFor="situation">상황</label><textarea id="situation" rows={3} value={a.situation} onChange={e => update('situation',e.target.value)} placeholder="학생에게 제시할 상황을 작성하세요" /></div><div className="field"><label htmlFor="timing">적용 시점</label><select id="timing" value={a.timing} onChange={e => update('timing',e.target.value)}>{['과제 시작 시','중간 점검 시','산출물 제출 전','교수자가 직접 적용'].map(t => <option key={t}>{t}</option>)}</select></div><div className="field full"><label htmlFor="manual-guidance">가이던스</label><textarea id="manual-guidance" rows={2} value={a.manualGuidance} onChange={e => update('manualGuidance',e.target.value)} placeholder="학생의 탐색을 도울 안내를 작성하세요" /></div></div> : <><fieldset className="ai-field"><legend>개입 수준</legend><div className="intervention">{['최소','보통','적극'].map((level,i) => <button type="button" key={level} aria-pressed={a.intervention === level} className={a.intervention === level ? 'selected' : ''} onClick={() => update('intervention',level)}><span>{level}{a.intervention === level && <Icon name="check" />}</span><small>{['학생이 도움을 요청할 때','진행이 막히는 순간에','주요 수행 단계마다'][i]}</small></button>)}</div></fieldset><fieldset className="ai-field"><legend>허용 상황 유형</legend><div className="checkbox-options">{situationOptions.map(s => <label key={s}><input type="checkbox" checked={a.situations.includes(s)} onChange={() => update('situations',a.situations.includes(s) ? a.situations.filter(x => x !== s) : [...a.situations,s])} />{s}</label>)}</div></fieldset>{a.mode === '교수자 승인형' && <div className="approval-flow"><span>AI 상황·가이던스 제안</span><Icon name="right" /><strong>교수자 검토·승인</strong><Icon name="right" /><span>학생에게 적용</span></div>}</>}
          <fieldset className="guidance-field"><legend>가이던스 수준 <small>복수 선택</small></legend><div className="guidance-options">{guidanceOptions.map(g => <button type="button" aria-pressed={a.guidance[a.mode].includes(g)} className={a.guidance[a.mode].includes(g) ? 'selected' : ''} key={g} onClick={() => toggleGuidance(g)}>{a.guidance[a.mode].includes(g) && <Icon name="check" />}{g}</button>)}</div><label className="disabled-option"><input type="checkbox" disabled />정답 직접 제공 <span>비활성화</span></label></fieldset>
        </div></section><div className="evidence-note"><span className="evidence-icon"><Icon name="list" /></span><div><strong>과정은 자동으로, Learning Evidence</strong><p>수행 기록 · 수정 과정 · 검증 결과 · AI 활용 과정을 시스템이 자동으로 구조화합니다.</p></div><span className="auto-badge">자동 기록</span></div></div>}
      <div className="form-footer">{error && <p role="alert" className="error-message">{error}</p>}{created && <p role="status" className="success-message"><Icon name="check" />「{a.title}」 과제 생성 완료 · 데모 저장</p>}<div className="footer-inner"><div className="save-state"><span className={saved ? 'saved-dot' : 'unsaved-dot'} />{saved ? '이 브라우저에 저장됨' : '변경사항을 저장해 주세요'}<span className="demo-label">DEMO</span></div><div className="footer-actions">{step === 2 && <button type="button" className="button secondary" onClick={() => changeStep(1)}><Icon name="left" />이전</button>}<button type="button" className="button secondary" onClick={() => save()}><Icon name="save" />임시 저장</button><button type="submit" className="button primary">{step === 1 ? 'AI 운영 방식 설정' : created ? '과제 다시 저장' : '과제 생성'}<Icon name={step === 1 ? 'right' : 'check'} /></button></div></div></div>
      </form>
    </main>
    {message && <div className="toast" role="status"><Icon name="check" /><span>{message}</span><button className="icon-button" aria-label="알림 닫기" onClick={() => setMessage('')}><Icon name="close" /></button></div>}
    <dialog ref={dialog} className="goals-dialog"><div className="dialog-heading"><h2>과목 설정에서 목표 불러오기</h2><Remove label="목표 불러오기 닫기" onClick={() => dialog.current?.close()} /></div><p className="dialog-context">2학년 네트워크 실습 <span>· 예시 커리큘럼</span></p><div className="suggestion-summary"><strong>{a.title}</strong><p>과제명과 연관된 학습 목표를 골라보세요.</p></div>{loading ? <div className="loading-suggestions" role="status">과목 커리큘럼에서 관련 목표를 정리하고 있어요…</div> : <div className="suggestion-list">{suggestions.map(s => <label key={s}><input type="checkbox" checked={selectedGoals.includes(s)} onChange={() => setSelectedGoals(selectedGoals.includes(s) ? selectedGoals.filter(x => x !== s) : [...selectedGoals,s])} /><span>{s}</span></label>)}</div>}<p className="micro-note">데모에서는 과제명에 맞춘 예시 추천을 제공합니다.</p><div className="dialog-footer"><button className="button secondary" onClick={() => dialog.current?.close()}>취소</button><button className="button primary" disabled={!selectedGoals.length || loading} onClick={() => { update('goals',[...new Set([...a.goals,...selectedGoals])]); dialog.current?.close(); setMessage('선택한 목표를 추가했습니다.') }}>{selectedGoals.length}개 목표 가져오기</button></div></dialog>
  </div>
}
export default App
