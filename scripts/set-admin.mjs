// Execute apenas em ambiente administrativo confiável com credenciais padrão.
import {initializeApp,applicationDefault} from '../functions/node_modules/firebase-admin/lib/app/index.js';
import {getAuth} from '../functions/node_modules/firebase-admin/lib/auth/index.js';
const uid=process.argv[2];if(!uid){console.error('Uso: node scripts/set-admin.mjs UID_DO_ADMINISTRADOR');process.exit(1);}
initializeApp({credential:applicationDefault()});const auth=getAuth(),user=await auth.getUser(uid);await auth.setCustomUserClaims(uid,{...user.customClaims,admin:true});console.log('Administrador configurado. Saia e entre novamente no site.');
