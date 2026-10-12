import { S1E01Compositions } from "./s1e01/Episode";
import { S1E02Compositions } from "./s1e02/Episode";
import { S1E03Compositions } from "./s1e03/Episode";

// One entry per episode: the full film in English and Chinese, plus every
// scene on its own (folders "<code>-Scenes" and "<code>-ZH-Scenes").
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <S1E01Compositions />
      <S1E02Compositions />
      <S1E03Compositions />
    </>
  );
};
