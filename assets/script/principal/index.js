    document.addEventListener('DOMContentLoaded', function() {
        const languageSelect = document.getElementById('languageSelect');

        const pageTitle = document.getElementById('page-title');
        const aboutLink = document.getElementById('about-link');
        const greeting = document.getElementById('greeting');
        const intro = document.getElementById('intro');
        const social = document.getElementById('social');
        const githubLink = document.getElementById('github-link');
        const linkedinLink = document.getElementById('linkedin-link');
        const formTitle = document.querySelector('#book-form h2');
        const searchButton = document.getElementById('search-button');
        const tableHeader = document.getElementById('table-header');
        const footerText = document.getElementById('footer-text');

        // Função para carregar o conteúdo do JSON de acordo com o idioma selecionado
        function loadContent(language) {
            fetch(`${language}_index.json`)
                .then(response => response.json())
                .then(data => {
                    pageTitle.textContent = data.pageTitle;
                    aboutLink.textContent = data.aboutLink;
                    greeting.innerHTML = data.greeting; // Usando innerHTML para incluir o strong
                    intro.textContent = data.intro;
                    social.textContent = data.social;
                    githubLink.textContent = data.githubLink;
                    linkedinLink.textContent = data.linkedinLink;
                    formTitle.textContent = data.formTitle;
                    searchButton.textContent = data.searchButton;
                    tableHeader.textContent = data.tableHeader;
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

        // Event listener para submissão do formulário de busca de livros
        document.getElementById('book-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o comportamento padrão de submissão do formulário

            const bookTitle = document.getElementById('book-title').value;
            searchBook(bookTitle);
        });

        // Função assíncrona para buscar livros na API do Gutenberg
        async function searchBook(title) {
            const apiUrl = `https://gutendex.com/books?search=${title}`;
            
            try {
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                displayBooks(data.results);
                
            } catch (error) {
                console.error('Houve um problema com a solicitação de busca:', error);
            }
        }

        // Função para exibir os links dos livros na tabela
        function displayBooks(books) {
            const booksTableBody = document.getElementById('books-table').getElementsByTagName('tbody')[0];
            booksTableBody.innerHTML = ''; // Limpa quaisquer linhas existentes na tabela
            
            books.forEach(book => {
                const link = book.formats["text/html"] || 'Link not available';
                const row = booksTableBody.insertRow();
                const cell = row.insertCell(0);
                const linkElement = document.createElement('a');
                linkElement.href = link;
                linkElement.textContent = 'Clique aqui para ler o livro. Boa Leitura!';
                linkElement.target = '_blank'; // Abre o link em uma nova aba
                
                cell.appendChild(linkElement);
            });
        }
    });