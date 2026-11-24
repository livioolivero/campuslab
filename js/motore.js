(function () {
"use strict";

var APP = window.APP = { att: {}, ordine: [], ia: null, link: "" };
APP.registra = function (a) { APP.att[a.id] = a; APP.ordine.push(a.id); };

APP.lezioni = [];
var UF = APP.aree = { sic: "Sicurezza", com: "Comunicazione", dir: "Diritti e lavoro", qua: "Qualità", ia: "Intelligenza artificiale", tut: "Ripasso" };

/* ---------- stato sul telefono ---------- */
var CHIAVE = "apprendistatoCL-v1";
var salvataggioOk = true;
try { localStorage.setItem("apprendistatoCL-prova", "1"); localStorage.removeItem("apprendistatoCL-prova"); } catch (e) { salvataggioOk = false; }
var S = { nome: "", lez: "", att: {} };
try { var grezzo = localStorage.getItem(CHIAVE); if (grezzo) { var letto = JSON.parse(grezzo); if (letto && typeof letto === "object") { S.nome = letto.nome || ""; S.lez = letto.lez || ""; S.att = letto.att || {}; } } } catch (e) {}
function salva() { try { localStorage.setItem(CHIAVE, JSON.stringify(S)); } catch (e) {} }
function st(id) { return S.att[id] || (S.att[id] = { passo: 0, fatto: false, punti: {}, note: {} }); }
function totale(id) { var s = S.att[id], p = 0, m = 0; if (s) for (var k in s.punti) { p += s.punti[k].p; m += s.punti[k].m; } return { p: p, m: m }; }

/* ---------- attrezzi ---------- */
function h(tag, attr) {
  var e = document.createElement(tag), k;
  if (attr) for (k in attr) {
    var v = attr[k];
    if (v === false || v == null) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, "");
    else e.setAttribute(k, v);
  }
  for (var i = 2; i < arguments.length; i++) metti(e, arguments[i]);
  return e;
}
function metti(e, f) {
  if (f == null || f === false) return;
  if (Array.isArray(f)) { f.forEach(function (x) { metti(e, x); }); return; }
  e.append(f.nodeType ? f : document.createTextNode(String(f)));
}
function mescola(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function verifica(f) {
  if (!f || !f.length || !APP.fonti) return null;
  var l = f.map(function (k) { return APP.fonti[k]; }).filter(Boolean);
  if (!l.length) return null;
  return h("p", { class: "fonti" }, "Verifica: ", l.map(function (x, n) { return [n ? " · " : "", h("a", { href: x.u, target: "_blank", rel: "noopener" }, x.t)]; }));
}
function esitoBox(si, titolo, testo, f) { return h("div", { class: "esito " + (si ? "si" : "no") }, h("b", null, titolo), testo || "", verifica(f)); }
var pulizie = [];
function pulisci() { pulizie.forEach(function (f) { try { f(); } catch (e) {} }); pulizie = []; }
var contatore = 0;
function nuovoId(p) { contatore++; return p + "-" + contatore; }

function copia(testo, bottone, avviso) {
  var vecchio = bottone.textContent;
  function fallita() { avviso.hidden = false; avviso.textContent = "Da qui non riesco a copiare: tieni premuto sul testo della richiesta, nel riquadro tratteggiato, e scegli Copia."; }
  try {
    navigator.clipboard.writeText(testo).then(function () {
      bottone.textContent = "Copiata ✓"; setTimeout(function () { bottone.textContent = vecchio; }, 1800);
    }, fallita);
  } catch (e) { fallita(); }
}
function assistenti() {
  return h("div", { class: "pila" },
    h("p", { class: "sotto" }, "Incollala nella tua IA: ",
      h("a", { href: "https://chatgpt.com/", target: "_blank", rel: "noopener" }, "ChatGPT"), " · ",
      h("a", { href: "https://gemini.google.com/", target: "_blank", rel: "noopener" }, "Gemini"), " · ",
      h("a", { href: "https://copilot.microsoft.com/", target: "_blank", rel: "noopener" }, "Copilot"), " · ",
      h("a", { href: "https://chat.mistral.ai/", target: "_blank", rel: "noopener" }, "Le Chat"), " · ",
      h("a", { href: "https://claude.ai/", target: "_blank", rel: "noopener" }, "Claude"),
      " · oppure Meta AI, il cerchio blu dentro WhatsApp, se ce l'hai."),
    h("p", { class: "sotto avviso-ia" }, "Se l'IA ti dice che hai finito i messaggi gratuiti, passa a un'altra: la richiesta funziona con tutte. Ricomincia incollandola da capo."));
}
function suggDetta() { return h("p", { class: "sotto" }, "Per scrivere meno puoi dettare: tocca il microfono della tastiera del telefono."); }
function campoTesto(ctx, chiave, etichetta, segnaposto, righe, alCambio) {
  var id = nuovoId("campo");
  var c = righe ? h("textarea", { id: id, placeholder: segnaposto || "", rows: righe }) : h("input", { id: id, type: "text", placeholder: segnaposto || "", autocomplete: "off" });
  c.value = ctx.nota(chiave) || "";
  c.addEventListener("input", function () { ctx.setNota(chiave, c.value); if (alCambio) alCambio(); });
  return { nodo: h("div", { class: "pila" }, h("label", { for: id }, etichetta), c), campo: c };
}

/* ---------- IA dentro la pagina, quando chi guarda ce l'ha ---------- */
/* nessuna IA dentro la pagina: ognuno usa il proprio assistente */
/* ---------- tipi di passo ---------- */
var PASSI = {};

PASSI.info = function (p, box, ctx) {
  box.append(h("div", { class: "info", html: p.html }));
  ctx.ok(0, 0);
};

PASSI.quiz = function (p, box, ctx) {
  function pesca() {
    var d = p.dom.slice(), lez = APP.lezioni.filter(function (l) { return l.id === S.lez; })[0];
    if (p.temiLezione && lez && lez.temi) { var f = d.filter(function (x) { return !x.t || lez.temi.indexOf(x.t) >= 0; }); if (f.length >= (p.pesca || 1)) d = f; }
    if (p.pesca) { mescola(d); d = d.slice(0, p.pesca); }
    return d;
  }
  var dom = pesca();
  var i = 0, giuste = 0, orologio = null;
  pulizie.push(function () { clearInterval(orologio); });
  function mostra() {
    clearInterval(orologio);
    box.replaceChildren();
    var d = dom[i], opz = d.o || p.o, risposto = false, scelto = -1;
    box.append(h("p", { class: "conta" }, "Domanda " + (i + 1) + " di " + dom.length));
    var barra = null;
    if (p.tempo) { barra = h("i"); box.append(h("div", { class: "tempo" }, barra)); }
    if (p.intro) box.append(h("p", { class: "sotto" }, p.intro));
    if (d.svg) box.append(h("div", { class: "segnale", html: d.svg }));
    if (d.cit) box.append(h("blockquote", { class: "cit" }, d.cit));
    box.append(h("p", { class: "dom" }, d.q || p.q));
    var ordine = opz.map(function (_, k) { return k; });
    if (!p.o) mescola(ordine);
    var lista = h("div", { class: "opz" + (p.o ? " griglia" : "") });
    var sotto = h("div", { class: "pila" });
    var conf = h("button", { type: "button", class: "btn primo largo conferma", disabled: true }, "Conferma la risposta");
    var bottoni = {};
    function scegli(k) {
      if (risposto) return; risposto = true; clearInterval(orologio);
      var si = k === d.c; if (si) giuste++;
      for (var x in bottoni) { bottoni[x].disabled = true; bottoni[x].classList.remove("presa"); }
      conf.hidden = true;
      bottoni[d.c].classList.add("giusta");
      if (k >= 0 && !si) bottoni[k].classList.add("sbagliata");
      sotto.append(esitoBox(si, si ? "Giusto." : (k < 0 ? "Tempo scaduto." : "Non è questa."), d.s || "", d.f));
      var ultimo = i === dom.length - 1;
      var av = h("button", { type: "button", class: "btn scuro largo" }, ultimo ? "Vedi il risultato" : "Prossima domanda");
      av.onclick = function () { if (ultimo) fine(); else { i++; mostra(); } };
      sotto.append(av);
      av.scrollIntoView({ block: "nearest" });
    }
    ordine.forEach(function (k) {
      var b = h("button", { type: "button", class: "op" }, opz[k]);
      b.onclick = function () {
        if (risposto) return; scelto = k;
        for (var x in bottoni) bottoni[x].classList.toggle("presa", bottoni[x] === b);
        conf.disabled = false;
      };
      bottoni[k] = b; lista.append(b);
    });
    conf.onclick = function () { if (scelto >= 0) scegli(scelto); };
    box.append(lista, conf, sotto);
    if (p.tempo) {
      var resta = p.tempo * 10;
      orologio = setInterval(function () {
        resta--; barra.style.width = Math.max(0, resta / (p.tempo * 10) * 100) + "%";
        if (resta <= 0) scegli(scelto);
      }, 100);
    }
  }
  function fine() {
    var tot = dom.length, bene = giuste >= Math.ceil(tot * 0.7);
    var esito = h("div", { class: "esito " + (bene ? "si" : "") }, h("b", null, "Risultato: " + giuste + " su " + tot),
      bene ? (p.fine || "Puoi andare avanti.") : "Puoi andare avanti lo stesso. Se vuoi migliorare il punteggio, riprova: le domande cambiano ordine.");
    var rifai = h("button", { type: "button", class: "btn piccolo" }, "Riprova il quiz");
    rifai.onclick = function () { dom = pesca(); if (!p.pesca) mescola(dom); i = 0; giuste = 0; ctx.attesa(); mostra(); };
    box.replaceChildren(esito, p.tempo ? null : rifai);
    ctx.ok(giuste, tot);
  }
  mostra();
};

PASSI.caccia = function (p, box, ctx) {
  var s = 0, presi = 0, tot = 0;
  p.scene.forEach(function (sc) { sc.frasi.forEach(function (f) { if (f.r) tot++; }); });
  function scena() {
    box.replaceChildren();
    var sc = p.scene[s], n = sc.frasi.filter(function (f) { return f.r; }).length, qui = 0, chiusa = false, sel = null;
    var conta = h("p", { class: "conta" });
    function agg() { conta.textContent = "Scena " + (s + 1) + " di " + p.scene.length + " · pericoli trovati " + qui + " di " + n; }
    var testo = h("div", { class: "racconto" });
    var msg = h("div", { class: "pila" });
    var piede = h("div", { class: "pila" });
    var conf = h("button", { type: "button", class: "btn primo largo conferma", disabled: true }, "Conferma: qui c'è un pericolo");
    function chiudi() {
      if (chiusa) return; chiusa = true;
      var ultimo = s === p.scene.length - 1;
      var av = h("button", { type: "button", class: "btn scuro largo" }, ultimo ? "Vedi il risultato" : "Prossima scena");
      av.onclick = function () { if (ultimo) fine(); else { s++; scena(); } };
      piede.replaceChildren(verifica(sc.f) || "", av);
    }
    sc.frasi.forEach(function (f) {
      var el = h("span", { class: "frase", role: "button", tabindex: "0" }, f.x);
      function tocca() {
        if (chiusa || el.dataset.usata) return;
        if (sel) sel.classList.remove("scelta");
        sel = sel === el ? null : el;
        if (sel) sel.classList.add("scelta");
        conf.disabled = !sel;
      }
      el.addEventListener("click", tocca);
      el.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); tocca(); } });
      el._f = f;
      testo.append(el, " ");
    });
    conf.onclick = function () {
      var el = sel; if (!el || chiusa) return;
      var f = el._f; el.classList.remove("scelta"); el.dataset.usata = "1"; sel = null; conf.disabled = true;
      if (f.r) { el.classList.add("giusta"); qui++; presi++; msg.replaceChildren(esitoBox(true, "Pericolo trovato.", f.s)); }
      else { el.classList.add("sbagliata"); msg.replaceChildren(esitoBox(false, "Qui non c'è un pericolo.", f.s || "Questo comportamento è corretto.")); }
      agg(); if (qui === n) chiudi();
    };
    var resa = h("button", { type: "button", class: "btn piccolo" }, "Mostra quelli che mancano");
    resa.onclick = function () {
      var mancanti = [];
      testo.querySelectorAll(".frase").forEach(function (el) { el.classList.remove("scelta"); if (el._f.r && !el.dataset.usata) { el.classList.add("giusta"); el.dataset.usata = "1"; mancanti.push(el._f.s); } });
      msg.replaceChildren(h("div", { class: "esito" }, h("b", null, "Ti erano sfuggiti:"), h("ul", null, mancanti.map(function (m) { return h("li", null, m); }))));
      chiudi();
    };
    piede.append(conf, resa);
    agg();
    box.append(h("h3", null, sc.titolo), conta, h("p", { class: "sotto" }, "Tocca una frase che nasconde un pericolo, poi conferma. Se hai toccato quella sbagliata, toccane un'altra prima di confermare."), testo, msg, piede);
  }
  function fine() {
    box.replaceChildren(h("div", { class: "esito si" }, h("b", null, "Hai trovato da solo " + presi + " pericoli su " + tot + "."), "Nella realtà nessuno te li evidenzia: l'abitudine a guardare si allena così."));
    ctx.ok(presi, tot);
  }
  scena();
};

