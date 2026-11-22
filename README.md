# Conexões — GitHub Pages + Firebase Spark

Edição adaptada para usar somente Firebase Authentication e Cloud Firestore, sem Cloud Functions e sem Cloud Storage.

Comece por **[LEIA_PRIMEIRO.md](LEIA_PRIMEIRO.md)**. Confira **[DIFERENCAS_E_LIMITES.md](DIFERENCAS_E_LIMITES.md)** antes de substituir a edição anterior.

## Publicação do banco

```bash
firebase deploy --project app-conexao-783a4 --only firestore:rules,firestore:indexes
```

Publique `dist/` no GitHub Pages. O workflow incluído envia somente essa pasta. O projeto Firebase já está preenchido. Nunca habilite regras de acesso irrestrito.

## Testes opcionais

Node.js 22 ou superior; Java compatível com o emulador para testes de regras.

```bash
npm ci --ignore-scripts
npm test
npm run test:rules
```

O npm da raiz contém apenas dependências de desenvolvimento. Não existe pasta `functions/`. A interface importa SDKs de Authentication/Firestore por módulos públicos do Firebase; não há chamada de Functions ou Storage.

Consulte `VALIDACAO.md` para o que foi verificado e o que ainda depende do ambiente real.
