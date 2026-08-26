import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [time, setTime] = useState({
    y: "0",
    mon: "0",
    d: "1",
    h: "12",
    m: "00",
    s: "00",
    mi: "000",
  });
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState("en");

  // print request form state
  const [serviceMode, setServiceMode] = useState("");
  const [bookService, setBookService] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const pagesMultipleOf4Error =
    bookService === "saddleStitch" &&
    numberOfPages !== "" &&
    Number(numberOfPages) % 4 !== 0;

  const t = {
    en: {
      printRequest: "Print Request",
      contact: "Contact",
      placeholder: "Feel free to reach us anytime and anywhere...",
      send: "Send Message",
      des: (
        <>
          Do you want to make your own book? <br />
          If you have any provocative contents, <br />
          please reach our publisher. <br />
          We are always waiting for you.
        </>
      ),
      pf: {
        serviceType: "Service Type",
        documentService: "Document service",
        bookService: "Book service",
        print: "Print",
        copy: "Copy",
        scan: "Scan",
        noBind: "No Bind",
        saddleStitch: "Saddle Stitch Binding",
        ringBinding: "Ring Binding",
        designAndPrint: "Design and Print",
        printOnly: "Print Only",
        numberOfPages: "Number of Pages",
        numberOfCopies: "Number of Copies",
        finishedSize: "Finished size",
        inkColor: "Ink color",
        paper: "Paper",
        black: "Black",
        fullColor: "Full color",
        plain70: "Plain 70g",
        color80: "Color 80g",
        color120: "Color 120g",
        munken90: "Munken 90g",
        munken120: "Munken 120g",
        glossCoated120: "Gloss Coated 120g",
        matteCoated120: "Matte Coated 120g",
        uncoatedOffset120: "Uncoated Offset 120g",
        tracing90: "Tracing paper 90g",
        printFormat: "Print Format",
        oneSided: "One sided",
        doubleSided: "Double sided",
        customerInfo: "Customer Info",
        name: "Name",
        phone: "Phone Number",
        email: "Email",
        pickupDate: "Desired Pickup Date",
        notes: "Special Requests / Notes",
        notesPlaceholder:
          "Please describe in detail any binding of multiple files with different sizes, non-standard sizes, special printing, or paper pre-order inquiries.",
        pagesMultipleOf4:
          "Saddle Stitch Binding requires a multiple of 4 pages.",
      },
    },
    kr: {
      printRequest: "인쇄 요청",
      contact: "문의",
      placeholder: "언제 어디서든 편하게 연락주세요...",
      send: "메시지 보내기",
      des: (
        <>
          당신만의 책을 만들고 싶으신가요? <br />
          도발적인 콘텐츠가 있다면, <br />
          저희 출판사로 연락 주세요. <br />
          언제나 기다리고 있겠습니다.
        </>
      ),
      pf: {
        serviceType: "서비스 종류",
        documentService: "문서 서비스",
        bookService: "북 서비스",
        print: "프린트",
        copy: "복사",
        scan: "스캔",
        noBind: "무제본",
        saddleStitch: "중철 제본",
        ringBinding: "링 제본",
        designAndPrint: "디자인+인쇄",
        printOnly: "인쇄만",
        numberOfPages: "페이지 수",
        numberOfCopies: "부수",
        finishedSize: "완성 규격",
        inkColor: "잉크 색상",
        paper: "용지",
        black: "흑백",
        fullColor: "컬러",
        plain70: "일반 70g",
        color80: "컬러 80g",
        color120: "컬러 120g",
        munken90: "문캔 90g",
        munken120: "문캔 120g",
        glossCoated120: "아트지(유광) 120g",
        matteCoated120: "스노우지(무광) 120g",
        uncoatedOffset120: "백상지 120g",
        tracing90: "트레싱지 90g",
        printFormat: "인쇄 방식",
        oneSided: "단면",
        doubleSided: "양면",
        customerInfo: "고객 정보",
        name: "이름",
        phone: "연락처",
        email: "이메일",
        pickupDate: "희망 수령일",
        notes: "요청 사항 / 메모",
        notesPlaceholder:
          "규격이 다른 여러 파일의 제본, 비규격, 특수인쇄, 종이 선발입고 문의를 자세히 작성 바랍니다.",
        pagesMultipleOf4: "중철 제본은 4의 배수 페이지만 가능합니다.",
      },
    },
  }[lang];

  // clock ticker
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        y: now.getFullYear(),
        mon: String(now.getMonth() + 1).padStart(2, "0"),
        d: String(now.getDate()).padStart(2, "0"),
        h: String(now.getHours()).padStart(2, "0"),
        m: String(now.getMinutes()).padStart(2, "0"),
        s: String(now.getSeconds()).padStart(2, "0"),
        mi: String(now.getMilliseconds()).padStart(3, "0"),
      });
    };

    const interval = setInterval(updateClock, 10);
    return () => clearInterval(interval);
  }, []);

  // contact form submit -> opens mail client
  const sendMail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:ningenpaperpress@gmail.com?subject=Message from Website&body=${encodeURIComponent(
      message,
    )}`;
  };

  return (
    <div className="main-page">
      {/* left column: identity, clock, nav */}
      <div className="left">
        <div id="timedate">
          <span>{time.y}</span>.<span>{time.mon}</span>.<span>{time.d}</span>.<span>{time.h}</span>:
          <span>{time.m}</span>:<span>{time.s}</span>:<span>{time.mi}</span>
        </div>

        <div id="title">
          <Link to="/">Ningen Paper Press</Link>
        </div>

        <div id="header-description">
          <p>
            Hey. Wake Up! It's time to print
            <br />
            <a
              href="https://maps.app.goo.gl/zoQTJ7N675B39HHf6"
              target="_blank"
              rel="noopener noreferrer"
            >
              3F, Chungmuro 50-7, Seoul, South Korea
            </a>
            <br />
            Can you check the index below...? Please...
          </p>
        </div>

        <nav id="menu-list">
          <Link to="/prints">Prints</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/public-audio">Public Audio</Link>
          <Link to="/index">Pdf Library</Link>
          <Link to="/about">About</Link>
          <Link to="/wholesale">Wholesale</Link>
        </nav>
      </div>

      {/* right column: print request form, contact form, links */}
      <div className={`right${lang === "kr" ? " lang-kr" : ""}`}>
        <div className="request-row">
          <div id="print-request">{t.printRequest}</div>
          <div
            id="lang-toggle"
            onClick={() => setLang(lang === "en" ? "kr" : "en")}
          >
            {lang === "en" ? "KR" : "EN"}
          </div>
        </div>

        {/* print request form (BEM block: print-form) */}
        <div id="print-form" className="print-form">
          {/* service type: design+print disables the spec fields below */}
          <div className="print-form__section-title">{t.pf.serviceType}</div>
          <div className="print-form__row print-form__row--checkboxes">
            <label>
              <input
                type="radio"
                name="serviceMode"
                checked={serviceMode === "design"}
                onChange={() => setServiceMode("design")}
              />{" "}
              {t.pf.designAndPrint}
            </label>
            <label>
              <input
                type="radio"
                name="serviceMode"
                checked={serviceMode === "print"}
                onChange={() => setServiceMode("print")}
              />{" "}
              {t.pf.printOnly}
            </label>
          </div>

          <fieldset
            className="print-form__fieldset"
            disabled={serviceMode === "design"}
          >
            {/* document vs. book service */}
            <div className="print-form__columns print-form__columns--even">
              <div className="print-form__col">
                <div className="print-form__col-title">
                  {t.pf.documentService}
                </div>
                <label>
                  <input type="radio" name="documentService" /> {t.pf.print}
                </label>
                <label>
                  <input type="radio" name="documentService" /> {t.pf.copy}
                </label>
                <label>
                  <input type="radio" name="documentService" /> {t.pf.scan}
                </label>
              </div>

              <div className="print-form__col">
                <div className="print-form__col-title">
                  {t.pf.bookService}
                </div>
                <label>
                  <input
                    type="radio"
                    name="bookService"
                    checked={bookService === "noBind"}
                    onChange={() => setBookService("noBind")}
                  />{" "}
                  {t.pf.noBind}
                </label>
                <label>
                  <input
                    type="radio"
                    name="bookService"
                    checked={bookService === "saddleStitch"}
                    onChange={() => setBookService("saddleStitch")}
                  />{" "}
                  {t.pf.saddleStitch}
                </label>
                <label>
                  <input
                    type="radio"
                    name="bookService"
                    checked={bookService === "ringBinding"}
                    onChange={() => setBookService("ringBinding")}
                  />{" "}
                  {t.pf.ringBinding}
                </label>
              </div>
            </div>

            {/* page / copy counts */}
            <div className="print-form__row print-form__row--top">
              <label>
                {t.pf.numberOfPages}:{" "}
                <input
                  type="number"
                  inputMode="numeric"
                  step={bookService === "saddleStitch" ? 4 : 1}
                  className="print-form__field print-form__field--small"
                  value={numberOfPages}
                  onChange={(e) => setNumberOfPages(e.target.value)}
                />
              </label>
              <label>
                {t.pf.numberOfCopies}:{" "}
                <input
                  type="number"
                  inputMode="numeric"
                  className="print-form__field print-form__field--small"
                />
              </label>
            </div>
            {pagesMultipleOf4Error && (
              <div className="print-form__error">{t.pf.pagesMultipleOf4}</div>
            )}

            {/* finished size / print format & ink / paper */}
            <div className="print-form__columns print-form__columns--even">
              <div className="print-form__col">
                <div className="print-form__col-title">
                  {t.pf.finishedSize}
                </div>
                <label>
                  <input type="radio" name="finishedSize" /> A4
                </label>
                <label>
                  <input type="radio" name="finishedSize" /> A5
                </label>
                <div className="print-form__size-inputs">
                  <input type="radio" name="finishedSize" />
                  <input
                    type="number"
                    inputMode="numeric"
                    step="10"
                    className="print-form__field print-form__field--xs"
                  />
                  ×
                  <input
                    type="number"
                    inputMode="numeric"
                    step="10"
                    className="print-form__field print-form__field--xs"
                  />
                </div>
              </div>

              <div className="print-form__col print-form__col--stacked">
                <div className="print-form__col-title">
                  {t.pf.printFormat}
                </div>
                <label>
                  <input type="radio" name="printFormat" /> {t.pf.oneSided}
                </label>
                <label>
                  <input type="radio" name="printFormat" /> {t.pf.doubleSided}
                </label>

                <div className="print-form__col-title">{t.pf.inkColor}</div>
                <label>
                  <input type="radio" name="inkColor" /> {t.pf.black}
                </label>
                <label>
                  <input type="radio" name="inkColor" /> {t.pf.fullColor}
                </label>
              </div>

              <div className="print-form__col">
                <div className="print-form__col-title">{t.pf.paper}</div>
                <label>
                  <input type="radio" name="paper" /> {t.pf.plain70}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.color80}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.color120}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.munken90}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.munken120}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.glossCoated120}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.matteCoated120}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.uncoatedOffset120}
                </label>
                <label>
                  <input type="radio" name="paper" /> {t.pf.tracing90}
                </label>
              </div>
            </div>
          </fieldset>

          {/* customer info: always editable, even in design+print mode */}
          <div className="print-form__section-title">
            {t.pf.customerInfo}
          </div>
          <div className="print-form__customer-info">
            <label>
              {t.pf.name}
              <input type="text" className="print-form__field" />
            </label>
            <label>
              {t.pf.phone}
              <input
                type="text"
                className="print-form__field"
                placeholder="010-xxxx-xxxx"
              />
            </label>
            <label>
              {t.pf.email}
              <input
                type="text"
                className="print-form__field"
                placeholder="ningenpaperpress@gmail.com"
              />
            </label>
            <label>
              {t.pf.pickupDate}
              <input type="date" className="print-form__field" />
            </label>
          </div>

          {/* free-text notes: always editable, even in design+print mode */}
          <div className="print-form__section-title">{t.pf.notes}</div>
          <textarea
            className="print-form__field print-form__textarea"
            placeholder={t.pf.notesPlaceholder}
          />
        </div>

        <div id="contact">
          {t.contact} <img src="/web-image/hand.png" alt="hand" />
        </div>
        <form onSubmit={sendMail}>
          <textarea
            id="message"
            placeholder={t.placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button type="submit">{t.send}</button>
        </form>

        <div id="des">{t.des}</div>

        <div id="links">
          <div>ningenpaperpress@gmail.com</div>
          <a
            href="https://www.instagram.com/ningenpaper.press/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ningenpaper.press
          </a>
        </div>
      </div>

      {/* fixed member photo + rotating tag, pinned to viewport */}
      <div className="fixed">
        <div className="tag">
          <h1>Welcome...</h1>
          <h2>Ningen...</h2>
          <h3>Paper...</h3>
          <h4>Web...</h4>
        </div>
      </div>

      <div className="footer">
        2023 Ningen Paper Press. Check out our latest news{" "}
        <a
          href="https://www.instagram.com/ningenpaper.press/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ningenpaperpress
        </a>
        .
      </div>
    </div>
  );
}

export default Main;
