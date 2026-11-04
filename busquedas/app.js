'use strict';

/* ==========================================================================
   Datos de los marcos de pregunta
   Cada campo: [sigla, nombre, sinónimos en texto libre, MeSH, incluir por defecto]
   ========================================================================== */
const frameworks = {
 PICO:{type:'Para comparar intervenciones',description:'Úsalo cuando quieres saber si algo funciona mejor que otra cosa. Es el marco más conocido en salud y sirve igual en el aula.',example:'En adultos con dolor lumbar crónico, ¿el ejercicio, frente a la atención habitual, reduce el dolor?',fields:[['P','Población','low back pain;lumbago','Low Back Pain',true],['I','Intervención','exercise;exercise therapy','Exercise Therapy',true],['C','Comparación','usual care','',false],['O','Desenlace','pain;disability','',false]]},
 PICOT:{type:'Para comparar en un tiempo definido',description:'Es PICO con reloj. El tiempo te ayuda a decidir qué estudios entran, pero casi nunca lo pongas en la cadena.',example:'En adultos con dolor lumbar crónico, ¿el ejercicio frente a la atención habitual reduce el dolor a las 12 semanas?',fields:[['P','Población','low back pain;lumbago','Low Back Pain',true],['I','Intervención','exercise;exercise therapy','Exercise Therapy',true],['C','Comparación','usual care','',false],['O','Desenlace','pain','',false],['T','Tiempo','12 weeks','',false]]},
 PEO:{type:'Para estudiar factores y riesgos',description:'Aquí nadie asigna nada: observas a quién le pasa algo y qué resulta de eso. Piensa en exposiciones, no en tratamientos.',example:'En personal de enfermería, ¿la exposición a turnos nocturnos se asocia con trastornos del sueño?',fields:[['P','Población','nurses;nursing staff','Nurses',true],['E','Exposición','night shift;shift work','Shift Work Schedule',true],['O','Resultado','sleep disorders;insomnia','Sleep Wake Disorders',false]]},
 PECO:{type:'Para comparar exposiciones',description:'PEO con un grupo de comparación. Recuerda que encontrar una asociación no demuestra que una cosa cause la otra.',example:'En personal de enfermería, ¿los turnos nocturnos frente a diurnos se asocian con insomnio?',fields:[['P','Población','nurses','Nurses',true],['E','Exposición','night shift;shift work','Shift Work Schedule',true],['C','Comparación','day shift','',false],['O','Resultado','insomnia','',false]]},
 PCC:{type:'Para mapear un tema',description:'Cuando todavía no sabes qué hay publicado y quieres hacer un mapa. Es el marco típico de las revisiones de alcance.',example:'¿Qué evidencia existe sobre telerehabilitación en personas mayores en atención primaria?',fields:[['P','Población','older adults;elderly','Aged',true],['C','Concepto','telerehabilitation','Telerehabilitation',true],['C2','Contexto','primary care;primary health care','Primary Health Care',false]]},
 SPIDER:{type:'Para estudios cualitativos y mixtos',description:'Pensado para experiencias y percepciones. Cuidado: si metes el diseño y el tipo de investigación en la cadena, puedes dejar estudios por fuera.',example:'¿Cómo viven las personas con ictus la telerehabilitación y qué barreras describen en entrevistas?',fields:[['S','Muestra (Sample)','stroke survivors;stroke','Stroke',true],['PI','Fenómeno de interés','telerehabilitation','Telerehabilitation',true],['D','Diseño','interviews;focus groups','',false],['E','Evaluación: percepciones / experiencias','experience;perception;barriers','',false],['R','Tipo de investigación','qualitative;mixed methods','',false]]},
 PICo:{type:'Para comprender significados',description:'Población, fenómeno de interés y contexto. La «o» va en minúscula para que no la confundas con el desenlace de PICO.',example:'¿Cómo perciben las personas mayores el ejercicio en residencias?',fields:[['P','Población','older adults;elderly','Aged',true],['I','Fenómeno de interés','exercise;physical activity','Exercise',true],['Co','Contexto','nursing homes;residential care','Nursing Homes',false]]},
 CoCoPop:{type:'Para preguntar cuántos',description:'Condición, contexto y población. Te sirve cuando la pregunta es de frecuencia: prevalencia o incidencia.',example:'¿Cuál es la prevalencia de dolor lumbar en personal de enfermería hospitalario?',fields:[['Co','Condición','low back pain;lumbago','Low Back Pain',true],['Co2','Contexto','hospitals','Hospitals',false],['Pop','Población','nurses;nursing staff','Nurses',true]]}
};
const educationExamples = {
 PICO: {example:'En estudiantes universitarios, ¿el aprendizaje basado en problemas, frente a clases expositivas, mejora el pensamiento crítico?', terms:['university students;undergraduate students','problem based learning;problem-based learning','lectures;traditional teaching','critical thinking']},
 PICOT: {example:'En estudiantes de secundaria, ¿la evaluación formativa frente a la evaluación habitual mejora el aprendizaje de matemáticas durante un semestre?', terms:['secondary school students;high school students','formative assessment;assessment for learning','traditional assessment','mathematics achievement;mathematics learning','semester']},
 PEO: {example:'En estudiantes de secundaria, ¿la exposición al acoso escolar se asocia con absentismo?', terms:['secondary school students;high school students','bullying;school bullying','absenteeism;school attendance']},
 PECO: {example:'En estudiantes universitarios, ¿el empleo remunerado frente a no trabajar se asocia con abandono de los estudios?', terms:['university students;college students','student employment;paid work','nonworking students','dropout;student attrition']},
 PCC: {example:'¿Qué evidencia existe sobre inteligencia artificial generativa en la evaluación del aprendizaje en educación superior?', terms:['university students;university teachers','generative artificial intelligence;generative AI','higher education;universities']},
 SPIDER: {example:'¿Cómo experimentan los docentes de secundaria la inclusión educativa y qué barreras describen en entrevistas?', terms:['secondary school teachers;high school teachers','inclusive education;school inclusion','interviews;focus groups','experience;perception;barriers','qualitative;mixed methods']},
 PICo: {example:'¿Cómo viven los estudiantes de primera generación la transición a la universidad?', terms:['first generation students;first-generation students','transition;student experience','higher education;universities']},
 CoCoPop: {example:'¿Con qué frecuencia se presenta el absentismo en estudiantes de educación secundaria?', terms:['absenteeism;school absenteeism','secondary education;high schools','secondary school students;adolescents']}
};

