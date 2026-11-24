(function () {
"use strict";
var R = APP.registra;
var SI_NO = ["Affidabile", "Contiene un errore"];

/* ---------- 1. La richiesta perfetta ---------- */
R({ id: "palestra-prompt", titolo: "La richiesta perfetta", desc: "Impara a farti capire dall'IA in quattro mosse", uf: "ia", min: 15, passi: [
  { t: "info", h: "Le quattro mosse", html:
    "<p>Un assistente di intelligenza artificiale risponde bene solo se gli spieghi bene cosa vuoi. Una buona richiesta ha quattro pezzi:</p>" +
    "<ul><li><b>Ruolo</b>: chi deve essere l'IA. «Sei un formatore sulla sicurezza.»</li>" +
    "<li><b>Contesto</b>: chi sei tu e in che situazione. «Sono un apprendista al primo anno in un magazzino.»</li>" +
    "<li><b>Compito</b>: che cosa deve fare, in modo preciso. «Spiegami la differenza tra pericolo e rischio.»</li>" +
    "<li><b>Formato</b>: come vuoi la risposta. «In 5 righe, con un esempio.»</li></ul>" +
    "<p>Due avvertenze che valgono per tutta la giornata: l'IA può inventare con grande sicurezza, e tutto quello che scrivi finisce su un servizio esterno. Quindi verifica sempre e non scrivere dati veri di persone o aziende.</p>" },
  { t: "quiz", h: "Quale funziona meglio?", q: "Quale richiesta darà la risposta più utile?", dom: [
    { o: ["Sei un formatore sulla sicurezza. Sono apprendista in un'officina. Elencami i 5 DPI più comuni nel mio settore e a cosa serve ciascuno, in una tabella.", "Parlami dei DPI.", "DPI officina???", "Scrivi tutto quello che sai sulla sicurezza sul lavoro."], c: 0, s: "C'è tutto: ruolo, contesto, compito preciso e formato. Le altre lasciano all'IA il compito di indovinare." },
    { o: ["Riassumimi in 3 punti cosa deve fare un lavoratore quando suona l'allarme antincendio, con parole semplici.", "Allarme antincendio.", "Cosa pensi degli incendi?", "Dimmi qualcosa di interessante."], c: 0, s: "Compito chiaro e formato definito. Una parola sola non è una richiesta." },
    { q: "Vuoi un aiuto per rispondere a un cliente arrabbiato. Quale richiesta è scritta nel modo giusto?", o: ["Un cliente si lamenta di un ritardo nella consegna. Scrivimi una risposta cortese di 4 righe che si scusa e propone una soluzione.", "Il signor Mario Bianchi di via Roma 12 a Chivasso, cliente della ditta dove lavoro, si lamenta: ecco la sua mail completa con telefono e codice cliente.", "Rispondi tu al cliente al posto mio.", "Clienti arrabbiati: aiuto."], c: 0, s: "Descrive la situazione senza dati personali. Nomi, indirizzi, telefoni e documenti veri non vanno mai messi in una richiesta." },
    { q: "L'IA ti ha risposto citando un articolo di legge. Qual è la mossa giusta?", o: ["Chiedo da dove ha preso l'informazione e controllo sul testo ufficiale.", "Mi fido: se cita un articolo è sicuramente vero.", "Rifaccio la stessa domanda finché cambia risposta.", "La copio così com'è in un documento di lavoro."], c: 0, s: "L'IA può citare articoli sbagliati o inesistenti. La fonte ufficiale per le leggi italiane è Normattiva." },
    { q: "La prima risposta è troppo lunga e difficile. Che cosa fai?", o: ["Continuo la conversazione: «Più breve, con parole semplici e un esempio del mio lavoro.»", "Chiudo tutto: l'IA non serve.", "Ricopio la stessa richiesta uguale.", "Accetto la risposta anche se non l'ho capita."], c: 0, s: "Con l'IA si dialoga: la seconda e la terza richiesta sono spesso quelle che contano." }
  ] },
  { t: "ia", h: "Fatti interrogare", intro: "<p>Ora tocca a te. Scegli un argomento del corso e fatti fare cinque domande dall'IA.</p>",
    campi: [{ id: "lavoro", l: "Che lavoro fai? (in generale, senza il nome dell'azienda)", ph: "es. commessa in un negozio di abbigliamento" }, { id: "tema", l: "Su che argomento vuoi essere interrogato?", ph: "es. DPI, segnaletica, gestione dei conflitti, qualità" }],
    prompt: "Sei un formatore di un corso per apprendisti. Io lavoro come {lavoro}. Interrogami su questo argomento: {tema}. Fammi 3 domande, una alla volta, legate al mio lavoro, e aspetta la mia risposta prima di passare alla successiva. Dopo ogni mia risposta dimmi se è giusta e correggimi in due righe. Alla fine dimmi quante risposte giuste ho dato su 3.",
    consegna: "Quante giuste su 3? Scrivi anche una cosa su cui l'IA ti ha corretto." }
] });

/* ---------- 2. Caccia al rischio ---------- */
R({ id: "caccia-al-rischio", titolo: "Caccia al rischio", desc: "Quattro luoghi di lavoro, tanti pericoli nascosti nel racconto", uf: "sic", min: 20, passi: [
  { t: "info", h: "Le parole per dirlo", html:
    "<ul><li><b>Pericolo</b>: ciò che può causare un danno. Una macchia d'olio sul pavimento.</li>" +
    "<li><b>Rischio</b>: la probabilità che il danno avvenga davvero, e quanto sarebbe grave. Dipende da quante persone passano di lì e da come.</li>" +
    "<li><b>Danno</b>: la conseguenza. La caviglia rotta.</li>" +
    "<li><b>Prevenzione</b>: evito che accada. Asciugo e segnalo.</li>" +
    "<li><b>Protezione</b>: riduco le conseguenze se accade. Scarpe antiscivolo.</li></ul>" +
    "<p>Nelle prossime scene leggi il racconto e tocca le frasi in cui c'è un pericolo. Attenzione: alcune frasi descrivono comportamenti corretti.</p>" },
  { t: "caccia", h: "Trova i pericoli", scene: [
    { titolo: "Il magazzino", frasi: [
      { x: "Sono le 8 e Luca comincia il turno.", s: "Qui non succede ancora niente." },
      { x: "Indossa le scarpe antinfortunistiche, come ogni giorno.", s: "È il comportamento giusto: i DPI si usano sempre." },
      { x: "Per fare prima sale in piedi sulle forche del carrello elevatore e si fa alzare fino alla scatola in alto.", r: true, s: "Il carrello elevatore non è fatto per sollevare persone: rischio di caduta dall'alto." },
      { x: "Davanti all'uscita di emergenza qualcuno ha lasciato due bancali «solo per cinque minuti».", r: true, s: "Le vie di fuga e le uscite di emergenza devono restare sempre libere." },
      { x: "Il cartello con i numeri di emergenza è appeso vicino alla porta.", s: "Va benissimo: è dove deve stare." },
      { x: "A terra c'è una macchia d'olio: Luca la scavalca e prosegue, ci penserà qualcun altro.", r: true, s: "Rischio di scivolamento per chi arriva dopo. Va segnalata e pulita subito." },
      { x: "Solleva una cassa da 20 kg piegando la schiena e tenendo le gambe dritte.", r: true, s: "Movimentazione scorretta: si piegano le ginocchia, la schiena resta dritta e il carico vicino al corpo." },
      { x: "Lo scaffale in fondo è carico oltre la portata scritta sulla targhetta.", r: true, s: "Superare la portata può far cedere lo scaffale." }
    ] },
    { titolo: "L'ufficio", frasi: [
      { x: "Giulia accende il computer e regola la sedia alla sua altezza.", s: "Regolare la postazione è proprio quello che va fatto." },
      { x: "Sotto la scrivania una ciabatta è collegata a un'altra ciabatta, con sette spine attaccate.", r: true, s: "Sovraccarico elettrico: rischio di surriscaldamento e incendio." },
      { x: "Lo schermo è di fronte a lei, con la finestra di lato.", s: "Posizione corretta: niente riflessi e niente luce negli occhi." },
      { x: "Il cavo della stampante attraversa il corridoio, steso sul pavimento.", r: true, s: "Rischio di inciampo. I cavi vanno raccolti o protetti con una canalina." },
      { x: "Per prendere un faldone in alto sale sulla sedia con le rotelle.", r: true, s: "Rischio di caduta: serve uno sgabello o una scaletta stabile." },
      { x: "L'estintore è appeso al muro, ben visibile, con il suo cartello sopra.", s: "È in regola." },
      { x: "Resta davanti allo schermo quattro ore di fila senza mai staccare.", r: true, s: "Chi lavora al videoterminale ha diritto a una pausa di 15 minuti ogni 2 ore: serve a occhi e schiena." },
      { x: "Il cassetto in basso dell'armadio resta aperto in mezzo al passaggio.", r: true, s: "Rischio di urto e inciampo." }
    ] },
    { titolo: "La cucina del ristorante", frasi: [
      { x: "Marco arriva, si lava le mani e indossa la divisa pulita.", s: "Igiene corretta." },
      { x: "Il pavimento vicino al lavello è bagnato, ma nessuno asciuga né mette il cartello.", r: true, s: "Rischio di scivolamento: si asciuga subito o si segnala." },
      { x: "Affetta le verdure con un coltello ben affilato, sul tagliere fermo.", s: "Un coltello affilato e un tagliere stabile sono più sicuri di un coltello che non taglia." },
      { x: "Pulisce l'affettatrice senza staccare la spina, tanto è spenta.", r: true, s: "Prima di pulire una macchina si toglie sempre l'alimentazione." },
      { x: "Travasa lo sgrassatore in una bottiglietta d'acqua vuota, senza etichetta.", r: true, s: "Rischio chimico: i prodotti restano nel contenitore originale con la loro etichetta." },
      { x: "La pentola con l'olio bollente ha il manico che sporge dal bordo del piano cottura.", r: true, s: "Basta un urto per rovesciarla: rischio di ustione." },
      { x: "La cassetta di primo soccorso è al suo posto, completa.", s: "È in regola." },
      { x: "Usa lo stesso tagliere per il pollo crudo e per l'insalata.", r: true, s: "Contaminazione crociata: un rischio per l'igiene e per la salute dei clienti." }
    ] },
    { titolo: "L'officina", frasi: [
      { x: "Sara si avvicina al trapano a colonna con i capelli lunghi sciolti e una sciarpa al collo.", r: true, s: "Rischio di impigliamento negli organi in movimento: capelli raccolti, niente sciarpe o bracciali." },
      { x: "Prima di usare la mola indossa gli occhiali di protezione.", s: "Comportamento corretto." },
      { x: "La protezione della mola è stata tolta, perché «dà fastidio».", r: true, s: "I ripari delle macchine non si rimuovono mai." },
      { x: "Il compressore è molto rumoroso e Sara ci lavora accanto tutto il giorno senza cuffie né tappi.", r: true, s: "Il rumore danneggia l'udito in modo permanente: servono gli otoprotettori." },
      { x: "A fine lavoro gli attrezzi tornano sul pannello, ognuno al suo posto.", s: "Ordine e pulizia sono già prevenzione." },
      { x: "Un collega salda a pochi metri da un mucchio di stracci imbevuti di solvente.", r: true, s: "Scintille vicino a materiale infiammabile: rischio di incendio." },
      { x: "Il quadro elettrico è chiuso e segnalato dal cartello di pericolo.", s: "È in regola." },
      { x: "Sara avvisa il preposto che il cavo di una prolunga è spellato.", s: "Segnalare subito un pericolo è un dovere di ogni lavoratore, ed è quello che ha fatto." }
    ] }
  ] },
  { t: "ia", h: "E il tuo posto di lavoro?", intro: "<p>Descrivi il tuo posto di lavoro in modo generico e chiedi all'IA quali rischi vede. Poi confronta con quello che sai tu, che lì ci lavori davvero.</p>",
    campi: [{ id: "lavoro", l: "Che lavoro fai?", ph: "es. aiuto cuoco, magazziniere, impiegata" }, { id: "posto", l: "Com'è fatto il posto in cui lavori? (senza nomi)", ph: "es. cucina piccola con friggitrice, forno e cella frigorifera" }],
    prompt: "Sei un esperto di sicurezza sul lavoro. Lavoro come {lavoro}. Il mio posto di lavoro: {posto}. Elenca i 5 rischi più probabili per la mia sicurezza e la mia salute. Per ognuno scrivi una misura di prevenzione e una di protezione. Usa parole semplici e un elenco numerato.",
    consegna: "Scrivi 2 rischi che conoscevi già e 1 che l'IA ha sbagliato o che da te non c'è." }
] });

/* ---------- 3. Smaschera l'IA ---------- */
R({ id: "smaschera-ia", titolo: "Smaschera l'IA", desc: "Dodici risposte dell'IA sulla sicurezza: quali contengono un errore?", uf: "sic", min: 15, passi: [
  { t: "quiz", h: "Affidabile o sbagliata?", q: "Qualcuno ha fatto una domanda sulla sicurezza sul lavoro e l'IA ha risposto così. La risposta è affidabile o contiene un errore?", o: SI_NO, fine: "L'IA scrive bene anche quando sbaglia: per questo serve qualcuno che controlli.", dom: [
    { cit: "Il D.Lgs. 81 del 2008 è il Testo unico sulla salute e sicurezza sul lavoro.", c: 0, s: "È corretto: è la norma di riferimento in Italia." },
    { cit: "Il pericolo è la probabilità che si verifichi un danno. Il rischio è la caratteristica di una cosa di poter causare danni.", c: 1, s: "Le definizioni sono scambiate: il pericolo è ciò che può causare un danno, il rischio è la probabilità che accada." },
    { cit: "Il Responsabile del Servizio di Prevenzione e Protezione (RSPP) viene eletto dai lavoratori.", c: 1, s: "L'RSPP è designato dal datore di lavoro. Eletto o designato dai lavoratori è il Rappresentante dei Lavoratori per la Sicurezza (RLS)." },
    { cit: "I DPI si usano quando il rischio non può essere evitato o ridotto abbastanza con misure tecniche, organizzative o con protezioni collettive.", c: 0, s: "È corretto: prima vengono le misure collettive, poi i dispositivi individuali." },
    { cit: "Se un lavoratore non usa i DPI la responsabilità è solo del datore di lavoro: il lavoratore non può essere sanzionato.", c: 1, s: "Anche il lavoratore ha obblighi precisi, tra cui usare i DPI, e può essere sanzionato se non li rispetta." },
    { cit: "La valutazione dei rischi è un obbligo che il datore di lavoro non può delegare ad altri.", c: 0, s: "È corretto: è uno dei due obblighi non delegabili, insieme alla designazione dell'RSPP." },
    { cit: "La prevenzione riduce le conseguenze quando l'incidente è già avvenuto. La protezione invece evita che l'incidente accada.", c: 1, s: "È il contrario: la prevenzione evita l'evento, la protezione ne riduce le conseguenze." },
    { cit: "Il medico competente effettua la sorveglianza sanitaria dei lavoratori nei casi previsti dalla legge.", c: 0, s: "È corretto." },
    { cit: "In caso di pericolo grave e immediato il lavoratore deve restare al suo posto finché il datore di lavoro non lo autorizza ad allontanarsi.", c: 1, s: "Sbagliato: se il pericolo è grave, immediato e non evitabile, il lavoratore può allontanarsi senza subire conseguenze." },
    { cit: "Sul rispetto delle norme di sicurezza vigilano, tra gli altri, l'ASL e l'Ispettorato Nazionale del Lavoro.", c: 0, s: "È corretto. Per la prevenzione incendi vigilano anche i Vigili del Fuoco." },
    { cit: "I segnali di forma triangolare e colore giallo indicano un obbligo.", c: 1, s: "Il triangolo giallo è un avvertimento di pericolo. L'obbligo è rotondo e azzurro." },
    { cit: "La formazione sulla sicurezza si fa durante l'orario di lavoro e non può costare nulla al lavoratore.", c: 0, s: "È corretto." }
  ] },
  { t: "ia", h: "Ora mettila alla prova tu", intro: "<p>Fai all'IA una domanda sulla sicurezza nel tuo lavoro e chiedile l'articolo di legge. Poi controlla se quell'articolo dice davvero quello.</p>",
    campi: [{ id: "domanda", l: "La tua domanda", ph: "es. chi deve fornire i guanti da lavoro?" }],
    prompt: "Rispondi in 5 righe a questa domanda sulla sicurezza sul lavoro in Italia: {domanda} Indica l'articolo preciso del D.Lgs. 81/2008 su cui ti basi. Se non sei sicuro dell'articolo, dillo chiaramente invece di inventare.",
    link: { u: "https://www.normattiva.it/", t: "Apri Normattiva, il sito ufficiale delle leggi" },
    consegna: "Che articolo ha citato l'IA? L'hai trovato su Normattiva e diceva la stessa cosa?" }
] });

/* ---------- 4. Chi è chi ---------- */
R({ id: "chi-e-chi", titolo: "Chi è chi", desc: "Le figure della sicurezza: a chi tocca fare cosa", uf: "sic", min: 12, passi: [
  { t: "quiz", h: "A chi tocca?", q: "Tra le figure della sicurezza in azienda, di chi è questo compito?", o: ["Datore di lavoro", "RSPP", "RLS", "Medico competente", "Preposto", "Lavoratore"], dom: [
    { cit: "Valuta tutti i rischi ed elabora il Documento di Valutazione dei Rischi (DVR).", c: 0, s: "È un obbligo del datore di lavoro, che non può delegarlo." },
    { cit: "Rappresenta i lavoratori sui temi della sicurezza e può accedere ai luoghi di lavoro.", c: 2, s: "È il Rappresentante dei Lavoratori per la Sicurezza." },
    { cit: "Coordina il servizio che individua i rischi e propone le misure di prevenzione.", c: 1, s: "È il Responsabile del Servizio di Prevenzione e Protezione." },
    { cit: "Fa le visite mediche e dà il giudizio di idoneità alla mansione.", c: 3, s: "È il medico competente, attraverso la sorveglianza sanitaria." },
    { cit: "Sorveglia che i colleghi rispettino le regole e usino i DPI, e interviene se non lo fanno.", c: 4, s: "È il preposto: spesso il capo reparto o il capo squadra." },
    { cit: "Usa correttamente attrezzature e DPI e segnala subito i pericoli che nota.", c: 5, s: "Sono obblighi di ogni lavoratore, apprendisti compresi." },
    { cit: "Nomina il medico competente e designa l'RSPP.", c: 0, s: "Spetta al datore di lavoro." },
    { cit: "Viene consultato sulla valutazione dei rischi e riceve una formazione specifica per il suo ruolo.", c: 2, s: "È l'RLS." },
    { cit: "Fornisce ai lavoratori i DPI necessari, senza farglieli pagare.", c: 0, s: "I DPI li fornisce il datore di lavoro." },
    { cit: "Si sottopone ai controlli sanitari previsti.", c: 5, s: "È un obbligo del lavoratore." },
    { cit: "Se vede un comportamento pericoloso può interrompere temporaneamente l'attività e informa i superiori.", c: 4, s: "È un potere e un dovere del preposto." },
    { cit: "Visita periodicamente gli ambienti di lavoro e collabora alla valutazione dei rischi per la parte sanitaria.", c: 3, s: "È il medico competente." }
  ] },
  { t: "quiz", h: "Diritti, doveri e controlli", dom: [
    { q: "Quale di questi NON è un organo di vigilanza sulla sicurezza sul lavoro?", o: ["Camera di commercio", "ASL", "Ispettorato Nazionale del Lavoro", "Vigili del Fuoco"], c: 0, s: "ASL, Ispettorato e Vigili del Fuoco (per la prevenzione incendi) vigilano. La Camera di commercio no." },
    { q: "Un lavoratore toglie la protezione da una macchina per fare prima. Può essere sanzionato?", o: ["Sì: anche i lavoratori hanno obblighi e sanzioni", "No: risponde solo il datore di lavoro", "No: risponde solo il preposto", "Solo se qualcuno si fa male"], c: 0, s: "Rimuovere i dispositivi di sicurezza è vietato, e la legge prevede sanzioni anche per il lavoratore." },
    { q: "Chi ti assicura contro gli infortuni sul lavoro e le malattie professionali?", o: ["INAIL", "INPS", "ASL", "Il sindacato"], c: 0, s: "L'INAIL è l'istituto che assicura i lavoratori contro infortuni e malattie professionali." },
    { q: "La formazione generale sulla sicurezza, quella di 4 ore:", o: ["vale per sempre come credito formativo, anche se cambi azienda", "va rifatta ogni anno", "vale solo nell'azienda dove l'hai fatta", "è facoltativa"], c: 0, s: "La parte generale è un credito permanente. La parte specifica dipende invece dai rischi della mansione." },
    { q: "Noti una presa che fa scintille. Che cosa devi fare?", o: ["Avviso subito il preposto o il datore di lavoro", "La sistemo io con il nastro isolante", "Aspetto che se ne accorga qualcun altro", "La uso con più attenzione"], c: 0, s: "Segnalare subito è un tuo dovere. Riparare da solo un impianto, senza averne la competenza, è un rischio in più." }
  ] },
  { t: "ia", h: "Intervista impossibile", intro: "<p>Hai davanti un RSPP tutto per te. Fagli tre domande sulla sicurezza nel tuo settore.</p>",
    campi: [{ id: "settore", l: "In che settore lavori?", ph: "es. ristorazione, logistica, acconciatura, metalmeccanica" }],
    prompt: "Interpreta il Responsabile del Servizio di Prevenzione e Protezione (RSPP) di un'azienda del settore {settore}. Io sono un apprendista appena arrivato e ti faccio un'intervista. Rispondi in prima persona, con risposte di 3 o 4 righe ed esempi concreti del settore. Comincia presentandoti in due righe e poi aspetta la mia prima domanda.",
    consegna: "Scrivi la domanda migliore che hai fatto e, in breve, la risposta." }
] });

/* ---------- 5. Inventa il segnale ---------- */
var INK = "#1b1f25";
var SEG = {
  tri: "<svg viewBox='0 0 100 100' role='img' aria-label='Triangolo giallo con bordo nero'><path d='M50 8 L95 88 H5 Z' fill='#ffc400' stroke='" + INK + "' stroke-width='6' stroke-linejoin='round'/><rect x='46' y='36' width='8' height='28' fill='" + INK + "'/><circle cx='50' cy='75' r='5' fill='" + INK + "'/></svg>",
  blu: "<svg viewBox='0 0 100 100' role='img' aria-label='Cerchio azzurro con simbolo bianco'><circle cx='50' cy='50' r='44' fill='#0b5cad'/><rect x='45' y='22' width='10' height='38' fill='#fff'/><circle cx='50' cy='73' r='6' fill='#fff'/></svg>",
  div: "<svg viewBox='0 0 100 100' role='img' aria-label='Cerchio bianco con bordo rosso e barra diagonale'><circle cx='50' cy='50' r='40' fill='#fff' stroke='#c12a2a' stroke-width='10'/><line x1='22' y1='22' x2='78' y2='78' stroke='#c12a2a' stroke-width='10'/></svg>",
  ver: "<svg viewBox='0 0 100 100' role='img' aria-label='Quadrato verde con croce bianca'><rect x='6' y='6' width='88' height='88' rx='6' fill='#18794a'/><rect x='42' y='24' width='16' height='52' fill='#fff'/><rect x='24' y='42' width='52' height='16' fill='#fff'/></svg>",
  ros: "<svg viewBox='0 0 100 100' role='img' aria-label='Quadrato rosso con fiamma bianca'><rect x='6' y='6' width='88' height='88' rx='6' fill='#c12a2a'/><path d='M50 18 C60 36 73 44 69 62 C67 76 57 83 50 83 C40 83 29 75 31 60 C32 52 38 48 40 41 C44 47 46 50 49 50 C46 38 48 27 50 18 Z' fill='#fff'/></svg>"
};
var TIPI = ["Divieto", "Avvertimento", "Obbligo", "Salvataggio o soccorso", "Antincendio"];
R({ id: "inventa-il-segnale", titolo: "Inventa il segnale", desc: "Forme e colori dei cartelli, poi ne progetti uno nuovo", uf: "sic", min: 20, passi: [
  { t: "quiz", h: "Che segnale è?", q: "Guarda forma e colore: che tipo di segnale di sicurezza è?", o: TIPI.concat(["Informazione turistica"]), dom: [
    { svg: SEG.tri, c: 1, s: "Triangolo giallo con bordo nero: avverte di un pericolo." },
    { svg: SEG.blu, c: 2, s: "Cerchio azzurro con simbolo bianco: prescrive un comportamento obbligatorio." },
    { svg: SEG.div, c: 0, s: "Cerchio con bordo rosso e barra diagonale: vieta un comportamento." },
    { svg: SEG.ver, c: 3, s: "Verde con simbolo bianco: indica soccorso, uscite e percorsi di emergenza. La croce bianca è il pronto soccorso." },
    { svg: SEG.ros, c: 4, s: "Quadrato rosso con simbolo bianco: indica dove sono le attrezzature antincendio." }
  ] },
  { t: "quiz", h: "Leggi il cartello", q: "Che cosa significa questo cartello?", dom: [
    { q: "In reparto sono obbligatorie le cuffie antirumore. Che forma e colore avrà il cartello?", o: ["Rotondo azzurro", "Triangolare giallo", "Rotondo bianco con bordo rosso", "Quadrato verde"], c: 0, s: "L'obbligo è sempre rotondo e azzurro, con il simbolo bianco." },
    { cit: "Un cartello triangolare giallo con dentro un fulmine nero.", q: "Che cosa ti dice?", o: ["Attenzione: tensione elettrica pericolosa", "Vietato usare apparecchi elettrici", "Obbligo di staccare la corrente", "Qui c'è il quadro di emergenza"], c: 0, s: "È un avvertimento: lì c'è un pericolo elettrico." },
    { cit: "Un cartello rettangolare verde con una figura bianca che corre verso una porta.", q: "Che cosa indica?", o: ["Uscita di emergenza", "Vietato correre", "Obbligo di uscire a fine turno", "Spogliatoio"], c: 0, s: "Il verde indica le vie di salvataggio." },
    { q: "Di che colore sono i cartelli che indicano estintori e idranti?", o: ["Rosso", "Verde", "Azzurro", "Giallo"], c: 0, s: "Le attrezzature antincendio sono segnalate in rosso con simbolo bianco." },
    { cit: "Un cartello rotondo azzurro con dentro un casco bianco.", q: "Che cosa significa?", o: ["È obbligatorio indossare il casco", "Attenzione alla caduta di oggetti", "Vietato entrare con il casco", "Qui si ritirano i caschi"], c: 0, s: "Azzurro e rotondo: è un obbligo." },
    { cit: "Un cartello rotondo bianco con bordo rosso, barra diagonale e una fiamma nera.", q: "Che cosa significa?", o: ["Vietato usare fiamme libere", "Pericolo: materiale infiammabile", "Estintore", "Punto di raccolta"], c: 0, s: "La barra rossa vieta. Il pericolo di materiale infiammabile sarebbe un triangolo giallo." }
  ] },
  { t: "ia", h: "Il cartello che non esiste", intro: "<p>Ci sono rischi nuovi che non hanno ancora un cartello. Progettane uno con l'IA, rispettando le regole di forma e colore.</p>",
    campi: [{ id: "rischio", l: "Quale comportamento o rischio vuoi segnalare?", ph: "es. camminare in reparto guardando il telefono" }, { id: "tipo", l: "Che tipo di segnale? (divieto, avvertimento oppure obbligo)", ph: "es. divieto" }],
    prompt: "Aiutami a progettare un cartello di sicurezza per questo rischio: {rischio}. Deve essere un segnale di {tipo} e rispettare le regole della segnaletica di sicurezza (forma e colori corretti per quel tipo). Descrivi forma, colori e pittogramma in modo che si capisca senza parole, e proponi una frase di 5 parole al massimo da mettere sotto. Se sai creare immagini, disegnalo.",
    consegna: "Descrivi il tuo cartello: forma, colore, disegno e dove lo appenderesti." }
] });

/* ---------- 6. Emergenza! ---------- */
R({ id: "emergenza", titolo: "Emergenza!", desc: "Quattro situazioni in cui conta l'ordine delle mosse", uf: "sic", min: 15, passi: [
  { t: "ordina", h: "Prima questo, poi quello", casi: [
    { titolo: "Chiami il 112 per un collega che sta male", passi: ["Dici dove ti trovi: indirizzo preciso e nome dell'azienda", "Spieghi che cosa è successo e quante persone sono coinvolte", "Descrivi come sta: è cosciente? respira?", "Rispondi alle domande dell'operatore", "Riattacchi solo quando te lo dice l'operatore"], s: "La prima informazione è sempre il luogo: se cade la linea, i soccorsi sanno già dove andare." },
    { titolo: "Suona l'allarme antincendio", passi: ["Interrompi subito quello che stai facendo", "Lasci dove sono gli oggetti personali", "Segui la via di esodo, senza usare l'ascensore", "Raggiungi il punto di raccolta", "Aspetti l'appello e non rientri finché non viene autorizzato"], s: "Tornare indietro per il telefono o la giacca è l'errore che costa di più." },
    { titolo: "Un collega è rimasto attaccato a un cavo elettrico", passi: ["Non lo tocchi", "Stacchi la corrente dall'interruttore generale", "Fai chiamare il 112 e l'addetto al primo soccorso", "Controlli se è cosciente e se respira", "Se non respira, chi è formato inizia il massaggio cardiaco e usa il defibrillatore"], s: "Toccare una persona ancora sotto tensione significa restare folgorati in due." },
    { titolo: "Un collega si è tagliato e perde molto sangue", passi: ["Controlli che la zona sia sicura anche per te", "Chiedi a un collega di chiamare il 112 e l'addetto al primo soccorso", "Indossi i guanti della cassetta di primo soccorso", "Premi con forza sulla ferita con garze o un panno pulito", "Mantieni la pressione fino all'arrivo dei soccorsi, senza togliere le garze"], s: "Nella realtà chiamata e soccorso partono quasi insieme: per questo si chiede a un'altra persona di telefonare." }
  ] },
  { t: "quiz", h: "Che cosa fai?", q: "Sei la persona più vicina. Qual è la cosa giusta da fare?", dom: [
    { cit: "Un collega si scotta la mano con l'acqua bollente.", o: ["La tengo sotto l'acqua fresca corrente per almeno 10 minuti", "Metto ghiaccio direttamente sulla pelle", "Spalmo olio o dentifricio", "Buco le vesciche"], c: 0, s: "Acqua fresca corrente, a lungo. Ghiaccio, olio e dentifricio peggiorano la lesione." },
    { cit: "Uno schizzo di detergente finisce negli occhi di una collega.", o: ["Lavaggio abbondante con acqua per diversi minuti e poi controllo medico", "Le dico di strofinarsi bene gli occhi", "Aspetto per vedere se passa", "Metto un collirio qualsiasi"], c: 0, s: "Si lava subito e a lungo, tenendo le palpebre aperte, e si porta con sé l'etichetta o la scheda del prodotto." },
    { cit: "Un collega cade dalla scala e lamenta un forte dolore alla schiena.", o: ["Non lo sposto, chiamo il 112 e resto con lui", "Lo aiuto subito a rialzarsi", "Lo metto seduto su una sedia", "Gli do da bere"], c: 0, s: "Con un sospetto trauma alla schiena la persona non si muove, a meno che ci sia un pericolo immediato." },
    { cit: "Una collega cade a terra con una crisi convulsiva.", o: ["Allontano gli oggetti intorno, non la blocco e non le metto niente in bocca", "Le tengo ferme braccia e gambe", "Le metto qualcosa tra i denti", "Le do dell'acqua"], c: 0, s: "Si protegge la persona dagli urti e si aspetta che la crisi passi. Poi si chiamano i soccorsi." },
    { cit: "Un collega dice che gli gira la testa e sta per svenire.", o: ["Lo faccio sdraiare e gli sollevo le gambe", "Lo faccio camminare", "Gli do uno schiaffo per tenerlo sveglio", "Gli offro un caffè"], c: 0, s: "Da sdraiato, con le gambe sollevate, il sangue torna più facilmente alla testa." },
    { q: "Chi sono gli addetti al primo soccorso in azienda?", o: ["Lavoratori designati dal datore di lavoro e formati apposta", "Solo medici e infermieri", "Chiunque passi di lì", "I lavoratori più anziani"], c: 0, s: "Ogni azienda ha lavoratori designati e formati: informati su chi sono nella tua." }
  ] },
  { t: "modulo", h: "E da te?", intro: "Pensa al posto dove lavori.", campi: [
    { id: "raccolta", l: "Dov'è il punto di raccolta? Se non lo sai, scrivi a chi lo chiederai.", ph: "es. nel parcheggio davanti all'ingresso", righe: 2 },
    { id: "cassetta", l: "Dove sono la cassetta di primo soccorso e l'estintore più vicino a te?", ph: "es. cassetta in spogliatoio, estintore accanto alla porta", righe: 2 }
  ] }
] });

/* ---------- 7. Missione zero sprechi ---------- */
R({ id: "zero-sprechi", titolo: "Missione zero sprechi", desc: "Rifiuti, energia e inquinamento: le scelte di ogni giorno", uf: "sic", min: 12, passi: [
  { t: "quiz", h: "Dove lo butto?", q: "In azienda devi buttare questo rifiuto. In quale contenitore va?", o: ["Carta", "Plastica", "Vetro", "Organico", "Indifferenziato", "Raccolta dedicata o centro di raccolta"], fine: "Le regole di dettaglio cambiano da Comune a Comune: in caso di dubbio controlla quelle del tuo.", dom: [
    { cit: "Scatola di cartone di un imballaggio", c: 0, s: "Carta e cartone, schiacciata per occupare meno spazio." },
    { cit: "Pellicola di plastica che avvolgeva un bancale", c: 1, s: "È un imballaggio in plastica." },
    { cit: "Fondi di caffè della macchinetta", c: 3, s: "Vanno nell'organico." },
    { cit: "Cartuccia di toner esaurita", c: 5, s: "È un rifiuto speciale: si raccoglie a parte e si consegna a chi lo ritira." },
    { cit: "Scontrino della cassa", c: 4, s: "Gli scontrini sono di carta termica: non si riciclano con la carta." },
    { cit: "Barattolo di vetro vuoto", c: 2, s: "Vetro, senza il tappo." },
    { cit: "Pile scariche", c: 5, s: "Contengono metalli inquinanti: vanno negli appositi contenitori." },
    { cit: "Tazza di ceramica rotta", c: 4, s: "La ceramica non è vetro e rovina il riciclo: va nell'indifferenziato." },
    { cit: "Vecchio monitor che non funziona più", c: 5, s: "È un RAEE, un rifiuto elettrico ed elettronico: va al centro di raccolta." },
    { cit: "Olio usato della friggitrice", c: 5, s: "Mai nel lavandino: si raccoglie in contenitori e si consegna ai centri autorizzati." },
    { cit: "Bottiglia d'acqua di plastica vuota", c: 1, s: "Plastica, schiacciata." },
    { cit: "Mozzicone di sigaretta", c: 4, s: "Indifferenziato. Per terra inquina suolo e acqua per anni." }
  ] },
  { t: "quiz", h: "Energia e ambiente", dom: [
    { q: "Qual è l'ordine giusto, dalla scelta migliore in giù?", o: ["Ridurre, riusare, riciclare", "Riciclare, riusare, ridurre", "Riusare, riciclare, ridurre", "Riciclare, ridurre, riusare"], c: 0, s: "Il rifiuto migliore è quello che non si produce. Il riciclo viene dopo." },
    { q: "Computer, stampanti e schermi lasciati in stand-by durante la notte:", o: ["continuano a consumare energia", "non consumano nulla", "consumano solo se lo schermo è acceso", "si rovinano se vengono spenti"], c: 0, s: "Lo stand-by consuma poco per volta, ma per molte ore e su molti apparecchi." },
    { q: "Quale di questi è un inquinante dell'aria legato soprattutto a traffico e riscaldamento?", o: ["Polveri sottili (PM10)", "Ossigeno", "Vapore acqueo", "Azoto"], c: 0, s: "Le polveri sottili sono tra i principali inquinanti dell'aria nelle zone di pianura." },
    { q: "Che cos'è l'impronta di carbonio di un prodotto?", o: ["La quantità di gas serra emessa per produrlo, trasportarlo e smaltirlo", "Il peso del suo imballaggio", "La quantità di carbone che contiene", "Il costo dello smaltimento"], c: 0, s: "Misura quanto un prodotto o un'attività contribuisce al cambiamento climatico." },
    { q: "Quale lampadina consuma meno a parità di luce?", o: ["LED", "Alogena", "A incandescenza", "Consumano tutte uguale"], c: 0, s: "I LED consumano una frazione dell'energia delle vecchie lampadine e durano molto di più." },
    { q: "Devi far leggere un documento di 20 pagine a un collega. Qual è la scelta più sostenibile?", o: ["Lo invio in formato digitale", "Lo stampo a colori su un solo lato", "Lo stampo in due copie per sicurezza", "Lo stampo e poi lo fotocopio"], c: 0, s: "Si stampa solo quando serve, e in quel caso fronte e retro." }
  ] },
  { t: "ia", h: "Tre azioni per il tuo lavoro", intro: "<p>Chiedi all'IA dove si spreca di più in un lavoro come il tuo e che cosa puoi fare tu, non l'azienda.</p>",
    campi: [{ id: "lavoro", l: "Che lavoro fai?", ph: "es. barista, addetto alle consegne, impiegato" }],
    prompt: "Lavoro come {lavoro}. Indicami le 3 principali fonti di spreco (energia, acqua, materiali, rifiuti) tipiche del mio lavoro. Per ognuna proponi un'azione concreta che posso fare io personalmente, da domani, senza spese. Rispondi con un elenco numerato e parole semplici.",
    consegna: "Quale delle tre azioni puoi fare davvero da domani? Che cosa ti serve per farla?" }
] });
})();
