import rawData from "./data.json";

const cardEl = document.getElementById("activity-card");

type TimeFrame = {
  current: number;
  previous: number;
};

type Category = {
  title: string;
  timeframes: {
    daily: TimeFrame;
    weekly: TimeFrame;
    monthly: TimeFrame;
  };
};

const data = rawData as Category[];

type ActivityConfig = {
  color: string;
  icon: string;
};

const activityConfig: Record<string, ActivityConfig> = {
  Work: { color: "#FF8B64", icon: "src/assets/img/icon-work.svg" },
  Play: { color: "#55C2E6", icon: "src/assets/img/icon-play.svg" },
  Study: { color: "#FF5E7D", icon: "src/assets/img/icon-study.svg" },
  Exercise: { color: "#4BCF82", icon: "src/assets/img/icon-exercise.svg" },
  Social: { color: "#7335D2", icon: "src/assets/img/icon-social.svg" },
  "Self Care": { color: "#F1C75B", icon: "src/assets/img/icon-self-care.svg" },
};

createCard(data, "daily");
(
  document.querySelector('[data-timeframe="daily"]') as HTMLElement
).style.color = "#fff";

const buttons = document.querySelectorAll("[data-timeframe]");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => {
      (b as HTMLElement).style.color = "#bbc0ff";
    });
    (btn as HTMLElement).style.color = "#fff";
    const timeFrame = (btn as HTMLElement).dataset.timeframe;
    if (timeFrame) {
      createCard(data, timeFrame);
    }
  });
});

function createCard(data: Category[], timeframes: string) {
  if (!cardEl) return;
  cardEl.innerHTML = "";

  const html = data
    .map((item) => {
      const { current, previous } =
        item.timeframes[timeframes as keyof Category["timeframes"]];

      const { color: cardColor, icon: cardIcon } = activityConfig[item.title];

      const label =
        timeframes === "daily"
          ? "Yesterday"
          : timeframes === "weekly"
            ? "Last Week"
            : "Last Month";

      return `<div
          class="h-42  flex flex-col justify-end rounded-[0.9375em] relative overflow-hidden mb-6" style="background-color:${cardColor} "
      >
          <img
              src="${cardIcon}"
              alt="a ${item.title} icon"
              class="w-20 absolute -top-2 right-5 opacity-250 "
          />
          <div class="bg-card-bg rounded-[0.9375em] p-6 z-10">
              <div class="flex justify-between items-center align-center">
                  <p>${item.title}</p>
                  <p class="text-smaller-text">•••</p>
              </div>
              <div class="flex justify-between items-center md: flex-col md:items-start">
                  <p class="text-[2em] font-light">${current}hrs</p>
                  <p class="text-smaller-text">${label} - ${previous}hrs</p>
              </div>
          </div>
      </div>`;
    })
    .join("");
  cardEl.innerHTML = html;
}
