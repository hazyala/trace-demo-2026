import { useRef, useState } from 'react'
import { evidenceStages, guidanceLevels, studentEvidence } from './evidence'
import type { Assignment } from './assignment'

type Review = { judgments: Record<string, string>; feedback: string }
type Check = { status: string; note: string }
function loadChecks(): Record<string, Check> {
  try { return JSON.parse(localStorage.getItem('trace-evidence-checks') || '{}') || {} } catch { return {} }
}
export function EvidenceReview({ name, role, team, task, title, criteria, review, onReview, onSave, onTeam }: {
  name: string; role: string; team: number; task: string; title: string; criteria: Assignment['criteria'];
  review: Review; onReview: (next: Partial<Review>) => void; onSave: () => void; onTeam: () => void;
}) {
  const data = studentEvidence(name, role, team, task === 'vlan')
  const [active, setActive] = useState('E02')
  const [stage, setStage] = useState<number | null>(null)
  const [supportIndex, setSupportIndex] = useState(1)
  const [checks, setChecks] = useState(loadChecks)
  const [checkNotice, setCheckNotice] = useState('')
  const explorer = useRef<HTMLElement>(null)
  const filtered = data.evidence.filter(e => stage === null || e.stage === stage)
  const evidence = filtered.find(e => e.id === active) || filtered[0]
  const support = data.guidance[Math.min(supportIndex, data.guidance.length - 1)]
  const checkKey = `${task}-${name}-${evidence?.id}`
  const check = checks[checkKey] || { status: '미확인', note: '' }
  const checkedCount = data.evidence.filter(e => checks[`${task}-${name}-${e.id}`]?.status === '확인 완료').length
  function openEvidence(id: string) {
    setStage(null); setActive(id); setCheckNotice('')
    explorer.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
    requestAnimationFrame(() => document.getElementById('evidence-detail-title')?.focus({ preventScroll: true }))
  }
  function saveCheck() {
    try { localStorage.setItem('trace-evidence-checks', JSON.stringify(checks)); setCheckNotice(`${evidence.id} 교수자 확인을 저장했습니다.`) }
    catch { setCheckNotice('저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.') }
  }
  const states = [
    ['문제 이해', '근거 있음', 'E01'], ['원인 분석', '비교 기록', 'E02'],
    ['수정 과정', data.hasModification ? '변경 근거' : '계획만 있음', data.hasModification ? 'E03' : 'E05'], ['결과 검증', data.incomplete ? '추가 확인' : '범위 확인', data.incomplete ? 'E05' : 'E04'],
  ]
  return <>
    <section className="panel evidence-overview">
      <div className="section-heading"><div className="student-identity"><span className="student-initial" aria-hidden="true">{name.slice(0,1)}</span><div><h2>{name} <span className="student-team-label">{team}팀</span></h2><p>{role}</p></div></div><button className="text-button" onClick={onTeam}>팀 보기</button></div>
      <p className="review-assignment">{title}</p>
      <div className="review-overview-line"><h3>문제해결 과정</h3><span>{!data.hasModification ? '수정안 선택과 검증 근거 확인 필요' : data.incomplete ? '수정 후 검증 근거 확인 필요' : '재검증 기록까지 수집됨'}</span></div>
      <div className="process-track" aria-label="학생 문제해결 단계">
        {evidenceStages.map((label,i) => <button key={label} className={`process-node ${!data.evidence.some(e=>e.stage===i) ? 'pending' : 'observed'}`} onClick={() => { setStage(i); setActive(''); explorer.current?.scrollIntoView({ behavior:'instant' }) }}><span className="process-dot">{i+1}</span><strong>{label}</strong><small>{!data.evidence.some(e=>e.stage===i) ? '자료 미수집' : `${data.evidence.filter(e => e.stage === i).length}개 근거`}</small></button>)}
      </div>
      <div className="evidence-summary-strip"><span>과정증거 <strong>{data.evidence.length}개</strong></span><span>교수자 확인 <strong>{checkedCount}/{data.evidence.length}</strong></span><span>지원 후 행동 <strong>{!data.hasModification ? '수정안 검토 대기' : data.incomplete ? '검증 대기' : '재검증 수행'}</strong></span></div>
      <nav className="review-jump" aria-label="평가 검토 바로가기"><a href="#learning-evidence">과정증거 열기</a><a href="#guidance-history">L1–L4 지원 이력</a><a href="#teacher-review">교수자 평가</a></nav>
    </section>
    <div className="insight-pair">
      <section className="insight strength"><div className="insight-heading"><span className="insight-symbol" aria-hidden="true"><span className="icon icon-check" /></span><h3>근거에서 보이는 강점</h3></div><strong>관찰한 사실로 원인 범위를 좁힘</strong><p>정상 구간과 실패 구간을 나눠 보고, 실제 설정을 가설과 비교했습니다.</p><button className="text-button" onClick={() => openEvidence('E02')}>E02 · 비교 근거 보기 <span aria-hidden="true">↗</span></button></section>
      <section className="insight gap"><div className="insight-heading"><span className="insight-symbol" aria-hidden="true">?</span><h3>다음에 확인할 부분</h3></div><strong>{!data.hasModification ? '어떤 근거로 수정안을 고를 것인가?' : data.incomplete ? '수정 이후 실제로 복구되었는가?' : '다른 조건에서도 같은 판단을 할 수 있는가?'}</strong><p>{!data.hasModification ? '진단 계획만 있고 실제 수정 자료는 없습니다. 가설과 수정안의 연결을 확인해 주세요.' : data.incomplete ? '검증 계획은 있지만 실행 결과가 없습니다. 양방향 통신 결과를 확인해 주세요.' : '두 단말의 결과는 있습니다. 다른 대역에서도 성립하는지 자기 설명을 확인해 주세요.'}</p><button className="text-button" onClick={() => openEvidence(data.incomplete ? 'E05' : 'E04')}>{!data.hasModification ? 'E05 · 진단 계획 보기' : data.incomplete ? 'E05 · 검증 계획 보기' : 'E04 · 검증 범위 보기'} <span aria-hidden="true">↗</span></button></section>
    </div>
    <section className="panel competency-panel"><div className="section-heading"><h2>학습 상태와 수행 근거</h2><span className="count-label">AI 정리 · 확인 전</span></div>
      <div className="coverage-grid">{states.map(([label,value,id],i) => <button key={label} onClick={() => openEvidence(id)} className={`coverage-item ${i===3 ? 'yellow' : i===2 ? 'lavender' : 'mint'}`}><span>{label}</span><strong>{value}</strong><small>{id} · {i===3 && !data.hasModification ? '자료 미수집' : i===3 && data.incomplete ? '계획만 있음' : '자료 열기'}</small></button>)}</div>
      <p className="evidence-caption">표시는 근거의 수집 상태입니다. 자료가 없다는 이유만으로 학생의 이해 부족을 판단하지 않습니다.</p>
      <div className="concept-evidence"><h3>교과 개념별 확인 포인트</h3>{[[task==='vlan'?'VLAN과 소속 대역':'주소 대역과 통신 경로','E01','관찰로 범위 구분'],[task==='vlan'?'VLAN 소속 비교':'양방향 라우팅','E02','설정 비교 근거 있음'],['검증 조건과 결과 해석',data.incomplete?'E05':'E04',data.incomplete?'실행 결과 추가 확인':'검증 범위 추가 확인']].map(([concept,id,state],i)=><button key={concept} onClick={()=>openEvidence(id)}><span>{concept}</span><span className={`concept-signal ${i===2?'yellow':'mint'}`}>{state}</span><small>{id} 열기</small></button>)}</div>
      <div className="role-evidence"><strong>역할에 따른 실제 행동</strong><span>{role}</span><ul>{data.evidence.slice(0,3).map(e => <li key={e.id}><button className="text-button" onClick={() => openEvidence(e.id)}>{e.title}</button><small>{e.shared ? '팀 자료 해석' : '학생 기록'} · {e.time}</small></li>)}</ul></div>
    </section>
    <section ref={explorer} className="panel evidence-explorer" id="learning-evidence"><div className="section-heading"><h2>Learning Evidence</h2><span className="count-label">원자료와 해석을 함께 검토</span></div>
      <div className="monitor-filters" aria-label="증거 단계 필터"><button aria-pressed={stage===null} onClick={() => {setStage(null);setCheckNotice('')}}>전체 {data.evidence.length}</button>{evidenceStages.map((label,i) => <button key={label} aria-pressed={stage===i} onClick={() => {setStage(i);setCheckNotice('')}}>{label} {data.evidence.filter(e=>e.stage===i).length}</button>)}</div>
      <div className="evidence-browser"><div className="evidence-list" aria-label="학습 증거 목록">{filtered.map(e => <button key={e.id} aria-pressed={evidence?.id===e.id} onClick={() => {setActive(e.id);setCheckNotice('')}}><span><b>{e.id}</b><time>{e.time}</time></span><strong>{e.title}</strong><small>{e.source}</small><span className={`evidence-review-state ${checks[`${task}-${name}-${e.id}`]?.status === '확인 완료' ? 'mint' : ''}`}>{checks[`${task}-${name}-${e.id}`]?.status || '미확인'}</span></button>)}{!filtered.length && <div className="missing-evidence"><strong>{stage===2 ? '수정 기록이 아직 없습니다' : '검증 결과가 아직 없습니다'}</strong><p>{data.hasModification ? '설정 수정은 확인되지만 실행 결과는 미수집 상태입니다.' : '진단 계획 이후 수정·검증 자료가 아직 없습니다.'}</p><button className="text-button" onClick={() => openEvidence('E05')}>{data.hasModification ? '학생의 다음 검증 계획 보기' : '학생의 다음 진단 계획 보기'}</button></div>}</div>
        {evidence && <article className="evidence-detail"><div className="section-heading"><h3 id="evidence-detail-title" tabIndex={-1}>{evidence.id} · {evidence.title}</h3><span className="count-label">{evidenceStages[evidence.stage]}</span></div><p className="evidence-goal">학습 목표 · {evidence.goal}</p>
          <section className="source-layer"><div className="layer-heading"><strong>원자료</strong><small>{evidence.shared ? `${team}팀 공유 자료` : name} · {evidence.time}</small></div><pre>{evidence.raw}</pre><small>{evidence.source} · 시연용 기록</small></section>
          <section className="student-layer"><div className="layer-heading"><strong>학생 설명</strong><small>{name} 작성</small></div><p>{evidence.explanation}</p></section>
          <section className="interpretation-layer"><div className="layer-heading"><strong>AI 해석</strong><span className={`teach-badge ${check.status==='확인 완료'?'mint':'lavender'}`}>{check.status==='미확인'?'교수자 확인 전':check.status}</span></div><p>{evidence.interpretation}</p><small>{evidence.limitation}</small></section>
          <section className="teacher-layer"><div className="layer-heading"><strong>교수자 확인</strong><select aria-label="증거 확인 상태" value={check.status} onChange={e => {setChecks(prev=>({...prev,[checkKey]:{...check,status:e.target.value}}));setCheckNotice('')}}>{['미확인','확인 완료','추가 확인','해석 수정 필요'].map(s=><option key={s}>{s}</option>)}</select></div><label htmlFor="evidence-note">확인 메모</label><textarea id="evidence-note" rows={2} placeholder="자료와 학생 설명을 대조한 판단을 기록하세요." value={check.note} onChange={e => {setChecks(prev=>({...prev,[checkKey]:{...check,note:e.target.value}}));setCheckNotice('')}} /><div className="check-save"><small role="status">{checkNotice}</small><button className="button secondary" onClick={saveCheck}>확인 저장</button></div></section>
        </article>}
      </div>
    </section>
    <section id="guidance-history" className="panel guidance-panel"><div className="section-heading"><h2>L1–L4 가이던스 흐름</h2><span className="count-label">지원 수준 · 능력 점수 아님</span></div><p className="section-note">막힐 때는 지원을 넓히고, 스스로 진행하면 확인 질문으로 줄입니다.</p>
      <div className="guidance-visual"><div className="guidance-chart"><svg viewBox="0 0 560 215" role="img" aria-label={data.guidance.map(g=>`${g.time} L${g.level} ${guidanceLevels[g.level-1]}`).join(', ')}>{[4,3,2,1].map((level,i)=><g key={level}><text x="0" y={24+i*46}>L{level}</text><line x1="35" x2="540" y1={20+i*46} y2={20+i*46} /></g>)}<path d={data.guidance.map((g,i)=>`${i===0?'M':'H'} ${55+i*(465/(data.guidance.length-1))}${i===0?` ${158-(g.level-1)*46}`:` V ${158-(g.level-1)*46}`}`).join(' ')} />{data.guidance.map((g,i)=><g key={i}><circle className={i===supportIndex?'active':''} cx={55+i*(465/(data.guidance.length-1))} cy={158-(g.level-1)*46} r={i===supportIndex?7:5} /><text x={55+i*(465/(data.guidance.length-1))} y="199" textAnchor="middle">{g.time}</text></g>)}</svg></div>
      <div className="level-legend">{guidanceLevels.map((label,i)=><div key={label}><b className={`level-label level-${i+1}`}>L{i+1}</b><span>{label}</span><strong>{data.guidance.filter(g=>g.level===i+1).length}회</strong></div>)}</div></div>
      <p className="evidence-caption">사건 순서대로 표시 · 간격은 실제 경과 시간과 다름</p>
      <div className="guidance-events" aria-label="가이던스 이력 선택">{data.guidance.map((g,i)=><button key={i} aria-pressed={i===supportIndex} onClick={()=>setSupportIndex(i)}><span className={`level-label level-${g.level}`}>L{g.level}</span><time>{g.time}</time></button>)}</div>
      <div className="support-outcome"><div><small>지원이 필요했던 이유</small><strong>{support.reason}</strong><p>{support.support}</p></div><div><small>지원 이후 학생의 행동</small><strong>{support.response}</strong><button className="text-button" onClick={()=>openEvidence(support.evidence)}>{support.evidence} · 연결된 수행 근거 보기</button></div></div>
      <p className="evidence-caption">개인 AI 채팅 원문은 공개하지 않습니다. 지원 유형과 후속 행동만 요약합니다. 시연 기록에는 직접 답안 제공이 없습니다.</p>
    </section>
    <section id="teacher-review" className="panel instructor-evaluation"><div className="section-heading"><h2>교수자 평가와 피드백</h2><span className="count-label">과제에서 설정한 기준</span></div><p className="section-note">증거를 확인한 뒤 판단해 주세요. AI는 평가를 확정하지 않습니다.</p><div className="evaluation-table-scroll"><table className="evaluation-table"><thead><tr><th>평가 요소</th><th>판단 참고 자료</th><th>교수자 판단</th></tr></thead><tbody>{criteria.map((criterion,i)=> {
      const id=/검증/.test(criterion.name)?data.incomplete?'E05':'E04':/협업|산출물/.test(criterion.name)?'E05':/이해/.test(criterion.name)?'E01':data.hasModification?'E03':'E05'
      return <tr key={`${criterion.name}-${i}`}><td><strong>{criterion.name}</strong><small>{criterion.weight}%</small></td><td><button className="text-button" onClick={()=>openEvidence(id)}>{id} · {/검증/.test(criterion.name)?!data.hasModification?'진단 계획 · 검증 미수집':data.incomplete?'검증 계획 · 결과 미수집':'양방향 검증 기록':/협업|산출물/.test(criterion.name)?'자기 설명·팀 공유':'판단과 수행 근거'}</button></td><td><select aria-label={`${criterion.name} 교수자 판단`} value={review.judgments[criterion.name]||''} onChange={e=>onReview({judgments:{...review.judgments,[criterion.name]:e.target.value}})}><option value="">판단 선택</option>{['우수','충분','적절','보완 필요','판단 보류'].map(v=><option key={v}>{v}</option>)}</select></td></tr>
    })}</tbody></table></div><div className="field feedback-field"><label htmlFor="instructor-feedback">교수자 피드백</label><textarea id="instructor-feedback" rows={3} placeholder="잘한 점을 근거와 함께 설명하고 다음 확인 질문을 남겨 주세요." value={review.feedback} onChange={e=>onReview({feedback:e.target.value})} /></div><div className="review-save"><span>학생별로 이 브라우저에 저장됩니다.</span><button className="button primary" onClick={onSave}>평가 저장</button></div></section>
  </>
}
