import { test, expect } from '@playwright/test'

test('과제 편집, 목표 가져오기, 검증, 운영 방식과 저장', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: '프로젝트 과제 생성' })).toBeVisible()
  await page.getByLabel('과제명', { exact: false }).fill('라우팅 경로 복구 실습')
  await page.getByRole('button', { name: '과목 설정에서 불러오기' }).click()
  await page.getByLabel('라우팅 테이블을 해석하고 패킷 전달 경로를 설명한다.').check()
  await page.getByRole('button', { name: '1개 목표 가져오기' }).click()
  await expect(page.getByRole('button', { name: '라우팅 테이블을 해석하고 패킷 전달 경로를 설명한다.' })).toBeVisible()
  await page.getByRole('button', { name: '요구사항 추가', exact: true }).click()
  await page.getByLabel('요구사항 4', { exact: true }).fill('복구 경로를 검증한다.')
  await page.getByLabel('반영 비율 1', { exact: true }).fill('10')
  await page.getByRole('button', { name: 'AI 운영 방식 설정' }).click()
  await expect(page.getByRole('alert')).toContainText('100%')
  await page.getByLabel('반영 비율 1', { exact: true }).fill('20')
  await page.getByRole('button', { name: 'AI 운영 방식 설정' }).click()
  await expect(page.getByRole('tab', { name: '교수자 승인형' })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('tab', { name: '교수자 직접' }).click()
  await page.getByLabel('상황', { exact: true }).fill('중간 점검 중 패킷 손실이 발생했습니다.')
  await page.getByRole('tab', { name: 'AI 자동', exact: true }).click()
  await page.getByRole('button', { name: '적극 주요 수행 단계마다' }).click()
  await page.getByRole('tab', { name: '교수자 승인형' }).click()
  await page.getByRole('button', { name: '과제 생성', exact: true }).click()
  await expect(page.getByText('생성 완료', { exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByLabel('과제명', { exact: false })).toHaveValue('라우팅 경로 복구 실습')
  await expect(page.getByLabel('요구사항 4', { exact: true })).toHaveValue('복구 경로를 검증한다.')
  expect(errors).toEqual([])
})

test('시작일과 필수 항목 검증', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('종료일', { exact: true }).fill('2026-10-01')
  await page.getByRole('button', { name: 'AI 운영 방식 설정' }).click()
  await expect(page.getByRole('alert')).toContainText('수행 기간')
  await page.getByLabel('종료일', { exact: true }).fill('2026-10-16')
  await page.getByLabel('과제명', { exact: false }).fill('')
  await page.getByRole('button', { name: 'AI 운영 방식 설정' }).click()
  await expect(page.getByRole('alert')).toContainText('과제명')
})

test('화면 크기별 레이아웃과 데모 캡처', async ({ page }) => {
  for (const [name, width, height] of [['desktop',1440,1080],['tablet-landscape',1180,820],['tablet-portrait',820,1180],['mobile',390,844]] as const) {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({width,height})
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({path:`.impeccable/review/${name}.png`,fullPage:true})
    await page.getByRole('button', { name: 'AI 운영 방식 설정' }).click()
    await expect(page.getByRole('tab', { name: '교수자 승인형' })).toBeVisible()
    await expect(page.getByRole('heading', {name:'프로젝트 과제 생성'})).toBeFocused()
    await page.evaluate(() => window.scrollTo(0, 0))
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({path:`.impeccable/review/${name}-ai.png`,fullPage:true})
    if (width < 1050) {
      await page.getByRole('button', { name: '수업 메뉴 열기' }).click()
      await expect(page.getByRole('button', { name: '프로젝트 과제 생성', exact:true })).toBeVisible()
      await page.locator('.mobile-close').click()
    }
  }
})