PASSI.ordina = function (p, box, ctx) {
  var c = 0, punti = 0;
  function caso() {
    box.replaceChildren();
    var ca = p.casi[c], seq = [], tentativi = 0, chiuso = false;
    var lista = h("div", { class: "opz" }), sotto = h("div", { class: "pila" });
    var conf = h("button", { type: "button", class: "btn primo largo conferma", disabled: true }, "Conferma la sequenza");
    var ordine = mescola(ca.passi.map(function (_, k) { return k; }));
    if (ordine.every(function (v, k) { return v === k; })) ordine.reverse();
    var bottoni = {};
    function ridisegna() {
      ordine.forEach(function (k) { var pos = seq.indexOf(k); bottoni[k].textContent = (pos >= 0 ? (pos + 1) + ". " : "") + ca.passi[k]; bottoni[k].classList.toggle("presa", pos >= 0); });
      conf.disabled = seq.length !== ca.passi.length;
    }
    ordine.forEach(function (k) {
      var b = h("button", { type: "button", class: "op" }, ca.passi[k]);
      b.onclick = function () {
        if (chiuso) return;
        var pos = seq.indexOf(k); if (pos >= 0) seq.splice(pos, 1); else seq.push(k);
        for (var x in bottoni) bottoni[x].classList.remove("giusta", "sbagliata");
        sotto.replaceChildren(); ridisegna();
      };
      bottoni[k] = b; lista.append(b);
    });
    function chiudi(riuscita) {
      chiuso = true; conf.hidden = true;
      var pt = riuscita ? (tentativi === 1 ? 2 : 1) : 0; punti += pt;
      ca.passi.forEach(function (t, k) { var b = bottoni[k]; b.textContent = (k + 1) + ". " + t; b.disabled = true; b.classList.remove("presa", "sbagliata"); b.classList.add("giusta"); lista.append(b); });
      sotto.replaceChildren(esitoBox(riuscita, riuscita ? (tentativi === 1 ? "Sequenza giusta al primo colpo." : "Sequenza giusta al tentativo " + tentativi + ".") : "Ecco la sequenza corretta.", ca.s, ca.f));
      var ultimo = c === p.casi.length - 1;
      var av = h("button", { type: "button", class: "btn scuro largo" }, ultimo ? "Vedi il risultato" : "Prossimo caso");
      av.onclick = function () { if (ultimo) fine(); else { c++; caso(); } };
      sotto.append(av);
    }
    conf.onclick = function () {
      if (seq.length !== ca.passi.length) return;
      tentativi++;
      if (seq.every(function (v, k) { return v === k; })) { chiudi(true); return; }
      if (tentativi >= 3) { chiudi(false); return; }
      seq.forEach(function (v, pos) { bottoni[v].classList.remove("presa"); bottoni[v].classList.add(v === pos ? "giusta" : "sbagliata"); });
      sotto.replaceChildren(esitoBox(false, "Non ancora. Tentativo " + tentativi + " di 3.", "In verde le azioni già al posto giusto, in rosso quelle da spostare. Tocca un'azione per toglierla dalla sequenza e rimetterla."));
    };
    box.append(h("p", { class: "conta" }, "Caso " + (c + 1) + " di " + p.casi.length), h("h3", null, ca.titolo), h("p", { class: "sotto" }, "Tocca le azioni nell'ordine in cui vanno fatte: accanto compare il numero. Per cambiare idea tocca di nuovo un'azione e la togli. Alla fine conferma."), lista, conf, sotto);
  }
  function fine() {
    box.replaceChildren(h("div", { class: "esito si" }, h("b", null, "Punti: " + punti + " su " + p.casi.length * 2), "2 punti per ogni sequenza giusta al primo tentativo, 1 al secondo o al terzo."));
    ctx.ok(punti, p.casi.length * 2);
  }
  caso();
};