// Las versiones educativas se calculan una sola vez y se reutilizan.
const frameworkCache = {};
function getFramework(key,domain){
 const f=frameworks[key];
 if(domain!=='education')return f;
 if(!frameworkCache[key]){
  const e=educationExamples[key];
  frameworkCache[key]={...f,example:e.example,fields:f.fields.map((row,i)=>[row[0],row[1],e.terms[i],'',row[4]])};
 }
 return frameworkCache[key];
}

/* ==========================================================================
   Constructor de cadenas (lógica pura, probada con check.cjs)
   ========================================================================== */
function terms(value){return [...new Set(value.split(/[;\n]+/).map(s=>s.trim()).filter(Boolean))];}
const FORBIDDEN_CHARS=/["()[\]{}:<>\\?*]/, OPERATORS=/\b(AND|OR|NOT)\b/;
function validateTerm(term){return !(FORBIDDEN_CHARS.test(term)||OPERATORS.test(term));}
function compile(blocks,engine){
 const errors=[],groups=[],pubmed=engine==='pubmed';
 for(const block of blocks){
  if(!block.include)continue;
  const free=terms(block.free),mesh=pubmed?terms(block.mesh):[];
  if(!free.length&&!mesh.length){errors.push(`Marcaste el bloque ${block.label}, pero todavía está vacío. Escribe al menos un término o desmárcalo.`);continue;}
  if(!free.every(validateTerm)||!mesh.every(validateTerm)){errors.push(`En ${block.label} hay algo que el constructor no necesita: escribe solo las palabras, sin comillas, paréntesis, AND/OR, etiquetas ni asteriscos. Eso lo pongo yo.`);continue;}
  const words=free.map(t=>(/\s/.test(t)?'"'+t+'"':t)+(pubmed?'[tiab]':''));
  for(const t of mesh)words.push('"'+t+'"[Mesh]');
  groups.push('('+words.join(' OR ')+')');
 }
 if(!groups.length&&!errors.length)errors.push('Para empezar, marca al menos un bloque y escribe sus términos.');
 let query=groups.join(' AND ');
 if(query&&engine==='scopus')query='TITLE-ABS-KEY('+query+')';
 if(query&&engine==='wos')query='TS=('+query+')';
 return {query:errors.length?'':query,errors};
}
if(typeof module!=='undefined')module.exports={compile,terms,frameworks,educationExamples,getFramework};

/* ==========================================================================
   Interfaz
   ========================================================================== */
if(typeof document!=='undefined'){
 const $=id=>document.getElementById(id);
 const el=(tag,props,...children)=>{const n=document.createElement(tag);if(props){const {dataset,...rest}=props;Object.assign(n,rest);if(dataset)Object.assign(n.dataset,dataset);}if(children.length)n.append(...children);return n;};
 const frameworkKeys=Object.keys(frameworks);

 // Marca un botón de un grupo como activo (aria-pressed).
 function press(group,attr,value){for(const b of group)b.setAttribute('aria-pressed',String(b.dataset[attr]===String(value)));}

 // Delegación: un solo listener por grupo de botones.
 function onGroup(selector,attr,handler){
  const buttons=document.querySelectorAll(selector);
  const parent=buttons[0]&&buttons[0].parentElement;
  if(!parent)return;
  parent.addEventListener('click',e=>{const b=e.target.closest(selector);if(b){press(buttons,attr,b.dataset[attr]);handler(b.dataset[attr]);}});
 }

 /* ----- 1. Tipos de fuente ----- */
 const recommendations={
  education:'Yo empezaría por ERIC: es la base de referencia en investigación educativa y tiene su propio tesauro. Si tu universidad tiene acceso, suma Education Source. Para no quedarte solo con lo publicado en inglés, revisa también Dialnet, Redalyc y SciELO. Y si el tema toca motivación o desarrollo, APA PsycInfo vale la pena.',
  clinical:'Arranca en PubMed/MEDLINE y, si buscas ensayos, pasa por CENTRAL. Antes de lanzarte, mira si ya existe una revisión Cochrane sobre tu pregunta: te puede ahorrar meses. Embase es muy buena, pero casi siempre requiere suscripción.',
  rehab:'En fisioterapia mi combinación base es PubMed más PEDro. PEDro tiene ensayos ya puntuados por calidad, pero usa su propio buscador, así que no le pegues una cadena de PubMed. Si el tema es de cuidados, agrega CINAHL.',
  regional:'Ve a BVS/LILACS y a SciELO, siempre como complemento de las bases internacionales. Busca en español, portugués e inglés, y apóyate en DeCS para encontrar los descriptores.',
  broad:'Para un tema que cruza disciplinas, combina una base del área con Scopus o Web of Science. Estas dos te dejan además seguir las citas hacia adelante y hacia atrás. Organiza la pregunta con PCC antes de buscar.',
  qual:'Si estás en educación, mira ERIC, Education Source y APA PsycInfo; en salud, CINAHL y PubMed. Formula la pregunta con PICo o SPIDER. Un consejo: no metas de entrada todos los filtros cualitativos, prueba primero cuántos estudios pierdes con ellos.'
 };
 const need=$('need');
 need.addEventListener('change',()=>{$('recommendation').textContent=recommendations[need.value];});
 $('recommendation').textContent=recommendations[need.value];

 const sourceInfo={
  database:['Base bibliográfica','Piensa en el fichero de una biblioteca: cada ficha tiene autores, resumen y temas, y puedes buscar por cualquiera de ellos.','Ejemplos: ERIC, MEDLINE','Ojo: muchas veces te lleva al artículo, pero no lo tiene completo. Y que un estudio esté indizado no quiere decir que sea bueno.'],
  search:['Buscador académico','Recorre la web académica y te trae documentos de muchas procedencias en una sola lista.','Ejemplo: Google Scholar','Muy útil para encontrar cosas y rastrear citas. El problema es que no sabes bien qué cubre ni por qué te ordena así los resultados.'],
  repository:['Repositorio','Es un archivo: guarda los documentos y te deja leerlos o descargarlos.','Ejemplos: PubMed Central, repositorios de universidades','Que un documento esté guardado ahí no significa que alguien haya revisado su método.'],
  publisher:['Plataforma editorial','Es la vitrina de una editorial: solo muestra lo que esa editorial publica.','Ejemplo: ScienceDirect','Si solo buscas aquí, te pierdes todo lo que publicaron las demás editoriales.']
 };
 function showSource(key){
  const [title,meaning,examples,limit]=sourceInfo[key];
  $('source-explanation').replaceChildren(el('h3',{textContent:title}),el('p',{textContent:meaning}),el('p',{className:'examples',textContent:examples}),el('p',{className:'limit',textContent:limit}));
 }
 onGroup('[data-source]','source',showSource);
 showSource('database');

 function quiz(selector,attr,feedbackId,correct,yes,no){
  const out=$(feedbackId);
  onGroup(selector,attr,value=>{const ok=value===correct;out.textContent=ok?yes:no;out.className=ok?'feedback-good':'feedback-retry';});
 }
 quiz('[data-source-answer]','sourceAnswer','source-feedback','search','Muy bien. Google Scholar es un buscador: no guarda los artículos ni los organiza en fichas propias, los encuentra en otros sitios y te los reúne.','Casi. Piensa en qué hace Google Scholar: ¿guarda los artículos o los va a buscar a otros lugares? Inténtalo de nuevo.');

 /* ----- 2. Cuartiles ----- */
 const grid=$('quartile-grid'),rankInput=$('journal-rank'),dots=[];
 const fragment=document.createDocumentFragment();
 for(let q=1;q<=4;q++){
  const row=el('div',{className:'journal-dots'});
  for(let i=(q-1)*5+1;i<=q*5;i++){const dot=el('span',{className:'journal-dot',textContent:i});dots.push(dot);row.append(dot);}
  fragment.append(el('div',{className:'quartile-group q'+q},el('b',{textContent:'Q'+q}),el('small',{textContent:((q-1)*25)+' a '+(q*25)+' %'}),row));
 }
 grid.append(fragment);
 const quartileBadge=el('span',{className:'quartile-badge'}),quartileText=el('p');
 $('quartile-result').append(quartileBadge,quartileText);
 const quartileNotes=['Está en el primer cuarto de la lista. Buena posición para la revista, pero todavía no sabes nada de los artículos que publica.','Segundo cuarto. Fíjate que bastan pocas posiciones para pasar de Q1 a Q2: la frontera es una línea arbitraria.','Tercer cuarto. Muchas revistas serias de áreas pequeñas o regionales viven aquí. Eso no las hace malas.','Último cuarto. No descartes un estudio solo por eso: evalúa el método, no la etiqueta de la revista.'];
 let selectedDot=null;
 function rank(){
  const n=Number(rankInput.value),q=Math.ceil(n/5);
  $('rank-label').textContent=n+' de 20';
  if(selectedDot)selectedDot.classList.remove('selected');
  selectedDot=dots[n-1];selectedDot.classList.add('selected');
  quartileBadge.textContent='Q'+q;quartileBadge.dataset.q=q;
  quartileText.textContent=`Posición ${n} de 20. ${quartileNotes[q-1]}`;
 }
 rankInput.addEventListener('input',rank);rank();

 quiz('[data-journal-answer]','journalAnswer','journal-feedback','no','Exacto. El cuartil habla de la revista; la calidad del estudio la tienes que revisar tú, artículo por artículo.','Esta es la trampa más común. Q1 dice dónde está la revista en un ranking, no si ese estudio en particular tiene sesgos. Vuelve a intentarlo.');

 /* ----- 3. Calidad metodológica ----- */
 const studies={
  trial:['Ensayo aleatorizado por aulas','Imagina que sorteas qué aulas reciben la estrategia nueva y cuáles siguen con la clase de siempre.',['Asignación|¿El sorteo fue de verdad al azar y nadie pudo adivinarlo?','Agrupación|Se sortearon aulas, no estudiantes. ¿El análisis lo tuvo en cuenta?','Seguimiento|¿Se perdieron más estudiantes en un grupo que en el otro?'],'Herramienta que te recomiendo: RoB 2, en su versión para ensayos por conglomerados.'],
  observation:['Estudio observacional','Aquí el investigador no decide quién recibe qué: solo observa y mide.',['Selección|¿Cómo llegaron los participantes al estudio?','Confusión|¿Se controlaron las diferencias que ya existían entre los grupos?','Medición|¿Los instrumentos miden lo que dicen medir?'],'Herramienta que te recomiendo: la lista JBI del diseño concreto. Y recuerda: asociación no es causalidad.'],
  qualitative:['Estudio cualitativo','Entrevistas a docentes para entender cómo viven la inclusión en su aula.',['Congruencia|¿El método encaja con lo que se quiere comprender?','Reflexividad|¿El investigador cuenta desde dónde mira?','Análisis|¿Las interpretaciones se apoyan en lo que dijeron los participantes?'],'Herramientas que te recomiendo: la lista JBI cualitativa o CASP.'],
  mixed:['Estudio de métodos mixtos','Combina notas de aprendizaje con entrevistas sobre la experiencia de los estudiantes.',['Parte cuantitativa|Evalúa su diseño y sus sesgos como si fuera un estudio aparte.','Parte cualitativa|Revisa el rigor y el contexto.','Integración|¿Los dos tipos de resultados se conversan o solo están pegados?'],'Herramienta que te recomiendo: MMAT. No olvides juzgar la integración, que es donde suelen fallar.']
 };
 function study(key){
  const [title,description,clues,tool]=studies[key];
  const list=el('div',{className:'study-clues'});
  for(const clue of clues){const [a,b]=clue.split('|');list.append(el('span',null,el('b',{textContent:a}),b));}
  $('study-result').replaceChildren(el('h3',{textContent:title}),el('p',{textContent:description}),list,el('p',{className:'tool',textContent:tool}));
 }
 onGroup('[data-study]','study',study);
 study('trial');

 /* ----- 4. Marcos de pregunta ----- */
 const domain=$('domain'),frameworkSelect=$('framework'),cardExamples=[];
 const cardsFragment=document.createDocumentFragment(),optionsFragment=document.createDocumentFragment();
 for(const key of frameworkKeys){
  const f=frameworks[key];
  optionsFragment.append(el('option',{value:key,textContent:key+' · '+f.type}));
  const pieces=el('div',{className:'acronym-pieces'});
  for(const field of f.fields)pieces.append(el('span',{textContent:field[0],title:field[1]}));
  const ex=el('p',{className:'example',textContent:getFramework(key,domain.value).example});
  cardExamples.push(ex);
  cardsFragment.append(el('article',null,el('h3',{textContent:key}),pieces,el('p',{className:'type',textContent:f.type}),el('p',{textContent:f.description}),ex,el('button',{type:'button',className:'secondary',textContent:'Trabajar con '+key,dataset:{use:key}})));
 }
 frameworkSelect.append(optionsFragment);
 $('framework-cards').append(cardsFragment);
 $('framework-cards').addEventListener('click',e=>{
  const b=e.target.closest('[data-use]');if(!b)return;
  frameworkSelect.value=b.dataset.use;render();
  $('constructor').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  frameworkSelect.focus({preventScroll:true});
 });

 /* ----- 5. Operadores ----- */
 const booleanLab=document.querySelector('.boolean-lab');
 const operators={
  OR:['OR suma. Trae lo que tenga A, lo que tenga B y lo que tenga ambos. Por eso lo usas para juntar sinónimos: quieres que no se te escape ninguna forma de nombrar lo mismo.','"university students" OR "college students"'],
  AND:['AND filtra. Solo deja lo que tiene A y B a la vez, la zona del medio. Lo usas para cruzar conceptos distintos de tu pregunta.','"university students" AND "formative assessment"']
 };
 function operator(op){
  booleanLab.classList.toggle('mode-and',op==='AND');
  $('operator-explanation').textContent=operators[op][0];
  $('operator-query').textContent=operators[op][1];
 }
 onGroup('[data-operator]','operator',operator);
 operator('OR');

 /* ----- 5b. Constructor ----- */
 const engineSelect=$('engine'),fieldsBox=$('fields'),output=$('output'),validation=$('validation'),copyButton=$('copy'),downloadButton=$('download'),pubmedLink=$('pubmed-link'),ericLink=$('eric-link'),copyStatus=$('copy-status');
 let inputs=[],meshFields=[];
 const current=()=>getFramework(frameworkSelect.value,domain.value);

 function render(){
  const f=current();
  $('question-example').textContent='Pregunta de ejemplo: '+f.example;
  const frag=document.createDocumentFragment();
  inputs=[];meshFields=[];
  f.fields.forEach(([key,label,,,include],i)=>{
   const check=el('input',{type:'checkbox',id:'include-'+i,checked:Boolean(include)});
   const grid=el('div',{className:'two'});
   const row={check};
   for(const [kind,text,placeholder] of [['free','Sinónimos en texto libre','Un término por línea o separados por ;'],['mesh','Descriptores MeSH (solo PubMed)','Cópialos tal cual del tesauro MeSH']]){
    const area=el('textarea',{id:kind+'-'+i,rows:2,placeholder});
    const box=el('div',kind==='mesh'?{className:'mesh-field'}:null,el('label',{htmlFor:area.id,textContent:text}),area);
    if(kind==='mesh')meshFields.push(box);
    row[kind]=area;grid.append(box);
   }
   inputs.push(row);
   frag.append(el('div',{className:'block'},el('label',{className:'include'},check,el('span',{className:'block-key',textContent:key}),label+': incluir en la cadena'),grid));
  });
  fieldsBox.replaceChildren(frag);
  update();
 }
 function readBlocks(){const f=current().fields;return inputs.map((r,i)=>({label:f[i][0],include:r.check.checked,free:r.free.value,mesh:r.mesh.value}));}

 function update(){
  const engine=engineSelect.value;
  for(const m of meshFields)m.hidden=engine!=='pubmed';
  const result=compile(readBlocks(),engine),q=result.query;
  output.value=q;
  validation.textContent=result.errors.join(' ');
  copyButton.disabled=downloadButton.disabled=!q;
  pubmedLink.hidden=engine!=='pubmed'||!q;
  ericLink.hidden=engine!=='generic'||!q;
  if(q){pubmedLink.href='https://pubmed.ncbi.nlm.nih.gov/?term='+encodeURIComponent(q);ericLink.href='https://eric.ed.gov/?q='+encodeURIComponent(q);}
  copyStatus.textContent='';
 }
 // Al escribir, recalculamos una vez por cuadro de animación y no en cada tecla.
 let pending=false;
 fieldsBox.addEventListener('input',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;update();});}});
 fieldsBox.addEventListener('change',e=>{if(e.target.type==='checkbox')update();});
 frameworkSelect.addEventListener('change',render);
 engineSelect.addEventListener('change',update);
 domain.addEventListener('change',()=>{
  render();
  frameworkKeys.forEach((key,i)=>{cardExamples[i].textContent=getFramework(key,domain.value).example;});
  $('research-question').value='';
 });
 $('example').addEventListener('click',()=>{
  const f=current();
  f.fields.forEach((row,i)=>{inputs[i].free.value=row[2];inputs[i].mesh.value=row[3];inputs[i].check.checked=Boolean(row[4]);});
  $('research-question').value=f.example;update();
 });
 $('clear').addEventListener('click',()=>{for(const r of inputs){r.free.value='';r.mesh.value='';}update();});
 copyButton.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(output.value);copyStatus.textContent='Listo, la cadena está copiada. Pégala en la base que elegiste.';}
  catch{output.focus();output.select();copyStatus.textContent='Tu navegador no me dejó copiar. Ya dejé la cadena seleccionada: usa Ctrl+C o ⌘C.';}
 });
 downloadButton.addEventListener('click',()=>{
  const hits=$('hits'),date=$('search-date');
  if(!hits.checkValidity()||!date.checkValidity()){hits.reportValidity();date.reportValidity();return;}
  const v=(id,empty)=>$(id).value||empty;
  const text=['FICHA DE BÚSQUEDA CIENTÍFICA','Pregunta: '+v('research-question','No registrada'),'Ámbito de ejemplos: '+domain.selectedOptions[0].textContent,'Estrategia: '+frameworkSelect.value,'Formato: '+engineSelect.selectedOptions[0].textContent,'Base/plataforma: '+v('database','No registrada'),'Fecha de ejecución: '+v('search-date','No registrada'),'Registros recuperados: '+v('hits','No registrado'),'Límites y notas: '+v('limits','No registrados'),'','CADENA (revísala y pruébala antes de usarla en tu trabajo)',output.value,'','BLOQUES DE LA PREGUNTA',...readBlocks().map(b=>`${b.label} [${b.include?'incluido':'no incluido'}]\nTexto libre: ${b.free}\nMeSH: ${b.mesh}`),'','Guarda también la exportación de resultados y la versión final de la cadena que ejecutaste.'].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a=el('a',{href:url,download:'ficha-busqueda.txt'});a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 render();

 /* ----- 6. Selección ----- */
 const explanations=[
  ['Identificar y documentar','Ya corriste la búsqueda en tus bases. Antes de leer nada, anota la cadena, la plataforma, la fecha y cuántos resultados salieron. Exporta todo a tu gestor de referencias. Si no lo anotas hoy, dentro de tres meses no vas a poder repetirlo.'],
  ['Depurar sin perder información','Un mismo artículo suele aparecer en varias bases. Compara DOI, título, autores y año antes de borrar, porque dos títulos parecidos pueden ser estudios distintos. Deja constancia de cuántos duplicados quitaste.'],
  ['Aplicar criterios, no preferencias','Primero lees títulos y resúmenes; los que pasen, los lees completos. La regla de oro: decides con los criterios que escribiste antes, no con lo que te parece interesante. Si es una revisión sistemática, que lo hagan dos personas por separado.'],
  ['Justificar la selección','Por cada artículo que excluyas a texto completo, anota una razón concreta. Si dos artículos son del mismo estudio, cuéntalos como uno. Y ahora sí, evalúa la calidad de lo que quedó con la herramienta adecuada.']
 ];
 function selection(index){
  const [title,text]=explanations[Number(index)];
  $('selection-explanation').replaceChildren(el('h3',{textContent:title}),el('p',{textContent:text}));
 }
 onGroup('[data-selection]','selection',selection);
 selection(0);

 const checklist=$('checklist'),checklistBox=checklist.closest('.checklist-box'),progressOut=$('progress'),checks=[];
 for(const text of ['Puedo explicar por qué elegí cada base de datos.','Escribí los criterios de inclusión y exclusión antes de cribar.','Probé que mi cadena encuentra estudios que ya conocía.','Guardé cadenas, plataformas, fechas, límites y número de registros.','Tengo un plan para duplicados, desacuerdos y razones de exclusión.','Elegí la herramienta de evaluación según el diseño de cada estudio.']){
  const input=el('input',{type:'checkbox'});checks.push(input);
  checklist.append(el('label',null,input,text));
 }
 function progress(){
  const n=checks.filter(c=>c.checked).length;
  progressOut.textContent=n===checks.length?'Las seis completas. Tu búsqueda está lista para contarse en un informe.':`Llevas ${n} de 6. Esta lista no se guarda: si recargas la página, empieza de cero.`;
  checklistBox.style.setProperty('--done',n/checks.length);
 }
 checklist.addEventListener('change',progress);progress();
}
