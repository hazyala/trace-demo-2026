import { useRef, useState } from 'react'
import { type Assignment, demoStudents } from './assignment'
import './teaching.css'
import { EvidenceReview } from './EvidenceReview'
import { teachingTeams, studentEvidence, snapshotMinutes, formatTime } from './evidence'
import { MonitoringMap, StageDistribution } from './MonitoringMap'
import { ProgressRing } from './TeachingCharts'

export type TeachingView = 'monitoring' | 'evaluation'
type Status = '정상' | '확인 필요' | '지연' | '승인 대기'
const teams = teachingTeams
const roles = ['네트워크 설정·검증', '장애 원인 분석', '진단 도구 운영', '과정 기록·공유']
const members = (id: number) => demoStudents.filter((_, i) => i % 6 === id - 1)
const teamOf = (student: string) => demoStudents.indexOf(student) % 6 + 1
const roleOf = (student: string) => roles[Math.floor(demoStudents.indexOf(student) / 6)]
const tone = (status: string) => status === '정상' || status === '충분' ? 'mint' : status === '승인 대기' || status === '진행 중' ? 'lavender' : status === '지연' || status === '부족' ? 'rose' : 'yellow'
function Badge({ value }: { value: string }) { return <span className={`teach-badge ${tone(value)}`}>{value}</span> }
type Review = { judgments: Record<string, string>; feedback: string }
function loadReviews(): Record<string, Review> { try { return JSON.parse(localStorage.getItem('trace-reviews') || '{}') || {} } catch { return {} } }

