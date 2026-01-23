// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// ハンバーガーメニューの開閉
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('show');
}

// メニュー外をクリックしたら閉じる
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  
  // クリックした場所がメニューでもボタンでもない場合
  if (navMenu && hamburger) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove('show');
    }
  }
});

// グローバルに関数を公開
window.toggleMenu = toggleMenu;

// ===== ここから追加 =====
// トグルボタンの表示/非表示を切り替える
function toggleActions(button) {
  const dailyRecord = button.closest('.daily-record');
  const actionsWrapper = dailyRecord.querySelector('.records-actions-wrapper');
  
  if (actionsWrapper) {
    if (actionsWrapper.style.display === 'none' || actionsWrapper.style.display === '') {
      actionsWrapper.style.display = 'block';
      button.textContent = '閉じる';
    } else {
      actionsWrapper.style.display = 'none';
      button.textContent = '編集・削除';
    }
  }
}

// グローバルスコープに関数を登録
window.toggleActions = toggleActions;
// ===== ここまで追加 =====

// DOMContentLoaded後に実行
document.addEventListener('DOMContentLoaded', () => {
  // 編集ボタン押したらモーダル開く
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const recordId = btn.dataset.recordId;
      const modal = document.getElementById("edit-modal");
      const form = document.getElementById("modal-form");

      if (modal && form) {
        // フォームの action を編集用に書き換え
        form.action = `/study_records/${recordId}`;
        
        // method属性も設定
        const methodInput = form.querySelector('input[name="_method"]');
        if (methodInput) {
          methodInput.value = 'patch';
        }

        modal.style.display = "block";
      }
    });
  });

  // モーダル閉じる
  const closeBtn = document.querySelector("#edit-modal .close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("edit-modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  }

  // モーダル外をクリックしたら閉じる
  const modal = document.getElementById("edit-modal");
  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
