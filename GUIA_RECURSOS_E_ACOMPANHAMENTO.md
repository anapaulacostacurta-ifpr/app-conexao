# Novos recursos: cursos, aprendizagem, acompanhamento e backup

Esta edição reúne as melhorias comerciais e pedagógicas solicitadas. O pagamento continua externo. A implantação do backend, regras e índices é obrigatória; publicar apenas `dist` não instala os recursos.

## Visão dos módulos

| Módulo | Operação disponível |
|---|---|
| Página do curso | Capa por URL, objetivos, público, duração, apresentação do professor, programa, preços e aula demonstrativa |
| Módulos e aulas | Texto e link por aula, ordenação, identificação da disciplina, progresso por conclusão marcada pelo aluno |
| Avaliações integradas | Avaliação individual ou quiz vinculado ao curso, com acesso pela matrícula e validade do próprio curso |
| Certificado | Critérios de progresso e aproveitamento, emissão idempotente, código/link público de verificação e impressão/PDF pelo navegador |
| Banco de questões | Questões privadas reutilizáveis do próprio professor, com disciplina, assunto e dificuldade |
| Aprendizagem | Progresso dos alunos, avaliações pendentes e aproveitamento por assunto nas revisões publicadas |
| Avisos | Aprovação/rejeição de comprovantes, vencimentos próximos, conteúdos e atividades disponíveis; leitura registrada dentro da plataforma |
| Financeiro | Resumo dos pagamentos carregados, CSV, comissões e registro administrativo de repasses já realizados externamente |
| Ofertas | Cupons percentuais, bolsas integrais por prazo e pacotes de cursos do mesmo professor |
| Identidade institucional | Nome, apresentação, cores, logotipo por URL e catálogo público da instituição |
| Acompanhamento | Pessoas e funções por curso, permissões por ação e disciplina, avaliação geral, observações e ocorrências |
| Conselho de classe | Conceitos A–D por aluno/período/disciplina/autor, observações e relatório para impressão |
| Calendário | Início e final do curso; bimestres, trimestres, semestres ou períodos personalizados |
| Advertências | Registro de ocorrência, advertência verbal, advertência escrita com modelo e cabeçalho/rodapé próprios |
| Backup/restauração | Exportação Firestore com subcoleções; validação e restauração por lotes; script administrativo adicional |

## 1. Apresentar e organizar cursos

Em **Cursos → Criar curso / Editar curso**, configure os campos existentes e a seção **Apresentação e divulgação**. Use imagens HTTP/HTTPS hospedadas em local apropriado. Esta edição não faz upload de capa, logotipo, vídeos ou materiais de aula.

Em **Módulos e aulas**, adicione módulos, escolha a disciplina e cadastre as aulas em texto com link complementar opcional. A disciplina do módulo precisa também estar selecionada entre as disciplinas do curso. É possível subir módulos/aulas e remover itens. Os IDs das aulas são preservados na edição para manter o progresso. Aulas removidas deixam de contar no progresso. O limite é 30 módulos e 100 aulas, respeitando o tamanho total do cadastro.

Aula marcada como **demonstrativa pública** pode aparecer na página de divulgação sem login. O corpo e o link das demais aulas não são enviados na prévia pública. O material já baixado ou aberto em um serviço externo não pode ser apagado remotamente pela plataforma.

O link público aparece na página do curso: `?curso=CODIGO`. Apenas cursos publicados têm página pública. Pessoas sem matrícula ainda precisam entrar com Google, ter cadastro aprovado no campus e obter a liberação apropriada para estudar.

## 2. Matrícula e avaliações integradas

- Curso gratuito: o aluno abre o curso e escolhe **Matricular-me no curso**.
- Curso pago: a aprovação do pagamento cria/atualiza a matrícula automaticamente.
- Bolsa: a concessão também cria/atualiza a matrícula.
- Pacote: uma aprovação libera e matricula em cada curso incluído.

As matrículas específicas de curso ficam em `courseEnrollments`. Elas não alteram indevidamente a turma das matrículas gerais da escola. Avaliações sem curso continuam exigindo a matrícula tradicional da disciplina.

