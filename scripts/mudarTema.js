export default function mudarTema() {
    const themes = {
        'default-theme':'purple-theme',
        'purple-theme': 'dark-theme',
        'dark-theme':'default-theme',
    }
    
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    const botaoMudarTema = document.querySelector('.botao__tema');
    botaoMudarTema.addEventListener('click', event => {
        event.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme') || 'default-theme';
        const newTheme = themes[currentTheme] || 'default-theme';

        document.body.setAttribute('data-theme',newTheme);

        localStorage.setItem('theme', newTheme);
    })
}