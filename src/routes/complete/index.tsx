import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useStore<{ nickname: string; weight: number }>({
    nickname: "",
    weight: 0,
  });

  useClientEffect$(() => {
    if (
      !location.query.weight ||
      isNaN(Number(location.query.weight)) ||
      !Number(location.query.weight)
    ) {
      navigate.path = "/";
      return;
    }
    params.nickname = location.query.nickname || "";
    params.weight = Number(location.query.weight);
  });

  return (
    <>
      {params.nickname && <p>{params.nickname}様</p>}
      <p>購入が完了しました！</p>
      <p>{params.weight}kg</p>
      <Link href={`/users?nickname=${params.nickname}&weight=${params.weight}`}>
        購入者リストを見る
      </Link>
    </>
  );
});
