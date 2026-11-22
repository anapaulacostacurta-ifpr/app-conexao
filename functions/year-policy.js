export const YEAR_GROUPS=['courseAccess','courseEnrollments','courseTeam','courseRoles','coupons','academicAssessments','studentObservations','studentIncidents','letterheads'];
export function validYear(y){return Number.isInteger(y)&&y>=2000&&y<=2200;}
export function confirmedDeletion(v,job,uid){return !!v&&v.reportsViewed===true&&v.backupDownloaded===true&&v.deleteConfirmed===true&&v.confirmation==='EXCLUIR ANO '+job.year&&job.reportsViewedBy===uid&&job.backupServedBy===uid&&v.sha256===job.sha256;}
export function canonical(v){if(Array.isArray(v))return'['+v.map(canonical).join(',')+']';if(v&&typeof v==='object')return'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';return JSON.stringify(v);}
