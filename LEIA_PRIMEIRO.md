# Conexões — edição Spark (sem Storage e sem Functions)

Esta edição usa GitHub Pages, Firebase Authentication (Google) e Cloud Firestore diretamente. Não precisa ativar Storage ou publicar Functions. Não utiliza arquivos `.env` nem `firebase-admin`.

**Leia antes de substituir a versão anterior:** esta é uma edição adaptada para uso em turma. A estrutura de dados e algumas funções mudaram. Comprovantes e materiais passam a ser links externos; correção acontece no painel da professora; limites de alunos/respostas dos planos são orientativos. Financeiro comercial avançado e certificados verificáveis da edição anterior não foram transferidos. Consulte `DIFERENCAS_E_LIMITES.md`.

## 1. Atualizar o repositório

1. Baixe e extraia o ZIP; entre na pasta `plataforma-avaliacoes`.
2. No repositório `app-conexao`, substitua `dist/`, `.github/workflows/pages.yml`, `firebase.json`, `firestore.rules`, `firestore.indexes.json` e os documentos pelos arquivos deste pacote. Inclua `.firebaserc`.
3. Se conservar o histórico do código antigo, não o publique em `dist/`. A pasta `functions/` e os scripts `set-admin.mjs`, `set-teacher.mjs`, `database-backup.mjs` antigos não são usados nesta edição. Você pode removê-los do repositório para evitar confusão. Preserve seus backups fora do repositório público.
4. Não copie arquivos de conta de serviço ou comprovantes para o GitHub. Esta edição não precisa dessas credenciais.
5. O `package.json` da raiz contém ferramentas opcionais de testes/implantação; não há dependência npm de produção no frontend. Não execute `npm install --prefix functions`.

## 2. Configurar Firebase

O projeto já é `app-conexao-783a4` em `.firebaserc` e `dist/firebase-config.json`.

No console Firebase:

- Habilite Authentication → Google e configure o e-mail de suporte.
- Em Authentication → Settings → Authorized domains, inclua `anapaulacostacurta-ifpr.github.io` ou o hostname em que publicar. Não inclua caminho, protocolo ou nome do repositório.
- Crie o Cloud Firestore na edição Standard, modo produção, no banco `(default)`. Não crie um banco de teste aberto.
- Não é necessário ativar Storage, Functions ou faturamento para os recursos desta edição. O uso continua sujeito às cotas do Spark; acompanhe o painel de uso.

## 3. Publicar somente Firestore

No Codespace, na raiz do projeto:

```bash
cd /workspaces/app-conexao
nvm use 22
firebase login --no-localhost
firebase deploy --project app-conexao-783a4 --only firestore:rules,firestore:indexes
```

Se não tiver Firebase CLI: `npm install -g firebase-tools`.

Também incluímos `scripts/deploy-firebase.sh`, que executa apenas regras/índices via `npx firebase-tools`. Nunca use o comando antigo com `functions` ou `storage` para este pacote.

## 4. Publicar GitHub Pages

Envie os arquivos ao branch `main`. Em Settings → Pages → Source, escolha GitHub Actions. A publicação envia somente `dist/`. Abra a URL fornecida pelo GitHub.

## 5. Cadastrar o primeiro administrador (sem Functions)

1. Abra o site e entre com sua conta Google.
2. Preencha seu cadastro como Professor e aguarde aprovação. O site mostrará seu UID na tela de pendência.
3. No console Firebase → Firestore → Dados, crie a coleção **sparkAdmins**.
4. Crie um documento cujo **ID seja exatamente seu UID do Authentication**. Adicione um campo booleano `enabled` com valor `true`.
5. Saia do site e entre novamente. O painel Administração estará disponível. Aprove seu próprio perfil de professor para criar cursos e aprove os demais professores/equipe.

A existência desse documento concede administração. O campo `enabled` é apenas informativo nesta edição: para revogar, **exclua o documento sparkAdmins/UID no console**. Nenhum usuário, nem administrador pelo site, consegue criar documentos nessa coleção. Use somente pessoas autorizadas.

## 6. Primeiro teste com uma turma

1. Professor aprovado: crie o curso, disciplinas, turma, períodos e datas.
2. Compartilhe o código do curso. Alunos entram com Google, cadastram-se e solicitam matrícula pelo código.
3. No curso, abra Matrículas e pagamentos; selecione os alunos e aprove em lote. Cadastros de estudantes pendentes do mesmo campus podem ser aprovados pelo professor nessa ação. Perfis suspensos exigem intervenção administrativa.
4. Cadastre uma avaliação usando o exemplo incluído. Clique em Liberar para receber respostas. Data vazia permite qualquer dia; uma data restringe ao dia, no fuso de Brasília, pelas regras.
5. Responda com uma segunda conta matriculada. No painel docente, abra Respostas e correção. Questões objetivas são calculadas ao salvar a correção; abertas exigem nota e podem receber feedback.
6. Confira a publicação da nota/conceito para o aluno e o lançamento no conselho do período selecionado.
7. Teste um usuário sem matrícula: ele não deverá ler a avaliação nem o gabarito.

Não houve publicação ou teste com suas contas reais nesta entrega. Os testes incluídos usam dados fictícios e emulador local.

## 7. Arquivos externos

Comprovantes, conteúdos e timbres devem ser links HTTPS do Drive ou de outro serviço. O aplicativo não hospeda nem altera as permissões desses arquivos. Compartilhe com as pessoas que precisam consultá-los; comprovantes não precisam ser públicos para qualquer pessoa.

## 8. Dados da versão anterior

As novas coleções começam com `spark`, preservando os documentos antigos. Não existe migração automática da antiga estrutura. Os backups JSON antigos de Functions não podem ser restaurados diretamente neste formato. Se já havia alunos ou avaliações reais, guarde o backup da versão anterior antes de substituir as regras e faça uma conversão revisada dos dados. Não apague dados antigos como parte da instalação.