export function TeachingWorkspace({ view, assignment, onNavigate }: { view: TeachingView; assignment: Assignment; onNavigate: (view: TeachingView) => void }) {
  const [task, setTask] = useState('current')
  const [teamId, setTeamId] = useState(2)
  const [student, setStudent] = useState('이서연')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('전체')
  const [decisions, setDecisions] = useState<Record<string, string>>({})
  const [approvedSituations, setApprovedSituations] = useState<Record<string, string>>({})
  const [reviews, setReviews] = useState(loadReviews)
  const [notice, setNotice] = useState('')
  const [dialogType, setDialogType] = useState<'approval' | 'guidance' | 'detail'>('detail')
  const [draft, setDraft] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const title = task === 'current' ? assignment.title : 'VLAN 분리 및 부서 간 통신 검증'
  const approvalMode = task === 'current' ? assignment.mode === '교수자 승인형' : false
  const displayedTeams = teams.map(t => ({ ...t, status: (t.status === '승인 대기' && (!approvalMode || decisions[`${task}-${t.id}`]) ? '정상' : t.status) as Status, progress: task === 'current' ? t.progress : Math.max(20, t.progress - 12), stage: task === 'current' ? t.stage : t.id === 4 ? '원인 분석' : [2,6].includes(t.id) ? 'VLAN 구성' : '통신 검증' }))
  const selected = { ...displayedTeams.find(t => t.id === teamId)! }
  if (teamId === 3 && (!approvalMode || decisions[`${task}-${teamId}`])) selected.summary = decisions[`${task}-${teamId}`] === '거절' ? '제안된 상황은 적용하지 않았습니다. 두 단말에서 통신을 확인한 상태로, 전체 경로의 검증 진행을 확인해 주세요.' : decisions[`${task}-${teamId}`] ? '검증 범위를 넓히는 상황을 승인했습니다. 후속 수행 기록에서 다른 대역의 검증 여부를 확인해 주세요.' : '두 단말의 연결은 복구했지만 다른 대역의 검증은 남아 있습니다. 다른 대역에서도 같은 결과를 얻는지 확인해 주세요.'
  const activityMinutes = parseInt(selected.recent)
  const teamEvidence = studentEvidence(members(teamId)[0], roles[0], teamId, task === 'vlan').evidence
  const studentTeam = displayedTeams.find(t => t.id === teamOf(student))!
  const reviewKey = `${task}-${student}`
  const review = reviews[reviewKey] || { judgments: {}, feedback: '' }
  const criterionList = task === 'current' ? assignment.criteria : [{ name: '문제 이해', weight: 20 }, { name: '해결 과정', weight: 30 }, { name: '검증', weight: 30 }, { name: '협업', weight: 20 }]
  const studentRole = roleOf(student)
  const matchedStudents = demoStudents.filter(name => `${name} ${teamOf(name)}팀`.includes(query.trim()))
  const averageProgress = Math.round(displayedTeams.reduce((sum,t) => sum + t.progress,0) / displayedTeams.length)
  function openDialog(kind: typeof dialogType) { setDialogType(kind); setDraft(kind === 'approval' ? '다른 대역의 단말에서도 통신이 가능한지 확인해야 하는 상황을 제시합니다.' : '설정을 바꾸기 전과 후에 무엇이 달라졌나요? 원인 후보를 하나 정하고, 이를 확인할 검증 방법을 설명해 보세요.'); dialog.current?.showModal() }
  function decide(value: string) { setDecisions(prev => ({ ...prev, [`${task}-${teamId}`]: value })); if (value === '수정 후 승인') setApprovedSituations(prev => ({ ...prev, [`${task}-${teamId}`]: draft })); setNotice(`${teamId}팀의 AI 제안을 ${value}했습니다.`) }
  function updateReview(next: Partial<Review>) { setReviews(prev => ({ ...prev, [reviewKey]: { ...review, ...next } })); setNotice('') }
  function saveReview() { try { localStorage.setItem('trace-reviews', JSON.stringify(reviews)); setNotice(`${student} 학생의 평가와 피드백을 이 브라우저에 저장했습니다.`) } catch { setNotice('저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.') } }
  function showStudent(name: string) { setStudent(name); setQuery(''); onNavigate('evaluation'); window.scrollTo(0, 0) }
  return <div className="teaching-workspace">
    <div className="teaching-toolbar"><div className="task-selector"><label htmlFor="teaching-task">진행 중인 과제</label><select id="teaching-task" value={task} onChange={e => { setTask(e.target.value); setNotice('') }}><option value="current">{assignment.title}</option><option value="vlan">VLAN 분리 및 부서 간 통신 검증</option></select></div>{view === 'evaluation' ? <div className="student-picker"><div className="student-search"><label htmlFor="student-search">학생 검색</label><input id="student-search" type="search" placeholder="이름 또는 팀 검색" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="student-dropdown"><label htmlFor="student-select">학생 선택 <span aria-live="polite">{matchedStudents.length}명</span></label><select id="student-select" value={matchedStudents.includes(student) ? student : ''} onChange={e => { setStudent(e.target.value); setNotice('') }}><option value="" disabled>{matchedStudents.length ? '학생을 선택하세요' : '검색 결과가 없습니다'}</option>{matchedStudents.map(name => <option key={name} value={name}>{name} · {teamOf(name)}팀 · {roleOf(name)}</option>)}</select></div></div> : <span className="snapshot-label">수업 현황 · {formatTime(snapshotMinutes)} 기준</span>}</div>
    <p className="teaching-demo">시연용 학생·수행 기록 · AI 요약은 교수자의 확인을 위한 참고 정보입니다.</p>
    {notice && <div role="status" className="teaching-notice">{notice}<button type="button" aria-label="처리 알림 닫기" onClick={() => setNotice('')}>닫기</button></div>}
    {view === 'monitoring' ? <>
      <div className="monitor-metrics">{[['전체 팀', displayedTeams.length, 'mint'], ['정상 진행', displayedTeams.filter(t => t.status === '정상').length, 'mint'], ['확인 필요', displayedTeams.filter(t => ['확인 필요','지연'].includes(t.status)).length, 'yellow'], ['승인 대기', displayedTeams.filter(t => t.status === '승인 대기').length, 'lavender']].map(([label, count, color]) => <div className="panel metric" key={label}><span>{label}</span><strong>{count}<small>팀</small></strong><span className={`metric-swatch ${color}`} aria-hidden="true">{label === '전체 팀' ? <span className="icon icon-users" /> : label === '정상 진행' ? <span className="icon icon-check" /> : label === '확인 필요' ? '?' : <span className="icon icon-list" />}</span><div className="metric-segments" aria-hidden="true">{displayedTeams.map((t,i)=><i key={t.id} className={i < Number(count) ? String(color) : ''} />)}</div></div>)}</div>
      <div className="monitor-layout"><section className="panel team-list-panel"><div className="section-heading"><h2>팀 진행 현황</h2><span className="average-progress"><ProgressRing value={averageProgress} label="평균 팀 진행률" /><span>평균 진행률</span></span></div><div className="monitor-filters" aria-label="팀 상태 필터">{['전체','확인 필요','지연','승인 대기'].map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div><MonitoringMap teams={displayedTeams.filter(t => filter === '전체' || t.status === filter)} selected={teamId} onSelect={setTeamId} /><StageDistribution teams={displayedTeams} />{!displayedTeams.some(t => filter === '전체' || t.status === filter) && <p className="teaching-empty">해당 상태의 팀이 없습니다.</p>}<div className="monitor-list-note"><strong>지금 살펴볼 팀</strong><p>2팀의 검증 결과 미수집과 4팀의 진단 이후 활동 지연을 확인해 주세요. 상태 표시는 평가 점수가 아닙니다.</p></div></section>
      <section className="panel team-detail" aria-label="선택 팀 상세"><div className="section-heading"><h2>{teamId}팀</h2><Badge value={selected.status} /></div><div className="team-progress-overview"><ProgressRing value={selected.progress} label="선택 팀 진행률" tone={tone(selected.status)} /><div><strong>{selected.stage}</strong><p>과제 진행률</p><small>최근 활동 {selected.recent}</small></div></div>
        <section className="detail-section"><h3>확인이 필요한 이유</h3><p>{selected.summary}</p><ul className="reason-list">{selected.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul></section>
        {approvalMode && teamId === 3 && <section className="approval-request"><div className="section-heading"><h3>AI 개입 제안</h3><Badge value={decisions[`${task}-${teamId}`] || '승인 대기'} /></div><p><strong>상황</strong> {approvedSituations[`${task}-${teamId}`] || '다른 대역의 단말에서만 통신이 실패하는 상황'}</p><p><strong>이유</strong> 현재 결과는 기록된 두 단말에 한정됩니다.</p><p><strong>학습 목적</strong> 검증 대상을 넓히고 판단 근거를 설명하기</p>{!decisions[`${task}-${teamId}`] && <div className="compact-actions"><button className="button primary" onClick={() => decide('승인')}>승인</button><button className="button secondary" onClick={() => openDialog('approval')}>수정 후 승인</button><button className="text-button" onClick={() => decide('거절')}>거절</button></div>}</section>}
        {approvedSituations[`${task}-${teamId}`] && <p className="evidence-caption"><strong>승인한 수정 상황</strong><br />{approvedSituations[`${task}-${teamId}`]}</p>}
        <section className="detail-section"><h3>팀원 역할 현황</h3><div className="member-rows">{members(teamId).map((name,i) => <div key={name}><button className="text-button" onClick={() => showStudent(name)}>{name}</button><span>{roles[i]}</span><small>{activityMinutes}분 전</small></div>)}</div></section>
        <section className="detail-section"><h3>주요 이벤트</h3><ol className="event-timeline">{[...teamEvidence.map(e => [e.time,e.title]),[formatTime(snapshotMinutes),'시스템 · 수행 기록 현황 확인']].map(([time,event]) => <li key={time}><time>{time}</time><span>{event}</span></li>)}</ol></section>
        <div className="detail-actions"><button className="button secondary" onClick={() => openDialog('detail')}>팀 상세 보기</button><button className="button primary" onClick={() => openDialog('guidance')}>가이던스 제안</button></div>
      </section></div>
    </> : <div className="evaluation-layout">
      <div className="student-review"><EvidenceReview key={reviewKey} name={student} role={studentRole} team={studentTeam.id} progress={studentTeam.progress} task={task} title={title} criteria={criterionList} review={review} onReview={updateReview} onSave={saveReview} onTeam={() => { setTeamId(studentTeam.id); onNavigate('monitoring'); window.scrollTo(0,0) }} />
      </div></div>}
    <dialog ref={dialog} className="teaching-dialog"><div className="section-heading"><h2>{teamId}팀 · {dialogType === 'detail' ? '수행 상세' : dialogType === 'approval' ? '제안 수정 후 승인' : '가이던스 제안'}</h2><button className="text-button" onClick={() => dialog.current?.close()}>닫기</button></div>{dialogType === 'detail' ? <><p>{selected.summary}</p><h3>현재 공유 문서</h3><p>장애 진단 보고서 · 원인 후보와 설정 변경 기록 작성 중</p><h3>팀원별 수행 근거</h3><div className="member-rows">{members(teamId).map(name => <div key={name}><span>{name} · {roleOf(name)}</span><button className="text-button" onClick={() => { dialog.current?.close(); showStudent(name) }}>평가 근거 보기</button></div>)}</div></> : <><label htmlFor="guidance-draft">{dialogType === 'approval' ? '학생에게 적용할 상황' : '학생의 사고를 이끌 질문'}</label><textarea id="guidance-draft" rows={5} value={draft} onChange={e => setDraft(e.target.value)} /><p className="micro-note">시연에서는 제안과 처리 상태만 기록됩니다.</p><button className="button primary" disabled={!draft.trim()} onClick={() => { if (dialogType === 'approval') decide('수정 후 승인'); else setNotice(`${teamId}팀 가이던스 제안을 저장했습니다: ${draft}`); dialog.current?.close() }}>{dialogType === 'approval' ? '수정 내용 승인' : '제안 저장'}</button></>}</dialog>
  </div>
}
