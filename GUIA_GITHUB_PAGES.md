> **Pacote atualizado:** leia [ATUALIZACAO_IMPLANTACAO.md](ATUALIZACAO_IMPLANTACAO.md) para planos, alertas, conselho acumulativo, timbre PDF/DOCX, fechamento anual, backup/exclusão confirmada e cadastro da demonstração.

> **Edição ampliada:** páginas de curso, módulos/progresso, avaliações integradas, certificados, banco de questões, avisos, financeiro/ofertas, identidade institucional, acompanhamento, conselho, ocorrências e backup. Consulte [GUIA_RECURSOS_E_ACOMPANHAMENTO.md](GUIA_RECURSOS_E_ACOMPANHAMENTO.md) e [ROTEIRO_PILOTO_TURMA.md](ROTEIRO_PILOTO_TURMA.md).

> **Cursos e pagamentos:** cursos gratuitos/pagos com disciplinas, comprovantes privados, aprovação manual, validade e renovação mensal/trimestral/semestral/anual e remuneração por professor. Consulte [GUIA_CURSOS_E_PAGAMENTOS.md](GUIA_CURSOS_E_PAGAMENTOS.md). Configure também o bucket de comprovantes e publique as regras de Storage.

> **Atualização:** planos Free/Premium/Personalizado e novos planos configuráveis, múltiplas alternativas corretas com penalidade e quiz ao vivo com gráficos. Consulte [GUIA_PLANOS_E_QUIZ.md](GUIA_PLANOS_E_QUIZ.md) para limites, contagens, recursos e implantação. Atualize Functions e regras além da interface.

# Publicação no GitHub Pages + Firebase

## O que o pacote entrega

Interface responsiva para alunos, professores e administrador; aprovação de alunos em lote; importação com prévia de `Class data.json`; matrículas por campus/disciplina/turma; avaliações genéricas; conceito ou nota; correção e feedback individual; registros de ocorrências.

GitHub Pages hospeda somente `dist/`, que contém HTML, CSS e JavaScript públicos. Firebase fornece login Google, Cloud Functions e Cloud Firestore. O workflow de Pages não publica nem modifica o Firebase.

## 1. Criar o repositório e publicar a interface

1. Extraia o ZIP. Entre na pasta `plataforma-avaliacoes`.
2. Crie um repositório dedicado no GitHub, por exemplo `plataforma-avaliacoes`. Isso evita substituir a publicação de outro site que você já utiliza.
3. Envie o conteúdo interno dessa pasta para a raiz do repositório, incluindo a pasta oculta `.github/workflows/pages.yml`. Não envie o ZIP como único arquivo e não acrescente um nível extra de pasta acima de `dist`.
4. Utilize o branch `main`. Se usar outro branch, altere `branches: [main]` no workflow.
5. Em Settings → Pages → Build and deployment → Source, selecione **GitHub Actions**.
6. Na aba Actions, acompanhe **Publicar plataforma no GitHub Pages**. Se necessário, abra o workflow e clique em Run workflow.
7. Abra o endereço exibido pelo GitHub após o término. O padrão é `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`. Nenhum endereço real foi criado por esta entrega.

O workflow valida a sintaxe, executa os testes e envia apenas `dist/` para Pages. Caminhos relativos mantêm CSS, JavaScript e configuração funcionando em um repositório de projeto. Não há compilação npm da interface. O navegador precisa de internet para carregar o SDK Firebase quando habilitado.

Se quiser colocar a aplicação em uma pasta de um site já existente, copie somente os arquivos internos de `dist/` para a pasta de destino e mantenha a publicação que o repositório já usa. Não substitua o workflow ou a pasta pública do seu site atual pelo workflow deste pacote sem adaptar o caminho de publicação.

## 2. Configurar Firebase

1. No console Firebase, crie/selecione o projeto e registre um aplicativo Web.
2. Ative Authentication → Google. Configure o e-mail de suporte.
3. Ative Cloud Firestore em modo produção e escolha a localização adequada à instituição.
4. As Cloud Functions usam Node.js 22 e região `southamerica-east1`. Se mudar a região no código, ajuste também `region` no JSON público.
5. Verifique plano compatível com Functions, normalmente Blaze, custos e alertas de orçamento. Nenhum faturamento foi ativado nesta entrega.
6. Edite `dist/firebase-config.json` e preencha `firebase.apiKey`, `firebase.authDomain`, `firebase.projectId` e `firebase.appId` com os dados do aplicativo Web.
7. Em Authentication → Settings → Authorized domains, adicione **somente o hostname do GitHub Pages**, por exemplo `SEU-USUARIO.github.io`. Não inclua `https://` nem o caminho do repositório. Se usar domínio próprio, adicione esse domínio.
8. A configuração Web é pública. Nunca coloque chave de conta de serviço, senha ou credencial administrativa em `dist`, no JSON ou no repositório.

