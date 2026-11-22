> **Pacote atualizado:** leia [ATUALIZACAO_IMPLANTACAO.md](ATUALIZACAO_IMPLANTACAO.md) para planos, alertas, conselho acumulativo, timbre PDF/DOCX, fechamento anual, backup/exclusão confirmada e cadastro da demonstração.

> **Edição ampliada:** páginas de curso, módulos/progresso, avaliações integradas, certificados, banco de questões, avisos, financeiro/ofertas, identidade institucional, acompanhamento, conselho, ocorrências e backup. Consulte [GUIA_RECURSOS_E_ACOMPANHAMENTO.md](GUIA_RECURSOS_E_ACOMPANHAMENTO.md) e [ROTEIRO_PILOTO_TURMA.md](ROTEIRO_PILOTO_TURMA.md).

> **Cursos e pagamentos:** cursos gratuitos/pagos com disciplinas, comprovantes privados, aprovação manual, validade e renovação mensal/trimestral/semestral/anual e remuneração por professor. Consulte [GUIA_CURSOS_E_PAGAMENTOS.md](GUIA_CURSOS_E_PAGAMENTOS.md). Configure também o bucket de comprovantes e publique as regras de Storage.

> **Atualização:** planos Free/Premium/Personalizado e novos planos configuráveis, múltiplas alternativas corretas com penalidade e quiz ao vivo com gráficos. Consulte [GUIA_PLANOS_E_QUIZ.md](GUIA_PLANOS_E_QUIZ.md) para limites, contagens, recursos e implantação. Atualize Functions e regras além da interface.

# Pacote para GitHub Pages

Comece por **LEIA_PRIMEIRO.md** e **GUIA_GITHUB_PAGES.md**. Esta edição acrescenta importação JSON com prévia, aprovação de estudantes em lote e publicação da pasta `dist` por GitHub Actions. A documentação de Firebase Hosting abaixo é uma alternativa; para Pages, publique o backend com `firebase deploy --only functions,firestore:rules,firestore:indexes,storage`.

# Conexões — Plataforma de Avaliações

Plataforma em HTML, CSS e JavaScript para avaliações de qualquer disciplina. Firebase Authentication (Google), Cloud Functions e Cloud Firestore. Esta versão inclui administrador, aprovação de professores, instituição/campus/disciplinas, matrículas múltiplas, conceito ou nota e feedback por questão.

## Estado da entrega

A apresentação hospedada é privada. O Firebase continua desativado em `dist/firebase-config.json` até que o projeto da instituição seja configurado. Nenhum administrador, conta Google, cobrança ou banco real foi criado nesta entrega. As demonstrações usam dados fictícios na memória do navegador, perdidos ao recarregar. O seletor de perfis aparece somente na demonstração e não concede privilégios no Firebase.

## Perfis e acessos

| Perfil | Permissões |
|---|---|
| Administrador | Cadastra instituições, campi e disciplinas; aprova, rejeita ou suspende usuários; atribui campus e disciplinas aos professores; gerencia matrículas e consulta avaliações por disciplina. Tem acesso global ao projeto. |
| Professor pendente | Preenche ou confere seu cadastro; não acessa avaliações, gabaritos ou alunos. |
| Professor aprovado | Acessa apenas seu campus e suas disciplinas atribuídas pelo administrador. Pode cadastrar avaliações, corrigir e gerenciar matrículas dessas disciplinas. |
| Estudante aprovado | Consulta suas matrículas; abre avaliações por código/link se houver matrícula ativa na disciplina e na turma daquele campus; vê somente suas próprias respostas e resultados publicados. |

Cada usuário possui um vínculo com uma instituição e um campus. O professor pode ter várias disciplinas nesse campus. O estudante pode ser matriculado em várias disciplinas, com uma turma por disciplina. Uma conta pode ter um perfil docente ou discente; alternância de perfis em produção não é oferecida. Administradores têm acesso global por claim confiável.

Professores da mesma disciplina e campus podem visualizar e colaborar na edição/correção das avaliações dessa disciplina, mesmo que cadastradas por outro professor. O autor original é preservado e as alterações/revisões registram o responsável. Professores de outro campus ou de disciplinas não atribuídas não têm acesso. Não há restrição somente por autor nesta versão.

