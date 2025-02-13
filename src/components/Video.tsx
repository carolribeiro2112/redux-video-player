import ReactPlayer from "react-player";

export function Video() {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url="http://youtube.com/watch?v=YWek8a-4mmo"
      />
    </div>
  );
}
