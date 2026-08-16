import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

const PASSCODE = "0313";
const UNLOCK_KEY = "ningen-admin-unlocked";
const CHECKLIST_KEY = "ningen-checklist";

const num = (v) => {
  const n = parseFloat(v);
  return isNaN(n) || n < 0 ? 0 : n;
};

const won = (n) => "₩" + Math.round(n).toLocaleString("ko-KR");

const INITIAL_CALC = {
  aBw: 0,
  aColor: 0,
  aScan: 0,
  aCut: 0,
  aPrinterChange: false,
  bQty: 0,
  bPages: 28,
  bColor: false,
  cQty: 0,
  cPages: 24,
  cSize: "a4",
  cColor: false,
  cNonstandard: false,
  dFormats: 0,
  dQty: 0,
  eColor80: 0,
  eSpecial: 0,
  eHeavy: 0,
};

function calcA(c) {
  const bw = num(c.aBw) * 100;
  const color = num(c.aColor) * 300;
  const scan = num(c.aScan) * 100;
  const cutCount = num(c.aCut);
  const cutBase = cutCount * 4000;
  const cutExtra = c.aPrinterChange ? cutCount * 2000 : 0;
  const total = bw + color + scan + cutBase + cutExtra;
  const items = [];
  if (bw) items.push([`흑백 인쇄 · ${num(c.aBw)}매`, bw]);
  if (color) items.push([`컬러 인쇄 · ${num(c.aColor)}매`, color]);
  if (scan) items.push([`스캔 · ${num(c.aScan)}매`, scan]);
  if (cutBase) items.push([`단순 재단 · ${cutCount}건`, cutBase + cutExtra]);
  return { total, items };
}

function calcB(c) {
  const qty = num(c.bQty);
  const pages = num(c.bPages);
  if (qty <= 0) return { total: 0, items: [] };
  const extraPages = Math.max(0, pages - 28);
  const perCopy = 3000 + extraPages * 50 + (c.bColor ? pages * 100 : 0);
  let total = perCopy * qty;
  const discounted = qty >= 100;
  if (discounted) total *= 0.9;
  const label = `중철제본 zine · ${qty}부 (${pages}p${c.bColor ? " 컬러" : " 흑백"})${discounted ? " [10%↓]" : ""}`;
  return { total, items: [[label, total]] };
}

function calcC(c) {
  const qty = num(c.cQty);
  const pages = num(c.cPages);
  if (qty <= 0) return { total: 0, items: [] };
  const base = c.cSize === "a4" ? 5000 : 4000;
  const extraPages = Math.max(0, pages - 24);
  const perCopy =
    base + extraPages * 50 + (c.cColor ? pages * 150 : 0) + (c.cNonstandard ? 1000 : 0);
  let total = perCopy * qty;
  const discounted = qty >= 60;
  if (discounted) total *= 0.9;
  const label = `링제본 zine · ${qty}부 (${c.cSize.toUpperCase()} ${pages}p${c.cColor ? " 컬러" : " 흑백"})${discounted ? " [10%↓]" : ""}`;
  return { total, items: [[label, total]] };
}

function calcD(c) {
  const formats = num(c.dFormats);
  const qty = num(c.dQty);
  if (formats <= 0 || qty <= 0) return { total: 0, items: [] };
  const total = formats * 1000 * qty;
  return { total, items: [[`특수 규격 재단 · 규격 ${formats}종 × ${qty}권`, total]] };
}

function calcE(c) {
  const c80 = num(c.eColor80) * 300;
  const special = num(c.eSpecial) * 500;
  const heavy = num(c.eHeavy) * 500;
  const total = c80 + special + heavy;
  const items = [];
  if (c80) items.push([`컬러 용지 80g · ${num(c.eColor80)}장`, c80]);
  if (special) items.push([`특수 용지 · ${num(c.eSpecial)}장`, special]);
  if (heavy) items.push([`120g 이상 용지 · ${num(c.eHeavy)}장`, heavy]);
  return { total, items };
}

const OPEN_ITEMS = [
  { id: "open-1", label: "공간 불 키고, 커튼 빗살 비추게 열어두기" },
  { id: "open-2", label: "주변 정리" },
  { id: "open-3", label: "음악 틀기 (닌겐 스포티파이 활용)" },
];

