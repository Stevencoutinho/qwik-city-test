import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  const users = useStore<{ date: string; nickname: string; weight: number }[]>([
    { date: "2022/10/10", nickname: "サンプル男1", weight: 10 },
    { date: "2022/11/11", nickname: "サンプル男2", weight: 2 },
    { date: "2022/12/12", nickname: "サンプル男3", weight: 5 },
  ]);

  useClientEffect$(() => {
    if (
      !location.query.nickname ||
      !location.query.weight ||
      isNaN(Number(location.query.weight))
    ) {
      return;
    }
    const date = new Date();
    users.unshift({
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      nickname: location.query.nickname,
      weight: Number(location.query.weight),
    });
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>ニックネーム</th>
            <th>重量</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.date}</td>
              <td>{user.nickname}</td>
              <td>{user.weight}kg</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/">TOPへ戻る</Link>
    </>
  );
});
