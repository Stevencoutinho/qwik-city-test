import { component$, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const navigate = useNavigate();
  const purchase = useStore<{ nickname: string; weight: number }>({ nickname: "", weight: 2 });

  const handleSubmit = $(() => {
    const params = new URLSearchParams({
      nickname: purchase.nickname,
      weight: purchase.weight.toString(),
    });
    navigate.path = `/complete?${params}`;
  });

  return (
    <>
      <form preventdefault:submit onSubmit$={handleSubmit}>
        <p>購入するグラム数を選択</p>
        <ul>
          <li>
            2kg
            <label>
              <input
                type="radio"
                name="weight"
                value="2"
                checked={purchase.weight === 2}
                onClick$={(e) => (purchase.weight = Number((e.target as HTMLInputElement).value))}
              />
              ¥1,000
            </label>
          </li>
          <li>
            5kg
            <label>
              <input
                type="radio"
                name="weight"
                value="5"
                checked={purchase.weight === 5}
                onClick$={(e) => (purchase.weight = Number((e.target as HTMLInputElement).value))}
              />
              ¥2,000
            </label>
          </li>
          <li>
            10kg
            <label>
              <input
                type="radio"
                name="weight"
                value="10"
                checked={purchase.weight === 10}
                onClick$={(e) => (purchase.weight = Number((e.target as HTMLInputElement).value))}
              />
              ¥3,500
            </label>
          </li>
        </ul>
        <div>
          <span>ニックネーム: </span>
          <input
            type="text"
            onInput$={(e) => (purchase.nickname = (e.target as HTMLInputElement).value)}
          />
        </div>
        <button type="submit">購入する</button>
      </form>
    </>
  );
});
