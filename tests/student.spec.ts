import { test,expect,type Page } from '@playwright/test'
async function student(page:Page){await page.goto('/');await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/유송민 학생/}).click()}
async function nav(page:Page,name:string){if(await page.getByRole('button',{name:'수업 메뉴 열기',exact:true}).isVisible())await page.getByRole('button',{name:'수업 메뉴 열기',exact:true}).click();await page.getByRole('button',{name,exact:true}).click()}
test('프로필 전환, 팀 자료, 팀·개인 대화가 분리된다',async({page})=>{
 await student(page);await expect(page.getByRole('heading',{name:'팀 대시보드',exact:true})).toBeVisible()
 await nav(page,'팀 자료');await page.getByRole('button',{name:/장애 진단 미션 과제 안내/}).click();await expect(page.getByRole('dialog')).toContainText('정적 라우팅');await page.getByRole('button',{name:'문서 닫기',exact:true}).click()
 await nav(page,'팀 채팅');await page.getByLabel('팀 메시지').fill('우리 팀만 보는 진행 기록');await page.getByRole('button',{name:'팀에 보내기'}).click();await expect(page.getByRole('log')).toContainText('우리 팀만 보는 진행 기록')
 await nav(page,'개인 AI 지원');await expect(page.getByRole('log')).not.toContainText('우리 팀만 보는 진행 기록');await page.getByLabel('개인 질문').fill('개인적으로 왜 양방향인지 이해하고 싶어요');await page.getByRole('button',{name:'AI에게 질문하기'}).click();await expect(page.getByRole('log')).toContainText('요청과 응답의 두 경로');expect(await page.locator('.student-messages').evaluate(e=>e.scrollHeight-e.scrollTop-e.clientHeight<3)).toBe(true)
 await nav(page,'팀 채팅');await expect(page.getByRole('log')).not.toContainText('개인적으로 왜')
 await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/강병준 교수자/}).click();await expect(page.getByRole('heading',{name:'프로젝트 · 과제 생성',exact:true})).toBeVisible()
 await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/유송민 학생/}).click();await nav(page,'개인 AI 지원');await expect(page.getByRole('log')).toContainText('개인적으로 왜')
})
test('모의 실습의 수정·양방향 검증·설명이 팀 자료와 학습 기록에 연결된다',async({page})=>{
 await student(page);await nav(page,'네트워크 실습')
 await expect(page.getByRole('button',{name:'검증 근거 팀에 공유'})).toBeDisabled()
 await page.getByRole('button',{name:'ping 192.168.20.10',exact:true}).click();await expect(page.getByRole('log')).toContainText('100% loss')
 await page.getByRole('button',{name:'R2',exact:true}).click();await page.getByRole('button',{name:'show ip route',exact:true}).click();await expect(page.getByRole('log')).toContainText('10.0.0.9')
 await page.locator('#network-command').fill('ip route 192.168.10.0 255.255.255.0 10.0.0.1');await page.getByRole('button',{name:'실행',exact:true}).click()
 await page.getByRole('button',{name:'PC-A',exact:true}).click();await page.getByRole('button',{name:'ping 192.168.20.10',exact:true}).click();await expect(page.getByRole('button',{name:'검증 근거 팀에 공유'})).toBeDisabled()
 await page.getByRole('button',{name:'PC-B',exact:true}).click();await page.getByRole('button',{name:'ping 192.168.10.10',exact:true}).click()
 await page.getByLabel('어떤 근거로 원인을 판단했나요?').fill('돌아오는 경로의 다음 홉이 실제 인접 주소와 달랐고 수정 후 양방향 응답을 확인했다.')
 await page.getByRole('button',{name:'검증 근거 팀에 공유'}).click();await expect(page.getByRole('status')).toContainText('팀 자료와 나의 학습 기록')
 await expect(page.locator('.student-mission li.done')).toHaveCount(5);await nav(page,'나의 학습 기록');await expect(page.locator('.student-evidence-timeline')).toContainText('양방향 4/4');await page.getByRole('button',{name:'내 검증 근거 열기 →'}).click();await expect(page.getByRole('dialog')).toContainText('실제 인접 주소');await page.getByRole('button',{name:'문서 닫기',exact:true}).click()
 await nav(page,'팀 대시보드');await expect(page.getByRole('img',{name:'팀 과제 진행률 100%'})).toBeVisible();await expect(page.getByRole('button',{name:/양방향 복구 검증 Learning Evidence/})).toBeVisible();await page.getByRole('button',{name:/양방향 복구 검증 Learning Evidence/}).click();await page.getByRole('button',{name:'수정',exact:true}).click();await page.getByLabel('문서 제목').fill('나의 최종 검증 기록');await page.getByRole('button',{name:'문서 저장',exact:true}).click();await page.getByRole('button',{name:'문서 닫기'}).click();await nav(page,'나의 학습 기록');await page.getByRole('button',{name:'내 검증 근거 열기 →'}).click();await expect(page.getByRole('dialog')).toContainText('나의 최종 검증 기록');await expect(page.getByRole('dialog')).toContainText('Learning Evidence')
})
test('워크스페이스와 지난 과제 점검 목록',async({page})=>{
 await student(page);await page.getByRole('button',{name:'워크스페이스 전환',exact:true}).click();await expect(page.getByRole('region',{name:'워크스페이스 전환'})).toContainText('융합 팀 프로젝트');await page.getByRole('button',{name:/2학년 네트워크 실습 현재 워크스페이스/}).click()
 await nav(page,'나의 학습 기록');await page.getByLabel('학습 기록 과제').selectOption('vlan');await expect(page.locator('.student-feedback-grid')).toContainText('반대 방향의 검증 기록이 없습니다');await page.getByLabel('양방향 결과를 모두 확인하기',{exact:true}).check();await nav(page,'팀 대시보드');await nav(page,'나의 학습 기록');await expect(page.getByLabel('양방향 결과를 모두 확인하기',{exact:true})).toBeChecked()
})
test('학생 화면 데스크톱과 태블릿 레이아웃',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'})
 for(const width of [1440,1180,820,390]){await page.setViewportSize({width,height:1080});await page.goto('/');if(width<=1050)await page.getByRole('button',{name:'수업 메뉴 열기'}).click();await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/유송민 학생/}).click()
 for(const [id,name] of [['team','팀 대시보드'],['documents','팀 자료'],['lab','네트워크 실습'],['chat','팀 채팅'],['ai','개인 AI 지원'],['learning','나의 학습 기록']]){if(id!=='team')await nav(page,name);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`.impeccable/review/student-${id}-${width}.png`,fullPage:true})}
 }
})

