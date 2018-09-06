let elem = document.getElementById('change-theme');
elem.addEventListener('click', function () {
    let theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.head.getElementsByTagName('link')[0].href='css/style.css';
        localStorage.setItem('theme', 'dark');
    } else {
        document.head.getElementsByTagName('link')[0].href='css/style-light.css';
        localStorage.setItem('theme', 'light');
    }
});
