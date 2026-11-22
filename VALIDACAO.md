# Validação da edição Spark

- 8 testes de modelo: remoção de gabaritos do documento público, correção, lacunas, código, links, alertas, backups e validação do editor.
- 1 teste de interface em DOM simulado: cadastro de avaliação pela professora, entrega pelo aluno, correção, publicação A/100 e lançamento no acompanhamento. Firebase simulado nesse teste.
- 18 testes de regras executados no emulador oficial: privacidade de gabarito/resultados, matrícula, entrega imutável, bloqueio de autoatribuição de notas e autopromoção, permissões de equipe, plano vencido, matrícula paga vencida, módulos desabilitados, limite de questões e aprovação restrita de estudantes.
- Sintaxe de todos os módulos JavaScript e do script de publicação.
- Auditoria das dependências npm de produção: zero vulnerabilidades; a aplicação não tem dependências npm de produção. Ferramentas opcionais de desenvolvimento possuem sua própria árvore e não são enviadas ao Pages.

Não foram realizados deploy no Firebase, login Google real, inspeção visual em celular, compartilhamento real de links externos ou restauração de dados reais. Antes da turma, execute o roteiro em LEIA_PRIMEIRO.md com duas contas de teste. Os testes antigos de Functions não se aplicam a este novo backend.
