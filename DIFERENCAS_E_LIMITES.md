# O que mudou na edição sem Functions e Storage

| Recurso | Funcionamento nesta edição |
| --- | --- |
| Login Google | Firebase Authentication no navegador |
| Administrador inicial | Documento sparkAdmins/UID criado manualmente no console |
| Professores/equipe | Cadastro pendente; administrador aprova e pode suspender |
| Matrículas | Código do curso, solicitação, aprovação em lote por professor |
| JSON Classroom | Localiza por e-mail contas cadastradas; não cria Google/Auth; seleção revisada antes da aprovação |
| Cursos/disciplinas/turma | Cada curso pertence a um responsável e campus; conteúdo em texto e links |
| Avaliações | Questões de escolha única, várias corretas, lacunas e abertas; código no enunciado e na resposta |
| Cadastro de questões | Editor JSON com modelo incluído e validação; banco particular por professor |
| Gabarito | Documento privado separado, acessível ao professor responsável e administrador |
| Correção | Calculada no navegador do professor, com gabarito privado; alunos não calculam nem gravam a própria nota |
| Conceitos | A: 100%; B: de 70% até abaixo de 100%; C: de 40% até abaixo de 70%; D: abaixo de 40% |
| Múltiplas corretas | Desconta omissões e opções erradas; mínimo zero |
| Quiz ao vivo | Uma resposta por aluno/pergunta; professor acompanha barras, pizza, bolinhas ou palavras; valores numéricos/percentuais |
| Provas e quiz | Uma entrega e uma rodada ao vivo por pergunta/avaliação; para repetir uma sessão, crie outra avaliação |
| Registros de navegação | Eventos de foco/cópia/colagem/contexto; não detectam prints nem comprovam fraude; desconto exige análise e justificativa docente |
| Plano | Administração configura planos/recursos; comprovantes por link e vencimento manual; acesso de professor pago vencido é bloqueado nas regras |
| Limites de planos | maxQuestions é aplicado pelas regras (padrão 10). maxStudents/maxResponses são registros orientativos, sem bloqueio transacional |
| Módulos por plano | features.tracking, team, warnings e questionBank são verificados nas regras; campo ausente usa habilitado nesta edição |
| Renovação | Professor informa plano, ciclo mensal/trimestral/semestral/anual e comprovante; administrador registra a validade após conferir |
| Curso pago | Professor valida matrícula/comprovante e define validade; regras impedem conteúdo e novas respostas após vencer |
| Direitos autorais/vendas | Valor e percentual ficam como registro no curso; não há cálculo/repasse automático de comissão, cupons, pacotes ou conciliação financeira |
| Equipe de acompanhamento | Função livre com permissões de observação, conselho e advertências; acesso abrange todo o curso, sem restrição por disciplina dentro dele |
| Conselho | Resultados por disciplina/período, lado a lado, com autor e histórico de novos lançamentos; sem somar conceitos |
| Alerta | Dois D em resultados vigentes ou uma nota inferior a 70% da escala |
| Advertências | Registro verbal/escrito e impressão da escrita com cabeçalho/rodapé; timbre externo por link, sem sobreposição automática de PDF/DOCX |
| Fechamento | Curso por curso, com todas as disciplinas/períodos; relatório HTML imprimível, backup JSON, confirmação e bloqueio de novos lançamentos |
| Exclusão de encerrados | Somente administrador; visualização, download, caixas de confirmação e frase exata; confere se dados mudaram desde o backup antes de iniciar exclusão |
| Backup/restauração | JSON manual pelo administrador; inclui subcoleções conhecidas de cursos existentes; restauração em lotes, sem exclusão de extras |
| Demonstração | Login Google + nome, telefone, e-mail e consentimento; navegação ilustrativa com dados fictícios |
| Certificados verificáveis, cupons, marketing e notificações | Não transferidos para esta edição |

## Limites operacionais

- A aplicação usa Firestore diretamente com regras específicas, não uma regra que permita tudo a qualquer pessoa autenticada.
- O usuário responsável e administradores são autoridades confiáveis para notas, matrículas, plano e pagamentos. A configuração web não concede privilégio administrativo.
- O Spark tem cotas de operações e tamanho de dados. Listeners ao vivo, relatórios e backups consomem leituras; use com uma turma piloto e observe o painel. Não há serviço externo gratuito ilimitado implícito nesta entrega.
- Não há backend executando tarefas quando o navegador está fechado: não há backup agendado, envio de e-mail, cálculo financeiro ou emissão automática de certificados.
- O vencimento é verificado quando se tenta acessar o recurso protegido, pelo horário do servidor. Não exclui conteúdo já carregado no aparelho ou arquivos externos já compartilhados.
- Alunos recebem uma avaliação publicada somente se a matrícula estiver ativa; só podem entregar com avaliação liberada, curso aberto e dentro da janela de datas. Os próprios resultados já publicados continuam consultáveis pelo dono.
- Suspensão e revogação devem ser acompanhadas de revisão dos links externos: o Firebase não revoga permissões do Drive.
- Não há garantia de bloquear troca de tela, prints ou adulteração de eventos produzidos no navegador. Não aplique penalidade automática somente com esses registros.
- Um fechamento não é uma transação global do ano. Faça manutenção exclusiva para backup/exclusão, sem outros administradores alterando os dados. Se o processo em lotes falhar, conserve o backup e revise antes de repetir.
- A confirmação de download é feita pelo usuário; o navegador não consegue provar que o arquivo permaneceu salvo. O hash verifica o estado lido antes da ação, não cria um bloqueio global no servidor.
- O backup não inclui Authentication, sparkAdmins, arquivos do Drive, coleções legadas ou subcoleções órfãs criadas fora desta edição. A restauração pressupõe contas com os mesmos UIDs. Preserve cópias fora do repositório público.
- Regras de planos ausentes assumem Free; cadastre explicitamente todos os planos usados antes de uso comercial. A edição não equivale à plataforma comercial anterior em controles de venda e cotas.

## Referências oficiais consultadas

- Plano Spark e cotas: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
- Cotas Firestore: https://firebase.google.com/docs/firestore/quotas
- Regras e consultas (regras não filtram resultados): https://firebase.google.com/docs/firestore/security/rules-query
- Gabaritos privados em documentos separados: https://firebase.google.com/docs/firestore/security/rules-fields
