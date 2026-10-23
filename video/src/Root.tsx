import { S1E01Compositions } from "./s1e01/Episode";
import { S1E02Compositions } from "./s1e02/Episode";
import { S1E03Compositions } from "./s1e03/Episode";
import { S1E04Compositions } from "./s1e04/Episode";
import { S1E05Compositions } from "./s1e05/Episode";
import { S1E06Compositions } from "./s1e06/Episode";
import { S1E07Compositions } from "./s1e07/Episode";
import { S1E08Compositions } from "./s1e08/Episode";
import { S1E09Compositions } from "./s1e09/Episode";
import { S1E10Compositions } from "./s1e10/Episode";
import { S1E11Compositions } from "./s1e11/Episode";
import { S1E12Compositions } from "./s1e12/Episode";
import { S1E13Compositions } from "./s1e13/Episode";
import { S1E14Compositions } from "./s1e14/Episode";
import { ThumbnailStills } from "./thumbnails/Thumbnails";

// One entry per episode: the full film in English and Chinese, plus every
// scene on its own (folders "<code>-Scenes" and "<code>-ZH-Scenes").
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <S1E01Compositions />
      <S1E02Compositions />
      <S1E03Compositions />
      <S1E04Compositions />
      <S1E05Compositions />
      <S1E06Compositions />
      <S1E07Compositions />
      <S1E08Compositions />
      <S1E09Compositions />
      <S1E10Compositions />
      <S1E11Compositions />
      <S1E12Compositions />
      <S1E13Compositions />
      <S1E14Compositions />
      <ThumbnailStills />
    </>
  );
};
