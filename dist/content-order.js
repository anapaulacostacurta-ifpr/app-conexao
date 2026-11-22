export function orderedLessons(items){return [...items].sort((a,b)=>(Number.isFinite(a.order)?a.order:Number.MAX_SAFE_INTEGER)-(Number.isFinite(b.order)?b.order:Number.MAX_SAFE_INTEGER));}
export function topicNames(items){return [...new Set(items.map(x=>String(x.topic||'').trim()).filter(Boolean))];}