No GitHub Pages, o login usa popup Google. Se o navegador bloquear o popup, permita-o e tente novamente. O site não tenta redirecionar silenciosamente para um fluxo que pode falhar devido a armazenamento de terceiros. Teste o login nos aparelhos Android/iOS que serão utilizados. Para restrições persistentes de popup, a instituição deve escolher um domínio/hospedagem de autenticação compatível seguindo a documentação Firebase; não altere `authDomain` para o domínio GitHub sem configurar a infraestrutura exigida.

## 3. Publicar backend, regras e índices

Na sua máquina administrativa, instale Node.js 22 e Firebase CLI oficiais. Execute na raiz do pacote:

```bash
npm install --prefix functions
firebase login
firebase use --add
firebase deploy --only functions,firestore:rules,firestore:indexes
```

Ao selecionar o projeto, confirme que é o mesmo de `dist/firebase-config.json`. As regras bloqueiam as gravações diretas e as leituras não autorizadas de clientes; as Functions fazem as operações autenticadas e validam os vínculos.

O arquivo `firestore.indexes.json` contém o índice para vincular matrículas importadas pendentes. Aguarde o índice ficar pronto no console Firestore. O deploy pode solicitar autorização para serviços/APIs e faturamento; execute conscientemente na conta correta.

Não rode `firebase init` por cima deste pacote sem revisar, pois ele pode substituir arquivos. O workflow do GitHub não usa credenciais Firebase e não executa esse deploy. Para cada atualização do backend, repita o deploy das Functions/regras/índices.

## 4. Configurar o primeiro administrador

1. Publique a interface configurada, altere `enabled: true` em `dist/firebase-config.json` e entre com a conta Google que será administradora uma vez.
2. Copie o UID dessa conta no console Firebase Authentication.
3. Em ambiente confiável, configure credenciais padrão do Firebase Admin SDK. Se usar arquivo de serviço, guarde fora do repositório e aponte `GOOGLE_APPLICATION_CREDENTIALS` para ele.
4. Execute:

```bash
node scripts/set-admin.mjs UID_DO_ADMINISTRADOR
```

5. Saia e entre novamente no site para renovar o token.
6. O painel administrativo permitirá cadastrar instituição, campus e disciplinas, aprovar professores e estudantes e atribuir os vínculos.

Não existe senha padrão nem cadastro público para se tornar administrador. Não envie chaves de serviço ao navegador ou aos alunos.

## 5. Usar aprovação de alunos em lote

No painel administrativo, selecione instituição e campus. Marque os estudantes pendentes ou use **Selecionar pendentes exibidos**. A seleção é limitada a 100 por lote e considera os registros carregados e o filtro de busca.

Clique **Conferir aprovação**, revise os nomes e e-mails e confirme. O servidor revalida cada registro: professores, usuários ativos/suspensos, outro campus ou registros alterados são ignorados. Cada aprovação recebe um registro de auditoria. A interface mostra os resultados por aluno; em falhas de rede, parte do lote pode ter sido aprovada. Atualize a lista antes de repetir. Repetir não concede aprovação novamente a usuários já ativos.

Professores continuam sendo aprovados individualmente, pois precisam da atribuição explícita de disciplinas.

## 6. Importar JSON do Classroom

1. O professor abre **Alunos e matrículas**, seleciona a disciplina autorizada e expande **Importar alunos do Google Classroom (JSON)**.
2. Informa a turma de destino e escolhe `Class data.json` (não o ZIP completo do Takeout).
3. Clica **Carregar e conferir prévia**. Limites: arquivo até 5 MB e de 1 a 300 alunos por importação.
4. Confere nomes, e-mails e situações e clica **Confirmar importação**.

São extraídos apenas `students[].profile.name.fullName` e `students[].profile.emailAddress`. Professores, posts, rubricas, links e demais dados do arquivo não são enviados. O curso do Classroom não altera automaticamente instituição, campus, disciplina ou turma; o destino é escolhido no painel.

Situações:

- Aluno aprovado do mesmo campus, sem matrícula: cria matrícula ativa.
- Aluno sem conta ou com cadastro pendente do mesmo campus: prepara uma matrícula aguardando vínculo.
- Matrícula já existente: mantém sem duplicar ou alterar turma/estado.
- Nome/e-mail inválido ou e-mail repetido: ignora a linha e informa o motivo.
- Outro campus/instituição, perfil professor, cadastro suspenso/rejeitado ou conflito de turma: não altera; requer revisão individual.

Para aluno sem conta, o importador não cria conta Google nem Firebase Auth e não aprova cadastro. No primeiro acesso, ele entra com o mesmo e-mail Google verificado, preenche o cadastro e aguarda aprovação. Matrículas preparadas compatíveis são vinculadas quando o cadastro é aprovado ou no acesso seguinte. Outros vínculos/disciplina não são removidos. Uma matrícula inativa não é reativada silenciosamente; o professor deve revisá-la individualmente.

A prévia expira em 15 minutos. A confirmação revalida os dados e processa blocos de até 25 linhas, com registro de resultado por linha e retomada sem duplicar operações. Não há transação única para o arquivo inteiro: uma falha pode deixar resultados parciais. Use **Retomar última importação** na mesma conta/disciplina/navegador. Importações já iniciadas podem ser retomadas mesmo após a janela inicial da prévia. Não recarregue outro arquivo para tentar desfazer resultados: não há exclusão automática nem reversão integral da importação.

