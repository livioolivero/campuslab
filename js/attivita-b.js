(function () {
"use strict";
var R = APP.registra;

/* ---------- 8. Il cliente difficile ---------- */
R({ id: "cliente-difficile", titolo: "Il cliente difficile", desc: "L'IA fa la parte di chi ti mette in difficoltà: tu gestisci la conversazione", uf: "com", min: 25, passi: [
  { t: "info", h: "Gli attrezzi del mestiere", html:
    "<ul><li><b>Ascolto attivo</b>: lasci finire, senza interrompere e senza preparare la risposta mentre l'altro parla.</li>" +
    "<li><b>Riformulazione</b>: ripeti con parole tue. «Se ho capito bene, il problema è…»</li>" +
    "<li><b>Messaggio in prima persona</b>: parli di te, non accusi. «Io mi trovo in difficoltà quando…» invece di «Tu fai sempre…»</li>" +
    "<li><b>Domande aperte</b>: «Che cosa le servirebbe?» apre, «È colpa mia?» chiude.</li>" +
    "<li><b>Proposta concreta</b>: chiudi con che cosa farai e per quando.</li></ul>" +
    "<p>Tre stili possibili: <b>passivo</b> (subisco), <b>aggressivo</b> (attacco), <b>assertivo</b> (dico la mia rispettando l'altro).</p>" },
  { t: "quiz", h: "Che stile è?", dom: [
    { q: "Un cliente alza la voce per un ritardo. Quale risposta è assertiva?", o: ["«Capisco che il ritardo le crei un problema. Controllo subito a che punto è e le dico un orario preciso.»", "«Non è colpa mia, se la prenda con il magazzino.»", "«Ha ragione, scusi, scusi tanto, non so cosa dire.»", "«Se continua a gridare non la servo.»"], c: 0, s: "Riconosce il problema, resta calma e propone un'azione concreta." },
    { q: "Un collega ti passa per la terza volta un lavoro suo. Quale frase è un messaggio in prima persona?", o: ["«Quando mi arrivano lavori in più all'ultimo momento non riesco a finire i miei. Possiamo organizzarci diversamente?»", "«Tu scarichi sempre tutto su di me.»", "«Va bene, lo faccio io.»", "«Sei un approfittatore.»"], c: 0, s: "Descrive il fatto e l'effetto su di te, poi apre a una soluzione. Le frasi con «tu sempre» fanno scattare la difesa." },
    { q: "Tono, volume e ritmo della voce sono comunicazione:", o: ["paraverbale", "verbale", "non verbale", "scritta"], c: 0, s: "Verbale sono le parole, paraverbale è come le dici, non verbale è il corpo: sguardo, gesti, postura." },
    { q: "Il capo ti spiega un compito in fretta. Qual è la mossa migliore?", o: ["Riformulo: «Quindi prima preparo l'ordine e poi avviso il corriere, giusto?»", "Annuisco e poi chiedo a un collega", "Faccio come credo", "Gli dico che spiega male"], c: 0, s: "Riformulare costa dieci secondi e evita un errore." },
    { q: "In un conflitto tra colleghi, quale soluzione dura di più?", o: ["Quella in cui entrambi ottengono qualcosa di ciò che gli serve", "Quella in cui vince chi alza di più la voce", "Fare finta di niente", "Farsi dare ragione dal capo"], c: 0, s: "Evitare o imporsi rimanda il problema. Cercare un accordo che tenga conto dei bisogni di entrambi lo chiude." }
  ] },
  { t: "chat", h: "In scena", intro: "Scegli una situazione. L'IA resta nel personaggio finché non scrivi FINE, poi ti dice com'è andata.",
    scenari: [
      { titolo: "La cliente che reclama", breve: "Ha aspettato una settimana e l'ordine è sbagliato.", ruolo: "una cliente irritata", situazione: "La cliente ha ricevuto un ordine sbagliato dopo una settimana di attesa ed è venuta di persona a lamentarsi. L'apprendista non ha commesso l'errore, ma è la prima persona che lei incontra.", apertura: "Guardi, è una settimana che aspetto e mi arriva la cosa sbagliata. Ma voi come lavorate?" },
      { titolo: "Il capo sotto pressione", breve: "Ti rimprovera davanti a tutti per un ritardo.", ruolo: "un responsabile di reparto nervoso e sotto pressione", situazione: "Il responsabile rimprovera l'apprendista davanti ai colleghi per una consegna in ritardo. In realtà il materiale è arrivato tardi all'apprendista, ma il responsabile non lo sa.", apertura: "Doveva essere pronto un'ora fa. Possibile che ogni volta devo venire io a controllare?" },
      { titolo: "Il collega che scarica", breve: "Ti lascia il suo lavoro per la terza volta.", ruolo: "un collega simpatico ma furbo, più anziano dell'apprendista", situazione: "Il collega chiede per la terza volta in una settimana all'apprendista di finire un lavoro suo, con la scusa che deve uscire prima. L'apprendista ha già i suoi compiti da chiudere.", apertura: "Senti, tu che sei veloce: mi finisci tu queste due cose? Devo scappare, ti devo un caffè." },
      { titolo: "Il tutor deluso", breve: "Ti dice che il tuo lavoro non va bene.", ruolo: "un tutor aziendale esigente ma corretto", situazione: "Il tutor ha trovato diversi errori in un lavoro dell'apprendista e glielo comunica in modo secco. Vuole capire se l'apprendista sa riconoscere gli errori e come intende rimediare.", apertura: "Ho guardato il lavoro di ieri. Sinceramente mi aspettavo di più: ci sono tre errori che non dovevano esserci." }
    ],
    consegna: "Quanti SÌ su 5 ti ha dato l'IA? Sei d'accordo con tutti? Scrivi anche la frase che, a ripensarci, diresti in un altro modo." },
  { t: "modulo", h: "Guardati da fuori", intro: "Ripensa alla conversazione appena fatta.", campi: [
    { id: "tecniche", tipo: "spunte", l: "Prima di guardare il riscontro dell'IA: quali attrezzi pensi di aver usato davvero?", voci: ["Ho lasciato finire prima di rispondere", "Ho riformulato il problema con parole mie", "Ho parlato in prima persona, senza accusare", "Ho fatto almeno una domanda aperta", "Ho proposto una soluzione concreta con un tempo", "Sono rimasto calmo anche quando il tono è salito"] },
    { id: "vera", l: "Ti è mai capitata una situazione simile al lavoro? Che cosa faresti di diverso oggi?", ph: "Raccontala senza fare nomi", righe: 4 }
  ] }
] });

/* ---------- 9. Il primo giorno di Sam ---------- */
R({ id: "primo-giorno-di-sam", titolo: "Il primo giorno di Sam", desc: "Sam sei tu: dieci scelte, tre punteggi, una giornata di lavoro", uf: "tut", min: 15, passi: [
  { t: "info", h: "Come si gioca", html: "<p>Sei Sam, apprendista al primo giorno in un'azienda. Durante la giornata dovrai fare dieci scelte. Ognuna sposta tre punteggi: <b>sicurezza</b>, <b>relazioni</b> e <b>qualità</b>.</p><p>Non c'è tempo limite. Scegli quello che faresti davvero, non quello che pensi sia la risposta giusta: il risultato serve a te.</p>" },
  { t: "storia", h: "La giornata", indici: ["Sicurezza", "Relazioni", "Qualità"],
    consigli: ["Le regole di sicurezza funzionano solo se le applichi anche quando hai fretta o nessuno guarda.", "Chiedere, spiegarsi e prendere posizione con rispetto fa parte del lavoro quanto saperlo fare.", "La qualità si costruisce dichiarando gli errori e seguendo la procedura, non nascondendoli."],
    nodi: [
      { ora: "7:50", testo: "Il tutor ti consegna scarpe antinfortunistiche e guanti, poi viene chiamato al telefono. Le scarpe sono rigide e ti stringono.", scelte: [
        { x: "Le metto e appena torna gli dico che mi stringono.", d: [2, 1, 0], e: "I DPI si usano sempre. Se un DPI non è adatto a te, lo segnali: l'azienda deve fornirtene uno adeguato." },
        { x: "Le metto e sto zitto, mi abituerò.", d: [1, 0, 0], e: "Bene averle messe. Ma un DPI scomodo finisce per non essere usato: meglio dirlo." },
        { x: "Le tengo in mano, le metterò quando servono davvero.", d: [-2, 0, 0], e: "Gli infortuni non avvisano. In reparto i DPI previsti si indossano dal primo passo." }
      ] },
      { ora: "8:30", testo: "Marta, una collega, ti spiega la procedura di lavoro in gran fretta. Il terzo passaggio non l'hai capito.", scelte: [
        { x: "«Scusa, mi rispieghi il terzo passaggio? Te lo ripeto io per vedere se ho capito.»", d: [0, 2, 1], e: "Chiedere e riformulare è da professionisti, non da incapaci." },
        { x: "Faccio finta di aver capito, poi mi arrangio.", d: [0, -1, -2], e: "L'errore arriverà più tardi, e costerà più tempo della domanda." },
        { x: "Aspetto e chiederò a qualcun altro quando capita.", d: [0, 0, -1], e: "Nel frattempo lavori senza sapere cosa fare al terzo passaggio." }
      ] },
      { ora: "9:15", testo: "Passando in corridoio noti un carrello parcheggiato proprio davanti all'estintore.", scelte: [
        { x: "Sposto il carrello e lo dico al preposto.", d: [2, 1, 0], e: "Hai tolto il pericolo e hai fatto in modo che non si ripeta." },
        { x: "Sposto il carrello e proseguo.", d: [1, 0, 0], e: "Bene, ma domani il carrello sarà di nuovo lì: segnalare serve a questo." },
        { x: "Non è compito mio, sono qui da un'ora.", d: [-2, 0, 0], e: "Segnalare i pericoli è un dovere di ogni lavoratore, dal primo giorno." }
      ] },
      { ora: "10:40", testo: "Ricontrollando ti accorgi che un ordine preparato da te ha un'etichetta sbagliata. Nessuno l'ha visto.", scelte: [
        { x: "Lo correggo e compilo la scheda di segnalazione, come dice la procedura.", d: [0, 0, 2], e: "La segnalazione serve a capire perché è successo e a evitarlo a tutti." },
        { x: "Lo correggo senza dire niente.", d: [0, 0, 0], e: "Il cliente è salvo, ma la causa dell'errore resta lì ad aspettare il prossimo." },
        { x: "Lo lascio: se è grave lo noterà il controllo finale.", d: [0, -1, -2], e: "Hai passato il problema a chi viene dopo di te: il tuo cliente interno." }
      ] },
      { ora: "12:30", testo: "In pausa pranzo due colleghi fanno battute sull'accento di Amir, arrivato da poco come te. Lui abbassa gli occhi.", scelte: [
        { x: "«A me queste battute danno fastidio. Amir, tu da quanto sei qui?»", d: [0, 2, 0], e: "Hai detto la tua senza aggredire e hai riportato Amir dentro il gruppo." },
        { x: "Cambio argomento e più tardi chiedo ad Amir come va.", d: [0, 1, 0], e: "Meglio che niente: Amir sa di non essere solo. Le battute però continueranno." },
        { x: "Rido anch'io, per non espormi.", d: [0, -2, 0], e: "Per chi le subisce, le battute ripetute sono un peso vero. E chi ride le incoraggia." }
      ] },
      { ora: "14:00", testo: "Il capo reparto, nervoso, ti rimprovera davanti a tutti per un ritardo. Il materiale però ti è arrivato solo alle 11.", scelte: [
        { x: "«Capisco l'urgenza. Il materiale mi è arrivato alle 11: le mostro cosa manca e le dico per che ora finisco.»", d: [0, 2, 1], e: "Hai riconosciuto il suo problema, spiegato i fatti e proposto una soluzione." },
        { x: "Sto zitto e ci rimugino tutto il pomeriggio.", d: [0, -1, 0], e: "Lui resta convinto che sia colpa tua e tu resti arrabbiato." },
        { x: "«Non è colpa mia, se la prenda con chi mi ha dato il materiale in ritardo!»", d: [0, -2, 0], e: "Magari hai ragione nei fatti, ma con questo tono ti ascolterà meno." }
      ] },
      { ora: "15:10", testo: "Suona l'allarme antincendio. Il telefono è rimasto nell'armadietto, dall'altra parte del reparto.", scelte: [
        { x: "Esco con calma lungo la via di esodo fino al punto di raccolta.", d: [2, 0, 0], e: "Esatto. Il telefono si ricompra." },
        { x: "Corro a prendere il telefono, ci metto un attimo.", d: [-2, 0, 0], e: "È l'errore più comune e più pericoloso: si esce subito, senza recuperare nulla." },
        { x: "Aspetto di capire se è una prova.", d: [-2, 0, 0], e: "Ogni allarme va trattato come vero." }
      ] },
      { ora: "16:00", testo: "Il reparto che riceve il tuo lavoro ti chiede di consegnare subito, saltando il controllo previsto.", scelte: [
        { x: "Faccio il controllo, li avviso dell'orario realistico e chiedo cosa gli serve per primo.", d: [0, 1, 2], e: "Hai rispettato la procedura e ti sei occupato del bisogno del tuo cliente interno." },
        { x: "«Le regole sono regole.» E continuo con i miei tempi.", d: [0, -1, 1], e: "Giusto fare il controllo, ma il tuo cliente interno resta con il suo problema." },
        { x: "Salto il controllo: l'importante è non farli aspettare.", d: [0, 0, -2], e: "Se c'è un difetto, arriverà fino al cliente finale." }
      ] },
      { ora: "16:45", testo: "A fine turno restano un flacone di detergente quasi vuoto e degli stracci sporchi di prodotto.", scelte: [
        { x: "Chiedo dove vanno e uso i contenitori indicati.", d: [2, 0, 0], e: "I rifiuti con residui di prodotti chimici hanno contenitori dedicati." },
        { x: "Svuoto il flacone nel lavandino e butto tutto nell'indifferenziato.", d: [-2, 0, 0], e: "I prodotti chimici nello scarico inquinano l'acqua. Sicurezza vuol dire anche ambiente." },
        { x: "Li lascio lì, ci penserà il turno dopo.", d: [-1, -1, 0], e: "Il turno dopo troverà un pericolo e un lavoro in più." }
      ] },
      { ora: "17:00", testo: "Prima di uscire il tutor ti chiede: «Allora, com'è andata? Qualcosa da segnalare?»", scelte: [
        { x: "Racconto cosa ho imparato, l'errore dell'etichetta e una cosa che secondo me si può migliorare.", d: [0, 1, 2], e: "Così il tutor può aiutarti davvero, e tu hai già contribuito a migliorare qualcosa." },
        { x: "«Tutto bene, grazie.»", d: [0, 0, 0], e: "Occasione persa: il tutor è lì apposta." },
        { x: "Mi sfogo su Marta e sul capo reparto.", d: [0, -1, 0], e: "Parlare dei problemi va bene. Farlo come sfogo, il primo giorno, lascia una brutta impressione." }
      ] }
    ] },
  { t: "modulo", h: "Tra il dire e il fare", campi: [
    { id: "dura", l: "Quale di queste scelte, nella realtà, ti costerebbe di più? Perché?", ph: "es. dire a un collega più anziano che una battuta mi dà fastidio", righe: 4 }
  ] }
] });

/* ---------- 10. Il mio contratto ---------- */
R({ id: "il-mio-contratto", titolo: "Il mio contratto", desc: "Apprendistato, ferie, prova, CCNL: che cosa sai del tuo rapporto di lavoro", uf: "com", min: 20, passi: [
  { t: "quiz", h: "Lo sapevi?", dom: [
    { q: "L'apprendistato è un contratto:", o: ["a tempo indeterminato, pensato per la formazione e l'occupazione dei giovani", "a tempo determinato che scade sempre dopo tre anni", "di stage, senza stipendio", "di collaborazione autonoma"], c: 0, s: "Per legge è un contratto a tempo indeterminato, con un periodo dedicato alla formazione." },
    { q: "Quale documento descrive che cosa devi imparare durante l'apprendistato?", o: ["Il piano formativo individuale", "La busta paga", "Il DVR", "Il regolamento condominiale"], c: 0, s: "Il piano formativo individuale (PFI) fa parte del tuo contratto." },
    { q: "Chi ti segue in azienda durante l'apprendistato?", o: ["Il tutor o referente aziendale", "Il medico competente", "Il consulente del lavoro", "Nessuno: ti arrangi"], c: 0, s: "Ogni apprendista ha un tutor o referente aziendale." },
    { q: "Quante ferie retribuite ti spettano come minimo in un anno, per legge?", o: ["4 settimane", "2 settimane", "10 giorni", "Dipende solo dal datore di lavoro"], c: 0, s: "Il minimo di legge è 4 settimane. Il contratto collettivo può prevederne di più." },
    { q: "Dove trovi le regole su livelli, orario, retribuzione e periodo di prova del tuo settore?", o: ["Nel CCNL, il Contratto Collettivo Nazionale di Lavoro", "Nel Codice della strada", "Nel DVR", "Nel manuale della qualità"], c: 0, s: "Il CCNL applicato è indicato nella tua lettera di assunzione e in busta paga." },
    { q: "Finisce il periodo di apprendistato e né tu né l'azienda comunicate di voler chiudere. Che cosa succede?", o: ["Il rapporto prosegue come normale contratto a tempo indeterminato", "Il contratto finisce da solo", "Ricomincia un altro apprendistato", "Diventi lavoratore autonomo"], c: 0, s: "Se nessuno recede al termine del periodo formativo, il rapporto continua a tempo indeterminato." },
    { q: "Ti svegli con la febbre e non puoi andare al lavoro. Che cosa fai?", o: ["Avviso subito l'azienda e vado dal medico, che invia il certificato", "Resto a casa e spiego tutto quando torno", "Mando un messaggio a un collega e basta", "Porto il certificato dopo una settimana"], c: 0, s: "L'azienda va avvisata subito, nei modi previsti dal contratto. Il certificato lo trasmette il medico per via telematica." },
    { q: "Durante il periodo di prova:", o: ["sia tu sia l'azienda potete interrompere il rapporto senza preavviso", "non puoi essere pagato", "non hai diritto alle ferie maturate", "solo l'azienda può interrompere il rapporto"], c: 0, s: "La prova serve a entrambi per valutarsi. La durata la stabilisce il contratto collettivo." },
    { q: "Le ore di formazione previste dall'apprendistato, come questo corso:", o: ["fanno parte del contratto: frequentarle è un tuo dovere e l'azienda deve permettertelo", "sono facoltative", "si fanno solo se avanza tempo", "le decide l'apprendista"], c: 0, s: "La formazione è ciò che distingue l'apprendistato dagli altri contratti." },
    { q: "In busta paga, la differenza tra lordo e netto è fatta soprattutto da:", o: ["contributi previdenziali e imposte", "il costo della mensa", "le ferie non godute", "il premio di produzione"], c: 0, s: "I contributi servono per pensione e tutele, le imposte finanziano i servizi pubblici." }
  ] },
  { t: "ia", h: "Chiedilo al tuo CCNL", intro: "<p>Scegli una cosa che vorresti sapere sul tuo contratto e chiedila all'IA. Poi verifica: sui contratti l'IA sbaglia spesso, perché ogni settore ha regole diverse.</p><p><b>Non caricare la busta paga né il contratto.</b> Basta il nome del settore.</p>",
    campi: [{ id: "ccnl", l: "Qual è il tuo settore o il tuo contratto collettivo?", ph: "es. Commercio, Metalmeccanica artigianato, Turismo" }, { id: "domanda", l: "Che cosa vuoi sapere?", ph: "es. quanto dura il periodo di prova per un apprendista" }],
    prompt: "Sono un apprendista con contratto di apprendistato professionalizzante in Italia. Il mio contratto collettivo è: {ccnl}. Domanda: {domanda} Rispondi in 5 righe. Indica l'articolo del CCNL o della legge su cui ti basi. Se la risposta dipende dal livello, dalla data di rinnovo del contratto o da altri dettagli, dimmelo, e se non sei sicuro dillo chiaramente invece di inventare.",
    link: { u: "https://www.cnel.it/Archivio-Contratti", t: "Apri l'archivio dei contratti collettivi del CNEL" },
    consegna: "Che cosa ha risposto l'IA? Dove puoi verificarlo (CCNL, tutor, ufficio del personale)?" }
] });

/* ---------- 11. La catena del cliente interno ---------- */
R({ id: "catena-cliente", titolo: "La catena del cliente", desc: "Chi ti passa il lavoro, a chi lo passi, e come controlli il tuo", uf: "qua", min: 25, passi: [
  { t: "info", h: "Qualità in quattro idee", html:
    "<ul><li><b>Qualità</b> vuol dire fare ciò che il cliente si aspetta, ogni volta allo stesso modo.</li>" +
    "<li>Il <b>cliente esterno</b> è chi compra. Il <b>cliente interno</b> è il collega o il reparto che riceve il risultato del tuo lavoro.</li>" +
    "<li>Una <b>non conformità</b> è un requisito non rispettato: un pezzo fuori misura, un ordine incompleto, un dato sbagliato.</li>" +
    "<li>Il miglioramento segue un ciclo: <b>pianifico, faccio, verifico, correggo</b>. In inglese Plan, Do, Check, Act.</li></ul>" },
  { t: "quiz", h: "Parole della qualità", dom: [
    { q: "Lavori al banco e passi gli ordini alla cucina. La cucina per te è:", o: ["un cliente interno", "un cliente esterno", "un fornitore", "un concorrente"], c: 0, s: "Chi riceve il tuo lavoro dentro l'azienda è il tuo cliente interno." },
    { q: "Nel ciclo Plan, Do, Check, Act, la fase «Check» consiste nel:", o: ["verificare se i risultati corrispondono a quanto pianificato", "decidere gli obiettivi", "eseguire il lavoro", "pagare i fornitori"], c: 0, s: "Senza verifica non sai se quello che hai fatto ha funzionato." },
    { q: "A che cosa serve una procedura scritta?", o: ["A fare in modo che tutti svolgano il lavoro nello stesso modo corretto", "A rallentare il lavoro", "A controllare gli orari dei dipendenti", "A sostituire la formazione"], c: 0, s: "La procedura rende il risultato indipendente da chi è di turno." },
    { q: "Qual è la norma internazionale più diffusa per i sistemi di gestione della qualità?", o: ["ISO 9001", "D.Lgs. 81/2008", "HACCP", "ISO 14001"], c: 0, s: "La ISO 14001 riguarda l'ambiente, l'HACCP l'igiene degli alimenti, il D.Lgs. 81 la sicurezza." },
    { q: "Dopo una non conformità, l'azione correttiva serve a:", o: ["eliminare la causa, perché il problema non si ripeta", "trovare il colpevole", "sistemare solo quel pezzo", "avvisare il cliente"], c: 0, s: "Sistemare il singolo caso è il trattamento. L'azione correttiva lavora sulla causa." },
    { q: "Compili il modulo di controllo a fine lavorazione. A che cosa serve?", o: ["A lasciare una traccia di che cosa è stato fatto, da chi e con quale risultato", "A niente: è burocrazia", "A dimostrare che eri presente", "A calcolare lo stipendio"], c: 0, s: "Le registrazioni permettono di risalire all'origine di un problema e di dimostrare il lavoro fatto." }
  ] },
  { t: "modulo", h: "La tua catena", intro: "Disegna a parole il pezzo di catena in cui stai tu. Usa i ruoli, non i nomi delle persone.", campi: [
    { id: "prima", l: "Chi ti passa il lavoro, e che cosa ti passa?", ph: "es. l'ufficio ordini mi passa la lista dei prodotti da preparare", righe: 2 },
    { id: "dopo", l: "A chi lo passi tu?", ph: "es. al corriere, attraverso il collega delle spedizioni", righe: 2 },
    { id: "attese", l: "Che cosa si aspetta da te chi lo riceve?", ph: "es. colli completi, etichettati e pronti entro le 16", righe: 3 }
  ] },
  { t: "ia", h: "La tua lista di autocontrollo", intro: "<p>Fatti aiutare dall'IA a scrivere cinque controlli da fare sul tuo lavoro prima di passarlo avanti. Poi correggili: tu conosci il lavoro, l'IA no.</p>",
    campi: [{ id: "lavoro", l: "Che lavoro fai?", ph: "es. addetto alla preparazione degli ordini" }, { id: "attese", l: "Che cosa si aspetta chi riceve il tuo lavoro?", ph: "es. colli completi, etichettati e pronti entro le 16" }],
    prompt: "Lavoro come {lavoro}. Chi riceve il mio lavoro si aspetta questo: {attese}. Scrivimi una lista di autocontrollo di 5 punti da verificare prima di consegnare il lavoro. Ogni punto deve essere una domanda a cui rispondo sì o no, corta e concreta.",
    consegna: "Scrivi i tuoi 5 controlli definitivi, dopo averli corretti." },
  { t: "modulo", h: "Scheda di non conformità", intro: "Pensa a un errore capitato a te o a un collega (senza nomi). Se non te ne viene in mente nessuno, usa questo: il cliente ha ricevuto un prodotto diverso da quello ordinato.", campi: [
    { id: "fatto", l: "Che cosa è successo?", righe: 2 },
    { id: "requisito", l: "Quale requisito non è stato rispettato?", righe: 2 },
    { id: "causa", l: "Qual è la causa più probabile?", righe: 2 },
    { id: "subito", l: "Che cosa si fa subito per rimediare?", righe: 2 },
    { id: "correttiva", l: "Che cosa si cambia perché non succeda più?", righe: 2 }
  ] }
] });

/* ---------- 12. Giusto o ingiusto? ---------- */
R({ id: "giusto-o-ingiusto", titolo: "Giusto o ingiusto?", desc: "Dieci casi su pari opportunità, culture diverse, diritti e doveri", uf: "com", min: 15, passi: [
  { t: "quiz", h: "Tu che cosa ne dici?", dom: [
    { cit: "Un negozio pubblica questo annuncio di lavoro: «Cercasi commessa, massimo 25 anni».", q: "L'annuncio è regolare?", o: ["No: esclude per genere e per età", "Sì: l'azienda sceglie chi vuole", "Sì, se il negozio vende abbigliamento femminile", "Solo l'età è un problema"], c: 0, s: "La legge vieta di discriminare nell'accesso al lavoro per sesso, età e altri fattori personali." },
    { cit: "Durante un colloquio di lavoro chiedono a una candidata: «Ha intenzione di avere figli?»", q: "Come giudichi questa domanda?", o: ["È una domanda che non si può fare", "È una domanda normale", "È lecita solo per i contratti a tempo indeterminato", "È lecita se la chiede una donna"], c: 0, s: "Gravidanza, matrimonio e situazione familiare non possono essere criteri di selezione." },
    { cit: "Due colleghi hanno stesso lavoro, stesso livello e stessa anzianità. Lei viene pagata meno di lui.", q: "È regolare?", o: ["È vietato: a parità di lavoro spetta la stessa retribuzione", "È normale: dipende dalla trattativa", "È lecito se lei è d'accordo", "È lecito nelle piccole aziende"], c: 0, s: "La parità di retribuzione tra lavoratrici e lavoratori è scritta nella Costituzione e nella legge." },
    { cit: "Un collega fa spesso battute a sfondo sessuale a una collega, che gli ha chiesto di smettere.", q: "Di che cosa si tratta?", o: ["Sono molestie, e la legge le considera una forma di discriminazione", "È solo umorismo", "È un problema privato tra loro due", "Diventa un problema solo se lei si licenzia"], c: 0, s: "I comportamenti indesiderati che offendono la dignità di una persona sono molestie." },
    { q: "Un collega appena arrivato capisce poco l'italiano e annuisce durante le istruzioni di sicurezza. Che cosa è giusto fare?", o: ["Lo segnalo al preposto: la formazione sulla sicurezza deve essere comprensibile per chi la riceve", "Niente: ha fatto il corso come tutti", "Gli dico di guardare come faccio io", "Lo prendo in giro, così impara prima"], c: 0, s: "La legge chiede di verificare che i lavoratori stranieri comprendano la lingua usata nella formazione." },
    { cit: "Durante il Ramadan un collega chiede di spostare la pausa all'ora del tramonto.", q: "Qual è il modo giusto di gestire la richiesta?", o: ["Se ne parla con il responsabile: se il lavoro lo permette, è una soluzione di buon senso", "Va rifiutato: le pause sono uguali per tutti", "Deve prendersi le ferie", "Può decidere da solo quando fermarsi"], c: 0, s: "Organizzarsi tenendo conto delle esigenze di tutti, quando è possibile, migliora il lavoro del gruppo." },
    { q: "Un collega straniero non ti guarda mai negli occhi quando gli parli. Qual è la lettura più sensata?", o: ["Può essere un'abitudine culturale: in alcune culture è un segno di rispetto", "È sicuramente maleducato", "Ha qualcosa da nascondere", "Non gli interessa il lavoro"], c: 0, s: "Gli stessi gesti hanno significati diversi da una cultura all'altra. Prima di giudicare, meglio chiedere." },
    { q: "Quale articolo della Costituzione afferma che tutti i cittadini sono uguali davanti alla legge, senza distinzione di sesso, razza, lingua, religione, opinioni politiche e condizioni personali e sociali?", o: ["Articolo 3", "Articolo 1", "Articolo 32", "Articolo 48"], c: 0, s: "L'articolo 1 fonda la Repubblica sul lavoro, il 32 tutela la salute, il 48 riguarda il voto." },
    { q: "Quale di questi è un dovere scritto nella Costituzione?", o: ["Contribuire alle spese pubbliche in base alle proprie possibilità", "Avere un conto in banca", "Iscriversi a un sindacato", "Lavorare nel Comune in cui si è nati"], c: 0, s: "È l'articolo 53: le imposte finanziano scuola, sanità, strade e sicurezza." },
    { q: "Una lavoratrice comunica di essere incinta. L'azienda può licenziarla per questo?", o: ["No: il licenziamento è vietato dall'inizio della gravidanza fino al primo anno del bambino", "Sì, con un mese di preavviso", "Sì, se è in prova da meno di un anno", "Sì, nelle aziende piccole"], c: 0, s: "La tutela della maternità è una delle protezioni più forti del diritto del lavoro." }
  ] },
  { t: "ia", h: "Lavorare con il mondo", intro: "<p>Scegli un Paese: quello di un collega, di un cliente o uno che ti incuriosisce. Chiedi all'IA come cambiano le abitudini sul lavoro. E ricordati che sono tendenze generali, non regole che valgono per ogni persona.</p>",
    campi: [{ id: "paese", l: "Quale Paese?", ph: "es. Marocco, Romania, Cina, Germania" }],
    prompt: "Spiegami 4 differenze che si incontrano spesso tra Italia e {paese} nelle abitudini di lavoro: saluti, puntualità, modo di dire di no, rapporto con i superiori. Per ognuna dammi un esempio concreto e un consiglio per evitare malintesi. Chiudi ricordandomi in due righe perché queste sono generalizzazioni e non vanno applicate a ogni singola persona.",
    consegna: "Che cosa ti ha sorpreso? E perché non puoi darlo per scontato con ogni persona di quel Paese?" }
] });

/* ---------- 13. Campagna in 60 minuti ---------- */
R({ id: "campagna-60-minuti", titolo: "Campagna in 60 minuti", desc: "A squadre di 3 o 4: slogan, manifesto e video per cambiare un'abitudine", uf: "tut", min: 50, passi: [
  { t: "info", h: "La squadra", html:
    "<p>Si lavora in squadre da 3 o 4, con un telefono solo che tiene la traccia. Dividetevi i ruoli:</p>" +
    "<ul><li><b>Chi scrive</b> le richieste all'IA.</li><li><b>Chi verifica</b> che i contenuti siano corretti: una campagna con un errore sulla sicurezza fa danni.</li><li><b>Chi cura</b> immagine e parole.</li><li><b>Il portavoce</b>, che presenta la campagna in 2 minuti.</li></ul>" +
    "<p>Alla fine ogni squadra presenta e si vota su quattro criteri: chiarezza, correttezza, originalità, efficacia.</p>" },
  { t: "pesca", h: "La missione", intro: "Pescate tema, pubblico e formato. Se la combinazione non vi convince potete ripescare una volta sola.", urne: [
    { id: "tema", l: "Tema", voci: ["Usare sempre i DPI", "Tenere libere le vie di fuga", "Non usare il telefono mentre ci si muove in reparto", "Fare bene la raccolta differenziata in azienda", "Spegnere macchine e luci quando non servono", "Rispetto tra colleghi: basta battute pesanti", "Segnalare i quasi infortuni", "Sollevare i pesi nel modo giusto", "Dichiarare gli errori invece di nasconderli"] },
    { id: "pubblico", l: "Pubblico", voci: ["I nuovi assunti", "I colleghi esperti che «hanno sempre fatto così»", "Clienti e visitatori", "Tutta l'azienda, dal titolare all'ultimo arrivato"] },
    { id: "formato", l: "Formato", voci: ["Manifesto per la bacheca", "Video verticale di 30 secondi", "Messaggio per la chat aziendale", "Cartello da appendere sul posto"] }
  ] },
  { t: "ia", h: "Dieci slogan, ne resta uno", intro: "<p>Fatevi proporre dieci slogan e sceglietene uno. Se nessuno funziona, chiedetene altri spiegando che cosa non va.</p>",
    campi: [{ id: "tema", l: "Il vostro tema", ph: "quello pescato" }, { id: "pubblico", l: "Il vostro pubblico", ph: "quello pescato" }],
    prompt: "Sei un pubblicitario esperto di campagne sulla sicurezza e sul benessere al lavoro. Tema: {tema}. Pubblico: {pubblico}. Proponi 10 slogan di 6 parole al massimo, in italiano: 3 seri, 3 ironici, 2 che fanno una domanda, 2 che puntano sull'orgoglio di fare bene il proprio lavoro. Niente paternali e niente immagini di sangue.",
    consegna: "Lo slogan scelto, e perché funziona con il vostro pubblico." },
  { t: "ia", h: "Dallo slogan alla campagna", intro: "<p>Ora costruite il pezzo vero: manifesto, video, messaggio o cartello. Se il vostro assistente crea immagini, fategli fare una bozza.</p>",
    campi: [{ id: "slogan", l: "Lo slogan", ph: "quello che avete scelto" }, { id: "formato", l: "Il formato", ph: "quello pescato" }, { id: "pubblico", l: "Il pubblico", ph: "quello pescato" }],
    prompt: "Sviluppa una campagna di comunicazione aziendale. Slogan: «{slogan}». Formato: {formato}. Pubblico: {pubblico}. Descrivi in modo dettagliato che cosa si vede e che cosa si legge (se è un video: scena per scena, con la durata di ogni scena e il testo parlato). Aggiungi una frase finale che dica che cosa fare, in modo concreto. Se sai creare immagini, prepara anche una bozza.",
    consegna: "Descrivete la campagna finita in 4 o 5 righe, pronta da presentare." },
  { t: "modulo", h: "Prima di presentare", campi: [
    { id: "controllo", tipo: "spunte", l: "Controllo finale del verificatore", voci: ["Il messaggio si capisce in 5 secondi", "Non c'è nessun errore su regole e norme", "Non prende in giro nessuno", "Dice che cosa fare, non solo che cosa evitare"] },
    { id: "squadra", l: "Chi c'è in squadra? (solo i nomi di battesimo)", ph: "es. Sara, Luca, Amir", righe: 1 }
  ] }
] });

/* ---------- 14. Sfida finale ---------- */
R({ id: "sfida-finale", titolo: "Sfida finale", desc: "15 domande su tutto il modulo, 30 secondi l'una", uf: "tut", min: 10, passi: [
  { t: "info", h: "Regole della sfida", html: "<p>Quindici domande pescate a caso da tutto il modulo. Hai <b>30 secondi</b> per ciascuna: se il tempo scade, la domanda è persa.</p><p>Quando premi Avanti il tempo parte. Alla fine confronta il punteggio con gli altri: chi ne fa di più?</p>" },
  { t: "quiz", h: "Via!", pesca: 15, tempo: 30, fine: "Segna il punteggio: è nella tua tessera.", dom: [
    { q: "Il D.Lgs. 81/2008 riguarda:", o: ["la salute e la sicurezza sul lavoro", "la privacy", "i contratti di apprendistato", "la qualità dei prodotti"], c: 0, s: "È il Testo unico sulla sicurezza." },
    { q: "Il rischio è:", o: ["la probabilità che un pericolo causi un danno", "qualsiasi cosa che può fare male", "il danno già avvenuto", "una sanzione"], c: 0, s: "Pericolo è la fonte, rischio è la probabilità, danno è la conseguenza." },
    { q: "Togliere un pericolo all'origine è una misura di:", o: ["prevenzione", "protezione", "primo soccorso", "vigilanza"], c: 0, s: "La prevenzione evita che l'evento accada." },
    { q: "Quale di questi è un dispositivo di protezione collettiva?", o: ["Il parapetto", "Il casco", "I guanti", "Gli occhiali"], c: 0, s: "Il parapetto protegge chiunque passi. Casco, guanti e occhiali proteggono solo chi li indossa." },
    { q: "Chi elegge o designa l'RLS?", o: ["I lavoratori", "Il datore di lavoro", "L'ASL", "Il medico competente"], c: 0, s: "L'RLS rappresenta i lavoratori." },
    { q: "Chi elabora il Documento di Valutazione dei Rischi?", o: ["Il datore di lavoro", "Il preposto", "L'RLS", "L'INAIL"], c: 0, s: "È un obbligo non delegabile del datore di lavoro." },
    { q: "Chi sorveglia direttamente il lavoro dei colleghi e fa rispettare le regole di sicurezza?", o: ["Il preposto", "Il medico competente", "Il commercialista", "L'RLS"], c: 0, s: "Di solito è il capo reparto o il capo squadra." },
    { q: "Un cartello rotondo azzurro indica:", o: ["un obbligo", "un divieto", "un pericolo", "un'uscita"], c: 0, s: "Azzurro e rotondo: comportamento obbligatorio." },
    { q: "Un cartello triangolare giallo indica:", o: ["un avvertimento di pericolo", "un obbligo", "un divieto", "un'attrezzatura antincendio"], c: 0, s: "Giallo e triangolare: attenzione, pericolo." },
    { q: "Di che colore sono i cartelli delle uscite di emergenza?", o: ["Verde", "Rosso", "Azzurro", "Giallo"], c: 0, s: "Verde: salvataggio e soccorso." },
    { q: "Qual è il numero unico per le emergenze?", o: ["112", "117", "1500", "187"], c: 0, s: "Il 112 smista la chiamata a soccorso sanitario, Vigili del Fuoco e forze dell'ordine." },
    { q: "Prende fuoco un quadro elettrico. Che cosa NON devi usare?", o: ["L'acqua", "L'estintore a CO2", "L'estintore a polvere", "L'interruttore generale per togliere corrente"], c: 0, s: "L'acqua conduce la corrente: rischio di folgorazione." },
    { q: "Un collega è a contatto con un cavo in tensione. Qual è la prima cosa da fare?", o: ["Staccare la corrente, senza toccarlo", "Tirarlo via per un braccio", "Bagnargli il viso", "Fargli il massaggio cardiaco"], c: 0, s: "Prima si toglie la tensione, poi si soccorre." },
    { q: "Per una scottatura leggera la prima cosa da fare è:", o: ["acqua fresca corrente a lungo", "ghiaccio a contatto con la pelle", "olio o burro", "bucare le vesciche"], c: 0, s: "Solo acqua fresca, per almeno 10 minuti." },
    { q: "Tono e volume della voce sono comunicazione:", o: ["paraverbale", "verbale", "scritta", "formale"], c: 0, s: "È il come si dice, distinto dalle parole e dal corpo." },
    { q: "Ascolto attivo vuol dire soprattutto:", o: ["riformulare ciò che l'altro ha detto per verificare di aver capito", "annuire sempre", "rispondere in fretta", "parlare più dell'altro"], c: 0, s: "Riformulare mostra che hai ascoltato e corregge subito i malintesi." },
    { q: "Essere assertivi significa:", o: ["dire la propria opinione rispettando quella dell'altro", "avere sempre ragione", "non dire mai di no", "alzare la voce quando serve"], c: 0, s: "È la via di mezzo tra subire e aggredire." },
    { q: "Quale di queste è una frase in prima persona?", o: ["«Io faccio fatica quando le consegne cambiano all'ultimo.»", "«Tu cambi sempre idea.»", "«Qui nessuno si organizza.»", "«Dovreste avvisare prima.»"], c: 0, s: "Parla del fatto e di te, senza accusare." },
    { q: "Il cliente interno è:", o: ["il collega o il reparto che riceve il tuo lavoro", "un cliente che entra in negozio", "un parente del titolare", "un fornitore"], c: 0, s: "La qualità finale è la somma di tutti i passaggi interni." },
    { q: "Nel ciclo Plan, Do, Check, Act, che cosa viene dopo aver eseguito il lavoro?", o: ["Verificare i risultati", "Pianificare", "Consegnare", "Archiviare"], c: 0, s: "Do, poi Check." },
    { q: "La norma ISO 9001 riguarda:", o: ["la gestione della qualità", "la sicurezza sul lavoro", "la contabilità", "la privacy"], c: 0, s: "È lo standard internazionale più diffuso per la qualità." },
    { q: "Una non conformità è:", o: ["un requisito non rispettato", "una multa", "un reclamo sempre infondato", "un tipo di contratto"], c: 0, s: "Può riguardare un prodotto, un servizio o un processo." },
    { q: "Che cosa significa CCNL?", o: ["Contratto Collettivo Nazionale di Lavoro", "Codice Civile delle Norme sul Lavoro", "Centro di Controllo Nazionale del Lavoro", "Contratto di Collaborazione Non Limitata"], c: 0, s: "È l'accordo tra sindacati e associazioni dei datori di lavoro di un settore." },
    { q: "Il percorso formativo dell'apprendista è descritto:", o: ["nel piano formativo individuale", "nel DVR", "nella busta paga", "nel manuale della qualità"], c: 0, s: "Il PFI è parte del contratto di apprendistato." },
    { q: "Le ferie minime per legge in un anno sono:", o: ["4 settimane", "2 settimane", "1 settimana", "6 settimane"], c: 0, s: "Il contratto collettivo può aggiungerne." },
    { q: "Dove va buttato un toner esaurito?", o: ["Nella raccolta dedicata", "Nella plastica", "Nell'indifferenziato", "Nella carta"], c: 0, s: "È un rifiuto speciale." },
    { q: "Qual è la scelta migliore per l'ambiente?", o: ["Produrre meno rifiuti", "Riciclare tutto", "Bruciare i rifiuti", "Usare sacchi più grandi"], c: 0, s: "Prima ridurre, poi riusare, poi riciclare." },
    { q: "Un annuncio di lavoro «cercasi solo uomini» è:", o: ["vietato, perché discrimina", "lecito per i lavori pesanti", "lecito nelle piccole aziende", "lecito se pubblicato online"], c: 0, s: "La legge vieta le discriminazioni di genere nell'accesso al lavoro." },
    { q: "Chi assicura i lavoratori contro gli infortuni?", o: ["INAIL", "INPS", "ASL", "CNEL"], c: 0, s: "L'INPS si occupa di pensioni e altre prestazioni, l'INAIL di infortuni e malattie professionali." },
    { q: "Quante ore dura la formazione generale sulla sicurezza per i lavoratori?", o: ["4 ore", "1 ora", "16 ore", "40 ore"], c: 0, s: "Quattro ore, valide come credito permanente." },
    { q: "L'IA ti dà una risposta su una norma di sicurezza. Che cosa fai?", o: ["La verifico su una fonte ufficiale o con il preposto", "La applico subito", "La giro a tutti i colleghi", "La considero vera se è scritta bene"], c: 0, s: "L'IA può sbagliare con grande sicurezza." },
    { q: "Che cosa NON va mai scritto in una richiesta all'IA?", o: ["Dati personali di colleghi e clienti", "Il proprio settore di lavoro", "Il formato della risposta", "Il ruolo che deve interpretare"], c: 0, s: "Nomi, contatti e documenti veri restano fuori." }
  ] }
] });
})();
