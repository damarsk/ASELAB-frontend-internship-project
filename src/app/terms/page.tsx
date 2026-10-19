import LegalPage from "@/src/components/legal/LegalPage";

export const metadata = {
  title: "Syarat & Ketentuan | Troov",
  description: "Syarat dan ketentuan penggunaan platform Troov.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Syarat & Ketentuan"
      description="Aturan penggunaan Troov agar proses menemukan partner lomba tetap aman, nyaman, dan saling menghargai."
      updatedAt="10 Oktober 2026"
      sections={[
        {
          id: "tentang-Troov",
          title: "1. Tentang Troov",
          paragraphs: [
            "Troov adalah platform yang membantu pengguna menemukan partner dan membentuk tim untuk mengikuti kompetisi. Dengan membuat akun atau menggunakan layanan Troov, kamu menyetujui syarat dan ketentuan ini.",
          ],
        },
        {
          id: "akun-pengguna",
          title: "2. Akun Pengguna",
          paragraphs: [
            "Kamu harus memberikan informasi yang benar, lengkap, dan terbaru saat mendaftar. Satu akun hanya boleh digunakan oleh pemiliknya dan kamu bertanggung jawab menjaga keamanan kata sandi serta akses akun.",
          ],
          items: [
            "Pengguna harus berusia cukup untuk menggunakan layanan sesuai peraturan yang berlaku.",
            "Jangan menggunakan identitas, email, atau informasi milik orang lain.",
            "Segera beri tahu Troov jika mengetahui adanya penggunaan akun tanpa izin.",
          ],
        },
        {
          id: "penggunaan-layanan",
          title: "3. Penggunaan Layanan",
          paragraphs: [
            "Troov dapat digunakan untuk membuat profil, mencari tim, melihat kompetisi, mengirim permintaan bergabung, dan mengelola keanggotaan tim. Informasi profil dan skill sebaiknya dibuat relevan agar calon partner dapat mengambil keputusan dengan baik.",
          ],
          items: [
            "Dilarang mengunggah konten palsu, menyesatkan, melanggar hukum, atau merugikan pihak lain.",
            "Dilarang melakukan spam, penipuan, pelecehan, diskriminasi, atau mengganggu layanan.",
            "Dilarang mencoba mengakses akun, data, atau bagian layanan yang bukan hakmu.",
          ],
        },
        {
          id: "tim-dan-permintaan-bergabung",
          title: "4. Tim dan Permintaan Bergabung",
          paragraphs: [
            "Permintaan bergabung, penerimaan anggota, pembagian peran, komunikasi, dan hasil kompetisi merupakan tanggung jawab pengguna dan anggota tim. Troov membantu mempertemukan pengguna, tetapi tidak menjamin kecocokan, penerimaan permintaan, atau hasil kompetisi.",
          ],
        },
        {
          id: "konten-dan-moderasi",
          title: "5. Konten dan Moderasi",
          paragraphs: [
            "Kamu tetap memiliki hak atas konten yang kamu masukkan ke Troov. Dengan menggunakannya, kamu memberikan izin kepada Troov untuk menampilkan dan memproses konten tersebut sejauh diperlukan untuk menjalankan layanan.",
            "Troov dapat meninjau, membatasi, atau menghapus konten dan akun yang melanggar ketentuan ini atau membahayakan pengguna lain.",
          ],
        },
        {
          id: "perubahan-dan-penghentian-layanan",
          title: "6. Perubahan dan Penghentian Layanan",
          paragraphs: [
            "Troov dapat memperbarui fitur, menangguhkan akses, atau menghentikan layanan tertentu untuk pemeliharaan, keamanan, atau alasan operasional. Kami akan berusaha memberikan informasi yang wajar untuk perubahan penting.",
          ],
        },
        {
          id: "hubungi-kami",
          title: "7. Hubungi Kami",
          paragraphs: [
            "Jika kamu memiliki pertanyaan atau ingin melaporkan pelanggaran, gunakan kanal kontak resmi Troov yang tersedia di aplikasi.",
          ],
        },
      ]}
    />
  );
}