A lista de instituições/campi/disciplinas contém apenas informações de catálogo e é acessível a usuários autenticados para preencher seu cadastro. Não contém alunos, tentativas, notas ou gabaritos. Aprovações e matrículas são verificadas no servidor em cada operação; esconder botões ou adulterar o JavaScript não altera essas permissões.

## Configurar Firebase e primeiro administrador

1. Crie ou selecione o projeto em https://console.firebase.google.com/. Ative Firestore em modo produção, escolhendo a localização segundo as regras da instituição.
2. Em Authentication, habilite Google e informe o e-mail de suporte. Cadastre um aplicativo Web no projeto.
3. Copie sua configuração Web pública para `dist/firebase-config.json`, dentro de `firebase`, e defina `enabled: true`. Nunca coloque chaves privadas, credenciais de serviço ou senhas nesse arquivo.
4. O padrão de região das Functions é `southamerica-east1`. Se alterar, atualize também `region` no arquivo de configuração e nas Functions.
5. Adicione o domínio final a Authentication → Configurações → Domínios autorizados. Prefira Firebase Hosting para a aplicação aos alunos e confira a documentação de login por redirecionamento em hospedagens externas.
6. Instale Node.js 22 e Firebase CLI oficiais. Execute `firebase login`, `firebase use --add` e selecione o projeto correto. Execute `npm install --prefix functions`.
7. Cloud Functions requer plano de faturamento compatível, normalmente Blaze. Confira custos e alertas de orçamento. Nada foi contratado ou ativado por esta entrega.
8. Execute `firebase deploy --only firestore:rules,functions,hosting`. Se usar outra hospedagem estática, publique apenas `dist/` e faça `firebase deploy --only firestore:rules,functions` para o backend.
9. A pessoa responsável pela administração deve entrar no site com sua conta Google uma vez, criando o usuário em Authentication. Copie seu UID no console.
10. Em uma máquina administrativa confiável, configure as credenciais padrão do Admin SDK do projeto, por exemplo `GOOGLE_APPLICATION_CREDENTIALS` apontando para um arquivo seguro fora deste pacote. Execute `node scripts/set-admin.mjs UID_DO_ADMINISTRADOR`. O script preserva outras claims e adiciona `admin: true`. Não envie a chave de serviço ao navegador, aos alunos ou ao repositório.
11. Saia e entre novamente no site para renovar o token. A conta verá o painel Administração de acesso, mesmo antes de ter um cadastro comum.
12. Nesse painel, cadastre primeiro a instituição, depois o campus ligado a ela e depois as disciplinas ligadas ao campus.
13. Solicite que professores e estudantes entrem com Google e enviem seus cadastros. Revise as solicitações, valide o vínculo e aprove. A atribuição de disciplinas ao professor é obrigatória para ativá-lo.
14. Teste em uma conta Google de estudante e em celulares reais antes da aplicação com a turma. O site privado de apresentação não substitui uma hospedagem acessível aos alunos.

Não existe usuário/senha padrão de administrador nem botão público para tornar uma conta administradora. Outros administradores podem ser habilitados pelo mesmo procedimento confiável. A antiga claim `teacher: true` isolada não concede acesso docente; o vínculo aprovado em `profiles` é obrigatório. O script antigo `set-teacher.mjs` foi desativado e orienta usar o painel administrativo.

## Cadastro e aprovação

No primeiro acesso, o usuário informa nome, perfil solicitado (Professor ou Estudante), instituição e campus. O professor seleciona as disciplinas que solicita. Todos os cadastros começam em `pending`, inclusive estudantes, para validar o vínculo com o campus.

O administrador abre Revisar acesso, confere instituição/campus e escolhe as disciplinas autorizadas ao professor. Pode aprovar, não aprovar ou suspender. As disciplinas solicitadas não se tornam autorização automaticamente. Contas ativas/suspensas não podem alterar seu próprio vínculo; mudanças passam pelo administrador. Uma troca de campus não transfere matrículas ou resultados automaticamente.

Cadastros rejeitados podem reenviar dados para nova análise. Suspensos devem contatar o administrador. Usuários precisam ter e-mail verificado pelo Firebase Authentication.

## Disciplinas e matrículas

