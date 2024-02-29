import { Button, Frog, TextInput } from "frog";

export const app = new Frog({
  initialState: {
    count: 0,
    incs: 0,
    decs: 0,
    clicks: 0,
  },
});

app.frame("/", (c) => {
  const { buttonValue, deriveState } = c;

  const state = deriveState((previousState) => {
    if (buttonValue === "inc") {
      previousState.count++;
      previousState.incs++;
      previousState.clicks++;
    }
    if (buttonValue === "dec" && previousState.count > 0) {
      previousState.count--;
      previousState.decs++;
      previousState.clicks++;
    }
  });

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #00a433, #09492f)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          width: "100%",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 60 }}>🐸 Frog counter</h1>
        <div
          style={{
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 10,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 200, display: "flex" }}>{state.count}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 36,
              marginLeft: 150,
            }}
          >
            {JSON.stringify(state, null, 2)}
          </div>
        </div>
      </div>
    ),
    intents: [
      state.count > 0 && <Button value="dec">-</Button>,
      <Button value="inc">+</Button>,
    ],
  });
});

export default app;
