# Publicação — edição sem Functions e Storage

Consulte `LEIA_PRIMEIRO.md`. O comando desta edição é:

```bash
firebase deploy --project app-conexao-783a4 --only firestore:rules,firestore:indexes
```

O workflow publica somente `dist/` no GitHub Pages. Não execute instalação/deploy da antiga pasta `functions`. O primeiro administrador é cadastrado no console, por documento `sparkAdmins/UID`. Os dados desta edição usam coleções novas, prefixadas por `spark`.
