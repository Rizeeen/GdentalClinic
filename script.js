document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            
            btn.disabled = true;
            btn.innerText = "Отправка...";

            const formData = new FormData(this);

            fetch('send.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert("✅ Заявка успешно отправлена!");
                    form.reset();
                } else {
                    alert("❌ Ошибка: " + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert("❌ Ошибка связи с сервером.");
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerText = originalText;
            });
        });
    }
});

function openModal(title, text, price) {
    const modal = document.getElementById('modalOverlay');
    const mTitle = document.getElementById('modalTitle');
    const mDesc = document.getElementById('modalDescription');

    mTitle.innerText = title;
    // Добавляем описание и цену в контент модалки
    mDesc.innerHTML = `<p>${text}</p><br><p><strong>Стоимость:</strong> ${price}</p>`;
    
    // Меняем текст на кнопке в модалке, чтобы она вела к записи
    const modalBtn = modal.querySelector('.btn-primary');
    modalBtn.innerText = "Записаться на эту услугу";
    modalBtn.onclick = function() {
        closeModal();
        goToBooking(title);
    };

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

function goToBooking(serviceName) {
    // Авто-выбор услуги в форме
    const select = document.querySelector('select[name="service"]');
    if(serviceName.includes('Терапия')) select.value = 'Лечение';
    if(serviceName.includes('Гигиена')) select.value = 'Чистка';
    if(serviceName.includes('Имплантация')) select.value = 'Лечение';
    if(serviceName.includes('Ортодонтия')) select.value = 'Консультация';

    // Скролл к форме
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Закрытие модалки при клике вне контента
window.onclick = function(event) {
    const modal = document.getElementById('modalOverlay');
    if (event.target == modal) {
        closeModal();
    }
}

const schedule = {
  '1': ['09:00', '21:00'], // Пн
  '2': ['09:00', '21:00'], // Вт
  '3': ['09:00', '21:00'], // Ср
  '4': ['09:00', '21:00'], // Чт
  '5': ['09:00', '21:00'], // Пт
  '6': ['09:00', '18:00'], // Сб
  '0': ['10:00', '18:00']  // Вс
};

const dateInput = document.querySelector('input[name="date"]');
const timeSelect = document.getElementById('timeInput');

dateInput.addEventListener('change', () => {

  const selectedDate = new Date(dateInput.value);
  const day = selectedDate.getDay();

  timeSelect.innerHTML = '<option value="">Выберите время</option>';

  if(schedule[day]){

    const start = schedule[day][0].split(':');
    const end = schedule[day][1].split(':');

    let startHour = parseInt(start[0]);
    let endHour = parseInt(end[0]);

    for(let h = startHour; h <= endHour; h++){

      let time = (h < 10 ? "0"+h : h) + ":00";

      let option = document.createElement("option");
      option.value = time;
      option.textContent = time;

      timeSelect.appendChild(option);
    }
  }
});

