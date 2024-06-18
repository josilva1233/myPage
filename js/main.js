document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submissão do formulário

    var form = event.target;
    var formData = new FormData(form);

    fetch('https://formspree.io/f/xqknzakp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem.');
            }
            return response.json();
        })
        .then(function(data) {
            alert('Mensagem enviada com sucesso!');
            form.reset(); // Limpa o formulário após o envio bem-sucedido, se necessário
            // Pode adicionar aqui qualquer ação após o envio bem-sucedido
            window.location.href = 'https://josilva1233.github.io/myPage/';
        })
        .catch(function(error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
            console.error('Erro:', error);
        });
});