O professor encontra um seletor com apenas as suas disciplinas e o seu campus. Avaliações e alunos são consultados dentro da disciplina selecionada. Em Alunos e matrículas, informe e-mail Google de um estudante já aprovado no mesmo campus e a turma na disciplina. Marque matrícula ativa e salve. O mesmo estudante pode ser incluído em outra disciplina sem remover a primeira matrícula.

O administrador também gerencia matrículas por disciplina. É possível editar a turma ou tornar uma matrícula inativa. Um código ou link não cria matrícula e não libera acesso para aluno de outra turma, campus ou disciplina. Nome do aluno e turma informados no navegador não substituem o vínculo validado no servidor.

A tela do estudante mostra suas disciplinas matriculadas. Ele acessa a avaliação pelo link compartilhado ou pelo código. Novos inícios e retomadas exigem avaliação publicada, aberta e na data cadastrada (servidor em `America/Sao_Paulo`). A matrícula precisa coincidir com disciplina, instituição, campus e turma da avaliação. Sessões já ativas podem salvar e entregar depois do fechamento da avaliação, desde que o acesso e a matrícula permaneçam ativos.

## Cadastrar avaliações e questões

1. Selecione uma disciplina autorizada e clique em Criar avaliação.
2. Informe título, data, turma e orientações. A disciplina é escolhida entre as suas atribuições; instituição/campus são vinculados no servidor.
3. Adicione de 1 a 60 questões, objetivas e/ou abertas, com peso de 0,01 a 100 pontos por questão.
4. Nas objetivas, cadastre de 2 a 6 alternativas e marque uma correta. O comentário do gabarito é privado.
5. Nas abertas, registre resposta esperada e critérios privados. Na correção de cada aluno, haverá campo de pontuação e feedback individual.
6. Organize as questões com Subir, Descer e Remover.
7. Em Avaliar por, escolha Conceito A–D ou Nota numérica. Configure as faixas de conceito ou escala/precisão de nota.
8. Salve como rascunho ou marque Publicar e Aberta. Somente Salvar avaliação grava o cadastro docente; sair sem salvar descarta as alterações do editor.
9. Compartilhe o código ou o link da hospedagem utilizada pela turma.

Cada avaliação corresponde a uma turma e dia. Para outra aplicação, use Duplicar, que preserva o conteúdo mas começa como rascunho fechado, com novo código e sem tentativas. Após a primeira tentativa, enunciados, gabaritos, pesos, disciplina, campus, turma, data, publicação e formato/escala de resultado ficam bloqueados no servidor para preservar a correção. Ainda é possível fechar/abrir a avaliação ou ajustar faixas B/C para futuras revisões. Para trocar conteúdo ou modalidade, duplique.

Não há cronômetro obrigatório. Cadastros muito extensos são limitados a aproximadamente 600 mil caracteres serializados. O editor usa controle de revisão: uma alteração concorrente exige reabrir o cadastro para evitar sobrescrever outro professor.

## Correção e feedback por questão

Em Respostas e correção, abra um estudante. As objetivas são corrigidas no servidor pelo gabarito privado. Nas abertas:

- Leia a resposta e os critérios cadastrados.
- Informe de zero até o peso máximo da questão, concedendo crédito parcial quando necessário.
- Escreva o Feedback desta questão (até 2.000 caracteres).
- Confira a contribuição da questão no resultado: fração da nota máxima ou percentual da avaliação por conceito.

Exemplo: uma questão de peso 2 em uma avaliação de peso total 5 corresponde a até 4 pontos numa nota de 0 a 10. Se o aluno recebe 1,5/2 do peso, sua contribuição é 3/10. Por conceito, o mesmo acerto parcial corresponde a 75% da questão e contribui com 30% da avaliação.

O professor também pode registrar uma devolutiva geral. Após a publicação, o estudante vê o resultado final, o peso obtido e o percentual de acerto por questão, sua contribuição e o feedback das abertas. Gabarito e rubricas privadas não são enviados no questionário do estudante. Resultados por questão se referem aos acertos antes do desconto global, que aparece separado e pode reduzir o resultado final.

## Conceito ou nota

O aproveitamento é `(soma dos acertos e pontuações abertas − desconto) / soma dos pesos`, com mínimo zero.

