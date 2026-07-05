const drawersEl = document.getElementById('drawers');
const gridEl = document.getElementById('grid');
const countEl = document.getElementById('count');
const searchInput = document.getElementById('search-input');

let activeCat = 'all';
let query = '';

function renderDrawers(){
  drawersEl.innerHTML = '';
  drawersEl.appendChild(makeDrawerBtn('all', 'All', 'var(--ink)'));
  Object.entries(CATS).forEach(([key, val])=>{
    drawersEl.appendChild(makeDrawerBtn(key, val.label, val.color));
  });
}

function makeDrawerBtn(key, label, color){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'drawer-btn' + (key===activeCat ? ' active' : '');
  btn.style.setProperty('--tab-color', color);
  btn.textContent = label;
  btn.setAttribute('aria-pressed', key===activeCat ? 'true' : 'false');
  btn.addEventListener('click', ()=>{
    activeCat = key;
    renderDrawers();
    renderGrid();
  });
  return btn;
}

function matches(n){
  const inCat = activeCat === 'all' || n.cat === activeCat;
  const q = query.trim().toLowerCase();
  const inSearch = !q || n.name.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q) || n.func.toLowerCase().includes(q) || n.sources.toLowerCase().includes(q);
  return inCat && inSearch;
}

function toggleCard(outer, slug){
  const nowFlipped = outer.classList.toggle('flipped');
  outer.setAttribute('aria-pressed', nowFlipped ? 'true' : 'false');
  if (nowFlipped) {
    history.replaceState(null, '', '#' + slug);
  }
}

function renderGrid(){
  gridEl.innerHTML = '';
  const list = NUTRIENTS.filter(matches);
  countEl.textContent = list.length + (list.length===1 ? ' nutrient' : ' nutrients');

  list.forEach(n=>{
    const cat = CATS[n.cat];
    const slug = slugify(n.name);

    const outer = document.createElement('div');
    outer.className = 'card-outer';
    outer.dataset.slug = slug;
    outer.tabIndex = 0;
    outer.setAttribute('role', 'button');
    outer.setAttribute('aria-pressed', 'false');
    outer.setAttribute('aria-label', n.name + ' — flip for details');

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const front = document.createElement('div');
    front.className = 'face front';
    front.style.setProperty('--tab-color', cat.color);
    front.innerHTML = `
      <div class="face-hole"></div>
      <div class="cat-tag">${cat.label}</div>
      <div class="nutrient-name">${n.name}</div>
      <div class="func-preview">${n.preview}</div>
      <div class="flip-hint">flip card →</div>
    `;

    const back = document.createElement('div');
    back.className = 'face back';
    back.style.setProperty('--tab-color', cat.color);
    back.style.setProperty('--tab-soft', cat.soft);
    back.innerHTML = `
      <div class="face-hole"></div>
      <h4>Does</h4>
      <p>${n.func}</p>
      <h4>Get it from</h4>
      <p>${n.sources}</p>
      <h4>Daily target</h4>
      <p class="rda">${n.rda}</p>
    `;

    inner.appendChild(front);
    inner.appendChild(back);
    outer.appendChild(inner);

    outer.addEventListener('click', ()=> toggleCard(outer, slug));
    outer.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(outer, slug);
      }
    });

    gridEl.appendChild(outer);
  });
}

function applyDeepLink(){
  const slug = location.hash.replace('#', '');
  if (!slug) return;
  const target = NUTRIENTS.find(n => slugify(n.name) === slug);
  if (!target) return;

  activeCat = target.cat;
  query = '';
  searchInput.value = '';
  renderDrawers();
  renderGrid();

  const card = gridEl.querySelector(`[data-slug="${slug}"]`);
  if (card) {
    card.classList.add('flipped');
    card.setAttribute('aria-pressed', 'true');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

searchInput.addEventListener('input', (e)=>{
  query = e.target.value;
  renderGrid();
});

renderDrawers();
renderGrid();
applyDeepLink();
