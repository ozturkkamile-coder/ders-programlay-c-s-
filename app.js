
// HTML elemanlarını seçer.
const dersAdi = document.querySelector("#dersAdi");
const gun = document.querySelector("#gun");
const baslangic = document.querySelector("#baslangic");
const bitis = document.querySelector("#bitis");
const dersEkle = document.querySelector("#dersEkle");
const dersTablosu = document.querySelector("#dersTablosu");
const mesaj = document.querySelector("#mesaj");
const tumunuSil = document.querySelector("#tumunuSil");

// Dersleri tutan boş diziyi oluşturur.
let dersler = [];

// Daha önce kaydedilen dersleri alır.
const kayitliDersler = localStorage.getItem("dersler");

// Kayıt varsa dersleri diziye aktarır.
if (kayitliDersler !== null) {
    dersler = JSON.parse(kayitliDersler);
}

// Dersleri tabloya yerleştiren fonksiyondur.
const tabloyuGoster = () => {

    // Önce tablonun içini temizler.
    dersTablosu.innerHTML = "";

    // Hiç ders yoksa bilgi mesajı gösterir.
    if (dersler.length === 0) {
        dersTablosu.innerHTML = `
            <tr>
                <td colspan="9">Henüz ders eklenmedi.</td>
            </tr>
        `;
        return;
    }

    // Dizideki dersleri sırayla dolaşır.
    for (let i = 0; i < dersler.length; i++) {

        // Sıradaki dersin bilgilerini alır.
        const ders = dersler[i];

        // Dersin gününe göre ilgili sütuna adını yerleştirir.
        dersTablosu.innerHTML += `
            <tr>
                <td>${ders.baslangic} - ${ders.bitis}</td>
                <td>${ders.gun === "Pazartesi" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Salı" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Çarşamba" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Perşembe" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Cuma" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Cumartesi" ? ders.dersAdi : ""}</td>
                <td>${ders.gun === "Pazar" ? ders.dersAdi : ""}</td>
                <td>
                    <button
                        type="button"
                        class="silButonu"
                        value="${i}">
                        Sil
                    </button>
                </td>
            </tr>
        `;
    }

    // Tablodaki silme butonlarını seçer.
    const silButonlari = document.querySelectorAll(".silButonu");

    // Her silme butonuna tıklama olayı ekler.
    for (let i = 0; i < silButonlari.length; i++) {

        silButonlari[i].addEventListener("click", () => {

            // Silinecek dersin sıra numarasını alır.
            const sira = Number(silButonlari[i].value);

            // Seçilen dersi diziden çıkarır.
            dersler.splice(sira, 1);

            // Güncel dersleri tarayıcıya kaydeder.
            localStorage.setItem("dersler", JSON.stringify(dersler));

            // Tabloyu yeniden gösterir.
            tabloyuGoster();
        });
    }
};

// Yeni ders ekleme fonksiyonudur.
const dersEkleHandler = () => {

    // Alanların boş olup olmadığını kontrol eder.
    if (
        dersAdi.value === "" ||
        gun.value === "" ||
        baslangic.value === "" ||
        bitis.value === ""
    ) {
        mesaj.textContent = "Lütfen bütün alanları doldurun.";
        mesaj.style.color = "#c0394b";
        return;
    }

    // Bitiş saatinin başlangıçtan sonra olmasını kontrol eder.
    if (baslangic.value >= bitis.value) {
        mesaj.textContent = "Bitiş saati başlangıç saatinden sonra olmalı.";
        mesaj.style.color = "#c0394b";
        return;
    }

    // Yeni dersin bilgilerini nesne olarak oluşturur.
    const yeniDers = {
        dersAdi: dersAdi.value,
        gun: gun.value,
        baslangic: baslangic.value,
        bitis: bitis.value
    };

    // Yeni dersi diziye ekler.
    dersler.push(yeniDers);

    // Dersleri tarayıcıya kaydeder.
    localStorage.setItem("dersler", JSON.stringify(dersler));

    // Tabloyu günceller.
    tabloyuGoster();

    // Form alanlarını temizler.
    dersAdi.value = "";
    gun.value = "";
    baslangic.value = "";
    bitis.value = "";

    // Başarı mesajını gösterir.
    mesaj.textContent = "Ders başarıyla eklendi!";
    mesaj.style.color = "#16834a";
};

// Ders Ekle butonuna tıklanınca fonksiyonu çalıştırır.
dersEkle.addEventListener("click", dersEkleHandler);

// Tüm dersleri silme işlemini yapar.
tumunuSil.addEventListener("click", () => {

    // Ders dizisini boşaltır.
    dersler = [];

    // Tarayıcıdaki kayıtları kaldırır.
    localStorage.removeItem("dersler");

    // Tabloyu yeniler.
    tabloyuGoster();

    // Bilgi mesajını gösterir.
    mesaj.textContent = "Bütün dersler silindi.";
    mesaj.style.color = "#16834a";
});

// Sayfa açıldığında kayıtlı dersleri gösterir.
tabloyuGoster();
