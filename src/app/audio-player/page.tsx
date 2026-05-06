import AudioPlayer from "@/components/ui/AudioPlayer";

export default function AudioPlayerPage() {
  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "2rem",
        }}
      >
        <p style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "2px", opacity: 0.4, textTransform: "uppercase" }}>
          Click the orange button →
        </p>
      </main>
      <AudioPlayer />
    </>
  );
}
