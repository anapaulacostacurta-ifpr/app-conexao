> **Edição ampliada:** páginas de curso, módulos/progresso, avaliações integradas, certificados, banco de questões, avisos, financeiro/ofertas, identidade institucional, acompanhamento, conselho, ocorrências e backup. Consulte [GUIA_RECURSOS_E_ACOMPANHAMENTO.md](GUIA_RECURSOS_E_ACOMPANHAMENTO.md) e [ROTEIRO_PILOTO_TURMA.md](ROTEIRO_PILOTO_TURMA.md).

> **Cursos e pagamentos:** cursos gratuitos/pagos com disciplinas, comprovantes privados, aprovação manual, validade e renovação mensal/trimestral/semestral/anual e remuneração por professor. Consulte [GUIA_CURSOS_E_PAGAMENTOS.md](GUIA_CURSOS_E_PAGAMENTOS.md). Configure também o bucket de comprovantes e publique as regras de Storage.

# Planos, questões com múltiplas respostas e quiz ao vivo

## Implantação

Atualize **dist, Functions, regras e índices**. Publique o conteúdo de `dist` pelo GitHub Pages e execute `firebase deploy --only functions,firestore:rules,firestore:indexes,storage` no projeto Firebase já configurado. Publicar somente HTML/JS não instala os controles do servidor. Nenhuma conta, pagamento ou serviço real foi ativado neste pacote.

## Planos dos professores

Em Administração → **Planos e preços**, edite os planos iniciais ou crie outros. Os valores iniciais são sugestões de configuração:

| Plano | Alunos por professor | Respondentes por questionário | Perguntas por avaliação | Perguntas por quiz |
|---|---:|---:|---:|---:|
| Free | 50 | 50 | 20 | 20 |
| Premium | Sem limite contratado | Sem limite contratado | Sem limite contratado | Sem limite contratado |
| Personalizado | 100 | 100 | 50 | 50 |

O preço inicial de todos os planos é **R$ 0,00**: cadastre os valores comerciais antes de oferecê-los. O Free deve permanecer ativo e gratuito. Pode-se informar preço mensal, anual, único ou negociado. Não há checkout, processamento de cartão, cobrança recorrente ou nota fiscal. O controle de comprovantes, validade e renovação foi acrescentado nesta edição; veja GUIA_CURSOS_E_PAGAMENTOS.md.

Cada plano permite habilitar avaliações individuais, quiz ao vivo, múltiplas respostas, lacunas, questões com código e importação JSON. Campo de limite vazio significa sem limite contratado; zero bloqueia novas inclusões. Os limites técnicos gerais da aplicação continuam valendo, inclusive o máximo de 300 respostas por pergunta ao vivo.

No cadastro, o professor solicita um plano e inicia no Free. O administrador aprova o vínculo e atribui o plano em **Revisar acesso → Plano liberado pelo administrador**. A escolha do professor nunca concede Premium. Professores existentes sem `planId` recebem o Free. A aprovação do vínculo e a atribuição do plano são operações administrativas separadas; se aparecer erro na segunda, confira o plano antes de concluir a liberação.

Para preços e ações individuais, crie, por exemplo, “Personalizado — Professora Ana”, defina seu preço, limites e recursos e atribua ao professor. Novos planos podem ser criados sem alterar código. Alterações em um plano compartilhado valem para todos os seus titulares. Os registros ficam em `plans`, com atribuições no perfil e auditoria em `accessAudit`.

### Como os limites são contados

- **Alunos:** vagas de e-mails únicos vinculadas ao professor. Matrículas manuais ativas, importações confirmadas (inclusive alunos aguardando aprovação) e novas participações em atividades do professor reservam vagas. O mesmo e-mail em várias disciplinas do mesmo professor ocupa uma vaga. Cada professor tem seu contador; um estudante pode ocupar uma vaga para cada docente. Não há renovação mensal automática.
- **Respostas em avaliação:** uma vaga por estudante é reservada ao iniciar a tentativa. Retomar ou entregar a mesma tentativa não conta de novo. Uma tentativa abandonada continua ocupando vaga. A quantidade é por avaliação, não por pergunta.
- **Respostas em quiz:** uma vaga por estudante que enviar sua primeira resposta naquele questionário. Responder as outras perguntas ou participar novamente em outra sessão do mesmo quiz não conta outra vez. Os gráficos por sessão continuam separados.
- **Perguntas:** limites independentes para avaliações individuais e quizzes, verificados ao salvar e ao iniciar novas participações. A autoria original determina a capacidade da atividade. Colaboradores também precisam ter os recursos liberados para editar/iniciar sessões.

Os controles são feitos em transações do servidor. Os alunos não podem escolher planos ou alterar contadores. O administrador tem exceção para matrícula/importação e criação de atividades administrativas; atividades de um professor continuam sujeitas ao plano de seu autor.

Reduzir um limite não exclui dados nem resultados. Ao atingir a capacidade, novas inclusões são bloqueadas. As tentativas individuais já abertas podem continuar salvando/entregando; novas respostas do quiz exigem plano ativo e compatível. Desativar planos bloqueia novas operações: migre os professores antes de desativar. Avaliações já iniciadas continuam bloqueando alterações de conteúdo como anteriormente.

