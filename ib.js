/* Talasbank Online login. Nothing typed here is kept or sent anywhere. */
(function () {
  var D = document;
  function $(s) { return D.querySelector(s); }
  function st(k, v, loc) { try { var S = loc ? localStorage : sessionStorage; if (v === undefined) return S.getItem(k); if (v === null) S.removeItem(k); else S.setItem(k, v); } catch (e) { return null; } }
  function h32(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  var L = st("ib_lang", undefined, true) === "ru" ? "ru" : "en";
  var T = {
    en: { empty: "Enter your login and password.", capBad: "The code from the picture is incorrect. Try again.",
      e1: "Error 1046: your session has expired. Please log in again.",
      e2: "Error 2203: the authorisation server did not respond in time. Please try again.",
      s1: "The code is incorrect or has expired. A new code has been sent.",
      s2: "SMS delivery is delayed. The code may arrive within 15 minutes. Do not close this page.",
      blocked: "Access to Talasbank Online has been blocked after three unsuccessful attempts (error 0x0417). To unblock it, visit your branch with your passport and a completed application form IB-3.",
      blockedUntil: "Access will remain blocked until", maint: "Talasbank Online is closed for scheduled maintenance until 05:00 Irad Time.", smsEmpty: "Enter the code from SMS.",
      h: "Login to the system", lLogin: "Login", lPass: "Password", lCap: "Code from the picture", lSms: "Code from SMS", enter: "Enter", vk: "Virtual keyboard",
      wait: "Connecting to the server…", smsSent: "A one-time code has been sent by SMS to the phone number registered at your branch:", connect: "How to connect",
      forgot: "Forgot your password?", demo: "Demo version", help: "Help", notices: "Notices", secL: "Security warning", tar: "Tariffs and limits", rulesL: "Rules of the service", mnt: "Maintenance", more: "More »", secH: "Safety rules",
      sec: "Talasbank never asks for your password or the SMS code by telephone, SMS, e-mail or Tulpar. Check that the address in your browser is ib.talasbank.net. Do not enter the system from computers in internet cafés." },
    ru: { empty: "Введите логин и пароль.", capBad: "Код с картинки введён неверно. Повторите попытку.",
      e1: "Ошибка 1046: время сеанса истекло. Войдите в систему повторно.",
      e2: "Ошибка 2203: сервер авторизации не ответил вовремя. Повторите попытку.",
      s1: "Код неверен или устарел. Отправлен новый код.",
      s2: "Доставка SMS задерживается. Код может прийти в течение 15 минут. Не закрывайте страницу.",
      blocked: "Доступ к Talasbank Online заблокирован после трёх неудачных попыток (ошибка 0x0417). Для разблокировки обратитесь в своё отделение с паспортом и заполненным заявлением по форме IB-3.",
      blockedUntil: "Доступ будет заблокирован до", maint: "Talasbank Online закрыт на плановые работы до 05:00 по времени Ирада.", smsEmpty: "Введите код из SMS.",
      h: "Вход в систему", lLogin: "Логин", lPass: "Пароль", lCap: "Код с картинки", lSms: "Код из SMS", enter: "Войти", vk: "Виртуальная клавиатура",
      wait: "Соединение с сервером…", smsSent: "Одноразовый код отправлен по SMS на номер телефона, указанный в вашем отделении:", connect: "Как подключиться",
      forgot: "Забыли пароль?", demo: "Демо-версия", help: "Помощь", notices: "Объявления", secL: "Предупреждение о безопасности", tar: "Тарифы и лимиты", rulesL: "Правила обслуживания", mnt: "Плановые работы", more: "Подробнее »", secH: "Правила безопасности",
      sec: "Таласбанк никогда не запрашивает пароль или код из SMS по телефону, SMS, e-mail или в Тулпаре. Проверьте, что в адресной строке указано ib.talasbank.net. Не входите в систему с компьютеров интернет-кафе." } }[L];

  D.documentElement.lang = L;
  Array.prototype.forEach.call(D.querySelectorAll("[data-t]"), function (e) { if (T[e.getAttribute("data-t")]) e.textContent = T[e.getAttribute("data-t")]; });
  Array.prototype.forEach.call(D.querySelectorAll("[data-l]"), function (a) {
    a.className = a.getAttribute("data-l") === L ? "on" : "";
    a.onclick = function (e) { e.preventDefault(); st("ib_lang", a.getAttribute("data-l"), true); location.reload(); };
  });
  if (L === "ru") $("#browser").firstChild.nodeValue = "Ваш браузер не поддерживается. Для корректной работы системы используйте Internet Explorer 8.0 или выше. ";
  $("#bclose").onclick = function (e) { e.preventDefault(); $("#browser").style.display = "none"; };
  $("#srv").textContent = "ib-node-" + (1 + Math.floor(Math.random() * 3));

  function msg(t, info) { $("#msg").innerHTML = t ? "<div" + (info ? " class='i'" : "") + ">" + t + "</div>" : ""; }
  function irt() { var n = new Date(); return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 6 * 3600000); }

  /* captcha */
  var code = "";
  function captcha() {
    var c = $("#capc"), x = c.getContext("2d"), ch = "23456789";
    code = ""; for (var i = 0; i < 5; i++) code += ch[Math.floor(Math.random() * ch.length)];
    x.fillStyle = "#dfe7f2"; x.fillRect(0, 0, 96, 30);
    for (i = 0; i < 6; i++) { x.strokeStyle = "rgba(18,62,124," + (0.15 + Math.random() * 0.3) + ")"; x.beginPath(); x.moveTo(Math.random() * 96, Math.random() * 30); x.lineTo(Math.random() * 96, Math.random() * 30); x.stroke(); }
    for (i = 0; i < 5; i++) { x.save(); x.translate(10 + i * 17, 21 + Math.random() * 5); x.rotate((Math.random() - 0.5) * 0.6); x.fillStyle = ["#123E7C", "#a87a1d", "#5A6B85"][i % 3]; x.font = "bold 18px Georgia, serif"; x.fillText(code[i], 0, 0); x.restore(); }
    $("#cap").value = "";
  }
  captcha();
  $("#capr").onclick = function (e) { e.preventDefault(); captcha(); };

  /* virtual keyboard: types into the password field */
  var kb = $("#vkb"), keys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
  keys.sort(function () { return Math.random() - 0.5; });
  kb.innerHTML = keys.map(function (k) { return "<b>" + k + "</b>"; }).join("") + "<b style='width:52px'>←</b>";
  kb.onclick = function (e) { var t = e.target; if (t.tagName !== "B") return; var p = $("#p"); p.value = t.textContent === "←" ? p.value.slice(0, -1) : p.value + t.textContent; };
  $("#vkt").onclick = function (e) { e.preventDefault(); kb.className = kb.className ? "kb" : "kb on"; };

  /* blocked or closed */
  function lock(t) { msg(t); $("#go").disabled = true; Array.prototype.forEach.call(D.querySelectorAll("#login input"), function (i) { i.disabled = true; }); }
  var until = +(st("ib_block", undefined, true) || 0), now = irt();
  if (until > Date.now()) { var u = new Date(until + (irt() - new Date())); lock(T.blocked + "<br><br>" + T.blockedUntil + " " + u.getDate() + "." + ("0" + (u.getMonth() + 1)).slice(-2) + "." + u.getFullYear() + " " + ("0" + u.getHours()).slice(-2) + ":" + ("0" + u.getMinutes()).slice(-2) + "."); return; }
  if (now.getFullYear() === 2026 && now.getMonth() === 10 && now.getDate() === 22 && now.getHours() < 8) { lock(T.maint.replace("05:00", "08:00")); return; }
  if (now.getDay() === 0 && now.getHours() >= 1 && now.getHours() < 5) { lock(T.maint); return; }

  var step = +(st("ib_step") || 0), smsTry = 0, login = "";
  function busy(on) { $("#wait").style.display = on ? "flex" : "none"; $("#go").disabled = on; }
  function sms() {
    $("#s1").style.display = "none"; $("#s2").style.display = "block";
    var h = h32(login.toLowerCase()); $("#ph").textContent = "+996 7" + (h % 10) + "• ••• •" + ("0" + (h % 97)).slice(-2);
    msg(""); $("#sms").focus();
  }
  $("#login").onsubmit = function (e) {
    e.preventDefault();
    if ($("#s2").style.display === "block") {
      if (!$("#sms").value.trim()) { msg(T.smsEmpty); return; }
      busy(true); msg("");
      setTimeout(function () {
        busy(false); smsTry++; $("#sms").value = "";
        if (smsTry === 1) msg(T.s1);
        else if (smsTry === 2) msg(T.s2, true);
        else { st("ib_block", String(Date.now() + 24 * 3600000), true); st("ib_step", null); location.reload(); }
      }, 2200 + Math.random() * 2500);
      return;
    }
    if (!$("#u").value.trim() || !$("#p").value.length) { msg(T.empty); return; }
    if ($("#cap").value.trim() !== code) { msg(T.capBad); captcha(); return; }
    login = $("#u").value.trim();
    busy(true); msg("");
    setTimeout(function () {
      busy(false); $("#p").value = ""; captcha();
      if (step === 0) { step = 1; st("ib_step", "1"); msg(T.e1); }
      else if (step === 1 && Math.random() < 0.4) { msg(T.e2); }
      else { step = 2; st("ib_step", "2"); sms(); }
    }, 1800 + Math.random() * 2600);
  };
})();