Somente o autor da prévia pode consultá-la/confirmá-la, mantendo sua autorização na disciplina. O identificador da última importação é guardado localmente; o histórico no banco mantém os resultados. A escola deve definir retenção e limpeza de `rosterImports`, `pendingEnrollments` e `accessAudit`, além dos dados de avaliações. Não há exclusão automática desses documentos.

## 7. Verificar antes de aplicar

- Teste administrador, professor pendente, professor aprovado e aluno em contas Google diferentes.
- Confirme que outro campus/disciplina não pode consultar avaliações ou matrículas.
- Teste o JSON fictício em `exemplos/`, depois sua lista real em ambiente autorizado.
- Confira que a prévia não grava matrícula; somente a confirmação grava.
- Importe novamente e verifique que não duplica nem troca turma.
- Aprovar cadastro e importar matrícula são ações diferentes; confirme o vínculo após aprovação.
- Teste questão objetiva, aberta, feedback, conceito/nota, entrega e exportação.
- Teste o domínio GitHub Pages e o login em um celular real.

Foram executados testes locais de regras e parser e demonstrações no navegador. O arquivo real enviado foi validado localmente: 36 registros válidos. Não foram realizados login Google real, deploy Firebase ou publicação na sua conta GitHub. O pacote não contém a lista real dos alunos. Arquivos de exemplos contêm apenas dados fictícios.

## Fontes

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://firebase.google.com/docs/auth/web/google-signin
- https://firebase.google.com/docs/auth/web/redirect-best-practices
- https://firebase.google.com/docs/firestore/query-data/indexing

## Novos tipos: lacunas e código de programação

### Lacunas preenchidas diretamente no texto

No editor, clique em **Adicionar lacunas**. Escreva os marcadores `{{1}}`, `{{2}}`, … em ordem, sem repetir, no ponto em que o aluno deverá digitar. Exemplo:

`O {{1}} aprende endereços na tabela {{2}}.`

Clique em **Atualizar lacunas do enunciado** depois de acrescentar ou remover marcadores. Cadastre de 1 a 10 respostas aceitas para cada lacuna, uma por linha. Exemplo: lacuna 1 = `switch`; lacuna 2 = `MAC` ou `tabela MAC`. É possível configurar se a correção ignora maiúsculas/minúsculas e acentos. Por padrão, ignora diferenças de caixa, mas respeita acentos. Espaços nas extremidades e espaços consecutivos são normalizados.

São permitidas de 1 a 20 lacunas por questão, com respostas de até 100 caracteres. O aluno vê campos inseridos na própria frase. Todas as lacunas precisam ser preenchidas antes de entregar. O gabarito permanece privado; só o professor o consulta.

A correção é automática no servidor: cada lacuna vale uma fração igual do peso da questão. Uma questão com peso 2 e duas lacunas concede 1 ponto do peso por acerto. O crédito parcial integra normalmente o conceito ou a nota final. O professor vê as respostas e a pontuação automática na correção. A revisão manual permanece nas questões abertas; esta versão não oferece substituição manual da nota de lacunas. Corrija erros de gabarito antes de iniciar a aplicação.

### Código no enunciado com fundo preto

Em qualquer tipo de questão, preencha **Código-fonte no enunciado (opcional)** e, se desejar, o rótulo de linguagem (Python, JavaScript, C, etc.). O texto do código é separado do enunciado e aparece em bloco preto, fonte monoespaçada e rolagem horizontal quando necessário. Limite: 20.000 caracteres. Caracteres como `<`, `>` e tags HTML são exibidos como texto; não são interpretados nem executados. Não há compilador ou execução de código.

### Resposta aberta em código

Em uma questão aberta, escolha **Tipo de resposta aberta → Código**. O estudante responderá em campo de fundo escuro, fonte monoespaçada, sem correção ortográfica e preservando quebras de linha e indentação. Tab insere quatro espaços, Shift+Tab remove até quatro espaços no início da linha e Esc seguido de Tab permite sair do campo pelo teclado. O limite da resposta permanece em 10.000 caracteres.

O professor recebe o código formatado e atribui a pontuação com feedback individual, conforme a rubrica. A resposta em código é corrigida manualmente, sem testes automáticos ou execução. A opção **Texto** continua disponível para as demais questões abertas.

Atualize a interface **e as Functions** ao implantar estes recursos. O novo módulo `question-types.js` deve existir em `dist/` e em `functions/`. Os cadastros e respostas antigos permanecem compatíveis. O bloqueio de conteúdo após a primeira tentativa também se aplica às lacunas, gabaritos e campos de código.

Verificações desta edição: 20 testes automatizados passaram, incluindo gabaritos de lacunas não expostos, crédito parcial, variações de caixa/acentos, validação de código e preservação de respostas. No navegador foram verificados o cadastro, código no enunciado com fundo preto, digitação de função com Tab, preenchimento inline, entrega e correção parcial (0,5/1) de uma questão de duas lacunas. Não houve teste em Firebase real nem publicação na conta GitHub da usuária.