Em **Revisar acesso → Revisar vagas de alunos**, o administrador pode liberar vagas de quem deixou de participar. Isso não apaga dados ou matrícula: se o aluno participar novamente, a vaga será reservada de novo. Para impedir acesso, desative a matrícula. A lista mostra até 100 vagas por vez; ao liberar, as seguintes passam a aparecer.

**Migração de uma instalação antiga:** vagas são registradas nas novas operações; não há recálculo retroativo de todas as matrículas/tentativas históricas. Antes de aplicar comercialmente os limites a uma base já usada, reconcilie os vínculos anteriores em `teacherUsage/{uid}/students` e o contador `students`, usando a chave SHA-256 do e-mail normalizado. Não edite contadores isolados. Novas instalações não precisam dessa migração. As contagens antigas de tentativas individuais são preservadas.

## Questões de múltiplas respostas

Use **Adicionar múltiplas respostas**. Cadastre de 2 a 6 alternativas e marque pelo menos duas corretas. O aluno vê caixas de seleção e pode marcar várias. “Não sei / deixar sem alternativa” registra explicitamente nenhuma seleção.

Pontuação = máximo entre zero e:

`peso − (corretas não marcadas + erradas marcadas) × peso ÷ quantidade de corretas`

Exemplo: peso 4, corretas A e C. Marcar A e C = 4; apenas A = 2; A, C e D = 2; A e B = 0. Nunca gera pontuação negativa. O professor vê omissões, marcações erradas e crédito obtido. O crédito entra na nota ou no conceito. Gabaritos não são enviados ao estudante.

## Quiz ao vivo semelhante ao Mentimeter

No editor, selecione **Quiz ao vivo (formativo)**, a apresentação em contagem ou porcentagem e o gráfico padrão. Cada pergunta pode herdar o padrão ou escolher outro gráfico. Use alternativas únicas, múltiplas ou texto curto (até 200 caracteres). Lacunas e resposta em código permanecem na avaliação individual.

1. Cadastre disciplina, turma e data, publique e abra o quiz para o dia da aplicação.
2. Clique em **Iniciar ao vivo**. Compartilhe o link ou o código `live-...` mostrado no painel.
3. Os estudantes entram com conta aprovada e matrícula ativa na disciplina/turma. O código não matricula automaticamente.
4. Clique em **Abrir pergunta**. Cada aluno envia uma resposta por pergunta, sem substituição posterior. Reenvios não duplicam contagem.
5. Acompanhe participantes e respostas. Use **Mostrar resultados / Ocultar resultados** no painel a ser projetado.
6. Encerre a pergunta e avance. Encerre a sessão ao terminar. **Retomar sessão** abre a última sessão registrada neste navegador; mantenha também seu código/link. Após encerrar, o painel permite consultar os gráficos de cada pergunta.

Esta modalidade é **formativa**, sem atribuição automática de nota/conceito, ranking, cronômetro ou desconto por ocorrências. Para avaliação individual com correção e monitoramento, mantenha o modo Avaliação individual. Não confunda ocultar gráficos com ocultar gabaritos: estes nunca são enviados aos participantes.

### Gráficos

- **Barras:** quantidade ou percentual de respondentes por alternativa/resposta.
- **Pizza:** divisão das marcações; em múltiplas respostas, o denominador é o total de alternativas marcadas, e não o total de pessoas.
- **Bolinhas:** uma bolinha por marcação, com representação até 40 por item e indicação numérica do excedente.
- **Nuvem de palavras:** somente texto curto; palavras repetidas na mesma resposta contam uma vez; palavras com mais de um caractere; até 50 palavras. Maiúsculas/minúsculas são normalizadas. Não há filtragem automática de conteúdo.

Barras e bolinhas de múltiplas respostas podem somar mais de 100%, porque uma pessoa pode selecionar vários itens. O mesmo ocorre na nuvem quando uma resposta contém várias palavras. Texto categórico em barras/pizza/bolinhas mostra as 19 respostas mais frequentes e agrupa as demais em “Outras respostas”. Uma tabela acompanha cada gráfico.

Os resultados são atualizados por `onSnapshot` do Firestore, conforme conexão e latência disponíveis. Somente professores do escopo e administradores leem agregados; estudantes leem o estado da sessão e consultam a própria resposta por Function. Respostas identificadas são consultadas pelo professor, não projetadas automaticamente. As regras permitem apenas leituras específicas de sessão/agregados; todas as escritas permanecem no servidor. Subcoleções incluem participantes, respostas, agregados e auditoria. Não há exclusão ou retenção automática.

## Verificações e limites desta entrega

67 testes automatizados locais verificam regressões de acesso e correção, múltiplas respostas, agregação ao vivo, planos e fronteiras de capacidade. As checagens de sintaxe também passaram. A demonstração é local e seus dados se perdem ao recarregar. Não houve validação visual desta edição, execução no emulador Firestore, teste concorrente em Firebase real, cobrança ou implantação no GitHub da professora. Faça um piloto com contas de teste e regras implantadas antes de aplicar à turma.
