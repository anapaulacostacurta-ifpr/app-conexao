> **Edição ampliada:** páginas de curso, módulos/progresso, avaliações integradas, certificados, banco de questões, avisos, financeiro/ofertas, identidade institucional, acompanhamento, conselho, ocorrências e backup. Consulte [GUIA_RECURSOS_E_ACOMPANHAMENTO.md](GUIA_RECURSOS_E_ACOMPANHAMENTO.md) e [ROTEIRO_PILOTO_TURMA.md](ROTEIRO_PILOTO_TURMA.md).

# Cursos, comprovantes, validade e remuneração

Esta edição amplia a plataforma de avaliações com cursos e controle de pagamentos **realizados fora da aplicação**. Não há integração bancária, checkout, cartão ou transferência automática.

## Responsabilidades

| Ação | Quem pode fazer |
|---|---|
| Criar curso, selecionar disciplinas e publicar conteúdo | Professor responsável, com plano ativo |
| Escolher curso gratuito/pago e modalidade direitos autorais/vendas | Professor responsável |
| Definir percentuais individuais de remuneração | Administrador |
| Enviar comprovante do próprio plano | Professor aprovado |
| Aprovar/rejeitar pagamento de plano | Administrador |
| Enviar comprovante do próprio curso | Aluno aprovado do campus |
| Aprovar/rejeitar pagamento de curso | Professor responsável ou administrador |
| Anexar comprovante de terceiro e liberar o período na mesma operação | Administrador para planos; responsável ou administrador para cursos |
| Baixar comprovante | Pagador e respectivos revisores autorizados |

O professor não aprova o pagamento de seu próprio plano. A liberação do vínculo institucional continua sendo feita pelo administrador; um comprovante não aprova um cadastro pendente ou suspenso.

## 1. Cursos e disciplinas

O menu **Cursos** aparece após entrar com cadastro aprovado. O professor escolhe **Criar curso**, informa título e descrição, seleciona gratuito/pago e a modalidade de remuneração. Pode configurar valores próprios para cada ciclo: mensal, trimestral, semestral e anual, além das instruções para pagamento externo.

Cada curso contém uma ou mais disciplinas já atribuídas ao professor no mesmo campus. Em cada disciplina, cadastre o texto de conteúdo e, opcionalmente, um link complementar HTTP/HTTPS. Os limites desta edição são 30 disciplinas, 30.000 caracteres por disciplina e 250.000 caracteres no cadastro completo. Não há editor de vídeo, upload de materiais de aula ou integração automática com Classroom nesta área. Os uploads novos são exclusivamente comprovantes.

Marque **Publicado** para mostrar o curso aos usuários aprovados do campus. Cursos gratuitos publicados liberam o conteúdo sem pagamento. Cursos pagos precisam de valores positivos nos quatro ciclos e liberam o conjunto de disciplinas do curso durante a validade aprovada. O preço é do curso completo, não de cada disciplina.

O servidor omite textos e links de conteúdo pago quando o aluno não tem validade ativa. O catálogo mostra título, descrição, disciplinas, preços e responsável. O professor responsável e o administrador podem consultar o curso. Avaliações vinculadas ao curso agora utilizam sua matrícula específica, criada na liberação do curso. Avaliações sem curso continuam utilizando as matrículas tradicionais por disciplina.

Links externos têm o controle de acesso do serviço de destino. O bloqueio da plataforma não torna privados arquivos externos já públicos nem apaga materiais já baixados ou carregados.

## 2. Plano do professor e renovação

Em **Planos e preços**, o administrador configura recursos, limites e preço base, ou valores específicos para os quatro ciclos. Os campos específicos prevalecem; campos vazios são calculados proporcionalmente ao preço base e à periodicidade dele. Confira os valores finais antes de salvar. As configurações iniciais permanecem R$ 0,00: cadastre preços antes de oferecer planos pagos. Free permanece gratuito e não vence.

