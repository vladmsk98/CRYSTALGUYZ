document.addEventListener("DOMContentLoaded", () => {
  // === Глобальные переменные ===
  const currentUrl = window.location.href;
  const pageTitle = document.title || "DLTMZK — СПЛЕТЕНИЯ";

  // === 1. Остановка других треков при воспроизведении одного ===
  const allAudioPlayers = document.querySelectorAll('.audio-player');

  allAudioPlayers.forEach(player => {
    player.addEventListener('play', () => {
      allAudioPlayers.forEach(otherPlayer => {
        if (otherPlayer !== player && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
    });
  });

  // === 2. Настройка кнопок поделки (VK, OK) для обоих треков ===
  function setupSharingForTrack(suffix) { // suffix теперь может быть 'track1' или 'track2'
    const copyBtn = document.getElementById(`copy-url-btn-${suffix}`);
    const vkBtn = document.getElementById(`vk-share-btn-${suffix}`);
    const okBtn = document.getElementById(`ok-share-btn-${suffix}`);

    if (copyBtn) { // Проверка на существование элемента перед добавлением обработчика
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Ссылка скопирована в буфер обмена!");
        }).catch(err => {
          console.error("Ошибка копирования:", err);
          alert("Не удалось скопировать ссылку.");
        });
      });
    }

    if (vkBtn) {
      const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
      vkBtn.href = vkShareUrl;
    }

    if (okBtn) {
      const okShareUrl = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(currentUrl)}&st.title=${encodeURIComponent(pageTitle)}`;
      okBtn.href = okShareUrl;
    }
  }

  setupSharingForTrack('track1');
  setupSharingForTrack('track2'); // Вызов для второго трека

  // === 4. Кнопка "Вернуться к началу" ===
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 5. Фильтр по типу трека (Сольные/Совместные) ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const trackWrappers = document.querySelectorAll('.track-wrapper');

  // Функция для применения фильтра
  function applyFilter(filterType) {
    trackWrappers.forEach(wrapper => {
      // Проверяем, соответствует ли тип трека выбранному фильтру
      if (filterType === 'all' || wrapper.getAttribute('data-type') === filterType) {
        wrapper.classList.remove('hidden'); // Показываем трек
      } else {
        wrapper.classList.add('hidden'); // Скрываем трек
      }
    });

    // Обновляем активную кнопку
    filterButtons.forEach(button => {
      if (button.getAttribute('data-filter') === filterType) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Назначаем обработчики кликов на кнопки фильтра
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');
      applyFilter(filterValue);
    });
  });

  // Устанавливаем начальный фильтр (например, 'all')
  applyFilter('all');
});
