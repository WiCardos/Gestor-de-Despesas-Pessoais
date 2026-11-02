# 💰 Gestor de Despesas Pessoais (Personal Expense Manager)

Aplicação web desenvolvida no âmbito do curso de Software Developer (CESAE Digital), focada na manipulação avançada do DOM, persistência de dados em `localStorage` e integração com APIs externas.

---

## 📋 Sobre o Projeto (Projeto Final 2)

O objetivo principal foi criar um sistema completo de gestão de despesas pessoais que inclui as seguintes funcionalidades:
- **Simulação de Login:** Autenticação por sessão de utilizador com saudação personalizada (*"Olá, Nome!"*).
- **Registo de Despesas:** Formulário interativo para adicionar despesas com descrição, valor em euros e respetiva categoria.
- **Listagem e Gestão:** Visualização de todas as despesas registadas, com opções para editar ou apagar itens individualmente.
- **Filtragem e Cálculo:** Visualização dinâmica do total gasto e filtragem avançada por categorias (utilização de métodos de arrays como `.filter()` e `.reduce()`).
- **Tema Claro / Escuro:** Personalização de aspeto com persistência individual por utilizador via `localStorage`.
- **Data e Hora Atual:** Relógio em tempo real renderizado na interface.
- **API Externa:** Integração com a API aberta do IPMA para exibição meteorológica em tempo real.
- **Isolamento de Dados por Utilizador:** Arquitetura de `localStorage` compartimentada por nomes de utilizador (`expenses_username` e `theme_username`).

---

## 📊 Critérios de Avaliação

| Critério | Cotação |
| :--- | :---: |
| **Funcionalidades principais** | 5 |
| **Formulário, validação e feedback** | 2 |
| **DOM, eventos e interação** | 3 |
| **Persistência em localStorage** | 2 |
| **Data/hora atual** | 1 |
| **Integração com API externa** | 3 |
| **Qualidade do código JS** | 2 |
| **Criatividade / Inovação / Novas funcionalidades** | 2 |
| **Total** | **20** |

*(Nota: O projeto e a respetiva defesa valem 50% da nota final do módulo).*

---

## 🚀 Como Executar o Projeto

1. Clone o repositório para o seu computador:
   ```bash
   git clone [https://github.com/WiCardos/GestorDespesasPessoais.git](https://github.com/WiCardos/GestorDespesasPessoais.git)