test('문서 작성·수정·첨부·검색·채팅 공유와 중앙 팝업',async({page})=>{
 await student(page);await nav(page,'팀 자료')
 await page.getByRole('button',{name:'문서 작성',exact:true}).click();await page.getByLabel('문서 제목').fill('검증 회의 메모');await page.getByLabel('문서 내용').fill('수정 전후 결과를 함께 비교하기로 했다.');await page.getByRole('button',{name:'문서 저장',exact:true}).click()
 const box=await page.getByRole('dialog').boundingBox();expect(box).not.toBeNull();expect(Math.abs(box!.x+box!.width/2-720)).toBeLessThan(2);expect(Math.abs(box!.y+box!.height/2-540)).toBeLessThan(2)
 await page.screenshot({path:'.impeccable/review/student-document-popup.png'})
 await page.getByRole('button',{name:'수정',exact:true}).click();await page.getByLabel('문서 내용').fill('양방향 결과도 함께 비교하기로 했다.');await page.getByRole('button',{name:'문서 저장',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('v2')
 await page.getByRole('button',{name:'팀 채팅에 공유',exact:true}).click();await expect(page.getByRole('heading',{name:'팀 채팅',exact:true})).toBeVisible();await page.getByRole('button',{name:/검증 회의 메모 공유 문서 열기/}).click();await expect(page.getByRole('dialog')).toContainText('양방향 결과도');await page.getByRole('button',{name:'문서 닫기'}).click()
 await nav(page,'팀 자료');await page.locator('input[type=file]').setInputFiles([{name:'실습로그.txt',mimeType:'text/plain',buffer:Buffer.from('team test log')},{name:'회의자료.txt',mimeType:'text/plain',buffer:Buffer.from('meeting record')}]);await page.getByLabel('팀 자료 검색').fill('실습로그');await expect(page.locator('.document-table tbody tr')).toHaveCount(1);await page.getByRole('button',{name:'실습로그.txt 첨부 파일',exact:true}).click();await expect(page.getByRole('link',{name:'다운로드'})).toHaveAttribute('href',/^data:text\/plain;base64,/)
 await page.getByRole('button',{name:'문서 닫기'}).click();await page.reload();await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/유송민 학생/}).click();await nav(page,'팀 자료');await page.getByLabel('팀 자료 검색').fill('검증 회의 메모');await expect(page.locator('.document-table tbody tr')).toContainText('v2')
})
test('지원 수준은 학생에게 숨기고 자동 분류한 교수자 요약만 제공한다',async({page})=>{
 await student(page);await nav(page,'개인 AI 지원');await expect(page.locator('main')).not.toContainText(/L[1-4]/);await page.getByLabel('개인 질문').fill('어떤 명령어로 경로를 확인하나요?');await page.getByRole('button',{name:'AI에게 질문하기'}).click();await expect(page.getByRole('log')).toContainText('show ip route');await expect(page.locator('main')).not.toContainText(/L[1-4]/)
 await page.getByRole('button',{name:'프로필 전환',exact:true}).click();await page.getByRole('button',{name:/강병준 교수자/}).click();await page.getByRole('button',{name:'학생별 평가 지원',exact:true}).click();await page.locator('.connected-guidance summary').click();await expect(page.locator('.connected-guidance-levels')).toContainText('L4도구 활용 힌트1회');await expect(page.locator('main')).not.toContainText('어떤 명령어로 경로를 확인하나요?')
})