| Modalidade | Configuração |
|---|---|
| Conceito | A = 100%; B inicialmente de 75% a menos de 100%; C de 50% a menos de 75%; D abaixo de 50%. B/C ajustáveis, com 0 < C < B < 100. |
| Nota | Zero até nota máxima de 1 a 1000 (ex.: 10 ou 100), com 0 a 3 casas decimais. Conversão proporcional e arredondamento apenas na nota final. |

O conceito indica domínio integral (A), poucos erros (B), necessidade de melhorar (C) ou recuperação (D). As faixas são propostas operacionais, não normas institucionais. Revisões guardam a modalidade, escala, precisão e critérios utilizados. Versões anteriores sem configuração explícita de modalidade continuam por conceito.

Descontos são informados na unidade dos pesos das questões antes da conversão. Ex.: desconto de 0,3 sobre peso total 3 equivale a 1 ponto numa escala de 10. Não há penalidade automática por evento. Selecione as ocorrências consideradas e justifique qualquer desconto. Salve a revisão como rascunho ou marque Publicar resultado e devolutiva. O estudante não vê revisão não publicada; o histórico preserva as anteriores.

O CSV contém identificação, disciplina, data, turma, estudante, modalidade, resultado e ajustes dos estudantes carregados. Listas de usuários, avaliações, alunos e tentativas são paginadas de 100 em 100; pesquisas filtram os itens já carregados. Matrículas próprias retornam até 100 registros e o catálogo retorna até 500 instituições/campi/disciplinas por tipo nesta versão. Esses limites devem ser ampliados antes de utilização em escala maior.

## Monitoramento e limites

São registrados, quando disponibilizados pelo navegador: início/retomada, visibilidade, foco, copiar/recortar/colar, menu de contexto, atalho de impressão, tecla PrintScreen, tela cheia e estado da conexão. Copiar e colar são bloqueados enquanto a avaliação está ativa. Eventos têm ID de deduplicação, horário do cliente, duração relatada e recepção no servidor.

O site não pode impedir troca de aplicativo, screenshot pelo sistema, fotografia ou uso de outro aparelho. PrintScreen observado não comprova captura, e muitas capturas não geram evento. Notificações, chamadas e bloqueio de tela podem gerar os mesmos sinais de saída; eventos correlatos não devem ser contados automaticamente como infrações separadas. Registros do navegador são manipuláveis e não comprovam fraude. Nenhuma penalidade é aplicada automaticamente.

Tela cheia é opcional e depende do navegador. Recursos de bloqueio de área de transferência podem interferir em acessibilidade; combine adaptações antes da aula. Não são coletados câmera, microfone, imagens, localização, aplicativos, conteúdo da área de transferência ou histórico de navegação.

Respostas são salvas após aproximadamente 750 ms sem digitar e há sincronização periódica. Pendências ficam no armazenamento local, por conta/avaliação, até confirmação. A entrega só é confirmada após retorno do servidor. Fechamento brusco, encerramento do aparelho, perda de conexão ou limpeza do navegador podem impedir envio de eventos e respostas pendentes. O painel exibe as primeiras 2.000 ocorrências e as 100 revisões mais recentes, mantendo as restantes no banco.

A instituição deve informar finalidade, responsáveis e prazo de retenção dos dados. Não há exclusão automática. Uma rotina administrativa de limpeza precisa excluir também subcoleções; apagar só o documento pai não remove eventos/revisões.

## Estrutura no Firestore e segurança

- `institutions/{id}`: instituição.
- `campuses/{id}`: campus com instituição.
- `subjects/{id}`: disciplina com instituição e campus.
- `profiles/{uid}`: nome, e-mail, papel solicitado, situação, instituição/campus e disciplinas autorizadas.
- `enrollments/{subjectId}_{uid}`: matrícula, turma, estudante, disciplina e situação.
- `accessAudit/{id}`: decisões administrativas e alterações de matrícula.
- `exams/{id}`: avaliação com instituição, campus, disciplina, autor e conteúdo.
- `exams/{id}/attempts/{uid}`: uma tentativa por conta, respostas e revisão.
- `.../events/{eventId}`, `.../reviews/{id}` e `exams/{id}/audit/{id}`: ocorrências e histórico.

As regras bloqueiam acesso direto às coleções, exceto leituras autorizadas de estado e agregados do quiz ao vivo. As Functions usam Admin SDK e validam autenticação, perfil aprovado, escopo e matrícula. A claim `admin: true` é a única forma de entrar no painel global, e só é concedida por credencial administrativa confiável. O cadastro público não aceita papel de administrador. As demais claims não substituem o vínculo aprovado.

