import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import {getFirestore,doc,collection,getDoc,getDocFromServer,getDocs,setDoc,updateDoc,deleteDoc,query,where,orderBy,limit,onSnapshot,writeBatch,serverTimestamp,Timestamp,arrayUnion,arrayRemove} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';
const c=await fetch('./firebase-config.json').then(r=>r.json());const app=initializeApp(c.firebase);export const auth=getAuth(app),db=getFirestore(app);
export {onAuthStateChanged,serverTimestamp,Timestamp,arrayUnion,arrayRemove};
export const login=()=>signInWithPopup(auth,new GoogleAuthProvider());export const logout=()=>signOut(auth);
export async function read(path){const s=await getDoc(doc(db,path));return s.exists()?{...s.data(),id:s.id}:null;}
export async function list(path,filters=[]){const s=await getDocs(query(collection(db,path),...filters.map(([f,op,v])=>where(f,op,v))));return s.docs.map(d=>({...d.data(),id:d.id}));}
export const put=(path,data)=>setDoc(doc(db,path),data);export const patch=(path,data)=>updateDoc(doc(db,path),data);export const remove=path=>deleteDoc(doc(db,path));
export function watch(path,cb,error){return onSnapshot(doc(db,path),s=>cb(s.exists()?{...s.data(),id:s.id}:null),error);}
export function watchList(path,filters,cb,error){return onSnapshot(query(collection(db,path),...filters.map(([f,op,v])=>where(f,op,v))),s=>cb(s.docs.map(d=>({...d.data(),id:d.id}))),error);}
export async function batch(operations){for(let i=0;i<operations.length;i+=200){const b=writeBatch(db);for(const o of operations.slice(i,i+200)){const ref=doc(db,o.path);if(o.delete)b.delete(ref);else b.set(ref,o.data);}await b.commit();}}
export function encode(data){if(data instanceof Timestamp)return {$timestamp:[data.seconds,data.nanoseconds]};if(Array.isArray(data))return data.map(encode);if(data&&typeof data==='object')return Object.fromEntries(Object.entries(data).map(([k,v])=>[k,encode(v)]));return data;}
export function decode(data){if(data&&typeof data==='object'&&Array.isArray(data.$timestamp)&&Object.keys(data).length===1)return new Timestamp(...data.$timestamp);if(Array.isArray(data))return data.map(decode);if(data&&typeof data==='object')return Object.fromEntries(Object.entries(data).map(([k,v])=>[k,decode(v)]));return data;}

// O horário usado na consulta vem de um timestamp validado pelo Firestore.
export async function serverNow(){const ref=doc(db,'sparkClocks/'+auth.currentUser.uid);await setDoc(ref,{at:serverTimestamp()});const snapshot=await getDocFromServer(ref);return snapshot.data().at;}