Um plano com valor positivo exige pagamento validado e validade vigente. A simples atribuição de Premium/Personalizado ao perfil **não** libera um plano pago sem comprovante aprovado. Planos existentes sem pagamentos também passam a exigir validação quando seu preço for tornado positivo. Planos gratuitos não exigem renovação.

O professor abre **Pagamentos e renovação → Renovar ou solicitar outro plano**, escolhe plano e ciclo, realiza o pagamento externo e envia PDF, PNG ou JPEG de até 2 MB. As instruções cadastradas pelo administrador aparecem na tela. O envio fica **Aguardando análise** e não prolonga a validade.

O administrador abre **Pagamentos e renovação → Todos os pagamentos**, baixa o comprovante e escolhe **Analisar pagamento**. Pode aprovar ou rejeitar com motivo. A aprovação atribui o plano adquirido e registra a data de validade. Para lançar diretamente um pagamento recebido, use **Anexar e validar plano de professor**, informe o e-mail do professor aprovado e anexe o comprovante.

## 3. Curso do aluno e renovação

No curso pago, o aluno usa **Pagar e enviar comprovante** ou **Renovar acesso**, escolhe o ciclo e anexa o documento após pagar fora da aplicação.

O responsável acessa **Pagamentos e renovação → Pagamentos dos meus cursos**. O administrador consulta todos os pagamentos. Depois da conferência, a aprovação libera todas as disciplinas daquele curso até a validade registrada. A rejeição não libera nem renova e exige justificativa.

O responsável também pode abrir o curso e usar **Anexar comprovante e liberar aluno**: informe o e-mail de um aluno aprovado do campus, selecione ciclo, anexe e valide. O administrador tem a mesma opção no curso. O registro guarda quem anexou e quem validou.

## 4. Validade e vencimento

- Mensal = 1 mês; trimestral = 3; semestral = 6; anual = 12.
- Renovação antecipada soma o ciclo ao fim da validade atual do mesmo item.
- Se já venceu ou se for outra modalidade de plano, a validade começa na aprovação.
- O cálculo usa meses de calendário em UTC, preservando horário e ajustando dias inexistentes para o último dia do mês. A tela mostra datas no fuso do aparelho.
- No instante do vencimento, novas requisições de recursos pagos são negadas pelo servidor. Não é necessário um agendador alterar o status do cadastro.
- O usuário continua podendo entrar e acessar renovação, comprovantes e demais áreas gratuitas. Cadastro, dados anteriores e pagamentos não são apagados.
- Enviar comprovante pendente não impede o vencimento. Apenas a validação concede novo prazo.
- Tentativas individuais já abertas preservam a possibilidade de salvar/entregar; a área docente paga e novas operações exigem o plano vigente. Cursos dos alunos dependem da validade do próprio curso; não são cancelados automaticamente quando o plano do professor vence. O professor pode continuar conferindo pagamentos e consultando sua remuneração para regularizar a situação.

Uma página já carregada pode conservar o conteúdo no aparelho; o vencimento impede nova obtenção pelo servidor. Não há apagamento remoto de dados já visualizados.

## 5. Direitos autorais e vendas

Em **Administração → Revisar acesso do professor → Percentuais e pagamentos**, o administrador informa dois percentuais individuais entre 0 e 100: direitos autorais e vendas. O padrão é 0%; configure antes de aprovar vendas que devam remunerar o docente.

O professor escolhe a modalidade no curso. As duas modalidades calculam a remuneração como percentual do valor total pago pelo período do curso. A modalidade fica registrada no envio do pagamento; o percentual individual vigente é capturado na aprovação.

Exemplo: curso com pagamento aprovado de R$ 100,00; percentual de direitos autorais = 20% e de vendas = 35%. Se a modalidade for direitos autorais, registra R$ 20,00 para o professor; se for vendas, R$ 35,00. O restante é registrado como saldo da plataforma. Não há comissão sobre pagamentos de planos.

