document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    
    const pageTitle = document.querySelector('title');
    const homeLink = document.querySelector('.menu-link');
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutIntro = document.getElementById('aboutIntro');
    const searchInfo = document.querySelector('.conteudo h3:nth-of-type(1)');
    const searchDescription = document.querySelector('.conteudo p:nth-of-type(2)');
    const greeting = document.getElementById('greeting');
    const footerText = document.getElementById('footer-text');

    // Função para carregar o conteúdo do JSON de acordo com o idioma selecionado
    function loadContent(language) {
        fetch(`${language}_about.json`)
            .then(response => response.json())
            .then(data => {
                pageTitle.textContent = data.pageTitle;
                homeLink.textContent = data.homeLink;
                aboutTitle.textContent = data.aboutTitle;
                aboutIntro.textContent = data.aboutIntro;
                searchInfo.textContent = data.searchInfo;
                searchDescription.textContent = data.searchDescription;
                greeting.innerHTML = data.greeting; // Usando innerHTML para incluir o strong
                footerText.textContent = data.footerText;
            })
            .catch(error => console.error('Erro ao carregar JSON:', error));
    }

    // Event listener para mudança no select de idiomas
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = languageSelect.value;
        loadContent(selectedLanguage);
    });

    // Carregar o conteúdo inicial de acordo com o idioma padrão (português)
    loadContent(languageSelect.value);
});