O professor usa **Criar avaliação do curso**, na página do curso, ou informa seu código no campo **Vincular a um curso** do editor. A disciplina da avaliação deve pertencer ao curso e o responsável deve ser seu autor. O servidor usa a turma configurada no curso. O vínculo fica preservado após a primeira tentativa; duplique para mudar o conteúdo/vínculo.

O aluno verá as avaliações publicadas dentro do curso, incluindo situação e aproveitamento quando a revisão estiver publicada. A data e a abertura continuam sendo respeitadas. Quizzes ao vivo continuam usando o código da sessão compartilhado pelo professor e não geram nota automaticamente.

**Atenção ao calendário:** mudar a turma do curso após avaliações vinculadas exige revisar os vínculos antes da aplicação; a turma faz parte da autorização. Os períodos acadêmicos organizam lançamentos e não substituem a validade comercial do acesso.

## 3. Progresso e certificados

O aluno marca cada aula como concluída; isso registra progresso, não comprova tempo assistido. A configuração de certificado permite exigir percentual mínimo de aulas e, opcionalmente, aproveitamento mínimo em **cada avaliação individual publicada vinculada ao curso**. Se a opção de avaliações estiver ligada e não houver avaliações individuais publicadas, o certificado não é emitido. Quizzes formativos ficam fora desse cálculo.

A emissão é feita pelo servidor e exige acesso vigente ao curso e concordância do aluno com seu nome na consulta pública. O certificado contém nome, curso, carga horária, instituição, professor, data e código. O mesmo aluno/curso recebe o mesmo certificado em reemissões. O certificado mantém os dados da emissão mesmo que o curso seja editado depois.

O botão de impressão permite **Salvar como PDF** pelo navegador. A autenticidade é consultada pelo link `?certificado=CODIGO`. Não há QR Code nesta edição: a verificação usa código e link. Não é assinatura digital certificada nem validação de identidade documental.

Certificado já emitido pode ser consultado pelo aluno mesmo após o vencimento do acesso. O verificador público não exige pagamento ativo. Não existe rotina de revogação de certificado nesta edição.

## 4. Banco e painel de aprendizagem

No editor de avaliações, informe **Assunto da questão** e dificuldade e use **Salvar questão no banco**. Use **Reutilizar questão do banco** para inserir uma cópia com novo ID em uma avaliação da mesma disciplina. O banco é do próprio professor, sem compartilhamento automático com outros docentes. O filtro considera as questões carregadas, com paginação de 100 registros.

Em **Painel de aprendizagem** do curso, o responsável vê progresso por estudante, avaliações pendentes e aproveitamento ponderado por assunto. Somente revisões publicadas entram nos resultados por assunto. Questões sem assunto explícito são agrupadas pela disciplina. O relatório informa quando está parcial: até 100 alunos, 20 avaliações e 100 tentativas por avaliação.

## 5. Avisos, financeiro e ofertas

**Avisos:** são consultados dentro do site, sem e-mail ou push. Os vencimentos aparecem quando o usuário consulta a área, a partir de sete dias antes. As consultas de conteúdos/atividades são limitadas (até 20 cursos e 5 atividades por curso). Não há envio agendado. Use também o painel do curso para a lista de atividades.

**Financeiro:** o resumo considera apenas os registros carregados; use Carregar mais para ampliar o conjunto. O CSV reflete esse conjunto. Uma validade antiga vencida no histórico não significa que o acesso atual esteja vencido: pode existir renovação posterior. Em Comissões e repasses, somente o administrador registra a referência de um repasse já feito externamente. Isso não transfere dinheiro nem concilia conta bancária.

**Cupons:** o responsável cadastra código, percentual menor que 100%, número máximo de aprovações e validade. O aluno pode consultar o preço com desconto antes de pagar. A capacidade do cupom é conferida novamente na aprovação. Se esgotar enquanto o comprovante aguarda análise, a aprovação é impedida e será necessário resolver/rejeitar o lançamento e cadastrar outro. Pagamentos pendentes não reservam utilização do cupom.

