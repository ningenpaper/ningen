const translations = [
  // English
  `Ningen Paper Press has been active across various fields, engaging in design promotion and visual art direction. We also independently organize and present events and programs that extend from our publishing practice. Inspired by the spirit of past DIY movements, we reimagine the office printer—once limited to documents and study materials—as a tool for publishing and design. Through this approach, we propose new design methods that resonate with the times.`,

  // Korean
  `Ningen Paper Press는 다양한 분야에서 디자인 프로모션과 비주얼 아트 디렉션으로 활동해왔으며, 자체적으로 출판 연계 이벤트와 프로그램도 기획·제공하고 있습니다. 특히 과거의 DIY 정신을 계승해, 사무용 문서나 학습 자료 출력에 한정되었던 오피스 프린터를 출판과 디자인의 도구로 확장함으로써, 동시대에 걸맞은 새로운 디자인 방식을 제안하고 있습니다.`,

  // Japanese
  `Ningen Paper Pressは様々な分野でデザインプロモーションやビジュアルアートディレクションに携わってきました。また、自ら出版に関連するイベントやプログラムも企画・提供しています。過去のDIY精神にインスパイアされ、オフィスプリンターをドキュメントや学習資料に限定せず、出版とデザインの道具として再構築しました。このアプローチを通じて、現代にふさわしい新たなデザイン手法を提案しています。`,

  // Arabic
  `لقد نشطت Ningen Paper Press في مجالات متنوعة، حيث شاركت في ترويج التصميم وإدارة الفن البصري. نقوم أيضًا بتنظيم وتقديم فعاليات وبرامج مرتبطة بالنشر بشكل مستقل. مستوحاة من روح الحركات الترميمية (DIY) السابقة، أعدنا تصور الطابعة المكتبية – التي كانت مقتصرة على الوثائق ومواد الدراسة – كأداة للنشر والتصميم. من خلال هذا النهج، نقترح أساليب تصميم جديدة تتماشى مع العصر الحديث.`,

  // Chinese
  `Ningen Paper Press 在各个领域积极参与设计推广和视觉艺术指导。我们还独立策划并举办与出版相关的活动和项目。受到过去 DIY 精神的启发，我们重新定义办公打印机——不再仅限于文档和学习资料，而是作为出版与设计的工具。通过这种途径，我们提出了适应当下的新型设计方法。`,

  // Thai
  `Ningen Paper Press มีบทบาทในหลากหลายสาขา ทั้งการส่งเสริมดีไซน์และการกำกับงานศิลป์เชิงภาพ นอกจากนี้เรายังจัดและนำเสนออีเวนต์และโปรแกรมที่เชื่อมโยงกับงานตีพิมพ์ด้วยตนเอง ได้รับแรงบันดาลใจจากจิตวิญญาณ DIY ในอดีต เรากำลังตีความใหม่เครื่องพิมพ์สำนักงาน—ที่เคยจำกัดเพียงเอกสารหรือสื่อการเรียน—ให้กลายเป็นเครื่องมือในการตีพิมพ์และออกแบบ ผ่านแนวทางนี้ เราเสนอวิธีการออกแบบใหม่ที่สอดคล้องกับยุคสมัย`,

  // German
  `Ningen Paper Press ist in verschiedenen Bereichen aktiv und engagiert sich in Designpromotion und visuellem Artdirection. Wir organisieren auch eigenständig Veranstaltungen und Programme im Zusammenhang mit unserer Verlagsarbeit. Inspiriert vom DIY-Geist vergangener Zeiten interpretieren wir den Bürodrucker – einst auf Dokumente und Lernmaterialien beschränkt – neu als Werkzeug für Publishing und Design. Durch diesen Ansatz schlagen wir neue Designmethoden vor, die mit der Gegenwart resonieren.`,

  // Russian
  `Ningen Paper Press активно работает в различных сферах, занимаясь продвижением дизайна и визуальным арт-дирекционом. Мы также самостоятельно организуем и представляем мероприятия и программы, связанные с издательской практикой. Вдохновленные духом прошлых DIY-движений, мы переосмысливаем офисный принтер — раньше ограниченный документами и учебными материалами — как инструмент для публикации и дизайна. Благодаря этому подходу, мы предлагаем новые методы дизайна, которые соответствуют духу времени.`,

  // French
  `Ningen Paper Press est active dans divers domaines, s’engageant dans la promotion du design et la direction artistique visuelle. Nous organisons également de manière indépendante des événements et des programmes liés à notre pratique éditoriale. Inspirés par l’esprit DIY des mouvements passés, nous réinventons l’imprimante de bureau — autrefois limitée aux documents et aux supports pédagogiques — comme outil de publication et de design. Grâce à cette approche, nous proposons de nouvelles méthodes de design en phase avec notre époque.`,

  // Indonesian
  `Ningen Paper Press telah aktif di berbagai bidang, terlibat dalam promosi desain dan pengarahan seni visual. Kami juga secara mandiri menyelenggarakan dan menghadirkan acara serta program yang berhubungan dengan praktik penerbitan kami. Terinspirasi oleh semangat DIY di masa lalu, kami memaknai ulang printer kantor—yang dulu terbatas untuk dokumen dan materi belajar—sebagai alat untuk penerbitan dan desain. Melalui pendekatan ini, kami mengusulkan metode desain baru yang selaras dengan zaman.`,

  // Danish
  `Ningen Paper Press har været aktiv på tværs af forskellige felter med designpromotion og visuel art direction. Vi arrangerer også selvstændigt events og programmer, der bygger videre på vores udgivelsespraksis. Inspireret af DIY-ånden fra tidligere tider genfortolker vi kontorprinteren — engang begrænset til dokumenter og undervisningsmateriale — som et værktøj til publicering og design. Gennem denne tilgang foreslår vi nye designmetoder, der resonerer med tiden.`,

  // Spanish
  `Ningen Paper Press ha estado activo en diversos campos, participando en la promoción del diseño y la dirección de arte visual. También organizamos y presentamos de forma independiente eventos y programas vinculados a nuestra práctica editorial. Inspirados en el espíritu DIY de movimientos pasados, reimaginamos la impresora de oficina —antes limitada a documentos y materiales de estudio— como una herramienta para la publicación y el diseño. A través de este enfoque, proponemos nuevos métodos de diseño que resuenan con los tiempos.`,
];

document.getElementById("translation").addEventListener("click", function () {
  const idx = Math.floor(Math.random() * translations.length);
  this.innerText = translations[idx];
});
