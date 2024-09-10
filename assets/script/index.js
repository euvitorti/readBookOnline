document.addEventListener('DOMContentLoaded', function () {

    // Event listener para submissão do formulário de busca de livros
    document.getElementById('book-form').addEventListener('submit', function (event) {
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