const WORK_GROUPS = [
  {
    heading: "(1) 메일박스 확인",
    items: [
      { id: "mail-1", label: "C/S" },
      { id: "mail-2", label: "제안메일 체크", emphasis: "*대표 보고" },
      { id: "mail-3", label: "인쇄 주문 건 견적 및 출고일 안내" },
      { id: "mail-4", label: "퍼블릭 오디오" },
    ],
  },
  {
    heading: "(2) 인쇄 업무 체크",
    items: [
      { id: "print-1", label: "낱장 인쇄" },
      { id: "print-2", label: "중철제본 / 링제본 인쇄" },
      { id: "print-3", label: "재단" },
      { id: "print-4", label: "코팅" },
    ],
  },
  {
    heading: "(3) 워크인 응대",
    items: [
      { id: "walkin-1", label: "닌겐페이퍼프레스 / 닌겐프린트센터 소개와 설명" },
      { id: "walkin-2", label: "출간물 요약 설명" },
      { id: "walkin-3", label: "가격 안내" },
      {
        id: "walkin-4",
        label: "결제 (카드 또는 계좌이체)",
        note: "출판물·CD 현장구매는 비과세 / 인쇄물 포함 모든 것은 과세 · 카드결제 시 10% 추가",
      },
      {
        id: "walkin-5",
        label: "할인 고객 뱃지 체크",
        note: "할인 고객은 뱃지 소지 시 언제든지 10% 할인",
      },
    ],
  },
];

const CLOSE_ITEMS = [
  { id: "close-1", label: "책상 및 주변 정리 후 빗자루질·걸레질 (간단하게 보이는 곳만)" },
  { id: "close-2", label: "에어컨 / 공기청정기 / 소등" },
  { id: "close-3", label: "설거지 거리 확인", emphasis: "(자신이 이용한 것은 스스로 정리)" },
  { id: "close-4", label: "커튼 닫기" },
  { id: "close-5", label: "(가끔) 쓰레기통이 다 차면 비우기" },
  {
    id: "close-6",
    label: "건물에 아무도 없으면 전체 소등 후 중문 꼭 잠그기",
    emphasis: "[비번 2000]",
    note: "*안 하면 관리소장이 불같이 화냅니다",
  },
];

const ALL_CHECKLIST_IDS = [
  ...OPEN_ITEMS,
  ...WORK_GROUPS.flatMap((g) => g.items),
  ...CLOSE_ITEMS,
].map((item) => item.id);

const today = () => new Date().toISOString().slice(0, 10);

function loadCheckedState() {
  try {
    const data = JSON.parse(localStorage.getItem(CHECKLIST_KEY));
    if (data && data.date === today() && Array.isArray(data.checked)) {
      const state = {};
      data.checked.forEach((id) => {
        state[id] = true;
      });
      return state;
    }
  } catch (e) {
    // ignore malformed storage
  }
  return {};
}

