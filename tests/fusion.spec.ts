import {test,expect,type Page} from '@playwright/test'
async function menu(page:Page){const button=page.getByRole('button',{name:'수업 메뉴 열기',exact:true});if(await button.isVisible())await button.click()}
async function nav(page:Page,name:string){await menu(page);await page.getByRole('button',{name,exact:true}).click()}
async function role(page:Page,student:boolean){await menu(page);await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:student?/유송민 학생/:/강병준 교수자/}).click()}
async function fusion(page:Page){await page.goto('/');await menu(page);await page.getByLabel('현재 수업').selectOption('fusion')}
test('융합 기획·교과 연결·개인 지도·경계 실험이 교수자 근거로 이어진다',async({page})=>{
 await fusion(page);await expect(page.getByRole('heading',{name:'같은 열린 과제, 서로 다른 해결 방법'})).toBeVisible();await role(page,true)
 await nav(page,'프로젝트 작업실');await page.getByLabel('사용 언어',{exact:true}).fill('TypeScript + Python · 기존 학습 활용');await page.getByRole('button',{name:'선택 이유와 기획 저장'}).click()
 await nav(page,'개인 AI 지원');await page.getByLabel('관찰한 상황과 나의 질문').fill('자료에 없는 질문의 답은 어떻게 처리하나요?');await page.getByRole('button',{name:'질문하기',exact:true}).click();await expect(page.getByRole('log')).toContainText('등록된 질문과 미등록 질문');await expect(page.locator('main')).not.toContainText(/L[1-4]/)
 await page.getByLabel('공유할 지도 요청').fill('없는 질문의 검증 기준을 함께 보고 싶어요.');await page.getByRole('button',{name:'지도 요청 보내기'}).click()
 await nav(page,'프로젝트 작업실');await page.getByRole('button',{name:'기능 실험',exact:true}).click();await expect(page.getByRole('button',{name:'실험 근거 팀에 공유'})).toBeDisabled();await page.getByLabel('질문 조건').selectOption('자료에 없는 질문');await page.getByRole('button',{name:'응답 규칙 시험하기'}).click();await expect(page.locator('.fusion-test-output')).toContainText('문제 발견')
 await page.getByLabel('근거 자료가 없으면 답변 보류').check();await page.getByLabel('질문 로그에서 학번 가리기').check()
 for(const condition of ['등록된 질문','자료에 없는 질문','개인정보 포함 질문']){await page.getByLabel('질문 조건').selectOption(condition);await page.getByRole('button',{name:'응답 규칙 시험하기'}).click()}
 await page.getByLabel('어떤 개념을 적용했고, 무엇을 더 확인해야 하나요?').fill('DB의 출처 연결과 윤리의 최소 수집 원칙을 적용했다. 모의 검증 이후 실제 API 오류도 확인해야 한다.');await page.getByRole('button',{name:'실험 근거 팀에 공유'}).click()
 await nav(page,'나의 학습 기록');await expect(page.locator('.fusion-evidence-list')).toContainText('경계 조건 검증');await page.getByLabel('교과·영역',{exact:true}).fill('확률과 통계');await page.getByLabel('적용할 개념과 쓰임').fill('표본 편향을 사용자 검증 계획에 적용');await page.getByRole('button',{name:'연결 추가'}).click()
 await role(page,false);await nav(page,'팀별 모니터링');await expect(page.locator('main')).toContainText('없는 질문의 검증 기준을 함께 보고 싶어요.');await expect(page.locator('main')).toContainText('TypeScript + Python · 기존 학습 활용');await expect(page.locator('main')).not.toContainText('자료에 없는 질문의 답은 어떻게 처리하나요?');await page.getByLabel('교수자 지도',{exact:true}).fill('실제 API에서도 자료 없음 조건을 확인하고 모의 실험과 차이를 설명하세요.');await page.getByRole('button',{name:'지도 내용 전달'}).click()
 await nav(page,'학생별 평가 지원');await expect(page.locator('.fusion-assessment')).toContainText('15 / 20점');await expect(page.locator('.fusion-guidance-counts')).toContainText('L3 · 개념 힌트1회');await page.getByLabel('검증·성찰 교수자 판단').selectOption('적절');await page.getByLabel('교수자 평가 피드백').fill('개념을 실제 조건 비교로 옮긴 근거가 있습니다.');await page.getByRole('button',{name:'평가 저장',exact:true}).click()
 await role(page,true);await expect(page.locator('main')).toContainText('실제 API에서도 자료 없음 조건');await nav(page,'나의 학습 기록');await expect(page.locator('main')).toContainText('개념을 실제 조건 비교로 옮긴 근거');await expect(page.locator('main')).toContainText('확률과 통계')
 await nav(page,'팀 자료');await expect(page.locator('main')).toContainText('근거와 개인정보 경계 조건 검증');await page.getByRole('button',{name:'워크스페이스 전환',exact:true}).click();await page.getByRole('button',{name:/2학년 네트워크 실습 네트워크 장애/}).click();await nav(page,'팀 자료');await expect(page.locator('main')).not.toContainText('근거와 개인정보 경계 조건 검증')
 await page.getByRole('button',{name:'워크스페이스 전환',exact:true}).click();await page.getByRole('button',{name:/융합 팀 프로젝트 교과를/}).click();await nav(page,'팀 자료');await expect(page.locator('main')).toContainText('근거와 개인정보 경계 조건 검증')
})
test('융합 설계 배점과 승인 보류가 다른 화면에 반영된다',async({page})=>{
 await fusion(page);await nav(page,'프로젝트 · 과제 설계');await page.getByLabel('융합 평가 배점 1').fill('30');await page.getByRole('button',{name:'과제 설계 저장'}).click();await expect(page.getByRole('status')).toContainText('100점');await page.getByLabel('융합 평가 배점 2').fill('15');await page.getByRole('button',{name:'과제 설계 저장'}).click()
 await nav(page,'학생별 평가 지원');await expect(page.locator('.fusion-assessment')).toContainText('배점 30점');await page.getByLabel('학생 선택').selectOption('이서연');await expect(page.locator('.fusion-assessment')).not.toContainText(/\d+ \/ \d+점/)
 await nav(page,'팀별 모니터링');await page.getByRole('button',{name:'2팀 · 공유물품 연결소',exact:true}).click();await page.getByRole('button',{name:'보류',exact:true}).click();await expect(page.locator('.fusion-team-table tbody tr').nth(1)).toContainText('확인 필요')
})
test('융합 화면 데스크톱·태블릿·모바일 배치',async({page})=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'})
 for(const width of [1440,1180,820,390]){await page.setViewportSize({width,height:1080});await fusion(page)
 for(const [id,name] of [['dashboard','수업 대시보드'],['monitoring','팀별 모니터링'],['evaluation','학생별 평가 지원'],['design','프로젝트 · 과제 설계'],['settings','과목 설정']]){await nav(page,name);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`.impeccable/review/fusion-${id}-${width}.png`,fullPage:true})}
 await role(page,true)
 for(const [id,name] of [['team','팀 대시보드'],['studio','프로젝트 작업실'],['ai','개인 AI 지원'],['documents','팀 자료'],['chat','팀 채팅'],['learning','나의 학습 기록']]){await nav(page,name);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`.impeccable/review/fusion-${id}-${width}.png`,fullPage:true})}
 }
})

test('개인 질문 초안과 저장 전 평가 초안은 공유되지 않는다',async({page})=>{
 await fusion(page);await role(page,true);await nav(page,'개인 AI 지원');await page.getByLabel('관찰한 상황과 나의 질문').fill('공개하고 싶지 않은 개인 초안');await nav(page,'팀 채팅');await expect(page.getByLabel('팀에 남길 메시지')).toHaveValue('');await expect(page.getByRole('log')).not.toContainText('공개하고 싶지 않은 개인 초안')
 await role(page,false);await nav(page,'학생별 평가 지원');await page.getByLabel('교수자 평가 피드백').fill('저장하지 않은 평가 의견');await role(page,true);await nav(page,'나의 학습 기록');await expect(page.locator('main')).not.toContainText('저장하지 않은 평가 의견');await role(page,false);await nav(page,'학생별 평가 지원');await page.getByRole('button',{name:'평가 저장',exact:true}).click();await role(page,true);await nav(page,'나의 학습 기록');await expect(page.locator('main')).toContainText('저장하지 않은 평가 의견')
})
