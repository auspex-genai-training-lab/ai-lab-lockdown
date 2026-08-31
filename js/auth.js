// 授業用簡易パスワード
// ※静的サイトのため、本格的なセキュリティ用途には使用できません。
const GAME_PASSWORD="auspex_ai";
const AUTH_SESSION_KEY="ai_lab_class_authenticated";

(()=>{
 const gate=document.querySelector("#passwordGate");
 const form=document.querySelector("#passwordForm");
 const input=document.querySelector("#gamePassword");
 const error=document.querySelector("#passwordError");
 const unlock=()=>{
  sessionStorage.setItem(AUTH_SESSION_KEY,"true");
  document.body.classList.remove("auth-locked");
  gate.classList.add("unlocked");
  setTimeout(()=>gate.classList.add("hidden"),420);
  window.dispatchEvent(new Event("ai-lab-authenticated"));
 };
 if(sessionStorage.getItem(AUTH_SESSION_KEY)==="true"){unlock();return}
 form.addEventListener("submit",event=>{
  event.preventDefault();
  if(input.value===GAME_PASSWORD){error.textContent="";unlock();return}
  error.textContent="パスワードが違います。";
  input.value="";
  input.focus();
  form.classList.remove("denied");
  void form.offsetWidth;
  form.classList.add("denied");
 });
 input.addEventListener("keydown",event=>{
  if(event.key!=="Enter")return;
  event.preventDefault();
  form.requestSubmit();
 });
 requestAnimationFrame(()=>input.focus({preventScroll:true}));
})();
