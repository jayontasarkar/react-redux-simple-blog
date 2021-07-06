import Dexie from 'dexie';

const db = new Dexie('ReactReduxSampleDexieDB');
db.version(1).stores({ posts: '++id' });
db.version(1).stores({ comments: '++id,post,parent' });

export default db;