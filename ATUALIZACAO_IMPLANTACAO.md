# Pacote atualizado — implantação no GitHub Pages

Este pacote acrescenta às funções anteriores: módulos selecionáveis por plano, advertência verbal e escrita com papel timbrado, painel de alertas dos alunos, conselho acumulativo, fechamento anual com backup e exclusão confirmada e cadastro para demonstração.

## Implantação

1. Publique o repositório com os arquivos do pacote. O workflow `.github/workflows/pages.yml` publica somente `dist` no GitHub Pages.
2. Configure `dist/firebase-config.json` com seu projeto e habilite o Firebase. Cadastros e operações reais precisam do backend, não funcionam apenas com a hospedagem HTML.
3. Instale dependências com `npm install --prefix functions`.
4. Configure o bucket privado de comprovantes/documentos em `RECEIPTS_BUCKET`, conforme `functions/receipts.env.example` e os guias anteriores.
5. Publique `firebase deploy --only functions,firestore:rules,firestore:indexes,storage` no projeto correto. Aguarde índices prontos.
6. Confira a conta administradora, o domínio autorizado de Google login e faça um piloto com contas separadas.

## Controles por plano

O administrador pode selecionar **Acompanhamento dos alunos**, **Equipe de acompanhamento**, **Emissão de advertências verbais e escritas** e **Banco de questões**. Equipe e advertências exigem acompanhamento habilitado. A interface e as Functions verificam as liberações.

Nos padrões novos, Free libera acompanhamento e banco, mas não equipe/advertências; Premium e Personalizado liberam os quatro módulos. Tudo pode ser alterado pelo administrador. Planos já salvos sem os novos campos não recebem essas liberações automaticamente: revise e salve-os no painel.

As permissões individuais continuam necessárias. Um plano liberado não permite que qualquer pessoa consulte alunos: a pessoa deve ter cadastro aprovado e vínculo/função no curso. O administrador mantém acesso global para gestão. Os dados anteriores não são apagados quando um módulo é desabilitado.

## Painel dos alunos e conselho

O painel destaca em vermelho alunos com **dois conceitos D** ou **uma nota abaixo de 70%**, normalizada pela escala. Exemplo: 6,5/10 equivale a 65%. Nota exatamente 70% não aciona o alerta. É possível filtrar o período. O conceito do conselho para a mesma disciplina/período prevalece sobre as provas nesse alerta; autores diferentes na mesma célula não duplicam a contagem. O alerta é um sinal de acompanhamento, não uma reprovação automática.

Ao clicar no nome, o prontuário apresenta conceitos/notas, comentários com autor/função e advertências recebidas. O registro do conselho aceita conceito ou nota com sua escala.

A equipe com permissão de conselho pode montá-lo. No segundo período são apresentados o primeiro e o segundo, no terceiro os três, e assim por diante. Os valores ficam em colunas por período, sem soma automática de conceitos e escalas diferentes. A impressão/PDF é realizada pelo navegador.

## Advertências e papel timbrado

Professores e equipe autorizada podem emitir advertência verbal ou escrita, desde que o módulo esteja no plano do responsável. Ambas geram documento. Ocorrência simples continua separada da advertência formal.

O responsável configura cabeçalhos verbal/escrito, corpo e rodapé. O fundo aceita **PDF, DOCX editável, PNG ou JPEG até 4 MB**. Usa-se a primeira página. O original DOCX pode ser baixado, editado no Word/LibreOffice e reenviado. A renderização pode variar em relação ao editor original; confira o PDF antes de imprimir. É possível ajustar margens e fonte para não cobrir logotipos e rodapés.

As dependências de geração de PDF/DOCX são locais em `dist/vendor`, com licenças. O conteúdo é composto no navegador; não é enviado a um conversor externo. O arquivo de fundo fica em Storage privado. Cada emissão preserva a versão do fundo e o texto usados. Não há assinatura digital certificada nem envio automático a familiares.

## Fechamento anual

Exclusivo do administrador, em **Fechamento anual**:

1. Escolha o ano e os cursos com término nele, e/ou avaliações avulsas do ano.
2. Gere relatórios gerais dos cursos e disciplinas e o backup privado. Até 10 cursos e 40 avaliações avulsas por fechamento; limite operacional de 5 mil documentos e 40 MB por arquivo.
3. Visualize os relatórios e baixe o JSON completo. Guarde a cópia fora do repositório público.
4. Para excluir, confirme que visualizou os relatórios, baixou/guardou o JSON e autoriza excluir. Digite **EXCLUIR ANO 2026**, substituindo pelo ano selecionado.
5. A exclusão só começa após essa confirmação do administrador e é processada em lotes. A aplicação compara os registros com a cópia: alteração depois do backup interrompe a exclusão.

Também é possível **encerrar e manter os dados**. Durante a preparação, os itens selecionados são bloqueados para novos lançamentos. Uma preparação não confirmada pode ser cancelada para liberar os lançamentos. Uma exclusão interrompida pode ficar parcial: preserve o JSON e restaure/revise antes de tentar outro fechamento. Não faça gravações administrativas/restaurações em paralelo ao fechamento.

A limpeza remove os documentos acadêmicos selecionados, avaliações e suas subcoleções/sessões, matrículas específicas dos cursos e outros registros relacionados ao curso. **Preserva contas, perfis, instituições, disciplinas compartilhadas, matrículas gerais, registros financeiros, auditoria, arquivos Storage e as cópias/relatórios do fechamento.** Portanto não é exclusão integral de dados pessoais de toda a plataforma.

O JSON usa o formato de restauração já existente. Ao restaurá-lo no mesmo projeto, os documentos acadêmicos voltam e os bloqueios incluídos são reabertos. As contas Auth e arquivos Storage não estão dentro do JSON; mantenha suas cópias separadas. A limpeza do banco não apaga os arquivos de papel timbrado/comprovantes, permitindo que as referências sejam recuperadas.

## Cadastro para demonstração

Antes dos perfis de teste, o visitante informa **nome, telefone e e-mail**, confirma ciência do registro e pode autorizar contato comercial separadamente. Não há senha nem confirmação de titularidade do e-mail. O acesso de demonstração não concede privilégios sobre dados reais.

Com Firebase habilitado, `registerDemoLead` grava os contatos em coleção privada e limita cadastros por origem/hora. O administrador autenticado pode consultar em **Cadastros da demonstração**. Recomenda-se configurar App Check e uma política de retenção antes de divulgar comercialmente. Nenhuma mensagem é enviada automaticamente.

Sem Firebase, o formulário informa que é um teste local e pede dados fictícios; não registra contatos em servidor. A prévia anteriormente publicada não substitui a configuração do Firebase. Publicar o pacote em um GitHub Pages público permite acesso ao formulário; as operações persistentes dependem das Functions publicadas.

## Verificação desta entrega

74 testes locais passaram, incluindo regressões, controles de plano, alertas, fechamento, bloqueio de exclusão sem relatórios/backup, preservação de contas/finanças e recuperação do JSON. Os testes de backend usam banco e Storage simulados. Todos os JS e JSON foram verificados localmente.

A validação visual do papel timbrado foi interrompida durante a sessão anterior. Não houve teste em Firebase/Storage real, publicação desta atualização na conta GitHub ou exclusão de dados reais. Antes de usar com a turma, faça o ensaio de emissão de PDF/DOCX e de restauração em projeto de teste.
