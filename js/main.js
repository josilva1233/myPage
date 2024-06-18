function enviarFormulario() {
    // Captura o formulário
    var form = document.getElementById('messageForm');

    // Cria um objeto FormData e preenche com os dados do formulário
    var formData = new FormData(form);

    // Envia os dados utilizando fetch
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
            // Pode adicionar aqui qualquer ação após o envio bem-sucedido
        })
        .catch(function(error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
            console.error('Erro:', error);
        });
}