Cada pagamento aprovado gera uma única entrada em **Valores a receber / Remuneração dos professores**. Repetir a aprovação não duplica validade ou comissão. Alterar o percentual depois não recalcula registros já aprovados. Valores são arredondados para centavos.

O painel calcula os valores e agora permite ao administrador registrar a referência de repasses já feitos externamente. Não executa transferência, estorno, conciliação bancária ou emissão fiscal. Os repasses são realizados e controlados externamente. Esta edição não oferece cancelamento de uma aprovação já concluída; confira valor, pagador e período antes de aprovar.

## 6. Armazenamento privado e implantação

1. Configure o projeto Firebase e Authentication como nos guias anteriores.
2. Ative/configure um bucket de Cloud Storage no mesmo projeto. Copie **o nome exato** do bucket no console; não assuma um sufixo.
3. Copie `functions/receipts.env.example` para `functions/.env.<ID_DO_PROJETO>` e preencha `RECEIPTS_BUCKET=nome-exato-do-bucket`. Não use prefixo `gs://`. O arquivo de ambiente não deve ser publicado no GitHub.
4. Instale as dependências com `npm install --prefix functions`.
5. Publique o backend e as regras: `firebase deploy --only functions,firestore:rules,firestore:indexes,storage` no projeto correto. O `firebase.json` agora referencia também `storage.rules`.
6. Publique `dist` no GitHub Pages pelo workflow existente. O workflow não instala serviços Firebase nem faz o deploy do backend.
7. Teste com contas reais de administrador, professor e aluno antes de aplicar. Configure preços, instruções, percentuais e confirme que uploads e downloads funcionam.

Os comprovantes são gravados em `receipts/{pagador}/{pagamento}.{extensão}`. As regras do bucket bloqueiam acesso direto; envio e download passam por Functions autenticadas, que conferem o pagador/revisor. Nenhum link público permanente é fornecido. O conteúdo/MIME deve corresponder a PDF, PNG ou JPEG, até 2 MB. A aplicação verifica formato e tamanho, mas a conferência de autenticidade financeira é humana.

Um mesmo arquivo, do mesmo pagador para o mesmo curso/plano, é identificado por SHA-256 e reutiliza o registro existente, evitando duplicidade em reenvios idênticos. Isso não comprova uma transferência bancária: imagens diferentes do mesmo pagamento ainda precisam ser identificadas na conferência humana. Após rejeição, é permitido enviar novamente com os dados/documento corrigidos; cria-se um novo registro para análise, preservando o histórico anterior.

As coleções novas são `courses`, `courseAccess`, `payments`, `receiptFingerprints` e `revenueLedger`, além de auditorias. A validade de plano fica no perfil (`planPayment`). Não há rotina automática de exclusão/retensão. Adote o prazo de guarda da instituição e restrinja a administração do projeto.

As regras Firestore mantêm as coleções financeiras e de curso bloqueadas a acessos diretos; as Functions validam o acesso. A leitura de agregados ao vivo também verifica a validade do plano docente. Não há dependência de links públicos de comprovantes ou de cobrança integrada.

## 7. Testes desta edição

67 testes locais passaram: regressões da plataforma, datas de vencimento/renovação, preços por ciclo, percentuais e centavos, formatos de comprovantes, limites de planos, aprovação/rejeição, autorização de revisores, ocultação de conteúdo vencido, reenvio sem duplicidade e aprovação sem duplicar comissão/validade. Os testes de transação executam o código das Functions com Firestore/Storage simulados e verificam leituras antes de gravações. Todos os arquivos JavaScript passaram na checagem de sintaxe.

Não houve validação visual em navegador nesta edição, execução do Emulator Suite ou teste com Firebase/Storage reais. Nenhum projeto Firebase, pagamento ou publicação GitHub foi realizado. A demonstração usa memória local e perde dados ao recarregar; seus comprovantes não são enviados a serviços externos. As regras e as credenciais do projeto precisam ser validadas no piloto.