function ChecklistRow({ item, checked, onToggle }) {
  return (
    <li className={checked ? styles.done : undefined}>
      <label>
        <input type="checkbox" checked={!!checked} onChange={() => onToggle(item.id)} />{" "}
        {item.label} {item.emphasis && <em>{item.emphasis}</em>}
      </label>
      {item.note && <p className={styles.note}>{item.note}</p>}
    </li>
  );
}

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === PASSCODE) {
      try {
        localStorage.setItem(UNLOCK_KEY, "true");
      } catch (e) {
        // ignore storage errors
      }
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className={styles.gate}>
      <h1>오피스 관리 도구</h1>
      <p>접속 비밀번호를 입력하세요</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
        />
        <button type="submit">입장</button>
      </form>
      {error && <p className={styles.gateError}>비밀번호가 올바르지 않습니다</p>}
    </div>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(UNLOCK_KEY) === "true";
    } catch (e) {
      return false;
    }
  });
  const [activeTab, setActiveTab] = useState("calculator");
  const [calc, setCalc] = useState(INITIAL_CALC);
  const [checked, setChecked] = useState(loadCheckedState);

  useEffect(() => {
    const checkedIds = ALL_CHECKLIST_IDS.filter((id) => checked[id]);
    try {
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify({ date: today(), checked: checkedIds }));
    } catch (e) {
      // ignore storage errors
    }
  }, [checked]);

  const setField = (key, value) => setCalc((prev) => ({ ...prev, [key]: value }));
  const toggleChecked = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const resetChecklist = () => setChecked({});
  const resetCalc = () => setCalc(INITIAL_CALC);

  const A = calcA(calc);
  const B = calcB(calc);
  const C = calcC(calc);
  const D = calcD(calc);
  const E = calcE(calc);
  const allItems = [...A.items, ...B.items, ...C.items, ...D.items, ...E.items];
  const grand = A.total + B.total + C.total + D.total + E.total;
  const checklistDone = ALL_CHECKLIST_IDS.filter((id) => checked[id]).length;

  return (
    <div className={styles.page}>
      <div className={styles.pageWrapper}>
        {unlocked && (
          <div className={styles.tabs}>
            <button
              type="button"
              className={
                activeTab === "calculator" ? `${styles.tabBtn} ${styles.active}` : styles.tabBtn
              }
              onClick={() => setActiveTab("calculator")}
            >
              요금 계산기
            </button>
            <button
              type="button"
              className={
                activeTab === "checklist" ? `${styles.tabBtn} ${styles.active}` : styles.tabBtn
              }
              onClick={() => setActiveTab("checklist")}
            >
              오피스 체크리스트
            </button>
          </div>
        )}

        <div className={styles.a4Container}>
          {!unlocked ? (
            <PasswordGate onUnlock={() => setUnlocked(true)} />
          ) : (
            <>
              <div hidden={activeTab !== "calculator"}>
                <h1>견적서</h1>
                <div>
                  {allItems.length === 0 ? (
                    <p>아래 항목을 입력해주세요...</p>
                  ) : (
                    <ul>
                      {allItems.map(([label, amt]) => (
                        <li key={label}>
                          {label} : {won(amt)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <h3>합계: {won(grand)}</h3>
                <button type="button" onClick={resetCalc}>
                  전체 초기화
                </button>

                <p>
                  <small>가격은 안내용 자동 견적입니다.</small>
                </p>

                <details className={styles.calcSection}>
                  <summary>
                    <span>01. 프린트 · 복사 · 스캔</span>
                    <span className={styles.sectionSubtotal}>{won(A.total)}</span>
                  </summary>
                  <p>
                    <label htmlFor="a-bw">흑백 (매) — 100원/매</label>
                    <br />
                    <input
                      type="number"
                      id="a-bw"
                      min="0"
                      value={calc.aBw}
                      onChange={(e) => setField("aBw", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="a-color">컬러 (매) — 300원/매</label>
                    <br />
                    <input
                      type="number"
                      id="a-color"
                      min="0"
                      value={calc.aColor}
                      onChange={(e) => setField("aColor", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="a-scan">스캔 (매) — 100원/매 (흑백/컬러 무관)</label>
                    <br />
                    <input
                      type="number"
                      id="a-scan"
                      min="0"
                      value={calc.aScan}
                      onChange={(e) => setField("aScan", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="a-cut">단순 재단 (건) — 4,000원/건 (전주 제지 백색 A4 기준)</label>
                    <br />
                    <input
                      type="number"
                      id="a-cut"
                      min="0"
                      value={calc.aCut}
                      onChange={(e) => setField("aCut", e.target.value)}
                    />
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        checked={calc.aPrinterChange}
                        onChange={(e) => setField("aPrinterChange", e.target.checked)}
                      />
                      특정 프린터 기종 변경/선택 (재단 건당 +2,000원)
                    </label>
                  </p>
                </details>

                <details className={styles.calcSection}>
                  <summary>
                    <span>02. 중철 제본 zine</span>
                    <span className={styles.sectionSubtotal}>{won(B.total)}</span>
                  </summary>
                  <p>
                    기본가 권당 3,000원 (표지 포함 A5 28p 흑백 2도 기준). 28p 초과 시 페이지당 +50원.
                    컬러 인쇄 시 페이지당 +100원. 100부 이상이면 전체 규칙 적용 후 권당 10% 할인.
                  </p>
                  <p>
                    <label htmlFor="b-qty">부수</label>
                    <br />
                    <input
                      type="number"
                      id="b-qty"
                      min="0"
                      value={calc.bQty}
                      onChange={(e) => setField("bQty", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="b-pages">페이지 수 (표지 포함, 기준 28p)</label>
                    <br />
                    <input
                      type="number"
                      id="b-pages"
                      min="0"
                      value={calc.bPages}
                      onChange={(e) => setField("bPages", e.target.value)}
                    />
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        checked={calc.bColor}
                        onChange={(e) => setField("bColor", e.target.checked)}
                      />
                      컬러 인쇄 (+100원/페이지)
                    </label>
                  </p>
                </details>

                <details className={styles.calcSection}>
                  <summary>
                    <span>03. 링 제본 zine</span>
                    <span className={styles.sectionSubtotal}>{won(C.total)}</span>
                  </summary>
                  <p>
                    60부 미만 기준: A4 24p 이하 권당 5,000원 / A5 24p 이하 권당 4,000원. 24p 초과 시
                    페이지당 +50원. 컬러 인쇄 시 페이지당 +150원. 비규격은 건당 권당 +1,000원. 60부
                    이상이면 전체 규칙 적용 후 권당 10% 할인.
                  </p>
                  <p>
                    <label htmlFor="c-qty">부수</label>
                    <br />
                    <input
                      type="number"
                      id="c-qty"
                      min="0"
                      value={calc.cQty}
                      onChange={(e) => setField("cQty", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="c-pages">페이지 수 (표지 포함, 기준 24p)</label>
                    <br />
                    <input
                      type="number"
                      id="c-pages"
                      min="0"
                      value={calc.cPages}
                      onChange={(e) => setField("cPages", e.target.value)}
                    />
                  </p>
                  <p>
                    규격:
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="c-size"
                        checked={calc.cSize === "a4"}
                        onChange={() => setField("cSize", "a4")}
                      />{" "}
                      A4 (5,000원 기준)
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="c-size"
                        checked={calc.cSize === "a5"}
                        onChange={() => setField("cSize", "a5")}
                      />{" "}
                      A5 (4,000원 기준)
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        checked={calc.cColor}
                        onChange={(e) => setField("cColor", e.target.checked)}
                      />
                      컬러 인쇄 (+150원/페이지)
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={calc.cNonstandard}
                        onChange={(e) => setField("cNonstandard", e.target.checked)}
                      />
                      비규격 (건당 권당 +1,000원)
                    </label>
                  </p>
                </details>

                <details className={styles.calcSection}>
                  <summary>
                    <span>04. 특수 규격 재단 제본</span>
                    <span className={styles.sectionSubtotal}>{won(D.total)}</span>
                  </summary>
                  <p>
                    서로 다른 규격을 각 1건으로 계산하며 권당 +1,000원. 예: 2가지 규격을 섞으면 권당
                    +2,000원. ※ 난이도/상황에 따라 불가능한 경우가 있으며, 추가 요금 협의가 필요할 수
                    있습니다.
                  </p>
                  <p>
                    <label htmlFor="d-formats">한 권에 섞는 규격 수</label>
                    <br />
                    <input
                      type="number"
                      id="d-formats"
                      min="0"
                      value={calc.dFormats}
                      onChange={(e) => setField("dFormats", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="d-qty">권수</label>
                    <br />
                    <input
                      type="number"
                      id="d-qty"
                      min="0"
                      value={calc.dQty}
                      onChange={(e) => setField("dQty", e.target.value)}
                    />
                  </p>
                </details>

                <details className={styles.calcSection}>
                  <summary>
                    <span>05. 종이</span>
                    <span className={styles.sectionSubtotal}>{won(E.total)}</span>
                  </summary>
                  <p>
                    선방 입고 용지는 A4 규격 120g 이하, 레이저 전용 용지만 가능하며 트레싱지·트레팔 등
                    특수 용지는 불가합니다.
                  </p>
                  <p>
                    <label htmlFor="e-color80">컬러 용지 80g (장) — 300원/장</label>
                    <br />
                    <input
                      type="number"
                      id="e-color80"
                      min="0"
                      value={calc.eColor80}
                      onChange={(e) => setField("eColor80", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="e-special">특수 용지 (장) — 500원/장</label>
                    <br />
                    <input
                      type="number"
                      id="e-special"
                      min="0"
                      value={calc.eSpecial}
                      onChange={(e) => setField("eSpecial", e.target.value)}
                    />
                  </p>
                  <p>
                    <label htmlFor="e-heavy">120g 이상 용지 (장) — 500원/장 (컬러/특수 포함)</label>
                    <br />
                    <input
                      type="number"
                      id="e-heavy"
                      min="0"
                      value={calc.eHeavy}
                      onChange={(e) => setField("eHeavy", e.target.value)}
                    />
                  </p>
                </details>

                <details className={styles.manual}>
                  <summary>프린터 사용</summary>
                  <ol>
                    <li>보편적인 낱장 인쇄는 ApeosPort-V 3060 이용</li>
                    <li>대량 zine 인쇄는 DocuPrint CM415 AP 이용</li>
                    <li>A3 / 많은 컬러 인쇄는 전주에 생산 요청</li>
                    <li>뻑난 종이는 종이 쓰레기통에 버리기</li>
                  </ol>
                </details>
              </div>

              <div hidden={activeTab !== "checklist"}>
                <h1>오피스 체크리스트</h1>

                <details className={styles.checklistSection}>
                  <summary>출근</summary>
                  <ul className={styles.checklist}>
                    {OPEN_ITEMS.map((item) => (
                      <ChecklistRow
                        key={item.id}
                        item={item}
                        checked={checked[item.id]}
                        onToggle={toggleChecked}
                      />
                    ))}
                  </ul>
                </details>

                <details className={styles.checklistSection}>
                  <summary>업무 체크</summary>
                  {WORK_GROUPS.map((group) => (
                    <div key={group.heading}>
                      <h3>{group.heading}</h3>
                      <ul className={styles.checklist}>
                        {group.items.map((item) => (
                          <ChecklistRow
                            key={item.id}
                            item={item}
                            checked={checked[item.id]}
                            onToggle={toggleChecked}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>

                <details className={styles.checklistSection}>
                  <summary>퇴근</summary>
                  <ul className={styles.checklist}>
                    {CLOSE_ITEMS.map((item) => (
                      <ChecklistRow
                        key={item.id}
                        item={item}
                        checked={checked[item.id]}
                        onToggle={toggleChecked}
                      />
                    ))}
                  </ul>
                </details>

                <p className={styles.progress}>
                  <strong>
                    진행 상황: {checklistDone} / {ALL_CHECKLIST_IDS.length}
                  </strong>
                </p>
                <button type="button" onClick={resetChecklist}>
                  체크리스트 초기화
                </button>

                <hr />

                <h2>참고 매뉴얼</h2>

                <details className={styles.manual}>
                  <summary>고객 응대 및 상담 매뉴얼</summary>
                  <p>상냥한 응대는 기본입니다. 손님에겐 언제나 공평하고 공정한 태도로 응대합니다.</p>
                  <ul>
                    <li>
                      어떤 일로 찾아오셨는지 묻기 → 인쇄 업무 → 예상 견적 안내 → 출고일 안내
                      <ul>
                        <li>빠르게 처리 가능한 것은 현장 대기, 및 익일 출고 가능으로 안내</li>
                        <li>
                          복잡한 업무 (500매가 넘어가는 많은 분량의 인쇄, 50부가 넘어가는 제본 등)는
                          입고된 용지, 가능한 사양에 따라서, 공휴일 제외 최대 7일 소요
                        </li>
                      </ul>
                    </li>
                    <li>
                      도서 구매
                      <ul>
                        <li>가격 안내 (숙지사항)</li>
                        <li>상품 소개 (숙지사항)</li>
                      </ul>
                    </li>
                    <li>
                      인덱스 라이브러리 이용 (무료)
                      <ul>
                        <li>원하는 페이지를 스캔하거나, 다시 인쇄 해 제본하는 일은 인쇄 가격표와 동일하게 적용</li>
                      </ul>
                    </li>
                  </ul>
                </details>

                <details className={styles.manual}>
                  <summary>결제 관리</summary>
                  <p>
                    <strong>워크인 고객 응대</strong>
                    <br />
                    구경 → 도서 설명 → 카드/현금 결제 → 포장
                  </p>
                  <p>
                    <strong>온라인 고객 응대</strong>
                    <br />
                    메일 박스 체크 → 인보이스 → 페이팔 요청 → 결제 받기 → 결제 확인 → 우체국 발송
                  </p>
                </details>

                <details className={styles.manual}>
                  <summary>공간 이용 관련</summary>
                  <p>
                    1층 샷다 자물쇠 비번 1000
                    <br />
                    2층 중문 비번 2000
                    <br />
                    닌겐 비번 0313
                    <br />
                    와이파이 KT_GIGA_BD72 / 비번 71ch02fj55
                  </p>
                  <p>
                    비품은 근무 일 이외에도 언제든지 이용할 수 있습니다.
                    <br />
                    커피 원두 / 물 / 차 / 간단한 간식거리 등 비품이 비어있을 경우 대표에게 보고
                    올려주세요.
                  </p>
                </details>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
