(function(){
  const $ = (id) => document.getElementById(id);
  const won = (n) => '₩' + Math.round(n).toLocaleString('ko-KR');

  const num = (id) => {
    const v = parseFloat($(id).value);
    return isNaN(v) || v < 0 ? 0 : v;
  };
  const checked = (id) => $(id).checked;

  function calcA(){
    const bw = num('a-bw') * 100;
    const color = num('a-color') * 300;
    const scan = num('a-scan') * 100;
    const cutCount = num('a-cut');
    const cutBase = cutCount * 4000;
    const total = bw + color + scan + cutBase;
    const items = [];
    if (bw) items.push(['흑백 인쇄 · ' + num('a-bw') + '매', bw]);
    if (color) items.push(['컬러 인쇄 · ' + num('a-color') + '매', color]);
    if (scan) items.push(['스캔 · ' + num('a-scan') + '매', scan]);
    if (cutBase) items.push(['단순 재단 · ' + cutCount + '건', cutBase]);
    return { total, items };
  }

  function calcB(){
    const qty = num('b-qty');
    const pages = num('b-pages');
    const color = checked('b-color');
    const size = document.querySelector('input[name="b-size"]:checked').value;
    if (qty <= 0) return { total: 0, items: [] };
    const base = size === 'a4' ? 4000 : 3000;
    const extraPages = Math.max(0, pages - 28);
    let perCopy = base + extraPages * 50 + (color ? pages * 100 : 0);
    let total = perCopy * qty;
    const discounted = qty >= 50;
    if (discounted) total *= 0.9;
    const items = [['중철제본 zine · ' + qty + '부 (' + size.toUpperCase() + ' ' + pages + 'p' + (color ? ' 컬러' : ' 흑백') + ')' + (discounted ? ' [10%↓]' : ''), total]];
    return { total, items };
  }

  function calcC(){
    const qty = num('c-qty');
    const pages = num('c-pages');
    const color = checked('c-color');
    const nonstandard = checked('c-nonstandard');
    const size = document.querySelector('input[name="c-size"]:checked').value;
    if (qty <= 0) return { total: 0, items: [] };
    const extraPages = Math.max(0, pages - 24);
    let perCopy = 4500 + extraPages * 50 + (color ? pages * 100 : 0) + (nonstandard ? 1000 : 0);
    let total = perCopy * qty;
    const discounted = qty >= 50;
    if (discounted) total *= 0.9;
    const cutFee = (size === 'a5' || size === 'a6') ? 4000 : 0;
    const items = [['링제본 zine · ' + qty + '부 (' + size.toUpperCase() + ' ' + pages + 'p' + (color ? ' 컬러' : ' 흑백') + ')' + (discounted ? ' [10%↓]' : ''), total]];
    if (cutFee) items.push(['↳ ' + size.toUpperCase() + ' 단순 재단 (파일당 1건)', cutFee]);
    return { total: total + cutFee, items };
  }

  function calcD(){
    const formats = num('d-formats');
    const qty = num('d-qty');
    if (formats <= 0 || qty <= 0) return { total: 0, items: [] };
    const total = formats * 1000 * qty;
    const items = [['특수 규격 재단 · 규격 ' + formats + '종 × ' + qty + '권', total]];
    return { total, items };
  }

  function calcE(){
    const c80 = num('e-color80') * 300;
    const heavy = num('e-heavy') * 500;
    const special = num('e-special') * 1000;
    const total = c80 + heavy + special;
    const items = [];
    if (c80) items.push(['컬러 용지 80g · ' + num('e-color80') + '장', c80]);
    if (heavy) items.push(['120g 용지 · ' + num('e-heavy') + '장', heavy]);
    if (special) items.push(['트레싱지/트레팔지 · ' + num('e-special') + '장', special]);
    return { total, items };
  }

  function render(){
    const A = calcA(), B = calcB(), C = calcC(), D = calcD(), E = calcE();
    document.querySelector('[data-sum="A"]').textContent = won(A.total);
    document.querySelector('[data-sum="B"]').textContent = won(B.total);
    document.querySelector('[data-sum="C"]').textContent = won(C.total);
    document.querySelector('[data-sum="D"]').textContent = won(D.total);
    document.querySelector('[data-sum="E"]').textContent = won(E.total);

    const allItems = [...A.items, ...B.items, ...C.items, ...D.items, ...E.items];
    const grand = A.total + B.total + C.total + D.total + E.total;

    const box = $('receipt-items');
    box.innerHTML = '';
    if (allItems.length === 0) {
      box.innerHTML = '<p class="placeholder">아래 항목을 입력해주세요...</p>';
    } else {
      const ul = document.createElement('ul');
      allItems.forEach(([label, amt]) => {
        const li = document.createElement('li');
        li.textContent = label + ' : ' + won(amt);
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }
    $('grand-total').textContent = won(grand);
    $('grand-total-card').textContent = won(grand * 1.1);
  }

  document.querySelectorAll('.qty-input').forEach(el => {
    el.addEventListener('input', () => {
      const cleaned = el.value.replace(/[^0-9]/g, '');
      if (cleaned !== el.value) el.value = cleaned;
    });
  });

  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = $(btn.dataset.target);
      if (!target) return;
      const step = parseInt(btn.dataset.step, 10) || 0;
      const current = parseInt(target.value, 10) || 0;
      target.value = Math.max(0, current + step);
      target.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  document.querySelectorAll('input').forEach(el => {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  $('reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.qty-input').forEach(el => { el.value = el.defaultValue; });
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
    document.querySelector('input[name="b-size"][value="a5"]').checked = true;
    document.querySelector('input[name="c-size"][value="a4"]').checked = true;
    render();
  });

  render();
})();

(function(){
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(panel => {
        panel.hidden = panel.dataset.panel !== btn.dataset.tab;
      });
    });
  });
})();

