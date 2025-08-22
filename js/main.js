// Aguarda o carregamento completo do HTML antes de executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO SELETOR DE COR ---
    const colorPicker = document.getElementById('colorPicker');
    
    // Função para converter uma cor Hexadecimal para RGBA
    function hexToRgbA(hex, alpha = 0.25) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return `rgba(${[(c>>16)&255, (c>>8)&255, c&255].join(',')},${alpha})`;
        }
        // Retorna um valor padrão caso a cor seja inválida
        return 'rgba(37, 194, 167, 0.25)';
    }

    // Evento que dispara toda vez que o usuário muda a cor
    colorPicker.addEventListener('input', (event) => {
        const newColor = event.target.value;
        const newColorRgba = hexToRgbA(newColor);
        
        // Atualiza as variáveis CSS no documento
        document.documentElement.style.setProperty('--cor-principal', newColor);
        document.documentElement.style.setProperty('--cor-principal-rgba', newColorRgba);
    });


    // --- LÓGICA DO FORMULÁRIO DE MENSAGEM ---
    const messageForm = document.getElementById('messageForm');
    
    // Verifica se o formulário existe na página antes de adicionar o listener
    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
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
                    form.reset(); // Limpa o formulário após o envio bem-sucedido
                })
                .catch(function(error) {
                    alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
                    console.error('Erro:', error);
                });
        });
    }

});
