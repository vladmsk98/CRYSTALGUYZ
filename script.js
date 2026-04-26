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
  function setupSharingForTrack(suffix) {
    const copyBtn = document.getElementById(`copy-url-btn-${suffix}`);
    const vkBtn = document.getElementById(`vk-share-btn-${suffix}`);
    const okBtn = document.getElementById(`ok-share-btn-${suffix}`);

    if (copyBtn) {
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
  setupSharingForTrack('track2');

  // === 3. Система оценки треков (звезды) ===
  document.querySelectorAll('.rating-section').forEach(section => {
    const stars = section.querySelectorAll('.star');
    const trackId = section.getAttribute('data-track');
    const ratingDisplay = section.querySelector('.rating-display span');

    // Загружаем сохранённую оценку
    const savedRating = localStorage.getItem(`rating-track${trackId}`);
    if (savedRating) {
      updateStars(parseInt(savedRating));
      ratingDisplay.textContent = savedRating;
    }

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));

        // Сохраняем оценку
        localStorage.setItem(`rating-track${trackId}`, value);

        // Обновляем отображение
        updateStars(value);
        ratingDisplay.textContent = value;
      });
    });

    function updateStars(rating) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
  });

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

  // === 5. A/B-тест: "Какой трек вам ближе?" ===
  const abPrompt = document.querySelector('.ab-test-prompt');
  if (abPrompt) {
    const choices = abPrompt.querySelectorAll('.ab-choice');

    choices.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.choice; // 'ai' или 'human'

        // Сохраняем выбор один раз (если ещё не был сделан)
        if (!localStorage.getItem('ab-test-result')) {
          localStorage.setItem('ab-test-result', choice);

          // Заменяем блок на результат
          abPrompt.innerHTML = `
            <p>Спасибо за ваш выбор!</p>
            <div class="ab-result">
              <strong>${choice === 'ai' ? 'СПЛЕТЕНИЯ' : 'ТОЛЬКОБИТ'}</strong> — ваша рекомендация.
            </div>
          `;
        }
      });
    });
  }
});
