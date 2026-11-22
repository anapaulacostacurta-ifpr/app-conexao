> **Pacote atualizado:** leia [ATUALIZACAO_IMPLANTACAO.md](ATUALIZACAO_IMPLANTACAO.md) para planos, alertas, conselho acumulativo, timbre PDF/DOCX, fechamento anual, backup/exclusão confirmada e cadastro da demonstração.

> **Edição ampliada:** páginas de curso, módulos/progresso, avaliações integradas, certificados, banco de questões, avisos, financeiro/ofertas, identidade institucional, acompanhamento, conselho, ocorrências e backup. Consulte [GUIA_RECURSOS_E_ACOMPANHAMENTO.md](GUIA_RECURSOS_E_ACOMPANHAMENTO.md) e [ROTEIRO_PILOTO_TURMA.md](ROTEIRO_PILOTO_TURMA.md).

> **Cursos e pagamentos:** cursos gratuitos/pagos com disciplinas, comprovantes privados, aprovação manual, validade e renovação mensal/trimestral/semestral/anual e remuneração por professor. Consulte [GUIA_CURSOS_E_PAGAMENTOS.md](GUIA_CURSOS_E_PAGAMENTOS.md). Configure também o bucket de comprovantes e publique as regras de Storage.

> **Atualização:** planos Free/Premium/Personalizado e novos planos configuráveis, múltiplas alternativas corretas com penalidade e quiz ao vivo com gráficos. Consulte [GUIA_PLANOS_E_QUIZ.md](GUIA_PLANOS_E_QUIZ.md) para limites, contagens, recursos e implantação. Atualize Functions e regras além da interface.

# Comece por aqui

Este pacote contém a plataforma completa, com importação do JSON do Classroom e aprovação de alunos em lote.

1. Leia `GUIA_GITHUB_PAGES.md`.
2. Publique o conteúdo do pacote em um repositório dedicado e habilite Pages com GitHub Actions. A pasta `.github` precisa ser enviada também.
3. Configure seu projeto Firebase, publique as Functions, regras e índices conforme o guia.
4. Preencha `dist/firebase-config.json` e altere `enabled` para `true` apenas após configurar o backend.
5. Configure o primeiro administrador e teste com contas Google diferentes.

Sem Firebase configurado, o site mostra uma demonstração com dados fictícios. GitHub Pages publica apenas a interface; não executa o código das Functions nem armazena as respostas.

O arquivo real dos alunos não acompanha este pacote. Nunca publique `Class data.json`, exportações do Classroom ou chaves administrativas no GitHub.

Esta edição também inclui lacunas preenchidas dentro do enunciado, código-fonte em bloco preto e tipo de resposta aberta **Código**. Consulte a seção final de `GUIA_GITHUB_PAGES.md`. Atualize as Functions junto com os arquivos da interface.
