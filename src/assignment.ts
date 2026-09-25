export type Mode = '교수자 직접' | 'AI 자동' | '교수자 승인형'
export type Assignment = {
  title: string; description: string; start: string; end: string; difficulty: string;
  goals: string[]; requirements: string[];
  outputs: { name: string; format: string; required: string; template?: { name: string; data: string } }[];
  criteria: { name: string; weight: number }[];
  mode: Mode; situation: string; timing: string; manualGuidance: string;
  situationOptions: string[]; guidanceOptions: string[];
  intervention: string; situations: string[]; guidance: Record<Mode, string[]>;
}
export const modes: Mode[] = ['교수자 직접', 'AI 자동', '교수자 승인형']
export const guidanceOptions = ['확인 질문', '탐색 방향 안내', '개념 힌트', '도구 활용 힌트', '부분 예시']
export const situationOptions = ['요구사항 변경', '오류·장애', '자원 제한', '역할 변화', '사용자 피드백']
export const courseCriteria = [
  { name: '문제 이해', weight: 20 }, { name: '해결 과정', weight: 30 },
  { name: '검증', weight: 20 }, { name: '산출물', weight: 20 }, { name: '협업', weight: 10 },
]
export const initialAssignment: Assignment = {
  situationOptions, guidanceOptions,
  title: '교내 네트워크 장애 진단 및 복구',
  description: '실습실 네트워크에 발생한 연결 장애의 원인을 팀별로 진단하고 복구하세요. 진단 근거와 해결 과정을 기록하고, 복구 후 연결 상태를 검증합니다.',
  start: '2026-10-05', end: '2026-10-16', difficulty: '중',
  goals: ['네트워크 장애 원인 분석', '진단 도구를 활용한 연결 상태 검증'],
  requirements: ['IP 설정과 라우팅 경로를 확인하고 장애 원인을 설명한다.', '복구 전·후 연결 상태를 비교하여 결과를 검증한다.', '팀원의 역할과 문제 해결 과정을 기록한다.'],
  outputs: [{ name: '장애 진단 보고서', format: 'PDF', required: '필수' }, { name: '복구 결과 및 검증 기록', format: 'PDF', required: '필수' }],
  criteria: courseCriteria.map(c => ({ ...c })), mode: '교수자 승인형',
  situation: '복구 중 일부 단말에서만 외부 네트워크 접속이 되지 않습니다.', timing: '중간 점검 시',
  manualGuidance: '정상 단말과 장애 단말의 설정을 비교하고, 차이가 발생하는 지점을 찾아보세요.',
  intervention: '보통', situations: ['오류·장애', '자원 제한', '사용자 피드백'],
  guidance: { '교수자 직접': ['확인 질문', '탐색 방향 안내'], 'AI 자동': ['확인 질문', '탐색 방향 안내', '개념 힌트'], '교수자 승인형': ['확인 질문', '탐색 방향 안내', '개념 힌트'] },
}
// Demo curriculum matching; replace this function with an AI endpoint for real summarization.
export function suggestGoals(title: string) {
  if (/보안|방화벽/.test(title)) return ['접근 제어 정책을 분석하고 보안 취약점을 식별한다.', '방화벽 규칙을 설정하고 차단 결과를 검증한다.', '네트워크 보안 개선 방안을 근거와 함께 설명한다.']
  if (/라우팅|라우터/.test(title)) return ['라우팅 테이블을 해석하고 패킷 전달 경로를 설명한다.', '정적 라우팅을 구성하고 네트워크 간 통신을 검증한다.', '경로 오류의 원인을 분석하고 대안을 비교한다.']
  return ['네트워크 계층별 증상을 분석하여 장애 원인을 식별한다.', 'ping과 traceroute로 연결 상태와 패킷 전달 경로를 검증한다.', 'IP 주소와 서브넷 설정을 점검하고 복구 방안을 적용한다.', '진단 근거와 복구 전·후 결과를 기술 문서로 작성한다.']
}
export function validateAssignment(a: Assignment, includeAI = false): string | null {
  if (!a.title.trim()) return '과제명을 입력해 주세요.'
  if (!a.description.trim()) return '과제 설명을 입력해 주세요.'
  if (!a.start || !a.end || a.start > a.end) return '수행 기간을 확인해 주세요. 종료일은 시작일 이후여야 합니다.'
  if (!a.goals.length || a.goals.some(x => !x.trim())) return '과제 목표를 한 개 이상 입력해 주세요.'
  if (!a.requirements.length || a.requirements.some(x => !x.trim())) return '비어 있는 평가 요구사항을 입력하거나 삭제해 주세요.'
  if (!a.outputs.length || a.outputs.some(x => !x.name.trim())) return '산출물명을 입력해 주세요.'
  if (!a.criteria.length || a.criteria.some(x => !x.name.trim() || !Number.isFinite(x.weight) || x.weight <= 0 || x.weight > 100)) return '평가 요소와 1~100% 범위의 반영 비율을 입력해 주세요.'
  if (a.criteria.reduce((s, c) => s + c.weight, 0) !== 100) return '평가 기준의 반영 비율 합계를 100%로 맞춰 주세요.'
  if (includeAI && a.mode === '교수자 직접' && (!a.situation.trim() || !a.manualGuidance.trim())) return '상황과 가이던스를 모두 작성해 주세요.'
  if (includeAI && a.mode !== '교수자 직접' && !a.situations.length) return '허용 상황 유형을 한 개 이상 선택해 주세요.'
  if (includeAI && !a.guidance[a.mode].length) return '가이던스 수준을 한 개 이상 선택해 주세요.'
  return null
}
export const storageKey = 'trace-assignment-v1'
export function readDraft(): Assignment {
  try {
    const a = JSON.parse(localStorage.getItem(storageKey) || 'null')
    if (!a || !['title','description','start','end','difficulty','situation','timing','manualGuidance','intervention'].every(k => typeof a[k] === 'string') || !modes.includes(a.mode)) return structuredClone(initialAssignment)
    if (!['goals','requirements','situations'].every(k => Array.isArray(a[k]) && a[k].every((x: unknown) => typeof x === 'string'))) return structuredClone(initialAssignment)
    if (!Array.isArray(a.outputs) || !a.outputs.every((x: Assignment['outputs'][number]) => x && typeof x.name === 'string' && typeof x.format === 'string' && typeof x.required === 'string')) return structuredClone(initialAssignment)
    if (!Array.isArray(a.criteria) || !a.criteria.every((x: Assignment['criteria'][number]) => x && typeof x.name === 'string' && typeof x.weight === 'number')) return structuredClone(initialAssignment)
    if (!a.guidance || !modes.every(m => Array.isArray(a.guidance[m]) && a.guidance[m].every((x: unknown) => typeof x === 'string'))) return structuredClone(initialAssignment)
    for (const key of ['situationOptions', 'guidanceOptions'] as const) {
      if (!Array.isArray(a[key]) || !a[key].every((x: unknown) => typeof x === 'string')) a[key] = [...initialAssignment[key]]
    }
    a.outputs = a.outputs.map((out: Assignment['outputs'][number]) => ({ ...out, template: out.template && typeof out.template.name === 'string' && typeof out.template.data === 'string' && out.template.data.startsWith('data:') ? out.template : undefined }))
    return a
  } catch { return structuredClone(initialAssignment) }
}
