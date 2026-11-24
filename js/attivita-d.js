(function () {
"use strict";
var R = APP.registra;

/* ---------- Senza dirlo: emozioni e linguaggi diversi ---------- */
R({ id: "senza-dirlo", titolo: "Senza dirlo", desc: "Far capire uno stato d'animo o una regola senza dirli: tono, gesti, parole, canali diversi", uf: "com", min: 25, passi: [
  { t: "info", h: "Si comunica anche senza parole", html:
    "<p>Quando parliamo usiamo tre linguaggi insieme:</p>" +
    "<ul><li><b>Verbale</b>: le parole che scegli.</li>" +
    "<li><b>Paraverbale</b>: come le dici. Tono, volume, velocità, pause.</li>" +
    "<li><b>Non verbale</b>: il corpo. Sguardo, espressione, gesti, postura, distanza.</li></ul>" +
    "<p>Quando i linguaggi non vanno d'accordo, di solito si crede al corpo e al tono, non alle parole. «Tutto bene» detto a denti stretti non vuol dire che va tutto bene.</p>" +
    "<p>Anche il <b>canale</b> conta: la stessa cosa detta di persona, in un messaggio o su un cartello arriva in modo diverso.</p>" },
  { t: "quiz", h: "Leggi i segnali", dom: [
    { cit: "Un collega ti risponde a monosillabi, ha le braccia incrociate e guarda l'orologio mentre gli parli.", q: "Qual è lo stato d'animo più probabile?", o: ["Impazienza o fastidio", "Tristezza per un problema personale", "Concentrazione su un compito difficile", "Timidezza con chi conosce poco"], c: 0, s: "Braccia chiuse e sguardo all'orologio insieme segnalano che vorrebbe chiudere la conversazione. Un segnale da solo non basta: conta l'insieme." },
    { cit: "Una cliente parla a voce bassa, si scusa più volte e chiede due volte se sta disturbando.", q: "Qual è lo stato d'animo più probabile?", o: ["Disagio o imbarazzo", "Rabbia trattenuta per il servizio", "Sicurezza e voglia di comandare", "Fretta di finire e andarsene"], c: 0, s: "Voce bassa e scuse ripetute indicano che si sente fuori posto. Metterla a suo agio è il primo passo." },
    { cit: "Al cambio turno un collega scopre che il suo sabato libero è saltato e dice «Ah, bene.» con tono piatto, senza guardarti.", q: "Che cosa sta comunicando?", o: ["Delusione o irritazione", "Contentezza per la novità", "Indifferenza: non gli importa", "Sorpresa positiva"], c: 0, s: "Le parole dicono «bene», tono e sguardo dicono il contrario. È il paraverbale a portare il messaggio vero." },
    { q: "Quale di queste frasi fa capire che sei preoccupato senza usare la parola?", o: ["«Continuo a ricontrollare l'ordine: se lo rifiutano?»", "«Sono molto preoccupato per l'ordine del cliente.»", "«L'ordine è partito, adesso tocca al corriere.»", "«Ho finito l'ordine, vado in pausa e torno.»"], c: 0, s: "Il gesto ripetuto e la domanda sul rischio mostrano la preoccupazione. La seconda frase la nomina: funziona, ma non è quello che chiedeva la domanda." },
    { q: "Devi dire al responsabile che hai sbagliato un ordine importante. Qual è il canale più adatto per primo?", o: ["Di persona o al telefono, poi per scritto", "Un vocale lungo su WhatsApp a fine turno", "Una mail, aspettando che la legga", "Un biglietto lasciato sulla scrivania"], c: 0, s: "Le notizie delicate si danno a voce, così l'altro può fare domande. Lo scritto serve dopo, per lasciare traccia." },
    { cit: "Una collega ti dice «Tutto bene», ma ha gli occhi lucidi e la voce incrinata.", q: "Che cosa fai?", o: ["Le chiedo con calma se vuole parlarne", "Le credo: se dice così, va tutto bene", "Lo dico agli altri, così stanno attenti", "Insisto finché non mi dice cosa ha"], c: 0, s: "Notare il segnale e lasciarle la scelta di parlarne rispetta sia lei sia quello che hai visto." }
  ] },
  { t: "pesca", h: "Pesca la tua sfida", intro: "Pesca un'emozione e una situazione di lavoro. Poi dovrai scrivere un messaggio che la faccia capire senza mai nominarla.", urne: [
    { id: "emozione", l: "Emozione da far capire", voci: ["Frustrazione", "Orgoglio", "Preoccupazione", "Imbarazzo", "Entusiasmo", "Delusione", "Sollievo", "Gratitudine"] },
    { id: "situazione", l: "Situazione", voci: ["Hai finito per la prima volta un lavoro da solo", "Il tuo turno è stato cambiato all'ultimo momento", "Un cliente ha chiesto di te per nome", "Hai rotto un attrezzo costoso", "Il collega che ti aiutava cambia reparto", "Hai scoperto un errore che stava per arrivare al cliente", "Ti chiedono di fare una cosa che nessuno ti ha mai insegnato"] }
  ] },
  { t: "ia", h: "L'IA indovina?", intro: "<p>Scrivi a un collega un messaggio di 3 o 4 righe su quella situazione. Fai capire l'emozione che hai pescato senza mai scriverne il nome, né sinonimi evidenti. Poi chiedi all'IA di indovinarla.</p><p>Se la tua sfida è facile, rendila più difficile: niente emoji.</p>",
    campi: [{ id: "messaggio", l: "Il tuo messaggio al collega", ph: "es. Indovina chi ha chiuso il primo ordine da solo stamattina…", righe: 4 }],
    prompt: "Ho scritto questo messaggio a un collega di lavoro: «{messaggio}». Non ti dico quale emozione provo: indovinala. Rispondi con l'emozione più probabile, una seconda possibile, e le 2 o 3 parole o scelte del messaggio che te l'hanno fatta capire.",
    consegna: "Quale emozione avevi pescato? L'IA l'ha indovinata? Quali parole l'hanno aiutata o confusa?" },
  { t: "ia", h: "Una regola, tre linguaggi", intro: "<p>Ora fai il contrario: prendi una regola del tuo lavoro e falla dire in linguaggi diversi. Ogni linguaggio raggiunge persone diverse.</p>",
    campi: [{ id: "norma", l: "Una regola del tuo lavoro", ph: "es. usare i guanti quando si maneggia lo sgrassatore" }],
    prompt: "Prendi questa regola di lavoro: {norma}. Scrivila in tre modi diversi: 1) un cartello di 5 parole al massimo; 2) un messaggio WhatsApp amichevole a un collega appena arrivato, con una sola emoji; 3) una spiegazione a voce per un cliente curioso, in 3 frasi. Infine descrivi in due righe un gesto o un'immagine che la farebbe capire a chi non parla italiano.",
    consegna: "Quale delle versioni funziona meglio, e con chi? Riscrivine una con parole tue." }
] });

/* ---------- A chi mi rivolgo? ---------- */
var ENTI = ["Datore di lavoro o preposto", "RLS", "ASL (servizio SPreSAL)", "Ispettorato del Lavoro", "INAIL", "INPS", "Vigili del Fuoco", "Sindacato o patronato"];
R({ id: "a-chi-mi-rivolgo", titolo: "A chi mi rivolgo?", desc: "Organi di vigilanza, enti e rappresentanti: chi chiamare in ogni situazione", uf: "sic", min: 15, passi: [
  { t: "quiz", h: "Chi chiamo?", q: "A chi ti rivolgi?", o: ENTI, intro: "Per ogni situazione scegli la figura o l'ente giusto. Le opzioni sono sempre le stesse otto.", dom: [
    { cit: "Hai segnalato più volte al preposto e all'RLS una macchina senza protezioni, ma non cambia niente. Vuoi rivolgerti a un ente pubblico che controlla la sicurezza nei luoghi di lavoro.", c: 2, s: "Vigila l'ASL. In Piemonte il suo servizio si chiama SPreSAL: Prevenzione e Sicurezza negli Ambienti di Lavoro." },
    { cit: "Un amico lavora da mesi in un bar senza contratto e senza contributi.", c: 3, s: "L'Ispettorato del Lavoro controlla il lavoro irregolare, i contratti e gli orari." },
    { cit: "Ti sei fatto male al lavoro, anche poco. Chi avvisi subito?", c: 0, s: "Va avvisato subito, anche per un infortunio lieve: è il datore di lavoro che poi fa la denuncia all'INAIL." },
    { cit: "Quale ente assicura i lavoratori e indennizza infortuni e malattie professionali?", c: 4, s: "È l'INAIL. Per questo il datore di lavoro gli deve comunicare gli infortuni." },
    { cit: "Quale ente si occupa di pensioni, di indennità di disoccupazione e, per molti lavoratori, dell'indennità di malattia?", c: 5, s: "È l'INPS. Attenzione a non confonderlo con l'INAIL, che si occupa di infortuni sul lavoro." },
    { cit: "Vuoi un aiuto per capire la tua busta paga e se ti applicano il contratto collettivo giusto.", c: 7, s: "Sindacati e patronati assistono i lavoratori su buste paga, contratti e pratiche." },
    { cit: "Vuoi che una proposta dei colleghi sulla sicurezza arrivi al datore di lavoro attraverso chi rappresenta i lavoratori.", c: 1, s: "È il compito del Rappresentante dei Lavoratori per la Sicurezza." },
    { cit: "In un capannone le uscite di emergenza sono bloccate e gli estintori mancano da mesi. Quale ente è competente per la prevenzione incendi?", c: 6, s: "La prevenzione incendi è di competenza dei Vigili del Fuoco." },
    { cit: "Vedi un collega lavorare su un tetto senza imbracatura. Chi deve intervenire subito, dentro l'azienda?", c: 0, s: "Il preposto sovrintende al lavoro e deve fermare un comportamento pericoloso. Se non c'è, il datore di lavoro." }
  ] },
  { t: "ia", h: "Trova il contatto vero", intro: "<p>Chiedi all'IA il contatto del servizio SPreSAL che vale per il comune dove lavori. Poi cercalo sul sito ufficiale della tua ASL e confronta.</p><p>Indirizzi e numeri di telefono sono il tipo di dato che le IA sbagliano più spesso, con grande sicurezza.</p>",
    campi: [{ id: "comune", l: "In quale comune lavori?", ph: "es. Chivasso" }],
    prompt: "Qual è l'indirizzo e il numero di telefono del servizio SPreSAL (Prevenzione e Sicurezza negli Ambienti di Lavoro) dell'ASL competente per il comune di {comune}, in Piemonte? Indica anche il sito ufficiale da cui prendi l'informazione. Se non sei sicuro dei dati, dillo chiaramente.",
    consegna: "Che cosa ha risposto l'IA? Sul sito ufficiale dell'ASL i dati erano uguali, diversi, o non li hai trovati?" }
] });

/* ---------- Metti in crisi l'IA: invito a usarne due ---------- */
var crisi = APP.att["metti-in-crisi-ia"];
if (crisi) crisi.passi[0].html += "<p><b>Se hai due IA</b>, fai qualche prova con tutte e due: è il modo più veloce per vedere che non rispondono allo stesso modo, e risparmi i messaggi gratuiti di ciascuna.</p>";

/* ---------- Percorsi aggiornati ---------- */
APP.lezioni.forEach(function (l) {
  if (l.id === "chivasso-a") {
    l.percorso = ["palestra-prompt", "metti-in-crisi-ia", "caccia-al-rischio", "incidente-al-microscopio", "emergenza", "PAUSA", "cliente-difficile", "spiegalo-a-vale", "catena-cliente", "a-chi-mi-rivolgo", "sfida-finale"];
    l.extra = ["senza-dirlo", "regole-ia-al-lavoro", "inventa-il-segnale", "zero-sprechi"];
  } else if (l.id === "chivasso-b") {
    l.percorso = ["palestra-prompt", "metti-in-crisi-ia", "inventa-il-segnale", "fuga-dal-reparto", "senza-dirlo", "PAUSA", "primo-giorno-di-sam", "intervista-al-contrario", "il-mio-contratto", "regole-ia-al-lavoro", "sfida-finale"];
    l.extra = ["a-chi-mi-rivolgo", "batti-l-ia", "giusto-o-ingiusto", "smaschera-ia"];
  } else if (l.id === "cigliano") {
    l.percorso = ["palestra-prompt", "metti-in-crisi-ia", "fuga-dal-reparto", "emergenza", "giusto-o-ingiusto", "PAUSA", "batti-l-ia", "cliente-difficile", "intervista-al-contrario", "senza-dirlo", "sfida-finale"];
    l.extra = ["a-chi-mi-rivolgo", "spiegalo-a-vale", "incidente-al-microscopio", "campagna-60-minuti"];
  }
});

/* la sfida finale resta in fondo all'elenco */
var k = APP.ordine.indexOf("sfida-finale");
if (k >= 0) { APP.ordine.splice(k, 1); APP.ordine.push("sfida-finale"); }
})();
