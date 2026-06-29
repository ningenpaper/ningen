import { useEffect, useState, useRef } from "react";
import { ReactComponent as SpeakerIcon } from "./icon/speaker.svg";
import { ReactComponent as PlayIcon } from "./icon/Play.svg";
import { ReactComponent as PauseIcon } from "./icon/Pause.svg";
import { ReactComponent as CdIcon } from "./icon/CD-button.svg";
import { Link } from "react-router-dom";
import { useAudio } from "./AudioContext";
import "./Others.css";

const ROW_H = 32; // 2rem at default 16px font

const TEST_AUDIO = "https://archive.org/download/sample-sound/sample-sound.mp3";

const TEST_ITEM = {
  id: "test-001",
  title: "Jugobaggi-nori",
  artist: "Parkdaham, Dydsu",
  city: "Jeonju",
  date: "2026-05-05",
  audioUrl: TEST_AUDIO,
  cdLink: "",
};

function formatTime(sec) {
  if (!isFinite(sec) || isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function Others() {
  const { playingId, isPaused, progress, currentTime, duration, loadingId, playItem, audioRef } =
    useAudio();

  const [items, setItems] = useState([]);
  const [intro, setIntro] = useState("");
  const [introLink, setIntroLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [wrapHeight, setWrapHeight] = useState(0);
  const tableWrapRef = useRef(null);

  useEffect(() => {
    fetch("/api/public-audio")
      .then((r) => r.json())
      .then((data) => {
        const raw = data.intro || "";
        const parts = raw.split("||");
        setIntro(parts[0].trim());
        setIntroLink(parts[1]?.trim() || "");
        setItems(data.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.classList.add("body-public-audio");
    return () => document.body.classList.remove("body-public-audio");
  }, []);

  useEffect(() => {
    const el = tableWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWrapHeight(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function toggleSort() {
    setSortAsc((prev) => !prev);
  }

  // API 없는 환경(npm start)이면 TEST_ITEM, 있으면 실제 데이터 + audioUrl 없는 항목에 테스트 URL 주입
  const baseItems =
    items.length > 0
      ? items.map((item) => ({ ...item, audioUrl: item.audioUrl || TEST_AUDIO }))
      : [TEST_ITEM];

  const sortedItems = [...baseItems].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  const visibleRows = wrapHeight > 0 ? Math.ceil((wrapHeight - ROW_H) / ROW_H) + 1 : 20;
  const emptyRowCount = Math.max(0, visibleRows - sortedItems.length);

  const TickerTag = introLink ? "a" : "span";

  return (
    <div className="pa-page">
      {/* Header */}
      <header className="pa-header">
        <div className="pa-header-left">
          <h1 className="pa-title">
            N<span className="pa-title-lower">ingen</span> P
            <span className="pa-title-lower">ublic</span> A
            <span className="pa-title-lower">udio</span>
          </h1>
          <Link to="/" className="pa-site-link">
            www.ningenpaperpress.com
          </Link>
        </div>
      </header>

      {/* Ticker / Marquee */}
      <div className="pa-ticker">
        <span className="pa-speaker">
          <SpeakerIcon className="pa-speaker-svg" />
        </span>
        <div className="pa-ticker-track">
          <div className="pa-ticker-inner">
            {Array.from({ length: 5 }, (_, i) => (
              <TickerTag
                key={i}
                className="pa-ticker-text"
                aria-hidden={i > 0 ? "true" : undefined}
                {...(introLink
                  ? { href: introLink, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {intro || "----> Ningen Public Audio <----"}
              </TickerTag>
            ))}
          </div>
        </div>
        <a
          className="pa-submit-link"
          href="https://forms.gle/oNgGumQnP2MzdDq46"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submit
        </a>
      </div>

      {/* Table */}
      <div className="pa-table-wrap" ref={tableWrapRef}>
        <table className="pa-table">
          <thead>
            <tr>
              <th className="col-num" onClick={toggleSort}>
                {sortAsc ? "↑" : "↓"}
              </th>
              <th className="col-date">Date</th>
              <th className="col-artist">Artist(s)</th>
              <th className="col-title">Title</th>
              <th className="col-play">Play</th>
              <th className="col-city">City</th>
              <th className="col-cd">CD</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="pa-status">
                  Loading...
                </td>
              </tr>
            )}
            {!loading &&
              sortedItems.map((item, i) => {
                const isActive = playingId === item.id;
                const num = sortAsc ? i + 1 : sortedItems.length - i;
                return (
                  <tr key={item.id} className={isActive ? "pa-row pa-row-active" : "pa-row"}>
                    <td className="col-num">{String(num).padStart(3, "0")}</td>
                    <td className="col-date">{item.date}</td>
                    <td className="col-artist">{item.artist}</td>
                    <td className="col-title">{item.title}</td>
                    <td className="col-play">
                      {item.audioUrl && (
                        <div className="pa-play-wrap">
                          <button
                            className={`pa-play-btn${loadingId === item.id ? " pa-play-btn--loading" : ""}`}
                            onClick={() => playItem(item)}
                            aria-label={isActive && !isPaused ? "pause" : "play"}
                          >
                            {isActive && !isPaused && loadingId !== item.id ? (
                              <PauseIcon className="pa-btn-icon" />
                            ) : (
                              <PlayIcon className="pa-btn-icon" />
                            )}
                            <span className="pa-loading-dots">Wait...</span>
                          </button>
                          {isActive && loadingId === item.id && (
                            <span className="pa-loading-text">Please wait...</span>
                          )}
                          {isActive && loadingId !== item.id && (
                            <div className="pa-progress-container">
                              <span className="pa-time-current">{formatTime(currentTime)}</span>
                              <div
                                className="pa-progress-track"
                                onClick={(e) => {
                                  if (!audioRef.current) return;
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const ratio = (e.clientX - rect.left) / rect.width;
                                  audioRef.current.currentTime = ratio * audioRef.current.duration;
                                }}
                              >
                                <div
                                  className="pa-progress-fill"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="pa-time-remaining">
                                -{formatTime(Math.max(0, duration - currentTime))}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="col-city">{item.city}</td>
                    <td className="col-cd">
                      {item.cdLink && (
                        <a
                          href={item.cdLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pa-cd-link"
                        >
                          <CdIcon className="pa-cd-svg" />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            {!loading &&
              Array.from({ length: emptyRowCount }, (_, i) => (
                <tr key={`empty-${i}`} className="pa-row pa-row-empty">
                  <td className="col-num"></td>
                  <td className="col-date"></td>
                  <td className="col-artist"></td>
                  <td className="col-title"></td>
                  <td className="col-play"></td>
                  <td className="col-city"></td>
                  <td className="col-cd"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Others;
