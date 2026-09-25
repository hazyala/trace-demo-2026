import { test, expect } from '@playwright/test'
import { formatTime, snapshotMinutes, studentEvidence, teachingTeams } from '../src/evidence'

test('팀·학생 시나리오의 시간과 결과 및 지원 이후 행동이 일치한다', () => {
  for (const team of teachingTeams) {
    for (const role of ['네트워크 설정·검증','장애 원인 분석','진단 도구 운영','과정 기록·공유']) {
      for (const vlan of [false,true]) {
        const data=studentEvidence('시연 학생',role,team.id,vlan)
        expect(data.evidence.at(-1)?.time).toBe(formatTime(snapshotMinutes-team.minutesAgo))
        expect(data.evidence.some(e=>e.stage===3)).toBe(![2,4,6].includes(team.id))
        expect(data.evidence.some(e=>e.id==='E03')).toBe(team.id!==4)
        for (const g of data.guidance) expect(data.evidence.find(e=>e.id===g.evidence)!.time > g.time).toBe(true)
        if (vlan) expect(data.evidence.map(e=>e.raw).join(' ')).not.toMatch(/R1|R2|192\.168\.20/)
      }
    }
  }
})

test('과정증거에서 원자료를 대조하고 확인을 저장하며 지원 이후 행동을 살핀다', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name:'학생별 평가 지원',exact:true }).click()
  await expect(page.locator('.source-layer pre')).toContainText('R2# show ip route')
  await expect(page.locator('.student-layer')).toContainText('반환 경로 누락')
  await page.getByLabel('증거 확인 상태').selectOption('해석 수정 필요')
  await page.getByLabel('확인 메모', {exact:true}).fill('반환 경로 설명은 확인. 수정 이후 양방향 검증이 필요함.')
  await page.getByRole('button', {name:'확인 저장',exact:true}).click()
  await page.getByRole('button', {name:'검증 0',exact:true}).click()
  await expect(page.getByText('검증 결과가 아직 없습니다',{exact:true})).toBeVisible()
  await page.getByRole('button', {name:'학생의 다음 검증 계획 보기',exact:true}).click()
  await expect(page.locator('.source-layer')).toContainText('양쪽 PC에서 ping')
  await page.locator('.guidance-events').getByRole('button', {name:/L4/}).click()
  await expect(page.locator('.support-outcome')).toContainText('실행 결과는 미수집')
  await page.reload()
  await page.getByRole('button', {name:'학생별 평가 지원',exact:true}).click()
  await expect(page.getByLabel('증거 확인 상태')).toHaveValue('해석 수정 필요')
  await expect(page.getByLabel('확인 메모', {exact:true})).toHaveValue('반환 경로 설명은 확인. 수정 이후 양방향 검증이 필요함.')
  await page.getByLabel('학생 검색').fill('없는학생')
  await expect(page.getByLabel('학생 선택').locator('option:checked')).toHaveText('검색 결과가 없습니다')
  await expect(page.getByLabel('교수자 근거 확인 비율 0%', {exact:true})).toBeVisible()
  await page.getByLabel('학생 검색').fill('김민준')
  await page.getByLabel('학생 선택').selectOption('김민준')
  await expect(page.getByLabel('증거 확인 상태')).toHaveValue('미확인')
  await expect(page.getByRole('button', {name:'검증 2',exact:true})).toBeVisible()
  await expect(page.getByRole('img', {name:'1팀 과제 진행률 72%',exact:true})).toBeVisible()
  await expect(page.locator('.student-list')).toHaveCount(0)
  await page.getByLabel('진행 중인 과제').selectOption('vlan')
  await expect(page.locator('.source-layer pre')).toContainText('show vlan brief')
})

test('연결된 실습 환경 설정이 학생 미리보기와 저장에 반영된다', async ({page}) => {
  await page.goto('/')
  await page.getByRole('button', {name:/연결된 실습 모듈 네트워크/}).click()
  await page.getByLabel('실습 템플릿').selectOption('정적 라우팅 장애 진단')
  await page.getByRole('button', {name:'AI 운영 방식 설정',exact:true}).click()
  await expect(page.getByText('정답 직접 제공', {exact:true})).toHaveCount(0)
  await page.getByRole('button', {name:'학생 화면 미리보기',exact:true}).click()
  await page.getByRole('button', {name:'실습 환경 미리보기',exact:true}).click()
  await expect(page.getByRole('dialog')).toContainText('Request timed out.')
  await page.keyboard.press('Escape')
  await page.getByRole('button', {name:'과제 생성',exact:true}).click()
  await page.reload()
  await expect(page.getByRole('button', {name:/연결된 실습 모듈 네트워크/})).toHaveAttribute('aria-pressed','true')
  await page.getByLabel('실습 템플릿').selectOption('VLAN 소속 오류 진단')
  await page.getByRole('button', {name:'AI 운영 방식 설정',exact:true}).click()
  await page.getByRole('button', {name:'학생 화면 미리보기',exact:true}).click()
  await page.getByRole('button', {name:'실습 환경 미리보기',exact:true}).click()
  await expect(page.getByRole('dialog')).toContainText('SW1')
  await expect(page.getByRole('dialog')).not.toContainText('R2')
  await expect(page.getByRole('dialog').locator('pre')).toContainText('ping 192.168.10.20')
})
