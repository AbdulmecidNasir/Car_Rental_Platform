# 🚗 Araç Kiralama Sistemi Projesi

Bu proje, araç kiralama işlemlerini modernize ederek hem müşteriler hem de kiralama şirketi için daha verimli bir süreç oluşturmayı başarmıştır.  
Kullanılan modern teknolojiler sayesinde sistem hızlı, güvenilir ve kullanıcı dostu bir yapıya sahiptir.  

Proje, gelecekteki geliştirmelere de açık bir şekilde tasarlanmıştır.  
Bu rapor, projenizin genel bir değerlendirmesini sunmaktadır. Projenin başarılı bir şekilde tamamlandığını ve modern web teknolojilerini etkin bir şekilde kullandığını göstermektedir.

---

## 📊 İlişki Açıklamaları

- **Müşteri - Kiralama:** Bir müşteri birden fazla araç kiralayabilir (**1:N ilişki**)
- **Araba - Kiralama:** Bir araç farklı zamanlarda birden fazla kez kiralanabilir (**1:N ilişki**)
- **Kiralama:** Müşteri ve Araç arasındaki çoka-çok (**N:M**) ilişkiyi sağlayan **ara tablodur**
- **Kısıt:** Bir araç, **aynı tarih aralığında birden fazla kişiye kiralanamaz**

---

## 📝 Sistem Açıklaması

Bu araç kiralama sistemi, müşterilerin araç kiralamasını ve kiralanmış araçların takibini sağlar. Sistem üç ana varlığa sahiptir:

- **Müşteri**
- **Otomobil**
- **Kiralama**

### 📌 Kurallar ve İşleyiş:
- Bir müşteri istediği kadar aracı kiralayabilir (**1:N ilişki**)
- Bir araç **aynı tarih aralığında birden fazla kişiye kiralanamaz**
- Müşteriler, kişisel bilgileri (ad, soyad, TC kimlik no, vb.) ile sisteme kaydedilir
- Otomobiller, teknik özellikleri (marka, model, şasi no, vb.) ile sisteme kaydedilir
- Kiralama işlemi, müşteri ve otomobil arasında **tarih bazlı** olarak gerçekleştirilir

---

## 📌 Özet

Bu proje, araç kiralama operasyonlarını dijital ortamda düzenleyerek süreçleri hızlandırmayı ve kullanıcı deneyimini iyileştirmeyi hedeflemiştir.  
İlişkisel veritabanı yapısı ve modern web teknolojileriyle desteklenmiş sistem, sektördeki benzer çözümlere alternatif oluşturabilecek niteliktedir.
