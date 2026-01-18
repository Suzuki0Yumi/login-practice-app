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