PASSI.storia = function (p, box, ctx) {
  var n = 0, val = p.indici.map(function () { return 0; }), mas = p.indici.map(function () { return 0; });
  p.nodi.forEach(function (nd) { p.indici.forEach(function (_, k) { mas[k] += Math.max.apply(null, nd.scelte.map(function (s) { return s.d[k]; }).concat([0])); }); });
  function nodo() {
    box.replaceChildren();
    var nd = p.nodi[n], scelta = null, fatto = false;
    var lista = h("div", { class: "opz" }), sotto = h("div", { class: "pila" });
    var conf = h("button", { type: "button", class: "btn primo largo conferma", disabled: true }, "Conferma la scelta");
    mescola(nd.scelte.slice()).forEach(function (sc) {
      var b = h("button", { type: "button", class: "op" }, sc.x);
      b.onclick = function () {
        if (fatto) return; scelta = sc;
        lista.querySelectorAll("button").forEach(function (x) { x.classList.toggle("presa", x === b); });
        conf.disabled = false;
      };
      lista.append(b);
    });
    conf.onclick = function () {
      if (!scelta || fatto) return; fatto = true; conf.hidden = true;
      var sc = scelta;
      lista.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
      var somma = 0, effetti = [];
      sc.d.forEach(function (v, k) { val[k] += v; somma += v; if (v) effetti.push(p.indici[k] + " " + (v > 0 ? "+" : "") + v); });
      sotto.append(h("div", { class: "esito " + (somma > 0 ? "si" : (somma < 0 ? "no" : "")) }, h("b", null, effetti.length ? effetti.join(" · ") : "Nessun effetto"), sc.e));
      var ultimo = n === p.nodi.length - 1;
      var av = h("button", { type: "button", class: "btn scuro largo" }, ultimo ? "Com'è andata la giornata" : "Continua");
      av.onclick = function () { if (ultimo) fine(); else { n++; nodo(); } };
      sotto.append(av); av.scrollIntoView({ block: "nearest" });
    };
    box.append(h("p", { class: "conta" }, nd.ora + " · scena " + (n + 1) + " di " + p.nodi.length), h("blockquote", { class: "cit" }, nd.testo), h("p", { class: "dom" }, "Che cosa fai?"), lista, conf, sotto);
  }
  function fine() {
    box.replaceChildren();
    var tot = 0, max = 0, peggio = 0;
    p.indici.forEach(function (nome, k) {
      var v = Math.max(0, val[k]); tot += v; max += mas[k];
      if (val[k] / mas[k] < val[peggio] / mas[peggio]) peggio = k;
      box.append(h("div", { class: "pila" }, h("div", { class: "riga" }, h("b", null, nome), h("span", { class: "spinta conta" }, v + " su " + mas[k])), h("div", { class: "barra" }, h("i", { style: "width:" + Math.round(v / mas[k] * 100) + "%" }))));
    });
    box.append(h("div", { class: "esito" }, h("b", null, tot >= max * 0.8 ? "Una prima giornata da manuale." : (tot >= max * 0.5 ? "Giornata discreta, con qualche scivolone." : "Giornata in salita.")), "Il punto su cui lavorare: " + p.indici[peggio].toLowerCase() + ". " + p.consigli[peggio]));
    ctx.ok(tot, max);
  }
  nodo();
};

PASSI.modulo = function (p, box, ctx) {
  if (p.intro) box.append(h("p", null, p.intro));
  var testi = [];
  var nTesti = p.campi.filter(function (c) { return c.tipo !== "spunte"; }).length;
  var serve = p.tutti ? nTesti : Math.min(nTesti, p.almeno || 2);
  var spunteObbl = p.campi.filter(function (c) { return c.tipo === "spunte"; });
  function controlla() {
    var piene = testi.filter(function (c) { return c.value.trim().length >= 2; }).length;
    var spunteOk = nTesti > 0 || spunteObbl.every(function (c) { return (ctx.nota(c.id) || "").trim(); });
    if (piene >= serve && spunteOk) ctx.ok(0, 0);
    else if (!spunteOk) ctx.attesa("Per andare avanti segna almeno una voce.");
    else ctx.attesa(serve === nTesti ? (nTesti === 1 ? "Per andare avanti scrivi la tua risposta qui sopra." : "Per andare avanti compila tutte le caselle qui sopra.") : "Per andare avanti compila almeno " + serve + " caselle su " + nTesti + ". Le altre sono facoltative.");
  }
  if (nTesti > serve) box.append(h("p", { class: "sotto" }, "Compila almeno " + serve + " caselle su " + nTesti + ": scegli tu quali."));
  p.campi.forEach(function (c) {
    if (c.tipo === "spunte") {
      var gruppo = h("div", { class: "pila" }, h("b", null, c.l));
      var scelte = (ctx.nota(c.id) || "").split("\n").filter(Boolean);
      c.voci.forEach(function (v) {
        var id = nuovoId("sp");
        var inp = h("input", { type: "checkbox", id: id }); inp.checked = scelte.indexOf(v) >= 0;
        inp.addEventListener("change", function () {
          var ora = []; gruppo.querySelectorAll("input").forEach(function (x, k) { if (x.checked) ora.push(c.voci[k]); });
          ctx.setNota(c.id, ora.join("\n")); controlla();
        });
        gruppo.append(h("label", { class: "spunta", for: id }, inp, h("span", null, v)));
      });
      box.append(gruppo);
    } else {
      var t = campoTesto(ctx, c.id, c.l, c.ph, c.righe || 0, controlla);
      testi.push(t.campo); box.append(t.nodo);
    }
  });
  if (nTesti) box.append(suggDetta());
  controlla();
};

