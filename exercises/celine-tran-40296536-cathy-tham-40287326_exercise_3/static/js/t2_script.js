// Wait for page to load
window.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('donutGallery');
    const selectedLabel = document.getElementById('selectedLabel');
    const msgInput = document.getElementById('msgInput');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const status = document.getElementById('status');
    const notesList = document.getElementById('notesList');

    let selectedDonut = null;

    // Click a donut to select it
    gallery.addEventListener('click', function(e) {
        const img = e.target.closest('img.donut');
        if (!img) return;

        document.querySelectorAll('img.donut').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');

        selectedDonut = img.dataset.donut;
        selectedLabel.textContent = 'Selected: ' + img.alt;

        saveBtn.disabled = false;
        status.textContent = '';
        status.className = 'status';
    });

    // Click save to send message
    saveBtn.addEventListener('click', async function() {
        const message = msgInput.value.trim();

        // Check if donut or message is missing
        if (!selectedDonut && !message) {
            status.textContent = 'Pick a donut and write a message!';
            status.className = 'status warning';
            return;
        }
        if (!selectedDonut) {
            status.textContent = 'Pick a donut first!';
            status.className = 'status warning';
            return;
        }
        if (!message) {
            status.textContent = 'Write a message first!';
            status.className = 'status warning';
            return;
        }

        saveBtn.disabled = true;
        status.textContent = 'Saving...';
        status.className = 'status';

        try {
            const formData = new URLSearchParams();
            formData.append('donut', selectedDonut);
            formData.append('message', message);

            const response = await fetch('/postDataFetch', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData.toString()
            });

            const result = await response.json();

            if (result.saved) {
                status.textContent = 'Saved!';
                status.className = 'status success';
                addMessageToWall(selectedDonut, message);
                msgInput.value = '';
            } else {
                status.textContent = 'Failed to save.';
                status.className = 'status error';
            }
        } catch (err) {
            status.textContent = 'Error: ' + err.message;
            status.className = 'status error';
        }

        saveBtn.disabled = false;
    });

    // Clear selection and input
    clearBtn.addEventListener('click', function() {
        document.querySelectorAll('img.donut').forEach(i => i.classList.remove('selected'));
        selectedDonut = null;
        selectedLabel.textContent = 'No donut selected';
        msgInput.value = '';
        saveBtn.disabled = true;
        status.textContent = '';
        status.className = 'status';
    });

    // Show message on the messages wall
    function addMessageToWall(donut, message) {
        const li = document.createElement('li');
        li.className = 'note-card';
        li.textContent = donut + ' — ' + message;
        li.style.opacity = 0;
        notesList.prepend(li);

        // Fade-in effect to make it fun
        setTimeout(() => {
            li.style.transition = 'opacity 0.5s';
            li.style.opacity = 1;
        }, 50);
    }
});
