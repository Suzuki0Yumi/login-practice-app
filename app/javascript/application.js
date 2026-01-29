// Configure your import map in config/importmap.rb.
// Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// ハンバーガーメニュー
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;
  navMenu.classList.toggle('show');
}
window.toggleMenu = toggleMenu;


// 編集・削除 全体トグル
function toggleActions(button) {
  const dailyRecord = button.closest(".daily-record");
  const wrapper = dailyRecord.querySelector(".records-actions-wrapper");

  if (!wrapper) return;

  if (wrapper.style.display === "block") {
    wrapper.style.display = "none";
    button.textContent = "編集・削除";
  } else {
    wrapper.style.display = "block";
    button.textContent = "閉じる";
  }
}
window.toggleActions = toggleActions;

// インライン編集の開閉
function toggleInlineEdit(button) {
  const recordItem = button.closest(".record-item");
  const form = recordItem.querySelector(".inline-edit-form");

  if (!form) return;

  // 他のフォームを閉じる
  document.querySelectorAll(".inline-edit-form").forEach(f => {
    if (f !== form) f.style.display = "none";
  });

  form.style.display = "flex";
}
window.toggleInlineEdit = toggleInlineEdit;

// キャンセル処理
document.addEventListener("click", e => {
  if (e.target.classList.contains("btn-cancel")) {
    const form = e.target.closest(".inline-edit-form");
   
  }
}); 