PASSI.pesca = function (p, box, ctx) {
  if (p.intro) box.append(h("p", null, p.intro));
  var esito = h("div", { class: "pila" });
  var volte = parseInt(ctx.nota("_pescate") || "0", 10);
  var b = h("button", { type: "button", class: "btn primo largo" });
  function disegna() {
    esito.replaceChildren();
    var fatta = true;
    p.urne.forEach(function (u) { var v = ctx.nota(u.id); if (!v) fatta = false; else esito.append(h("div", { class: "esito" }, h("b", null, u.l), v)); });
    b.textContent = volte === 0 ? "Pesca" : "Ripesca (una volta sola)";
    b.hidden = volte >= 2;
    if (fatta) ctx.ok(0, 0);
  }
  b.onclick = function () {
    p.urne.forEach(function (u) { ctx.setNota(u.id, u.voci[Math.floor(Math.random() * u.voci.length)]); });
    volte++; ctx.setNota("_pescate", String(volte)); disegna();
  };
  box.append(b, esito); disegna();
};

PASSI.prove = function (p, box, ctx) {
  var k = 0, rette = 0;
  function blocco(testo) {
    var r = h("div", { class: "richiesta" }, testo), avviso = h("p", { class: "sotto", hidden: true });
    var bc = h("button", { type: "button", class: "btn primo piccolo" }, "Copia");
    bc.onclick = function () { copia(testo, bc, avviso); };
    return h("div", { class: "pila" }, r, h("div", { class: "riga" }, bc), avviso);
  }
  function prova() {
    box.replaceChildren();
    var pr = p.prove[k], lista = h("div", { class: "opz" }), sotto = h("div", { class: "pila" });
    var scelto = -1, fatto = false;
    var conf = h("button", { type: "button", class: "btn primo largo conferma", disabled: true }, "Conferma");
    pr.esiti.forEach(function (e, n) {
      var b = h("button", { type: "button", class: "op" }, e);
      b.onclick = function () { if (fatto) return; scelto = n; lista.querySelectorAll("button").forEach(function (x) { x.classList.toggle("presa", x === b); }); conf.disabled = false; };
      lista.append(b);
    });
    conf.onclick = function () {
      if (scelto < 0 || fatto) return; fatto = true; conf.hidden = true;
      lista.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
      ctx.setNota(pr.id, pr.esiti[scelto]);
      var bene = pr.ok.indexOf(scelto) >= 0; if (bene) rette++;
      sotto.append(h("div", { class: "esito " + (bene ? "si" : "no") }, h("b", null, bene ? "La tua IA ha retto." : "La tua IA ci è cascata."), pr.atteso, verifica(pr.f)));
      var ultimo = k === p.prove.length - 1;
      var av = h("button", { type: "button", class: "btn scuro largo" }, ultimo ? "Vedi il bilancio" : "Prossima prova");
      av.onclick = function () { if (ultimo) fine(); else { k++; prova(); } };
      sotto.append(av); av.scrollIntoView({ block: "nearest" });
    };
    box.append(h("p", { class: "conta" }, "Prova " + (k + 1) + " di " + p.prove.length), h("h3", null, pr.l), h("p", null, pr.cosa), blocco(pr.prompt));
    if (pr.poi) box.append(h("p", null, pr.poiCosa), blocco(pr.poi));
    box.append(assistenti(), h("p", { class: "dom" }, "Che cosa ha fatto la tua IA?"), lista, conf, sotto);
  }
  function fine() {
    var t = "Ha retto " + rette + " prove su " + p.prove.length;
    ctx.setNota("bilancio", t);
    box.replaceChildren(h("div", { class: "esito" }, h("b", null, "La tua IA: " + t.toLowerCase() + "."), "Confronta con i compagni: IA diverse, o la stessa IA in momenti diversi, non cadono sulle stesse prove."));
    ctx.ok(rette, p.prove.length);
  }
  prova();
};

PASSI.ia = function (p, box, ctx) {
  if (p.intro) box.append(h("div", { class: "info", html: p.intro }));
  var campi = {}, richiesta = h("div", { class: "richiesta" });
  function testo() { return p.prompt.replace(/\{(\w+)\}/g, function (_, k) { var v = campi[k] ? campi[k].value.trim() : ""; return v || "[…]"; }); }
  function agg() { richiesta.textContent = testo(); }
  (p.campi || []).forEach(function (c) {
    if (c.da && !ctx.nota("c_" + c.id) && ctx.grezza(c.da)) ctx.setNota("c_" + c.id, ctx.grezza(c.da).replace(/\s*\n\s*/g, " "));
    var t = campoTesto(ctx, "c_" + c.id, c.l, c.ph, c.righe || 0, agg); campi[c.id] = t.campo; box.append(t.nodo);
  });
  agg();
  var avviso = h("p", { class: "sotto", hidden: true });
  var bc = h("button", { type: "button", class: "btn primo" }, "Copia la richiesta");
  bc.onclick = function () { copia(testo(), bc, avviso); };
  box.append(h("p", { class: "conta" }, "La tua richiesta"), richiesta, h("div", { class: "riga" }, bc), avviso, assistenti());
  if (p.link) box.append(h("p", null, h("a", { href: p.link.u, target: "_blank", rel: "noopener" }, p.link.t)));
  function controlla() { if (nota.campo.value.trim().length >= 2) ctx.ok(0, 0); else ctx.attesa("Per andare avanti scrivi la tua risposta nell'ultima casella qui sopra."); }
  var nota = campoTesto(ctx, "nota", p.consegna, "Scrivi qui: lo ritrovi nella tua tessera.", 4, controlla);
  box.append(nota.nodo, suggDetta()); controlla();
};

PASSI.chat = function (p, box, ctx) {
  if (p.intro) box.append(h("p", null, p.intro));
  var zona = h("div", { class: "pila" });
  var scelta = h("div", { class: "opz" });
  function istruzioni(sc) {
    return "Facciamo una simulazione per un corso di formazione. Tu interpreti " + sc.ruolo + ". Io sono un apprendista e devo gestire la conversazione.\n" +
      "Situazione: " + sc.situazione + "\n" +
      "Regole: rispondi in italiano con battute brevi (massimo 3 frasi) e resta sempre nel personaggio. Se ascolto, riformulo, resto calmo e propongo una soluzione concreta, diventa via via più collaborativo. Se rispondo male o scarico la colpa, irrigidisciti. Niente insulti o volgarità.\n" +
      "Quando scrivo FINE esci dal personaggio e dammi un riscontro senza voti. Per ognuno di questi 5 comportamenti scrivi SÌ o NO e cita la mia frase che lo dimostra: 1) ho lasciato parlare senza interrompere; 2) ho riformulato il problema con parole mie; 3) ho parlato in prima persona, senza accusare; 4) ho fatto almeno una domanda aperta; 5) ho proposto una soluzione concreta, con un tempo. Poi dammi un consiglio con una frase d'esempio da usare la prossima volta.";
  }
  function testoIstr(sc) { return sc.istr || (istruzioni(sc) + "\nComincia tu con la prima battuta, nel personaggio."); }
  function apri(sc) {
    ctx.setNota("scenario", sc.titolo);
    zona.replaceChildren(h("div", { class: "esito" }, h("b", null, sc.titolo), sc.situazione || sc.breve));
    var richiesta = h("div", { class: "richiesta" }, testoIstr(sc));
    var avviso = h("p", { class: "sotto", hidden: true });
    var bc = h("button", { type: "button", class: "btn primo" }, "Copia la richiesta");
    bc.onclick = function () { copia(richiesta.textContent, bc, avviso); };
    var esterno = h("div", { class: "pila" }, h("p", null, p.guida || "Copia la richiesta, incollala nel tuo assistente e gestisci la conversazione. Se il tuo assistente ha la voce, prova a parlargli. Dopo 4 o 5 scambi scrivi FINE."), richiesta, h("div", { class: "riga" }, bc), avviso, assistenti());
    zona.append(esterno);
    function controlla() { if (nota.campo.value.trim().length >= 2) ctx.ok(0, 0); else ctx.attesa("Per andare avanti scrivi la tua risposta nell'ultima casella qui sopra."); }
    var nota = campoTesto(ctx, "nota", p.consegna, "Scrivi qui: lo ritrovi nella tua tessera.", 4, controlla);
    zona.append(nota.nodo, suggDetta()); controlla();
  }
  p.scenari.forEach(function (sc) {
    var b = h("button", { type: "button", class: "op" }, h("b", null, sc.titolo), h("br"), sc.breve);
    b.onclick = function () { scelta.querySelectorAll("button").forEach(function (x) { x.classList.remove("presa"); }); b.classList.add("presa"); apri(sc); };
    scelta.append(b);
  });
  box.append(h("p", { class: "conta" }, p.scegli || "Scegli chi vuoi affrontare"), scelta, zona);
};

