document.addEventListener("DOMContentLoaded", () => {
  // Получаем текущий URL
  const currentUrl = window.location.href;
  const pageTitle = document.title || "TEM2 — СПЛЕТЕНИЯ";

  // Кнопка "Копировать ссылку"
  document.getElementById("copy-url-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Ссылка скопирована в буфер обмена!");
    }).catch(err => {
      console.error("Ошибка копирования:", err);
      alert("Не удалось скопировать ссылку.");
    });
  });

  // Кнопка "Поделиться ВКонтакте"
  const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
  document.getElementById("vk-share-btn").href = vkShareUrl;

  // Кнопка "Поделиться в Одноклассники"
  const okShareUrl = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(currentUrl)}&st.title=${encodeURIComponent(pageTitle)}`;
  document.getElementById("ok-share-btn").href = okShareUrl;

  // Кнопка "Поделиться в BlueSky"
  const bskyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
  document.getElementById("bsky-share-btn").href = bskyShareUrl;
});
