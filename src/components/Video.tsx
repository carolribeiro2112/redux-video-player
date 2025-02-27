import ReactPlayer from "react-player";
import { next, useCurrentLesson } from "../store/slices/player";
import { useAppDispatch } from "../store";

export function Video() {
  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayNext}
        url={`http://youtube.com/watch?v=${currentLesson?.id}`}
      />
    </div>
  );
}