/* ---------- viste ---------- */
var app;
function monta() { for (var i = 0; i < arguments.length; i++) metti(app, arguments[i]); }
function vai(h_) { location.hash = h_; }
function vocAtt(id, num) {
  var a = APP.att[id]; if (!a) return null;
  var s = S.att[id], t = totale(id), fatta = s && s.fatto, et;
  if (fatta) et = "✓ Fatta" + (t.m ? " · " + t.p + " su " + t.m : "");
  else et = (num ? num + " · " : "") + UF[a.uf] + " · " + (s && s.passo > 0 ? "in corso" : a.min + " min");
  return h("a", { class: "voce " + (fatta ? "fatta " : "") + a.uf, href: "#" + id },
    h("span", { class: "ico", "aria-hidden": "true" }, fatta ? "✓" : (num || "+")),
    h("span", null, h("span", { class: "et" }, et), h("span", { class: "tit" }, a.titolo), h("span", { class: "desc" }, a.desc)));
}
function prossima(l) {
  var voci = l.percorso.filter(function (x) { return x !== "PAUSA"; });
  var id = voci.filter(function (x) { return !(S.att[x] && S.att[x].fatto); })[0];
  if (!id) return h("div", { class: "continua finito" }, h("span", { class: "ico", "aria-hidden": "true" }, "✓"), h("span", null, h("span", { class: "et" }, "Percorso completato"), h("span", { class: "tit" }, "Manda la tessera al docente")), h("a", { class: "freccia", href: "#tessera", "aria-label": "Apri la tessera" }, "→"));
  var a = APP.att[id], iniziata = S.att[id] && S.att[id].passo > 0;
  return h("a", { class: "continua", href: "#" + id }, h("span", { class: "ico", "aria-hidden": "true" }, voci.indexOf(id) + 1), h("span", null, h("span", { class: "et" }, iniziata ? "Riprendi da qui" : "Prossima attività"), h("span", { class: "tit" }, a.titolo)), h("span", { class: "freccia", "aria-hidden": "true" }, "→"));
}

function giaUsato() {
  var iniziate = Object.keys(S.att).filter(function (k) { return S.att[k] && (S.att[k].passo > 0 || S.att[k].fatto); }).length;
  if (!iniziate) return null;
  var conf = h("div", { class: "riga", hidden: true });
  var si = h("button", { type: "button", class: "btn piccolo" }, "Sì, cancella tutto"), no = h("button", { type: "button", class: "btn piccolo" }, "No");
  conf.append(h("b", null, "Cancello nome, risposte e punti da questo browser?"), si, no);
  var b = h("button", { type: "button", class: "btn piccolo" }, "Non sono io: ricomincia da zero");
  b.onclick = function () { conf.hidden = false; b.hidden = true; };
  no.onclick = function () { conf.hidden = true; b.hidden = false; };
  si.onclick = function () { S = { nome: "", lez: "", att: {} }; salva(); vai(""); disegna(); };
  return h("div", { class: "esito" }, h("b", null, "Su questo browser c'è già un lavoro in corso" + (S.nome ? " di " + S.nome : "") + ": " + iniziate + (iniziate === 1 ? " attività iniziata." : " attività iniziate.")), "Se è tuo, continua pure. Se il telefono o il computer prima l'ha usato qualcun altro, ricomincia da zero.", h("div", { class: "pila" }, b, conf));
}

function codiceQR(cls, scala) {
  var box = h("div", { class: cls });
  try { var q = window.qrcode(0, "M"); q.addData(APP.link); q.make(); box.innerHTML = q.createSvgTag(scala, 4); box.firstChild.setAttribute("role", "img"); box.firstChild.setAttribute("aria-label", "Codice QR per aprire " + APP.link); } catch (e) { box.textContent = APP.link; }
  return box;
}

