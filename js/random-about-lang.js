const translations = [
  // English
  `Ningen Paper Press is a publishing project founded in 2021. We plan, produce, and distribute publications in a variety of forms, often born out of curiosity. We constantly reflect on the limitations of publishing as a format, and experiment with what it can be at its smallest scale. We’ve intentionally resisted making books based on logical or efficient frameworks. Instead, we strive to connect through sincere works that reveal the time, personality, and even mistakes that went into their making.`,

  // Korean
  `Ningen Paper Press는 2021년에 설립된 출판 프로젝트입니다. 호기심에서 비롯된 다양한 형식의 출판물을 기획하고, 제작하며, 유통합니다. 우리는 ‘출판’이라는 형식이 가진 한계를 끊임없이 고민하며, 가장 작은 단위에서의 출판을 실험합니다. 논리적이거나 효율적인 이론에 기대어 책을 만드는 일을 극도로 거부해왔고, 스스로 들인 시간과 개성, 때로는 실수까지도 드러날 수 있는 진정성 있는 책을 통해 사람들과 소통하고자 합니다.`,

  // Japanese
  `Ningen Paper Pressは2021年に設立された出版プロジェクトです。好奇心から生まれたさまざまな形式の出版物を企画、制作、流通しています。「出版」という形式の限界を常に問い直し、最小単位での出版を実験しています。論理的または効率的な理論に基づいて本を作ることを意図的に拒否し、時間と個性、時にはミスさえも表れる誠実な本を通じて人々とつながりたいと考えています。`,

  // Arabic
  `Ningen Paper Press هو مشروع نشر تأسس في عام 2021. نقوم بتخطيط وإنتاج وتوزيع منشورات بأشكال متنوعة، غالبًا ما تنبع من الفضول. نحن نتأمل باستمرار في حدود النشر كصيغة، ونجرب ما يمكن أن يكون عليه في أصغر مقياس. لقد رفضنا عمدًا إنشاء الكتب بناءً على أطر منطقية أو فعالة، ونسعى بدلاً من ذلك إلى التواصل من خلال أعمال صادقة تعكس الوقت والشخصية وحتى الأخطاء التي دخلت في صنعها.`,

  // Chinese
  `Ningen Paper Press 是一个成立于 2021 年的出版项目。我们策划、制作并发行多种形式的出版物，常常源于好奇心。我们不断反思“出版”这一形式的局限，并尝试以最小的单位进行出版实验。我们有意拒绝依赖逻辑或效率的框架来制作书籍，而是希望通过那些展现投入时间、个性，甚至错误的真诚作品与人沟通。`,

  // Thai
  `Ningen Paper Press เป็นโครงการสิ่งพิมพ์ที่ก่อตั้งขึ้นในปี 2021 เราวางแผน ผลิต และเผยแพร่สิ่งพิมพ์ในรูปแบบต่างๆ ที่เกิดจากความอยากรู้อยากเห็น เราตั้งคำถามกับขีดจำกัดของ "การพิมพ์" อยู่เสมอ และทดลองกับการพิมพ์ในหน่วยที่เล็กที่สุด เราได้ตั้งใจที่จะหลีกเลี่ยงการสร้างหนังสือโดยใช้กรอบที่มีเหตุผลหรือมีประสิทธิภาพ แต่เลือกเชื่อมต่อกับผู้คนผ่านผลงานที่จริงใจซึ่งเผยให้เห็นถึงเวลา บุคลิก และแม้แต่ความผิดพลาดที่อยู่ในผลงานนั้นๆ`,

  // German
  `Ningen Paper Press ist ein 2021 gegründetes Verlagsprojekt. Wir konzipieren, produzieren und vertreiben Publikationen in unterschiedlichen Formaten, oft aus Neugier heraus. Wir hinterfragen ständig die Grenzen des Mediums „Verlag“ und experimentieren mit seiner kleinsten möglichen Einheit. Wir haben bewusst darauf verzichtet, Bücher nach logischen oder effizienten Modellen herzustellen, und möchten stattdessen mit ehrlichen Arbeiten kommunizieren, die Zeit, Persönlichkeit und auch Fehler sichtbar machen.`,

  // Russian
  `Ningen Paper Press это издательский проект, основанный в 2021 году. Мы разрабатываем, создаем и распространяем публикации в различных формах, часто рожденные из любопытства. Мы постоянно размышляем о границах издательского формата и экспериментируем с его минимальными масштабами. Мы сознательно избегаем создания книг по логическим или эффективным схемам и стремимся к искренней коммуникации через работы, в которых проявляются вложенное время, индивидуальность и даже ошибки.`,

  // French
  `Ningen Paper Press est un projet d’édition fondé en 2021. Nous concevons, produisons et distribuons des publications sous diverses formes, souvent nées de la curiosité. Nous remettons constamment en question les limites du format éditorial et expérimentons ce qu’il peut être à l’échelle la plus réduite. Nous avons délibérément évité de créer des livres fondés sur des cadres logiques ou efficaces, préférant communiquer à travers des œuvres sincères révélant le temps, la personnalité et parfois même les erreurs qui ont contribué à leur réalisation.`,

  // Indonesian
  `Ningen Paper Press adalah proyek penerbitan yang didirikan pada tahun 2021. Kami merancang, memproduksi, dan mendistribusikan publikasi dalam berbagai bentuk, sering kali lahir dari rasa ingin tahu. Kami terus merenungkan batasan-batasan dari format penerbitan, dan bereksperimen dengan bentuk terkecilnya. Kami sengaja menolak membuat buku berdasarkan kerangka kerja yang logis atau efisien, dan sebaliknya berusaha menjalin hubungan melalui karya yang jujur—yang menunjukkan waktu, kepribadian, bahkan kesalahan di balik prosesnya.`,

  // Danish
  `Ningen Paper Press er et udgivelsesprojekt grundlagt i 2021. Vi planlægger, producerer og distribuerer publikationer i mange former, ofte drevet af nysgerrighed. Vi reflekterer konstant over begrænsningerne ved udgivelse som format og eksperimenterer med det i dets mindste skala. Vi har bevidst afvist at skabe bøger baseret på logiske eller effektive rammer og søger i stedet at forbinde os gennem oprigtige værker, der afslører den tid, personlighed og endda fejl, der ligger bag dem.`,

  // Spanish
  `Ningen Paper Press es un proyecto editorial fundado en 2021. Planificamos, producimos y distribuimos publicaciones en una variedad de formas, a menudo nacidas de la curiosidad. Reflexionamos constantemente sobre los límites del formato editorial y experimentamos con su escala más pequeña. Nos hemos resistido intencionadamente a hacer libros basados en marcos lógicos o eficientes, y en su lugar buscamos conectar a través de obras sinceras que revelan el tiempo, la personalidad e incluso los errores que se encuentran en su creación.`,
];

document.getElementById("translation").addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * translations.length);
  this.innerText = translations[randomIndex];
});