(function(){
  const boxes = document.querySelectorAll('.chk');
  const progressEl = document.getElementById('checklist-progress');
  const resetBtn = document.getElementById('checklist-reset-btn');
  const STORAGE_KEY = 'ningen-checklist';
  const today = () => new Date().toISOString().slice(0, 10);

  function loadCheckedIds(){
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return data && data.date === today() ? data.checked : [];
    } catch (e) {
      return [];
    }
  }

  function saveCheckedIds(){
    const checked = [...boxes].filter(b => b.checked).map(b => b.dataset.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today(), checked }));
  }

  function markRow(box){
    const li = box.closest('li');
    if (li) li.classList.toggle('done', box.checked);
  }

  function updateProgress(){
    const done = [...boxes].filter(b => b.checked).length;
    if (progressEl) progressEl.textContent = done + ' / ' + boxes.length;
  }

  function updateSections(){
    document.querySelectorAll('.checklist-section').forEach(section => {
      const sectionBoxes = section.querySelectorAll('.chk');
      const allDone = sectionBoxes.length > 0 && [...sectionBoxes].every(b => b.checked);
      section.classList.toggle('all-done', allDone);
    });
  }

  const savedIds = loadCheckedIds();
  boxes.forEach(box => {
    box.checked = savedIds.includes(box.dataset.id);
    markRow(box);
    box.addEventListener('change', () => {
      markRow(box);
      updateProgress();
      updateSections();
      saveCheckedIds();
    });
  });
  updateProgress();
  updateSections();

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      boxes.forEach(box => {
        box.checked = false;
        markRow(box);
      });
      updateProgress();
      updateSections();
      saveCheckedIds();
    });
  }
})();

(function(){
  function copyText(text){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll('.copyable').forEach(el => {
    const trigger = () => {
      const text = el.dataset.copy;
      copyText(text).then(() => {
        const original = el.textContent;
        el.textContent = '복사됨!';
        setTimeout(() => { el.textContent = original; }, 1200);
      }).catch(() => {});
    };
    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
})();