function vistaHome() {
  var id = "nome";
  var inp = h("input", { id: id, type: "text", placeholder: "Nome o soprannome", autocomplete: "off", maxlength: "30" });
  inp.value = S.nome; inp.addEventListener("input", function () { S.nome = inp.value; salva(); });
  monta(
    h("div", { class: "banda casa" }, h("h1", null, "Recuperi apprendistato"), h("p", null, "Modulo 1 · Sicurezza, organizzazione e qualità. Quattro ore di sfide con il tuo telefono e con l'intelligenza artificiale.")),
    h("div", { class: "scheda entra" }, codiceQR("qr-piccolo", 4), h("div", { class: "pila" }, h("h3", null, "Entra con il telefono"), h("p", { class: "sotto" }, "Inquadra il codice con la fotocamera, oppure scrivi:"), h("p", { class: "link-breve" }, APP.link.replace(/^https:\/\//, "").replace(/\/$/, "")))),
    giaUsato(),
    h("div", { class: "scheda" }, h("label", { for: id }, "Come ti chiami?"), inp, h("p", { class: "sotto" }, "Resta solo su questo telefono, come tutte le tue risposte.")),
    h("h2", null, "Scegli la tua lezione"),
    h("div", { class: "pila" }, APP.lezioni.map(function (l) {
      var fatte = l.percorso.filter(function (x) { return S.att[x] && S.att[x].fatto; }).length, tot = l.percorso.filter(function (x) { return x !== "PAUSA"; }).length;
      return h("a", { class: "voce lezione " + (l.colore || "tut"), href: "#" + l.id }, h("span", { class: "ico segno", "aria-hidden": "true" }, l.segno || "•"), h("span", null, h("span", { class: "tit" }, l.nome), h("span", { class: "desc" }, (l.argomenti ? l.argomenti + " · " : "") + tot + " attività")), h("span", { class: "stato" }, fatte ? fatte + " su " + tot : "Entra →"));
    })),
    salvataggioOk ? null : h("div", { class: "esito no" }, h("b", null, "Questo browser non salva le risposte."), "Apri il link in Chrome o in Safari: se lo apri dentro WhatsApp o Instagram, chiudendo perdi tutto."),
    h("div", { class: "scheda" }, h("h3", null, "Prima di cominciare"), h("ol", { class: "regole" },
      h("li", null, "Niente dati veri nelle richieste all'IA: non scrivere nomi di aziende, colleghi, clienti, e non caricare documenti."),
      h("li", null, "L'IA sbaglia con grande sicurezza. Quello che dice su leggi e sicurezza va sempre verificato."),
      h("li", null, "Tieni pronte almeno due IA gratuite, per esempio ChatGPT e Gemini, o Meta AI dentro WhatsApp. Le versioni gratuite hanno un limite di messaggi: quando una si ferma, passi all'altra. Usarne due ti fa anche vedere che non rispondono allo stesso modo."),
      h("li", null, "Apri la pagina in Chrome o in Safari, non dentro WhatsApp: così non perdi le risposte."),
      h("li", null, "Per scrivere meno puoi dettare: tocca il microfono della tastiera."),
      h("li", null, "Lavori in autonomia. A fine lezione mandi la tua tessera al docente via mail e ne parlate insieme."))),
    h("div", { class: "riga" }, h("a", { class: "btn", href: "#tessera" }, "La mia tessera"), h("a", { class: "btn", href: "#tutte" }, "Tutte le attività")),
    h("p", { class: "sotto" }, h("a", { href: "#docente" }, "Area docente"))
  );
}

function vistaLezione(l) {
  S.lez = l.id; salva();
  var n = 0, voci = l.percorso.filter(function (x) { return x !== "PAUSA"; }), totL = voci.length;
  var fatteL = voci.filter(function (x) { return S.att[x] && S.att[x].fatto; }).length;
  monta(
    h("div", { class: "riga" }, h("a", { class: "btn piccolo", href: "#" }, "← Inizio"), h("a", { class: "btn piccolo spinta", href: "#tessera" }, "La mia tessera")),
    h("div", { class: "banda " + (l.colore || "tut") }, h("p", { class: "piccolo" }, (S.nome ? "Ciao " + S.nome + " · " : "") + l.nome), h("h1", null, l.argomenti || l.nome),
      h("div", { class: "tacche chiare", "aria-hidden": "true" }, voci.map(function (x) { return h("span", { class: S.att[x] && S.att[x].fatto ? "fatta" : "" }); })),
      h("p", { class: "piccolo" }, fatteL + " attività fatte su " + totL)),
    prossima(l),
    h("p", { class: "sotto" }, "Segui il percorso dall'alto verso il basso. Ogni attività salva da sola dove sei arrivato."),
    h("div", { class: "esito" }, h("b", null, "Due IA, una per metà"), "Usa una IA fino alla pausa e un'altra dopo: così non finisci i messaggi gratuiti e puoi confrontarle. Se una si blocca prima, cambia subito."),
    h("div", { class: "pila" }, l.percorso.map(function (x) { if (x === "PAUSA") return h("div", { class: "pausa" }, "Pausa · 15 minuti"); n++; return vocAtt(x, n); })),
    h("h2", null, "Se finisci prima"),
    h("div", { class: "pila" }, l.extra.map(function (x) { return vocAtt(x); }))
  );
}

function vistaTutte() {
  S.lez = "tutte"; salva();
  monta(
    h("div", { class: "riga" }, h("a", { class: "btn piccolo", href: "#" }, "← Inizio")),
    h("h1", null, "Tutte le attività"),
    h("div", { class: "pila" }, APP.ordine.map(function (x) { return vocAtt(x); }))
  );
}

function rileggi(a, s, i) {
  var pezzi = [];
  a.passi.forEach(function (q, k) { if (k < i && q.t === "info") pezzi.push(h("details", { class: "rileggi" }, h("summary", null, "Rileggi: " + q.h), h("div", { class: "info", html: q.html }))); });
  var mie = [];
  Object.keys(s.note).sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); }).forEach(function (chiave) {
    var pos = chiave.indexOf("."), n = parseInt(chiave.slice(0, pos), 10), k = chiave.slice(pos + 1), v = s.note[chiave];
    if (n >= i || !v || !v.trim() || k.charAt(0) === "_" || k.slice(0, 2) === "c_") return;
    var et = a.passi[n] ? etichettaNota(a.passi[n], k) : null;
    if (et) mie.push(h("div", { class: "nota-tessera" }, h("div", { class: "et" }, et), h("div", { class: "va" }, v)));
  });
  if (mie.length) pezzi.push(h("details", { class: "rileggi" }, h("summary", null, "Rileggi quello che hai scritto finora"), h("div", { class: "pila" }, mie)));
  return pezzi.length ? h("div", { class: "pila" }, pezzi) : null;
}

function vistaAttivita(a) {
  var s = st(a.id);
  if (!s.inizio) { s.inizio = Date.now(); salva(); }
  var indietro = "#" + (S.lez && S.lez !== "tutte" ? S.lez : (S.lez === "tutte" ? "tutte" : ""));
  if (s.passo >= a.passi.length) {
    var t = totale(a.id);
    var rif = h("button", { type: "button", class: "btn piccolo" }, "Rifai l'attività");
    rif.onclick = function () { S.att[a.id] = { passo: 0, fatto: false, punti: {}, note: s.note, inizio: Date.now() }; salva(); disegna(); };
    monta(
      h("div", { class: "festa " + a.uf }, h("div", { class: "grande", "aria-hidden": "true" }, "✓"), h("p", { class: "piccolo" }, "Attività completata"), h("h1", null, a.titolo),
        t.m ? h("p", { class: "punti" }, t.p, h("small", null, " su " + t.m + " punti")) : h("p", null, "Le tue risposte sono nella tessera.")),
      h("a", { class: "btn primo largo", href: indietro }, "Torna al percorso"),
      h("div", { class: "riga" }, h("a", { class: "btn piccolo", href: "#tessera" }, "La mia tessera"), rif)
    );
    return;
  }
  var i = s.passo, p = a.passi[i];
  var avanti = h("button", { type: "button", class: "btn primo spinta", disabled: true }, i === a.passi.length - 1 ? "Concludi" : "Avanti →");
  var aiuto = h("p", { class: "sotto", hidden: true });
  var ctx = {
    ok: function (pt, mx) { s.punti[i] = { p: pt, m: mx }; salva(); avanti.disabled = false; aiuto.hidden = true; },
    attesa: function (msg) { avanti.disabled = true; if (msg) { aiuto.textContent = msg; aiuto.hidden = false; } },
    nota: function (k) { return s.note[i + "." + k]; },
    grezza: function (chiave) { return s.note[chiave]; },
    setNota: function (k, v) { s.note[i + "." + k] = v; salva(); }
  };
  var salta = p.facoltativo ? h("button", { type: "button", class: "btn piccolo" }, "Salta questo passo") : null;
  if (salta) salta.onclick = function () { s.punti[i] = { p: 0, m: 0 }; s.passo = i + 1; if (s.passo >= a.passi.length) { s.fatto = true; s.fine = Date.now(); } salva(); disegna(); window.scrollTo(0, 0); };
  avanti.onclick = function () { s.passo = i + 1; if (s.passo >= a.passi.length) { s.fatto = true; s.fine = Date.now(); } salva(); disegna(); window.scrollTo(0, 0); };
  var box = h("div", { class: "scheda" });
  monta(
    h("div", { class: "testa" }, h("a", { class: "btn piccolo", href: indietro, "aria-label": "Torna al percorso" }, "←"), h("span", { class: "tit" }, a.titolo, h("span", { class: "chip " + a.uf }, UF[a.uf]))),
    h("div", { class: "tacche " + a.uf, "aria-hidden": "true" }, a.passi.map(function (_, k) { return h("span", { class: k < i ? "fatta" : (k === i ? "ora" : "") }); })),
    h("div", { class: "pila" }, h("p", { class: "conta" }, "Passo " + (i + 1) + " di " + a.passi.length + (p.facoltativo ? " · facoltativo" : "")), h("h2", null, p.h)),
    rileggi(a, s, i),
    box,
    h("div", { class: "piede" }, salta, aiuto, avanti)
  );
  PASSI[p.t](p, box, ctx);
}

function etichettaNota(p, k) {
  if (k === "nota") return p.consegna;
  if (k === "scenario") return "Scelta";
  if (k === "bilancio") return "Bilancio della tua IA";
  var c = (p.campi || []).concat(p.urne || [], p.prove || []).filter(function (x) { return x.id === k; })[0];
  return c ? c.l : null;
}
function raccogli() {
  var righe = [];
  APP.ordine.forEach(function (id) {
    var s = S.att[id]; if (!s || (!s.passo && !Object.keys(s.note).length)) return;
    var a = APP.att[id], t = totale(id), note = [];
    Object.keys(s.note).sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); }).forEach(function (chiave) {
      var pos = chiave.indexOf("."), i = parseInt(chiave.slice(0, pos), 10), k = chiave.slice(pos + 1), v = s.note[chiave];
      if (!v || !v.trim() || k.charAt(0) === "_" || k.slice(0, 2) === "c_") return;
      var et = a.passi[i] ? etichettaNota(a.passi[i], k) : null; if (et) note.push({ et: et, va: v });
    });
    righe.push({ a: a, s: s, t: t, note: note });
  });
  return righe;
}
function minuti(st_) { return st_ && st_.inizio && st_.fine ? Math.max(1, Math.round((st_.fine - st_.inizio) / 60000)) : null; }
function oggi() { var d = new Date(); return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
function testoRiepilogo(righe, fatte, p, m, lez, corto) {
  var t = "RECUPERI APPRENDISTATO\n" + (S.nome || "Senza nome") + " · " + (lez ? lez.nome : "lezione non scelta") + " · " + oggi() + "\n";
  var tot = 0; fatte.forEach(function (r) { tot += minuti(r.s) || 0; });
  t += "Attività completate: " + fatte.length + (m ? " · punti " + p + " su " + m : "") + (tot ? " · " + tot + " minuti di lavoro" : "") + "\n";
  righe.forEach(function (r) {
    var mi = minuti(r.s);
    t += "\n" + r.a.titolo + " (" + (r.s.fatto ? "fatta" + (r.t.m ? ", " + r.t.p + " su " + r.t.m : "") + (mi ? ", " + mi + " min" : "") : "in corso") + ")\n";
    r.note.forEach(function (n) { var v = n.va.replace(/\s*\n\s*/g, "; "); if (corto && v.length > 160) v = v.slice(0, 157) + "…"; t += "- " + n.et + ": " + v + "\n"; });
  });
  return t;
}
function vistaTessera() {
  var righe = raccogli(), fatte = righe.filter(function (r) { return r.s.fatto; }), p = 0, m = 0;
  fatte.forEach(function (r) { p += r.t.p; m += r.t.m; });
  var lez = APP.lezioni.filter(function (l) { return l.id === S.lez; })[0];
  var avviso = h("p", { class: "sotto", hidden: true });
  var bc = h("button", { type: "button", class: "btn" }, "Copia solo il riepilogo");
  bc.onclick = function () { copia(testoRiepilogo(righe, fatte, p, m, lez, false), bc, avviso); };
  var oggetto = ["Recuperi apprendistato", S.nome || "senza nome", lez ? lez.nome : "", oggi()].filter(Boolean).join(" - ");
  var corpo = testoRiepilogo(righe, fatte, p, m, lez, true);
  if (corpo.length > 1800) corpo = corpo.slice(0, 1750) + "\n[…il riepilogo completo è troppo lungo per questo pulsante: usa «Copia la mail» e incollala]";
  var idm = nuovoId("mail");
  var campoMail = h("input", { id: idm, type: "email", inputmode: "email", autocomplete: "off", placeholder: "lo detta il docente in aula" });
  campoMail.value = S.mail || "";
  var errMail = h("p", { class: "sotto", hidden: true }, "Controlla l'indirizzo: deve contenere @ e un punto, senza spazi.");
  function indirizzo() { return campoMail.value.trim(); }
  function valido() { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(indirizzo()); }
  var bGmail = h("a", { class: "btn primo", target: "_blank", rel: "noopener" }, "Apri in Gmail");
  var bOutlook = h("a", { class: "btn", target: "_blank", rel: "noopener" }, "Apri in Outlook");
  var bApp = h("a", { class: "btn" }, "Altra app di posta");
  function aggLink() {
    var to = encodeURIComponent(indirizzo()), su = encodeURIComponent(oggetto), bo = encodeURIComponent(corpo);
    bGmail.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + su + "&body=" + bo;
    bOutlook.href = "https://outlook.live.com/mail/0/deeplink/compose?to=" + to + "&subject=" + su + "&body=" + bo;
    bApp.href = "mailto:" + indirizzo() + "?subject=" + su + "&body=" + bo;
    var ok = valido();
    [bGmail, bOutlook, bApp].forEach(function (x) { x.classList.toggle("spento", !ok); x.setAttribute("aria-disabled", ok ? "false" : "true"); });
    errMail.hidden = ok || !indirizzo();
  }
  [bGmail, bOutlook, bApp].forEach(function (x) { x.addEventListener("click", function (ev) { if (!valido()) { ev.preventDefault(); errMail.hidden = false; campoMail.focus(); } }); });
  campoMail.addEventListener("input", function () { S.mail = indirizzo(); salva(); aggLink(); });
  aggLink();
  var bcm = h("button", { type: "button", class: "btn" }, "Copia la mail");
  bcm.onclick = function () { copia("A: " + (indirizzo() || "[indirizzo del docente]") + "\nOggetto: " + oggetto + "\n\n" + testoRiepilogo(righe, fatte, p, m, lez, false), bcm, avviso); };
  var azzera = h("button", { type: "button", class: "btn piccolo" }, "Cancella tutto e ricomincia");
  var conferma = h("div", { class: "esito no", hidden: true }, h("b", null, "Cancello nome, punti e risposte da questo telefono?"));
  var si = h("button", { type: "button", class: "btn piccolo" }, "Sì, cancella"); var no = h("button", { type: "button", class: "btn piccolo" }, "No");
  conferma.append(h("div", { class: "riga" }, si, no));
  azzera.onclick = function () { conferma.hidden = false; }; no.onclick = function () { conferma.hidden = true; };
  si.onclick = function () { S = { nome: "", lez: "", att: {} }; salva(); vai(""); disegna(); };
  var totMin = 0; fatte.forEach(function (r) { totMin += minuti(r.s) || 0; });
  monta(
    h("div", { class: "riga" }, h("a", { class: "btn piccolo", href: "#" + (lez ? lez.id : "") }, "← Indietro")),
    h("div", { class: "pila" }, h("h1", null, "La mia tessera"), h("p", { class: "sotto" }, "A fine lezione mandala via mail al docente, poi ne parlate insieme.")),
    S.nome ? null : h("div", { class: "esito no" }, h("b", null, "Manca il tuo nome."), "Torna all'inizio e scrivilo, altrimenti il docente non sa di chi è il riepilogo."),
    h("div", { class: "scheda" }, h("h2", null, S.nome || "Senza nome"), h("p", null, (lez ? lez.nome : "Lezione non scelta") + " · " + oggi()),
      h("div", { class: "riga" }, h("span", { class: "chip" }, fatte.length + " attività completate"), m ? h("span", { class: "chip vuoto" }, p + " punti su " + m) : null, totMin ? h("span", { class: "chip vuoto" }, totMin + " minuti") : null)),
    h("div", { class: "scheda" }, h("h3", null, "Consegna il lavoro via mail"),
      h("label", { for: idm }, "Indirizzo mail del docente"), campoMail, errMail,
      h("p", null, "Scegli la tua posta: si apre una mail già pronta, con oggetto e riepilogo. Controlla e premi Invia."),
      h("div", { class: "riga" }, bGmail, bOutlook, bApp),
      h("p", { class: "sotto" }, "Se nessun pulsante funziona, premi «Copia la mail» e incolla tutto in una mail nuova, nella tua app di posta."),
      h("div", { class: "riga" }, bcm, bc), avviso),
    righe.length ? righe.map(function (r) {
      var mi = minuti(r.s);
      return h("div", { class: "scheda" },
        h("div", { class: "riga" }, h("h3", null, r.a.titolo), h("span", { class: "spinta chip " + (r.s.fatto ? r.a.uf : "vuoto") }, r.s.fatto ? (r.t.m ? r.t.p + " su " + r.t.m : "Fatta") + (mi ? " · " + mi + " min" : "") : "In corso")),
        r.note.map(function (n) { return h("div", { class: "nota-tessera" }, h("div", { class: "et" }, n.et), h("div", { class: "va" }, n.va)); }));
    }) : h("div", { class: "scheda" }, h("p", null, "Ancora niente: comincia dalla prima attività del tuo percorso.")),
    h("div", { class: "riga" }, azzera), conferma
  );
}

function vistaDocente() {
  var qr = codiceQR("qr", 6);
  function orario(l) {
    var t = 0, righe = [];
    function riga(min, cosa, uf) { var da = t; t += min; righe.push(h("tr", null, h("td", { class: "ore" }, fmt(da) + " – " + fmt(t)), h("td", null, cosa, uf ? [" ", h("span", { class: "chip " + uf }, UF[uf])] : null))); }
    function fmt(x) { return Math.floor(x / 60) + ":" + ("0" + (x % 60)).slice(-2); }
    riga(10, "Accoglienza: QR, nome sulla pagina, le tre regole");
    l.percorso.forEach(function (x) { if (x === "PAUSA") riga(15, "Pausa"); else riga(APP.att[x].min, APP.att[x].titolo, APP.att[x].uf); });
    riga(240 - t, "Confronto finale sulle tessere");
    return h("div", { class: "scheda" }, h("h3", null, l.nome), h("table", null, h("tbody", null, righe)), h("p", { class: "sotto" }, "Per chi finisce prima: " + l.extra.map(function (x) { return APP.att[x].titolo; }).join(", ") + "."));
  }
  monta(
    h("div", { class: "riga" }, h("a", { class: "btn piccolo", href: "#" }, "← Inizio")),
    h("h1", null, "Area docente"),
    h("div", { class: "scheda" }, h("h3", null, "Per far entrare gli apprendisti"), qr, h("p", null, h("b", null, APP.link.replace("https://", ""))), h("p", { class: "sotto" }, "Proietta questa schermata: inquadrano il codice o scrivono l'indirizzo.")),
    h("div", { class: "scheda" }, h("h3", null, "Come funziona"), h("ul", { class: "regole" },
      h("li", null, "Ogni apprendista lavora sul proprio telefono. Punti e risposte restano salvati solo nel browser di quel telefono: non passano da un telefono all'altro né arrivano a un server. Se un dispositivo è condiviso, la pagina iniziale lo segnala e offre «Non sono io: ricomincia da zero»."),
      h("li", null, "A fine lezione detta in aula l'indirizzo mail a cui vuoi ricevere i riepiloghi: ognuno lo scrive nella tessera e invia una mail già pronta (da Gmail, Outlook o un'altra app; in alternativa la copia e la incolla). L'indirizzo resta solo sul telefono dell'apprendista e non è scritto nella pagina. La mail contiene nome, data, lezione, attività completate, punti, minuti impiegati e risposte scritte: ti resta come traccia del lavoro svolto."),
      h("li", null, "I minuti impiegati sono misurati dal telefono: dopo la prima lezione ti dicono quanto durano davvero le attività e ti servono per ritarare la scaletta."),
      h("li", null, "Le IA gratuite hanno limiti di messaggi. Chiedi a tutti di avere almeno due IA pronte e di cambiarla alla pausa. Chi non ha nessuna IA può lavorare in coppia con un compagno."),
      h("li", null, "I riscontri dati dall'IA in «Il cliente difficile» e «Spiegalo a Vale» sono elenchi di comportamenti con sì o no, non voti: IA diverse possono comunque giudicare in modo diverso, quindi trattali come spunti per il confronto. Lo stesso vale per il punteggio di «Fuga dal reparto»."),
      h("li", null, "Le attività con l'IA funzionano con qualunque assistente: copiano la richiesta e la incollano in quello che hanno già. La pagina non interroga nessuna IA per conto suo."),
      h("li", null, "«Campagna in 60 minuti» si fa a squadre di 3 o 4, con un solo telefono che tiene la traccia."),
      h("li", null, "Ogni attività si conclude sempre, qualunque sia il punteggio. A fine quiz chi vuole può riprovare per migliorarlo; il punteggio dell'ultimo tentativo finisce nella tessera."),
      h("li", null, "«Sfida finale» pesca 15 domande diverse per ciascuno, solo sugli argomenti della lezione scelta (lezione 1 e Cigliano: sicurezza specifica, comunicazione, ambiente, IA; lezione 2: qualità, diritto del lavoro, IA), 30 secondi l'una: la classifica si fa a voce confrontando i punteggi."),
      h("li", null, "Dopo ogni risposta dei quiz, delle sequenze, della caccia al rischio e delle prove all'IA compare «Verifica:» con il link alla fonte: l'articolo di legge su Normattiva o la pagina dell'ente pubblico; dove una fonte ufficiale non c'è, il riferimento più affidabile (UNI, Treccani, Istituto Superiore di Sanità, consorzi del riciclo). Tutte le fonti sono in italiano. Si aprono in una nuova scheda."),
      h("li", null, "Chivasso lezione 1 e Cigliano hanno lo stesso percorso, per chi ha perso comunicazione e sicurezza specifica. Chivasso lezione 2 è per chi ha perso qualità e diritto del lavoro, comprese pari opportunità e diritti e doveri."))),
    h("h2", null, "Scaletta delle 4 ore"),
    APP.lezioni.map(orario),
    h("div", { class: "scheda" }, h("h3", null, "Da rileggere prima dell'uso"), h("p", null, "I contenuti su norme, primo soccorso e contratto sono scritti per un ripasso generale. Prima della lezione vanno riletti da chi insegna sicurezza, in particolare «Emergenza!», «Smaschera l'IA», «Chi è chi», «Incidente al microscopio», «A chi mi rivolgo?» e «Il mio contratto»."))
  );
}

function disegna() {
  pulisci();
  app.replaceChildren();
  var k = (location.hash || "").replace(/^#/, "");
  var l = APP.lezioni.filter(function (x) { return x.id === k; })[0];
  if (l) vistaLezione(l);
  else if (k === "tutte") vistaTutte();
  else if (k === "tessera") vistaTessera();
  else if (k === "docente") vistaDocente();
  else if (APP.att[k]) vistaAttivita(APP.att[k]);
  else vistaHome();
}
APP.avvia = function () {
  app = document.getElementById("app");
  window.addEventListener("hashchange", function () { disegna(); window.scrollTo(0, 0); });
  disegna();
};
})();