**Bolsas:** para desconto integral, o responsável concede uma bolsa pelo e-mail de aluno aprovado, com justificativa e validade. A bolsa não gera pagamento nem comissão e não reduz uma validade já maior.

**Pacotes:** de 2 a 10 cursos pagos publicados do mesmo professor, com preços por ciclo. Uma aprovação libera todos os cursos que constavam no envio do pagamento. O pacote utiliza a modalidade de remuneração Vendas e gera uma comissão sobre o total do pacote. Cupons são para cursos individuais, não pacotes. Esta edição não permite pacote de diferentes professores.

## 6. Identidade institucional

Em **Administração → Identidade institucional**, configure nome, apresentação curta, cores e URL do logotipo. O tema é aplicado ao vínculo institucional do usuário. O catálogo público usa `?instituicao=CODIGO` e mostra cursos publicados da instituição, limitado a 100 registros. As páginas de divulgação são públicas; conteúdos privados, registros acadêmicos e financeiros permanecem protegidos.

## 7. Equipe de acompanhamento

Foi acrescentado o perfil **Equipe de acompanhamento** no cadastro. A pessoa entra com Google, solicita o perfil e o vínculo ao campus e aguarda aprovação do administrador. O responsável pode vincular professores ou pessoas da equipe já aprovadas, sem criar contas Google por elas.

Em **Acompanhamento → curso → Equipe e funções**, o professor cria funções com nomes como Coordenação, Seção pedagógica, Orientação ou Professor colaborador. O nome é apenas uma identificação: as permissões efetivas são:

- visualizar acompanhamento;
- registrar observações;
- lançar conceitos no conselho;
- registrar ocorrências.

Ao vincular uma pessoa pelo e-mail, escolha função, disciplinas e situação ativa/inativa. Nenhuma disciplina marcada significa todo o curso. Selecionar disciplinas limita os registros consultados e criados a essas disciplinas: a pessoa não lança avaliação Geral do curso nessa condição. Função desativada ou vínculo inativo deixa de autorizar acesso. Um vínculo não concede acesso a pagamentos, backup, administração geral, edição do curso ou gabaritos.

Os dados acadêmicos são restritos ao responsável, administrador e equipe autorizada. Não são publicados na página de vendas nem no certificado. Não há envio automático a alunos, familiares ou terceiros.

## 8. Calendário, avaliação geral e conselho

Em **Calendário e períodos**, informe início/final e gere bimestres, trimestres ou semestres, ou monte períodos personalizados. Ajuste os intervalos sem sobreposição. Máximo de 24 períodos. Depois de haver conceitos, observações ou ocorrências, os períodos antigos devem ser preservados; novos podem ser acrescentados sem alterar os anteriores.

No aluno, selecione período e disciplina, ou **Geral do curso** para a avaliação global. Registre conceito A, B, C ou D e observações. Esses conceitos são uma avaliação docente, separados das notas/conceitos automáticos das provas. Não há cálculo automático de conceito final a partir da média.

Cada autor tem seu lançamento por aluno/período/disciplina. Salvar de novo atualiza o próprio lançamento e mantém o histórico em subcoleção. Não sobrescreve a avaliação de outro professor. Observações de acompanhamento são registros adicionais, com autor e função.

Em **Conselho de classe**, escolha período e monte a tabela de alunos, conceitos de cada autor e observações. Há espaço para encaminhamentos e assinaturas na impressão/PDF. A impressão não assina eletronicamente o documento nem grava automaticamente deliberações manuscritas. Os limites de consulta são sinalizados: 100 alunos e até 500 conceitos/observações por consulta. O prontuário individual tem paginação por tipo de registro.

## 9. Ocorrências e advertências

Os profissionais com permissão podem registrar ocorrência, advertência verbal ou advertência por escrito, com data, descrição factual e providências. O registro guarda aluno, curso, disciplina, período, autor e função.

