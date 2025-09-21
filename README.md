# JifaOdonto - Testes 🦷✨, 
Essa etapa (repositório), representa o terceiro entregável do Projeto Intregado IV, e enfatiza os testes de software, com foco na verificação da API desenvolvida, utilizando testes manuais e automatizados.

## 🧪 Testes E2E (Cypress + Cucumber)

Esta base inclui uma suíte de testes E2E para a API usando Cypress com Cucumber (.feature). A suíte de testes está em `cypress/e2e/features` e usa step definitions em `cypress/e2e/step_definitions`.

### ⚙️ Estrutura e Funcionamento dos Testes

Os testes seguem a abordagem de **BDD (Behavior-Driven Development)**, o que significa que o comportamento esperado é descrito em linguagem natural antes de ser implementado como código. O fluxo funciona da seguinte maneira:

1.  **Especificações (`.feature` files):** Localizados em `cypress/e2e/features/`, esses arquivos usam a sintaxe Gherkin (`Given`, `When`, `Then`) para descrever os cenários de teste de forma legível.
2.  **Implementação (`step_definitions`):** Na pasta `cypress/e2e/step_definitions/`, cada passo descrito nos arquivos `.feature` é mapeado para um trecho de código JavaScript que executa a ação correspondente (ex: fazer uma chamada de API).
3.  **Comandos de Suporte:** O arquivo `cypress/support/commands.js` contém lógica reutilizável, como o comando `cy.getToken()`, que realiza o login e armazena o token JWT para ser usado em testes que exigem autenticação.

### 🎯 Rotas e Funcionalidades Testadas

A suíte de testes de API cobre as seguintes funcionalidades principais:

-   **Autenticação (`/api/auth`):** Valida o login de usuários com credenciais válidas e inválidas (`auth.feature`).
-   **Usuários (`/users`):** Testa o CRUD (criação, leitura, atualização e deleção) de usuários (`users.feature`).
-   **Agendamentos (`/appointments`):** Cobre o CRUD completo para os agendamentos (`appointment.feature`).
-   **Painel do Cliente (`/client-panel`):** Verifica os endpoints específicos do painel do cliente, como acesso a atividades e gerenciamento de agendamentos (`clientpanel.feature`).

O processo para cada teste geralmente envolve:
-   **Preparação (`Given`):** O estado inicial é configurado. Isso pode incluir criar um usuário no banco ou obter um token de autenticação.
-   **Ação (`When`):** A requisição para o endpoint da API é feita usando o comando `cy.request()`.
-   **Verificação (`Then`):** A resposta da API é validada, checando o status code (ex: 200, 401) e o conteúdo do corpo da resposta.

### 📋 Pré-requisitos
- Ter o servidor da API rodando em `http://localhost:3000` (ou ajustar `API_BASE` via variáveis de ambiente).
- Node.js e npm instalados.
- MongoDB disponível (conforme configuração em `.env`).

### 🚀 Executando os testes localmente

1. Navegue até a pasta raiz do projeto e instale as dependências:

    **Windows (PowerShell):**
    ```powershell
    cd caminho\para\o\seu\projeto
    npm install
    ```

    **Linux/macOS (Terminal):**
    ```bash
    cd caminho/para/o/seu/projeto
    npm install
    ```

2. Inicie a API (em um terminal separado):

    ```bash
    npm run dev:api
    # ou
    node api/app.js
    ```

3. Rode a suíte Cypress completa:

    ```bash
    npx cypress run --spec "cypress/e2e/**/*.feature"
    ```

### 📝 Notas úteis
- Os testes usam um helper para buscar/normalizar o JWT retornado pela rota `POST /api/auth`. Se a resposta do endpoint for alterada, atualize `cypress/support/commands.js`.
- As step definitions cuidam de criar recursos necessários (usuários, agendamentos) em modo "best-effort"; a suíte tenta criar usuários quando não existentes e salva aliases (ex.: `userId`) para uso em cenários subsequentes.
- Para depuração local, executar apenas um spec com:

    ```powershell
    npx cypress run --spec "cypress/e2e/features/users.feature"
    ```

- Em CI, garanta que a API esteja disponível antes de rodar os testes (por exemplo, iniciar a API em background ou usar um job separado que o provisiona). 

NÃO EXPOR TOKENS NOS LOGS EM AMBIENTES PUBLICOS E DE CI! EXPOSTOS APENAS PARA TESTE LOCAL.

## 💡 [Componente Extensionista] - O Impacto dos Testes na Sociedade

Imagine comprar um carro que nunca passou por testes de segurança, ou um alimento que não teve controle de qualidade. Assustador, certo? No mundo digital, os **testes de software** têm a mesma importância para os aplicativos e sistemas que usamos todos os dias.

Testar um software é o processo de garantir que ele funcione como deveria, seja confiável e, acima de tudo, seguro para quem o utiliza. Quando os desenvolvedores criam testes, eles estão, na prática, protegendo nosso dia a dia de várias formas:

-   **Confiança no seu dinheiro:** Testes rigorosos em aplicativos de banco garantem que sua transferência vá para a pessoa certa e que seu saldo seja exibido corretamente.
-   **Segurança em suas compras:** Ao comprar online, os testes ajudam a proteger seus dados pessoais e de pagamento contra vazamentos e fraudes.
-   **Confiabilidade nos serviços:** Seja em um app de transporte, em uma rede social ou em um sistema de agendamento médico, os testes asseguram que o serviço não vai falhar quando você mais precisa.

O trabalho de quem testa é pensar em todas as formas possíveis de "quebrar" o sistema de propósito, para que os problemas sejam encontrados e corrigidos *antes* que o programa chegue até você. Eles verificam tudo, desde o clique em um botão até a segurança das informações mais sensíveis.

Portanto, testes de software não são apenas uma etapa técnica no desenvolvimento. São um pilar fundamental para construir uma sociedade digital mais segura e confiável, onde a tecnologia serve para facilitar nossas vidas, e não para criar problemas. 

