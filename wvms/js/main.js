'use strict';

/**
 * Memuat file HTML eksternal dan menyimpannya ke dalam wadah template
 */
async function muatFileHtml(url, templateId) {
    try {
        const respon = await fetch(url);
        if (!respon.ok) throw new Error(`Gagal memuat ${url}`);
        const htmlTeks = await respon.text();

        const wadah = document.getElementById('template-container');
        const templateElem = document.createElement('template');
        templateElem.id = templateId;
        templateElem.innerHTML = htmlTeks;
        wadah.appendChild(templateElem);
    } catch (error) {
        console.error('Terjadi kesalahan saat memuat file HTML:', error);
    }
}

// Inisialisasi awal saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load seluruh komponen dan modul HTML
    await Promise.all([
        muatFileHtml('html/komponen.html', 'tmpl-komponen-root'),
        muatFileHtml('html/dashboard.html', 'tmpl-page-dashboard'),
        muatFileHtml('html/wisma.html', 'tmpl-page-wisma'),
        muatFileHtml('html/kunjungan.html', 'tmpl-page-kunjungan'),
        muatFileHtml('html/laporan.html', 'tmpl-page-laporan'),
        muatFileHtml('html/settings.html', 'tmpl-page-settings'),
        muatFileHtml('html/profil.html', 'tmpl-page-profil')
    ]);

    // 2. Pindahkan konten komponen ke root container
    const rootKomponen = document.getElementById('tmpl-komponen-root');
    if (rootKomponen) {
        const wadahUtama = document.getElementById('template-container');
        wadahUtama.appendChild(rootKomponen.content.cloneNode(true));
    }

    // 3. Jalankan aplikasi utama
    App.start();
});