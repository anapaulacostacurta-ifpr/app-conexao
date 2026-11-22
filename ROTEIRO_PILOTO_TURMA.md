# Roteiro do piloto com a turma

## Antes da aula — administrador e professora

1. Publique a interface e o backend com todas as regras/índices; configure o bucket dos comprovantes se testar pagamentos. Confirme o domínio do Google login.
2. Faça um ensaio com contas separadas: administrador, professora, dois alunos e uma pessoa da equipe. Não use apenas a troca de perfis da demonstração para validar segurança.
3. Para testar sem cobrança, mantenha Free e use um curso gratuito. Para exercitar pagamento, use um curso/plano de teste, documento fictício identificado e sem realizar cobrança real da turma.
4. Cadastre instituição, campus e disciplina. Aprove os cadastros e atribua a disciplina à professora.
5. Crie um curso curto: uma disciplina, dois módulos e três aulas; marque uma demonstrativa. Confira a página pública sem login: somente a aula demonstrativa deve mostrar conteúdo.
6. Configure carga horária, critério de progresso e, se desejar, aproveitamento mínimo nas avaliações. Publique o curso.
7. Cadastre início/final e períodos. Crie uma função Coordenação somente leitura e outra Seção pedagógica com observações/ocorrências. Vincule as contas de equipe aprovadas.
8. Cadastre o modelo de advertência com cabeçalho/rodapé de teste. Não use ocorrência real de aluno no ensaio técnico.
9. Crie uma avaliação pelo botão do curso, com questões objetivas, múltiplas e abertas. Salve uma no banco e reutilize-a. Publique/abra na data do teste. Crie também um quiz ao vivo curto.
10. Exporte um backup de teste e confira se o arquivo contém documentos e subcoleções. Faça o ensaio de restauração em um ambiente de teste do mesmo projeto de teste; não experimente restauração sobre dados reais da turma sem cópia atual.

## Durante o piloto — 60 a 90 minutos, ajustáveis

| Etapa | Ação | Evidência esperada |
|---|---|---|
| Entrada | Alunos entram com Google e abrem o curso | Acesso somente ao campus e curso autorizados |
| Matrícula | Escolhem Matricular-me no curso gratuito | Matrícula e painel de progresso disponíveis |
| Estudo | Abrem aulas e marcam duas como concluídas | Progresso muda e permanece após entrar novamente |
| Avaliação | Respondem pelo curso | Não precisam de segunda matrícula manual |
| Quiz | Usam o código da sessão do professor | Contagens/gráficos acompanham respostas |
| Feedback | Professora corrige abertas e publica revisão | Aluno vê resultado e professor vê assuntos com dificuldade |
| Certificado | Aluno conclui critérios e emite | Código verificável sem login; tentativa prematura é negada |
| Acompanhamento | Coordenação consulta; equipe lança observação de teste | Só ações e disciplinas autorizadas ficam disponíveis |
| Conselho | Docentes registram conceitos e observações | Relatório por período mostra autores e conceitos |
| Ocorrência | Profissional autorizado lança registro fictício | Documento escrito usa modelo e pode ser impresso |

## Ensaios fora da atividade principal

- **Pagamento:** aluno envia comprovante fictício → fica pendente → professora aprova → matrícula/acesso liberados. Outro professor não deve aprovar curso alheio. Administrador valida planos.
- **Renovação:** aprovação antecipada amplia a data atual; acesso vencido impede nova obtenção de conteúdo pago, mantendo a área de renovação.
- **Cupom e bolsa:** consultar desconto antes de pagar; testar bolsa por prazo e justificar a concessão.
- **Pacote:** aprovar um pagamento e conferir acesso/matrícula nos dois cursos; comissão aparece uma vez sobre o total.
- **Revogação:** desativar vínculo da equipe e conferir bloqueio após nova consulta. O perfil de aluno não deve acessar prontuários acadêmicos.
- **Histórico:** alterar o conceito do mesmo autor e verificar revisão no banco; outro autor mantém seu lançamento. Alterar modelo de advertência não muda documento já emitido.
- **Backup:** testar tipos e subcoleções no ambiente de teste. Restauração não inclui arquivos Storage, contas Auth ou exclusão de documentos extras.

## Registro do teste

| Item | Resultado / problema observado |
|---|---|
| Data, turma e quantidade de participantes | |
| Aparelhos/navegadores utilizados | |
| Login e aprovação | |
| Conteúdo/progresso | |
| Avaliações/quiz | |
| Certificado/verificação | |
| Pagamentos/ofertas | |
| Equipe/conselho/ocorrências | |
| Backup/restauração em ambiente de teste | |
| Erros, horário e passos para reproduzir | |
| Ajustes necessários antes da próxima aplicação | |

A demonstração local ajuda a conhecer as telas; seus dados não são o banco de produção. Teste a sequência crítica com poucos usuários antes de liberar para a turma inteira. Nenhuma implantação real foi executada nesta entrega.