O Admin SDK ignora regras de cliente, portanto preserve as validações do servidor e restrinja o IAM do projeto. Publique apenas `dist/` em hospedagem estática, não credenciais administrativas.

## Atualização de versões anteriores

O projeto Firebase desta entrega ainda não foi configurado. Se você implantou uma versão anterior por conta própria, faça backup antes de atualizar. Contas com claim docente antiga precisam enviar cadastro e receber aprovação e disciplinas. Avaliações antigas sem IDs de instituição/campus/disciplina não são liberadas automaticamente pelo novo controle de acesso; exigem migração administrativa validada. Nenhum documento legado é apagado. Não remova as validações para contornar a migração.

As Functions também precisam ser atualizadas, não apenas a interface: `firebase deploy --only firestore:rules,functions,hosting`. Configurações e regras ainda devem ser testadas no projeto real. O Firebase CLI pode solicitar retirada de funções antigas substituídas; revise o projeto e a mudança antes de implantar.

## Arquivos e verificação

`dist/`: interface pública; `functions/access.js` e `scope.js`: cadastro, administração e permissões; `functions/grading.js`: cálculo; `functions/index.js`: avaliações e tentativas; `scripts/set-admin.mjs`: primeiro administrador; `firestore.rules` e `firebase.json`: publicação.

Passaram verificações de sintaxe e 12 testes automatizados de validação/cálculo, isolamento por campus/disciplina, matrícula/turma, cadastros pendentes/suspensos e feedback por questão. Na demonstração do navegador foram verificados: professor pendente bloqueado, aprovação administrativa com uma disciplina, acesso à disciplina atribuída, segunda matrícula do estudante, envio por código e publicação de feedback individual com conceito B e pontuação parcial.

Não houve teste em banco real nem autenticação real do Firebase. Testes em celulares Android/iOS, implantação, claims, regras, concorrência e integração das Functions dependem da configuração da instituição. Os testes automatizados das permissões usam funções puras, não substituem testes com usuários reais ou o Emulator Suite.

Execute `node --test functions/grading.test.js functions/scope.test.js`. Para visualizar localmente, sirva `dist/` via HTTP; não use `file://`.

Fontes técnicas: https://firebase.google.com/docs/auth/web/google-signin ; https://firebase.google.com/docs/auth/admin/custom-claims ; https://firebase.google.com/docs/functions/callable ; https://firebase.google.com/docs/firestore/security/get-started ; https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event .


## Atualização: importação e aprovação em lote

Consulte o guia GitHub Pages para o fluxo completo. `functions/imports.js` implementa prévias, confirmação por blocos e vinculação por e-mail após aprovação; `functions/import-policy.js` valida decisões de matrícula; `dist/roster.js` e `functions/roster.js` validam nomes, e-mails e duplicatas. Novas coleções: `rosterImports` (prévia/resultados por linha) e `pendingEnrollments` (aguarda cadastro/aprovação). O lote aprova apenas alunos pendentes do mesmo campus, com auditoria individual. O fluxo não cria contas Google/Firebase Auth nem muda turma ou reativa matrícula existente.

Passaram 17 testes locais. No navegador foram confirmados prévia fictícia, duplicata ignorada, matrícula preparada, aprovação em lote e vínculo da matrícula após aprovação. O parser reconheceu 36 alunos válidos no arquivo real enviado, sem incorporar esses dados ao código ou pacote. Integração Firebase real e publicação GitHub continuam pendentes da configuração do projeto.

## Atualização: lacunas e código

Questões `blanks` usam marcadores {{1}}, {{2}}, … e gabaritos privados por lacuna, com crédito parcial e configuração de caixa/acentos. `code` e `language` permitem incluir código em bloco preto no enunciado; `responseFormat: code` nas abertas ativa resposta monoespaçada com indentação. Nenhum código é executado. Consulte `GUIA_GITHUB_PAGES.md` para cadastro e limites. O módulo `question-types.js` é utilizado na validação e no cálculo, mantendo gabaritos no servidor. Passaram 20 testes automatizados e a verificação de cadastro, resposta e correção na demonstração do navegador.
