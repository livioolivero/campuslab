(function () {
"use strict";
/* Fonti delle soluzioni, tutte in italiano. Tutti i collegamenti sono stati aperti e controllati il 24/11/2026.
   Dove esiste una fonte ufficiale (legge su Normattiva, ente pubblico) si usa quella;
   altrimenti la più affidabile disponibile. */
var N = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:";
var D81 = "decreto.legislativo:2008-04-09;81";
var F = {};
function n(k, urn, t) { F[k] = { t: t, u: N + urn }; }
[2, 13, 15, 17, 18, 19, 20, 25, 28, 37, 43, 44, 45, 46, 47, 50, 59, 64, 71, 74, 75, 77, 78, 80, 163, 168, 175, 193, 227].forEach(function (a) {
  n("d81_" + a, D81 + "~art" + a, "D.Lgs. 81/2008, art. " + a);
});
n("d81", D81, "D.Lgs. 81/2008 (Testo unico sicurezza)");
n("d151_54", "decreto.legislativo:2001-03-26;151~art54", "D.Lgs. 151/2001, art. 54 (maternità)");
n("d198_26", "decreto.legislativo:2006-04-11;198~art26", "Codice pari opportunità, art. 26");
n("d198_27", "decreto.legislativo:2006-04-11;198~art27", "Codice pari opportunità, art. 27");
n("d198_28", "decreto.legislativo:2006-04-11;198~art28", "Codice pari opportunità, art. 28");
n("d216_3", "decreto.legislativo:2003-07-09;216~art3", "D.Lgs. 216/2003, art. 3 (parità di trattamento)");
n("app41", "decreto.legislativo:2015-06-15;81~art41", "D.Lgs. 81/2015, art. 41 (apprendistato)");
n("app42", "decreto.legislativo:2015-06-15;81~art42", "D.Lgs. 81/2015, art. 42 (apprendistato)");
n("app44", "decreto.legislativo:2015-06-15;81~art44", "D.Lgs. 81/2015, art. 44 (apprendistato professionalizzante)");
n("d66_10", "decreto.legislativo:2003-04-08;66~art10", "D.Lgs. 66/2003, art. 10 (ferie)");
n("cc2096", "regio.decreto:1942-03-16;262:2~art2096", "Codice civile, art. 2096 (prova)");
n("cost3", "costituzione:1947-12-27~art3", "Costituzione, art. 3");
n("cost37", "costituzione:1947-12-27~art37", "Costituzione, art. 37");
n("cost39", "costituzione:1947-12-27~art39", "Costituzione, art. 39");
n("cost53", "costituzione:1947-12-27~art53", "Costituzione, art. 53");
n("d152_179", "decreto.legislativo:2006-04-03;152~art179", "Codice dell'ambiente, art. 179");
n("d152_232bis", "decreto.legislativo:2006-04-03;152~art232bis", "Codice dell'ambiente, art. 232-bis (mozziconi)");
n("l633_1", "legge:1941-04-22;633~art1", "Legge sul diritto d'autore, art. 1");
n("dpr1124_52", "decreto.del.presidente.della.repubblica:1965-06-30;1124~art52", "DPR 1124/1965, art. 52 (avviso di infortunio)");
n("l132_11", "legge:2025-09-23;132~art11", "Legge 132/2025 sull'IA, art. 11 (lavoro)");
function w(k, t, u) { F[k] = { t: t, u: u }; }
w("normattiva", "Normattiva, il portale ufficiale delle leggi", "https://www.normattiva.it/");
w("accordo25", "Ministero del Lavoro: Accordo Stato-Regioni 2025", "https://lavoro.gov.it/temi-e-priorita/salute-e-sicurezza/focus/pagine/accordo-stato-regioni-del-17042025-materia-di-formazione");
w("nue112", "Regione Piemonte: numero unico 112", "https://www.regione.piemonte.it/web/temi/sanita/accesso-ai-servizi-sanitari/numero-emergenza-unico-europeo-112");
w("spresal", "Regione Piemonte: gli SPreSAL delle ASL", "https://www.regione.piemonte.it/web/temi/sanita/sicurezza-sul-lavoro/servizi-prevenzione-sicurezza-negli-ambienti-lavoro-spresal-delle-asl");
w("infortuni", "Ministero del Lavoro: segnalazione di infortuni e mancati infortuni", "https://lavoro.gov.it/sportello-unico-digitale/salute-e-sicurezza-sul-luogo-di-lavoro/indicazioni-su-tempi-e-modalita-di");
w("inail_ps", "INAIL: manuale «Il primo soccorso nei luoghi di lavoro»", "https://www.inail.it/portale/it/inail-comunica/news/notizia.2018.10.primo-soccorso-nei-luoghi-di-lavoro-online-un-nuovo-manuale-inail.html");
w("inail", "INAIL", "https://www.inail.it/");
w("inps", "INPS", "https://www.inps.it/");
w("inps_malattia", "INPS: indennità di malattia", "https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.indennit--di-malattia-e-visite-mediche-di-controllo.html");
w("inl", "Ispettorato Nazionale del Lavoro", "https://www.ispettorato.gov.it/");
w("vvf", "Vigili del Fuoco: sicurezza sul lavoro", "https://www.vigilfuoco.it/servizi-le-aziende-e-i-professionisti/prevenzione-sicurezza-investigazioni/sicurezza-sul-lavoro/corpo-nazionale-dei-vigili-del-fuoco-e-la-sicurezza-sul-lavoro");
w("cnel", "CNEL: archivio dei contratti collettivi", "https://www.cnel.it/Archivio-Contratti");
w("garante_ia", "Garante privacy: intelligenza artificiale", "https://www.garanteprivacy.it/temi/intelligenza-artificiale");
w("iso9001", "Confederazione Svizzera, portale PMI: la norma ISO 9001 e il ciclo PDCA", "https://www.kmu.admin.ch/it/norma-di-gestione-della-qualita-secondo-iso-9001");
w("uni_nc", "UNI, Ente Italiano di Normazione: non conformità e azioni correttive (PDF)", "https://www.uni.com/wp-content/uploads/Corso_UNI_non_conformita_040322-1.pdf");
w("uni_doc", "UNI, Ente Italiano di Normazione: documenti e registrazioni nella ISO 9001 (PDF)", "https://www.uni.com/wp-content/uploads/Corso_UNI_9001_p.to_7_200422-1.pdf");
w("t_cliente", "Treccani: cliente", "https://www.treccani.it/vocabolario/cliente/");
w("epicentro", "Istituto Superiore di Sanità: verbale, non verbale e paraverbale (PDF)", "https://www.epicentro.iss.it/focus/flu_aviaria/pdf/DeMei8.pdf");
w("t_assertivo", "Treccani: assertivo", "https://www.treccani.it/vocabolario/assertivo/");
w("t_negoziazione", "Treccani: negoziazione", "https://www.treccani.it/vocabolario/negoziazione/");
w("t_intercultura", "Treccani: intercultura", "https://www.treccani.it/vocabolario/intercultura/");
w("prompt", "Anthropic: buone pratiche per scrivere le richieste all'IA", "https://platform.claude.com/docs/it/build-with-claude/prompt-engineering/claude-prompting-best-practices");
w("arpa_pm10", "ARPA Piemonte: le polveri sottili PM10 (PDF)", "https://old-static.arpa.piemonte.it/reporting/indicatore-della-settimana/archivio-indicatori/archivio-2016-1/PM10.pdf");
w("enea", "ENEA: efficienza energetica", "https://www.efficienzaenergetica.enea.it/");
w("comieco", "Comieco: riciclo di carta e cartone", "https://www.comieco.org/");
w("corepla", "Corepla: riciclo degli imballaggi in plastica", "https://www.corepla.it/");
w("coreve", "CoReVe: riciclo del vetro", "https://coreve.it/");
w("cic", "Consorzio Italiano Compostatori: rifiuto organico", "https://www.compost.it/");
w("raee", "Centro di Coordinamento RAEE", "https://www.cdcraee.it/");
w("batterie", "Centro di Coordinamento Batterie", "https://cdcbatterie.it/");
w("conoe", "CONOE: oli vegetali esausti", "https://www.conoe.it/");
APP.fonti = F;

/* Fonti per ogni domanda: [attività, passo, [fonti della domanda 0], [della 1], ...] */
var Q = [
  ["palestra-prompt", 1, ["prompt"], ["prompt"], ["prompt"], ["normattiva"], ["normattiva"], ["garante_ia"]],
  ["smaschera-ia", 0, ["d81"], ["d81_2"], ["d81_17", "d81_47"], ["d81_75"], ["d81_20", "d81_59"], ["d81_17"], ["d81_2"], ["d81_25"], ["d81_44"], ["d81_13"], ["d81_163"], ["d81_37"]],
  ["chi-e-chi", 0, ["d81_17"], ["d81_50"], ["d81_2"], ["d81_25"], ["d81_19"], ["d81_20"], ["d81_18"], ["d81_50"], ["d81_18"], ["d81_20"], ["d81_19"], ["d81_25"]],
  ["chi-e-chi", 1, ["d81_13"], ["d81_59"], ["inail"], ["accordo25"], ["d81_20"]],
  ["inventa-il-segnale", 0, ["d81_163"], ["d81_163"], ["d81_163"], ["d81_163"], ["d81_163"]],
  ["inventa-il-segnale", 1, ["d81_163"], ["d81_163"], ["d81_163"], ["d81_163"], ["d81_163"], ["d81_163"]],
  ["emergenza", 1, ["inail_ps"], ["inail_ps"], ["inail_ps"], ["inail_ps"], ["inail_ps"], ["d81_45"]],
  ["zero-sprechi", 0, ["comieco"], ["corepla"], ["cic"], ["d152_179"], ["comieco"], ["coreve"], ["batterie"], ["coreve"], ["raee"], ["conoe"], ["corepla"], ["d152_232bis"]],
  ["zero-sprechi", 1, ["d152_179"], ["enea"], ["arpa_pm10"], ["enea"], ["enea"], ["enea"]],
  ["cliente-difficile", 1, ["t_assertivo"], ["epicentro"], ["epicentro"], ["epicentro"], ["t_negoziazione"]],
  ["il-mio-contratto", 0, ["app41"], ["app42"], ["app42"], ["d66_10"], ["cnel"], ["app42"], ["inps_malattia"], ["cc2096"], ["app42", "app44"], ["cost53", "inps"]],
  ["catena-cliente", 1, null, ["iso9001"], ["uni_doc", "iso9001"], ["iso9001"], ["uni_nc"], ["uni_doc"]],
  ["giusto-o-ingiusto", 0, ["d198_27", "d216_3"], ["d198_27"], ["cost37", "d198_28"], ["d198_26"], ["d81_37"], ["t_intercultura"], ["t_intercultura"], ["cost3"], ["cost53"], ["d151_54"]],
  ["incidente-al-microscopio", 3, ["d81_2"], ["d81_15"], ["d81_75"], ["d81_19"], ["d81_20"], ["infortuni"], ["d81_15"]],
  ["regole-ia-al-lavoro", 0, ["garante_ia"], ["garante_ia"], ["d81_71"], ["l132_11"], ["garante_ia"], ["d81_227"], ["l132_11"], ["l633_1"]],
  ["senza-dirlo", 1, ["epicentro"], ["epicentro"], ["epicentro"], ["epicentro"], ["epicentro"], ["epicentro"]],
  ["a-chi-mi-rivolgo", 0, ["spresal", "d81_13"], ["inl"], ["dpr1124_52"], ["inail"], ["inps"], ["cost39"], ["d81_50"], ["vvf", "d81_46"], ["d81_19"]]
];
Q.forEach(function (r) {
  var a = APP.att[r[0]]; if (!a || !a.passi[r[1]] || !a.passi[r[1]].dom) return;
  var dom = a.passi[r[1]].dom;
  r.slice(2).forEach(function (f, k) { if (dom[k]) dom[k].f = f; });
});

/* Sequenze, scene e trappole */
function su(id, tipo, liste) { var a = APP.att[id]; if (!a) return; a.passi.forEach(function (p) { if (p.t === tipo) (p.casi || p.scene || p.prove).forEach(function (x, k) { if (liste[k]) x.f = liste[k]; }); }); }
su("emergenza", "ordina", [["nue112"], ["d81_43", "vvf"], ["inail_ps"], ["inail_ps"]]);
su("caccia-al-rischio", "caccia", [["d81_64", "d81_168"], ["d81_175", "d81_80"], ["d81_71"], ["d81_71", "d81_193"]]);
su("metti-in-crisi-ia", "prove", [["d81"], null, null, null, null, ["nue112"]]);

/* ---------- Sfida finale: argomenti e domande nuove ----------
   s = sicurezza (formazione specifica)  c = comunicazione  a = ambiente
   q = qualità  d = diritto del lavoro  i = intelligenza artificiale  g = formazione generale */
var sf = APP.att["sfida-finale"];
if (sf) {
  var quiz = sf.passi[1];
  var temi = "g g g s g g g s s s s s s s c c c c q q q q d d d a a d d g i i".split(" ");
  var fonti = [["d81"], ["d81_2"], ["d81_2"], ["d81_15"], ["d81_47"], ["d81_17"], ["d81_19"], ["d81_163"], ["d81_163"], ["d81_163"], ["nue112"], ["vvf"], ["inail_ps"], ["inail_ps"], ["epicentro"], ["epicentro"], ["t_assertivo"], ["epicentro"], null, ["iso9001"], ["iso9001"], ["uni_nc"], ["cnel"], ["app42"], ["d66_10"], ["d152_179"], ["d152_179"], ["d198_27"], ["inail"], ["accordo25"], ["normattiva"], ["garante_ia"]];
  quiz.dom.forEach(function (d, k) { d.t = temi[k]; d.f = fonti[k]; });
  [
    { t: "s", q: "Quando vanno usati i DPI?", o: ["Quando il rischio non si evita in altro modo", "Solo quando lo chiede il preposto", "Solo nei lavori più lunghi di un'ora", "Solo se il lavoratore li trova comodi"], s: "I DPI vengono dopo le misure tecniche, organizzative e collettive.", f: ["d81_75"] },
    { t: "s", q: "Per sollevare un carico pesante da terra:", o: ["piego le ginocchia, schiena dritta", "piego la schiena, gambe dritte", "sollevo di scatto per fare prima", "tengo il carico lontano dal corpo"], s: "Ginocchia piegate, schiena dritta e carico vicino al corpo.", f: ["d81_168"] },
    { t: "s", q: "Chi lavora al videoterminale ha diritto a:", o: ["15 minuti di pausa ogni 2 ore", "10 minuti di pausa ogni 4 ore", "una pausa solo a metà turno", "nessuna pausa particolare"], s: "Lo prevede la legge: 15 minuti ogni 120 di lavoro continuativo.", f: ["d81_175"] },
    { t: "c", q: "Devi dare al responsabile una notizia delicata. Il canale migliore per primo è:", o: ["di persona, poi per scritto", "un vocale lungo su WhatsApp", "una mail senza preavviso", "un biglietto sulla scrivania"], s: "A voce l'altro può fare domande; lo scritto serve dopo, come traccia.", f: ["epicentro"] },
    { t: "q", q: "Sistemare il pezzo difettoso è una correzione. Eliminare il motivo per cui è difettoso è:", o: ["un'azione correttiva", "un reclamo del cliente", "una registrazione", "un collaudo finale"], s: "L'azione correttiva lavora sulla causa, perché il problema non si ripeta.", f: ["uni_nc"] },
    { t: "q", q: "Il cliente esterno è:", o: ["chi compra il prodotto o il servizio", "il collega del reparto accanto", "il fornitore delle materie prime", "il responsabile della qualità"], s: "Il cliente interno è chi riceve il tuo lavoro dentro l'azienda.", f: ["t_cliente"] },
    { t: "q", q: "Moduli e check-list compilati servono soprattutto a:", o: ["dimostrare che cosa è stato fatto", "calcolare lo stipendio del mese", "sostituire la procedura scritta", "trovare chi punire per un errore"], s: "Le registrazioni permettono di risalire alle cause e di dimostrare il lavoro fatto.", f: ["uni_doc"] },
    { t: "q", q: "Una procedura scritta serve soprattutto a:", o: ["far lavorare tutti allo stesso modo", "controllare gli orari di entrata", "evitare di fare formazione", "dare ragione al responsabile"], s: "Rende il risultato indipendente da chi è di turno.", f: ["uni_doc", "iso9001"] },
    { t: "d", q: "L'apprendistato è un contratto a tempo:", o: ["indeterminato", "determinato di un anno", "determinato di tre anni", "parziale per legge"], s: "Lo dice la legge: è a tempo indeterminato, con un periodo di formazione.", f: ["app41"] },
    { t: "d", q: "Il periodo di prova serve a:", o: ["valutarsi a vicenda", "pagare meno il lavoratore", "rimandare i contributi", "rinviare la formazione"], s: "Sia l'azienda sia il lavoratore verificano se il rapporto funziona.", f: ["cc2096"] },
    { t: "d", q: "A parità di lavoro, una lavoratrice ha diritto:", o: ["alla stessa paga di un collega", "alla paga che decide il capo", "a un contratto di tipo diverso", "a meno ferie dei colleghi"], s: "La parità di retribuzione è scritta nella Costituzione.", f: ["cost37"] },
    { t: "d", q: "Chi controlla il lavoro nero e i contratti irregolari?", o: ["L'Ispettorato del Lavoro", "La Camera di commercio", "L'ufficio anagrafe del Comune", "Il medico competente"], s: "L'Ispettorato Nazionale del Lavoro vigila sui rapporti di lavoro.", f: ["inl"] },
    { t: "d", q: "Tutti sono uguali davanti alla legge: lo dice la Costituzione all'articolo", o: ["3", "1", "21", "48"], s: "L'articolo 3 vieta le distinzioni di sesso, razza, lingua, religione, opinioni e condizioni personali.", f: ["cost3"] },
    { t: "d", q: "Ti ammali e non puoi andare al lavoro. La prima cosa da fare è:", o: ["avvisare subito l'azienda", "aspettare il giorno dopo", "portare il certificato al rientro", "farti coprire da un collega"], s: "L'azienda va avvisata subito; il certificato lo trasmette il medico.", f: ["inps_malattia"] }
  ].forEach(function (d) { d.c = 0; quiz.dom.push(d); });
  quiz.temiLezione = true;
  sf.desc = "15 domande sugli argomenti della tua lezione, 30 secondi l'una";
  sf.passi[0].html = sf.passi[0].html.replace("da tutto il modulo", "tra gli argomenti della tua lezione");
}

/* ---------- Aree mostrate sulle schede (etichetta e colore) ---------- */
["il-mio-contratto", "giusto-o-ingiusto", "a-chi-mi-rivolgo"].forEach(function (id) { if (APP.att[id]) APP.att[id].uf = "dir"; });
if (APP.att["regole-ia-al-lavoro"]) APP.att["regole-ia-al-lavoro"].uf = "ia";

/* ---------- Percorsi delle tre lezioni ---------- */
var L1 = ["palestra-prompt", "metti-in-crisi-ia", "caccia-al-rischio", "emergenza", "inventa-il-segnale", "fuga-dal-reparto", "PAUSA", "cliente-difficile", "spiegalo-a-vale", "senza-dirlo", "sfida-finale"];
var X1 = ["incidente-al-microscopio", "zero-sprechi", "smaschera-ia", "primo-giorno-di-sam", "campagna-60-minuti"];
APP.lezioni = [
  { id: "chivasso-1", nome: "Chivasso · lezione 1", sede: "Chivasso", colore: "sic", segno: "1", argomenti: "Comunicazione e sicurezza (formazione specifica)", temi: ["s", "c", "a", "i"], percorso: L1.slice(), extra: X1.slice() },
  { id: "chivasso-2", nome: "Chivasso · lezione 2", sede: "Chivasso", colore: "com", segno: "2", argomenti: "Qualità e diritto del lavoro", temi: ["q", "d", "i"],
    percorso: ["palestra-prompt", "metti-in-crisi-ia", "catena-cliente", "batti-l-ia", "intervista-al-contrario", "PAUSA", "il-mio-contratto", "giusto-o-ingiusto", "a-chi-mi-rivolgo", "regole-ia-al-lavoro", "sfida-finale"],
    extra: ["incidente-al-microscopio", "primo-giorno-di-sam", "campagna-60-minuti"] },
  { id: "cigliano", nome: "Cigliano", sede: "Cigliano", colore: "ver", segno: "C", argomenti: "Comunicazione e sicurezza (formazione specifica)", temi: ["s", "c", "a", "i"], percorso: L1.slice(), extra: X1.slice() }
];
})();
