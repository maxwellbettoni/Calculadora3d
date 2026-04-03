document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    // Res elements
    const resCusto = document.getElementById('resCusto');
    const resLucro = document.getElementById('resLucro');
    const resVenda = document.getElementById('resVenda');
    
    // Number formatter for currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const calcular = () => {
        // Obter valores
        const peso = parseFloat(document.getElementById('peso').value) || 0;
        const tempo = parseFloat(document.getElementById('tempo').value) || 0;
        const precoFilamento = parseFloat(document.getElementById('precoFilamento').value) || 0;
        const acessorios = parseFloat(document.getElementById('acessorios').value) || 0;
        const custoHoraMaq = parseFloat(document.getElementById('custoHora').value) || 0;
        const watts = parseFloat(document.getElementById('watts').value) || 0;
        const taxaKwh = parseFloat(document.getElementById('taxaKwh').value) || 0;
        const margemLucro = parseFloat(document.getElementById('lucro').value) || 0;

        // Cálculos
        const custoMaterial = (peso / 1000) * precoFilamento;
        const custoEnergia = (watts / 1000) * tempo * taxaKwh;
        const custoMaq = tempo * custoHoraMaq;
        
        const custoTotal = custoMaterial + custoEnergia + custoMaq + acessorios;
        const precoVendaObj = custoTotal * (1 + (margemLucro / 100));
        const lucroLiquido = precoVendaObj - custoTotal;

        // Atualizar UI
        resCusto.textContent = formatCurrency(custoTotal);
        resLucro.textContent = formatCurrency(lucroLiquido);
        resVenda.textContent = formatCurrency(precoVendaObj);
    };

    // Adiciona event listeners para recalcular instantaneamente
    inputs.forEach(input => {
        input.addEventListener('input', calcular);
    });

    // Cálculo inicial
    calcular();
});
