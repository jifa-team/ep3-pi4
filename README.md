# JifaOdonto - Testes 🦷✨

## 🧪 Testes E2E (Cypress + Cucumber)

Esta base inclui uma suíte de testes E2E para a API usando Cypress com Cucumber (.feature). A suíte de testes está em `cypress/e2e/features` e usa step definitions em `cypress/e2e/step_definitions`.

### Pré-requisitos
- Ter o servidor da API rodando em `http://localhost:3000` (ou ajustar `API_BASE` via variáveis de ambiente).
- Node.js e npm instalados.
- MongoDB disponível (conforme configuração em `.env`).

### Executando os testes localmente
1. Instale dependências (se ainda não instalou):

    ```powershell
    cd C:\Users\55889\Desktop\ep2-pi4
    npm install
    ```

2. Inicie a API (em outro terminal):

    ```powershell
    npm run dev:api
    # ou
    node api/app.js
    ```

3. Rode a suíte Cypress completa:

    ```powershell
    npx cypress run --spec "cypress/e2e/**/*.feature"
    ```

### Notas úteis
- Os testes usam um helper para buscar/normalizar o JWT retornado pela rota `POST /api/auth`. Se a resposta do endpoint for alterada, atualize `cypress/support/commands.js`.
- As step definitions cuidam de criar recursos necessários (usuários, agendamentos) em modo "best-effort"; a suíte tenta criar usuários quando não existentes e salva aliases (ex.: `userId`) para uso em cenários subsequentes.
- Para depuração local, executar apenas um spec com:

    ```powershell
    npx cypress run --spec "cypress/e2e/features/users.feature"
    ```

- Em CI, garanta que a API esteja disponível antes de rodar os testes (por exemplo, iniciar a API em background ou usar um job separado que o provisiona). 

NÃO EXPOR TOKENS NOS LOGS EM AMBIENTES PUBLICOS E DE CI! EXPOSTOS APENAS PARA TESTE LOCAL.

## 💡  _[Componente Extensionista]_ 

