let despesas = [];
let editIndex = null;
let currentUser = null;

//DOM
//Lofin
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const logoutBtn = document.getElementById('logout-btn');

//Olá user
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const welcomeMessage = document.getElementById('welcome-message');

//Hora e data local
const currentDatetime = document.getElementById('current-datetime');

//Tema
const themeToggle = document.getElementById('theme-toggle');

//Tempo
const weatherInfo = document.getElementById('weather-info');


//Despesas
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const filterCategory = document.getElementById('filter-category');
const totalAmount = document.getElementById('total-amount');



// Login (LocalStorage)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username !== '') {
        localStorage.setItem('user', username);
        iniciarApp(username);
    }
});

//Pós Login
//Olá username
function iniciarApp(username) {
    currentUser = username;
    //Esconde a dvi do login
    loginSection.classList.add('hidden');
    //Mostra a div da app
    appSection.classList.remove('hidden');
    //aparece na app Olá Nome do User
    welcomeMessage.textContent = welcomeMessage.textContent +`${currentUser}!`;

    //PAra carregar as depesas deste user.
    const savedExpenses = localStorage.getItem('expenses_' + currentUser);
    if (savedExpenses) {
        despesas = JSON.parse(savedExpenses);
    // } else {//Redundante
    //     despesas = [];
    }
    mostrarDespesas();

    //Para carregar o tema deste user
    const savedTheme = localStorage.getItem('theme_' + currentUser);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Modo Claro';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Modo Escuro';
    }
}
//logoutBtn
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user'); //Remove o user
    despesas = []; //Limpa o array das despesas.
    appSection.classList.add('hidden'); //Esconde a div da app
    loginSection.classList.remove('hidden');//Mostra a div do login
    loginForm.reset(); //Limpa o login form
    welcomeMessage.textContent = 'Olá, '; //Esmaga o textcontent
});

//Hora e data local
function atualizarDataHora() {
    const agora = new Date();
    currentDatetime.textContent = agora.toLocaleString('pt-PT');
}

//Tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    //Atualiza a localstorage e o que é mostrado no botão
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme_' + currentUser, 'dark');
        themeToggle.textContent = '☀️ Modo Claro';
    } else {
        localStorage.setItem('theme_' + currentUser, 'light');
        themeToggle.textContent = '🌙 Modo Escuro';
    }
});

// Tempo
function fetchTempo() {
    fetch('https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json')
        .then(response => response.json())
        .then(data => {
            const hoje = data.data[0];
            weatherInfo.textContent = `Lisboa - T. Máx: ${hoje.tMax} °C | T. Mín: ${hoje.tMin} °C`;
        })
        .catch(error => {
            weatherInfo.textContent = 'Erro ao carregar dados do tempo.';
            console.error('Erro na API IPMA:', error);
        });
}

// Registar ou Editar Despesa
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(expenseForm);
    const descricao = formData.get('descricao').trim();
    const valor = parseFloat(formData.get('valor'));
    const categoria = formData.get('categoria');

    //Redundante porque o FE já valida, mas boa prática
    if (descricao && !isNaN(valor) && categoria) {
        if (editIndex === null) {
            // Criar nova despesa
            despesas.push({ descricao, valor, categoria });
        } else {
            // Atualizar despesa existente
            despesas[editIndex] = { descricao, valor, categoria };
            editIndex = null;
            expenseForm.querySelector('button[type="submit"]').textContent = 'Adicionar Despesa';
        }

        guardarDespesa();
        expenseForm.reset();
    }
});

//Guardar (localstorage) e atualizar a lista de despesas
function guardarDespesa() {
    // localStorage.setItem('expenses', JSON.stringify(despesas));
    localStorage.setItem('expenses_' + currentUser, JSON.stringify(despesas));
    mostrarDespesas();
}

// Mostrar Lista, Calcular Total (.reduce) e Filtrar (.filter)
function mostrarDespesas() {
    expenseList.innerHTML = '';
    const categoriaSelecionada = filterCategory.value;

    // Filtrar por categoria
    const despesasFiltradas = despesas.filter(item => {
        if (categoriaSelecionada === 'Todas') return true;
        return item.categoria === categoriaSelecionada;
    });

    //SE a lista filtrada estiver vazia
    if (despesasFiltradas.length === 0) {
        expenseList.innerHTML = '<li>Nenhuma despesa registada.</li>';
        totalAmount.textContent = '0.00';
        return;
    }

    //SE a lista não estiver vazia
    // Por cada eelmento da lista, acrescenta-o à ul
    despesasFiltradas.forEach((item) => {
        const realIndex = despesas.indexOf(item);
        const li = document.createElement('li');

        li.innerHTML = `
            <span><strong>${item.descricao}</strong> - ${item.valor.toFixed(2)} € <em>(${item.categoria})</em></span>
            <div class="actions">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Apagar</button>
            </div>
        `;

        li.querySelector('.btn-edit').addEventListener('click', () => editarDespesa(realIndex));
        li.querySelector('.btn-delete').addEventListener('click', () => apagarDespesa(realIndex));

        expenseList.appendChild(li);
    });

    //Calcular o total gasto
    const total = despesasFiltradas.reduce((soma, item) => soma + item.valor, 0);
    totalAmount.textContent = total.toFixed(2);
}

//Filtro
//Sempre que o dropdown é alterado a função de mostrar despesas é invocada
filterCategory.addEventListener('change', () => {
    mostrarDespesas();
});

//Apagar despesa
function apagarDespesa(index) {
    despesas.splice(index, 1);
    guardarDespesa();
};

//Editar despesa
function editarDespesa(index) {
    const item = despesas[index];
    expenseForm.elements['descricao'].value = item.descricao;
    expenseForm.elements['valor'].value = item.valor;
    expenseForm.elements['categoria'].value = item.categoria;
    
    editIndex = index;
    expenseForm.querySelector('button[type="submit"]').textContent = 'Atualizar Despesa';
};


//Quando a página é carregada.
//Mostrar data e hora
atualizarDataHora();
//Atualizar data e hora, 1x a cada segundo
setInterval(atualizarDataHora, 1000);

//Mostar o tempo
fetchTempo();
//Atualizar o tempo 1x por 1h
setInterval(fetchTempo, 60*60*1000);