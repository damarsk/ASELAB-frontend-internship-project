import LegalPage from "@/src/components/legal/LegalPage";

export const metadata = {
  title: "Kebijakan Privasi | Partnerin",
  description: "Kebijakan privasi dan pengelolaan data pengguna Partnerin.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      description="Kebijakan ini menjelaskan data yang Partnerin gunakan untuk membantu kamu menemukan partner lomba dan mengelola tim."
      updatedAt="10 Oktober 2026"
      sections={[
        {
          id: "data-yang-kami-kumpulkan",
          title: "1. Data yang Kami Kumpulkan",
          paragraphs: [
            "Saat kamu mendaftar dan menggunakan Partnerin, kami dapat mengumpulkan data yang kamu berikan secara langsung serta data yang diperlukan untuk menjalankan layanan.",
          ],
          items: [
            "Data akun seperti nama, alamat email, dan kata sandi yang tersimpan secara aman.",
            "Data profil seperti foto, bio, skill, minat, dan informasi yang kamu pilih untuk ditampilkan kepada pengguna lain.",
            "Data aktivitas seperti tim yang dibuat atau dilihat, permintaan bergabung, keanggotaan tim, dan notifikasi.",
            "Data teknis dasar seperti informasi perangkat, log, dan data sesi untuk keamanan serta pemeliharaan layanan.",
          ],
        },
        {
          id: "cara-kami-menggunakan-data",
          title: "2. Cara Kami Menggunakan Data",
          paragraphs: [
            "Data digunakan untuk membuat dan mengamankan akun, menampilkan profil dan tim, memproses permintaan bergabung, mengirim notifikasi penting, meningkatkan pengalaman pengguna, serta mencegah penyalahgunaan layanan.",
          ],
        },
        {
          id: "data-yang-terlihat",
          title: "3. Data yang Terlihat oleh Pengguna Lain",
          paragraphs: [
            "Informasi profil yang kamu isi untuk kebutuhan pencarian partner dapat terlihat oleh pengguna Partnerin lainnya. Data autentikasi seperti kata sandi tidak ditampilkan kepada pengguna lain.",
          ],
        },
        {
          id: "penyimpanan-dan-keamanan",
          title: "4. Penyimpanan dan Keamanan",
          paragraphs: [
            "Kami berusaha menggunakan langkah teknis dan organisatoris yang wajar untuk melindungi data dari akses, perubahan, pengungkapan, atau pemusnahan tanpa izin. Tidak ada metode penyimpanan atau pengiriman data melalui internet yang sepenuhnya bebas risiko.",
            "Data disimpan selama diperlukan untuk menyediakan layanan, memenuhi kewajiban hukum, menyelesaikan sengketa, dan menegakkan ketentuan Partnerin.",
          ],
        },
        {
          id: "berbagi-data",
          title: "5. Berbagi Data",
          paragraphs: [
            "Partnerin tidak menjual data pribadi pengguna. Data dapat diproses oleh penyedia layanan yang membantu operasional aplikasi atau dibagikan jika diwajibkan oleh hukum, untuk melindungi keamanan pengguna, atau untuk mencegah penipuan dan penyalahgunaan.",
          ],
        },
        {
          id: "pilihan-dan-hak-pengguna",
          title: "6. Pilihan dan Hak Pengguna",
          paragraphs: [
            "Kamu dapat memperbarui informasi profil melalui fitur yang tersedia di aplikasi. Untuk meminta koreksi, penghapusan, atau informasi terkait data pribadimu, hubungi Partnerin melalui kanal kontak resmi yang tersedia di aplikasi. Beberapa data mungkin perlu dipertahankan untuk alasan keamanan atau kewajiban hukum.",
          ],
        },
        {
          id: "perubahan-kebijakan",
          title: "7. Perubahan Kebijakan",
          paragraphs: [
            "Kebijakan ini dapat diperbarui ketika fitur atau kebutuhan operasional Partnerin berubah. Versi terbaru akan ditampilkan di halaman ini beserta tanggal pembaruannya.",
          ],
        },
      ]}
    />
  );
}