O responsável cadastra o **Modelo de advertência**, com cabeçalho, corpo e rodapé em texto. Marcadores disponíveis: `{{aluno}}`, `{{curso}}`, `{{data}}`, `{{descricao}}`, `{{providencias}}`, `{{responsavel}}`, `{{funcao}}`. No registro escrito, a aplicação substitui os marcadores, guarda uma cópia do documento e permite imprimir/salvar em PDF. Uma alteração do modelo não muda documentos antigos.

Não há envio ao responsável familiar, assinatura digital ou definição automática de sanção. A ferramenta registra a decisão inserida pelo profissional; o procedimento institucional continua sendo conduzido pela equipe. Os registros de observação e ocorrência são adicionais; a interface não os apaga.

## 10. Backup e restauração

Em **Administração → Backup e restauração**, gere o arquivo JSON. A exportação inclui coleções e subcoleções Firestore, inclusive sob pais ausentes, e preserva tipos como timestamps, referências, bytes e geopontos. Jobs técnicos de manutenção não entram no próprio backup. Limite do painel: 20 mil documentos, sujeito também ao tamanho da fila; o arquivo de restauração no navegador tem limite de 50 MB.

Faça a exportação sem lançamentos simultâneos: a coleta é feita em páginas, não é uma fotografia atômica. Se a conexão cair e uma página já tiver sido processada sem ser recebida, reinicie a exportação para evitar arquivo incompleto.

Para restaurar, escolha o arquivo, valide todos os lotes e confira o projeto. Digite **RESTAURAR** para autorizar a sobrescrita. Somente administradores podem executar. O projeto precisa ser o mesmo. Cada lote é atômico, mas a restauração inteira pode ficar parcial se interrompida; repetir o arquivo regrava os mesmos documentos. A restauração não exclui documentos que estejam no banco e não constem do arquivo. Faça uma cópia atual antes de restaurar.

**Não incluídos:** contas do Firebase Authentication/Google, claims administrativas, arquivos do Storage, índices/regras, variáveis de ambiente e arquivos externos de cursos. Os metadados de pagamentos são copiados, mas isso não copia os próprios comprovantes. Mantenha cópias separadas desses componentes para recuperação completa.

O script `scripts/database-backup.mjs` oferece exportação/restauração usando credencial administrativa local (Application Default Credentials), sem o limite de páginas do painel. Instale as dependências das Functions e use uma credencial com acesso ao projeto. Exemplos:

```
node scripts/database-backup.mjs export --project SEU_PROJETO --file /caminho-privado/backup.json
node scripts/database-backup.mjs restore --project SEU_PROJETO --file /caminho-privado/backup.json --confirm RESTAURAR
```

O script valida o arquivo inteiro antes de gravar e também não exclui documentos extras. Ele mantém o backup em memória: bases muito grandes exigem um processo operacional adequado. Nenhum backup periódico automático foi configurado. Não coloque arquivos de backup ou credenciais no GitHub: os dados incluem notas, observações, ocorrências e registros financeiros.

## 11. Implantação e verificação

Siga os guias anteriores para Authentication, Functions, Firestore e bucket de comprovantes. Atualize:

```
npm install --prefix functions
firebase deploy --only functions,firestore:rules,firestore:indexes,storage
```

Depois publique `dist` pelo GitHub Pages. Aguarde a conclusão dos novos índices de consultas acadêmicas. Esta edição inclui novos módulos JS em `dist` e `functions`; não copie apenas `app.js`.

67 testes locais passaram, incluindo regressões de correção/acesso, validade de planos, comissões, pacotes, cupons, períodos, permissões da equipe, revisão de conceitos, modelos de advertência, progresso, certificados e backup/restauração. Os testes de backend usam Firestore/Storage simulados e não substituem o Emulator Suite ou um ensaio com usuários reais.

Não houve validação visual em navegador nesta edição, teste em Firebase/Storage reais ou publicação na conta da professora. O roteiro do piloto está em `ROTEIRO_PILOTO_TURMA.md`. A demonstração oferece curso fictício e perfil de equipe; seus dados são somente da memória do navegador e reiniciam ao recarregar.
