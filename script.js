const terminalLines = [
  ['whoami', 'jose_ignacio_garcia_barrios'],
  ['cat rol.txt', 'Desarrollador Web Junior · Estudiante de Ingeniería de Sistemas'],
  ['cat ubicacion.txt', 'Sincelejo, Colombia']
];

const terminalBody = document.querySelector('#terminal-body');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function animateTerminal() {
  if (!terminalBody || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    terminalBody.innerHTML = terminalLines.map(([prompt, output]) => `<div class="terminal-line"><div class="prompt"><span class="prompt-mark">➜</span> <span class="prompt-path">~</span> ${prompt}</div><div>${output}</div></div>`).join('');
    return;
  }

  for (const [prompt, output] of terminalLines) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = '<div class="prompt"><span class="prompt-mark">➜</span> <span class="prompt-path">~</span> <span class="typed"></span><span class="cursor"></span></div>';
    terminalBody.appendChild(line);
    const typed = line.querySelector('.typed');

    for (let index = 1; index <= prompt.length; index += 1) {
      typed.textContent = prompt.slice(0, index);
      await wait(28);
    }

    await wait(180);
    line.insertAdjacentHTML('beforeend', `<div>${output}</div>`);
    line.querySelector('.cursor').remove();
    await wait(320);
  }
}

function updateActiveSection(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}

animateTerminal();

const sectionObserver = new IntersectionObserver(updateActiveSection, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));
