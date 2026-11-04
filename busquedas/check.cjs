const assert = require('node:assert/strict');
const {compile,terms,frameworks}=require('./app.js');
const blocks=[{label:'P',include:true,free:'low back pain;lumbago;lumbago',mesh:'Low Back Pain'},{label:'I',include:true,free:'exercise\ntraining',mesh:''},{label:'O',include:false,free:'pain',mesh:''}];
assert.deepEqual(terms(' a ;a\nb '),['a','b']);
assert.equal(compile(blocks,'pubmed').query,'("low back pain"[tiab] OR lumbago[tiab] OR "Low Back Pain"[Mesh]) AND (exercise[tiab] OR training[tiab])');
assert.equal(compile(blocks,'generic').query,'("low back pain" OR lumbago) AND (exercise OR training)');
assert.ok(compile(blocks,'scopus').query.startsWith('TITLE-ABS-KEY('));
assert.ok(compile(blocks,'wos').query.startsWith('TS=('));
assert.equal(compile([],'generic').query,'');
assert.equal(compile([{label:'P',include:true,free:'',mesh:''}],'pubmed').errors.length,1);
assert.equal(compile([{label:'P',include:true,free:'pain OR exercise',mesh:''}],'generic').query,'');
assert.equal(compile([{label:'P',include:true,free:'pain[tiab]',mesh:''}],'generic').query,'');
for(const f of Object.values(frameworks))for(const engine of ['generic','pubmed','scopus','wos'])assert.ok(compile(f.fields.map(x=>({label:x[0],free:x[2],mesh:x[3],include:x[4]})),engine).query);
console.log('Verificación correcta: 8 estrategias, 4 formatos, bloques opcionales y validación.');
const {getFramework}=require('./app.js');
for(const key of Object.keys(frameworks))for(const engine of ['generic','pubmed','scopus','wos']){
 const f=getFramework(key,'education');
 assert.notEqual(f.example,frameworks[key].example);
 assert.ok(compile(f.fields.map(x=>({label:x[0],free:x[2],mesh:x[3],include:x[4]})),engine).query);
 assert.ok(f.fields.every(x=>x[3]===''));
}
console.log('Verificación educativa correcta: 8 marcos y separación de tesauros.');
