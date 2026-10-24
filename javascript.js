const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const imageDialog = document.querySelector('.image-dialog');
const dialogImage = document.querySelector('.dialog-image');
const dialogCaption = document.querySelector('.dialog-caption');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const setTheme = (isDark) => {
	document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	themeColorMeta.content = isDark ? '#111a18' : '#f3f5ef';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
	themeIcon.textContent = isDark ? '☀' : '☾';
	themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
};

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

themeToggle.addEventListener('click', () => {
	const isDark = document.documentElement.dataset.theme !== 'dark';
	setTheme(isDark);
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

menuButton.addEventListener('click', () => {
	const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
	menuButton.setAttribute('aria-expanded', String(!isExpanded));
	menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
	siteNav.classList.toggle('is-open', !isExpanded);
});

siteNav.addEventListener('click', (event) => {
	if (event.target.closest('a')) {
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('aria-label', 'Open navigation');
		siteNav.classList.remove('is-open');
	}
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.project-image-button').forEach((button) => {
	button.addEventListener('click', () => {
		dialogImage.src = button.dataset.image;
		dialogImage.alt = button.querySelector('img').alt;
		dialogCaption.textContent = button.dataset.title;
		imageDialog.showModal();
	});
});

imageDialog.querySelector('.dialog-close').addEventListener('click', () => {
	imageDialog.close();
});

imageDialog.addEventListener('click', (event) => {
	if (event.target === imageDialog) {
		imageDialog.close();
	}
});
