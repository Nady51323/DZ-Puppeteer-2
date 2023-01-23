const {
  clickElement,
  getText,
  getDays,
  getMovieTime,
  getSeatSelector,
  //putText
} = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  //await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Movie ticket booking tests", () => {
  test("Ticket booked successfully", async () => {
    await getDays(page, 6); //выбираем дату
    await getMovieTime(page, 2, 2); //выбираем фильм и время
    await getSeatSelector(page, 1, 10); //выбираем ряд и место
    await clickElement(page, "section > button"); // нажимаем забронировать
    await page.waitForSelector("section > header > h2"); //ждем загрузки страницы
    await clickElement(page, "section > div > button"); //получить код бронирования
    const actual = await getText(page, "section > header > h2");
    expect(actual).toContain("Электронный билет"); // должен появиться текст "Электронный билет"
  });

  test("2 tickets booked successfully", async () => {
    await getDays(page, 6); //выбираем дату
    await getMovieTime(page, 2, 2); //выбираем фильм и время
    await getSeatSelector(page, 1, 10); //выбираем ряд и место 1
    await getSeatSelector(page, 1, 9); //выбираем ряд и место 2
    await clickElement(page, "section > button"); // нажимаем забронировать
    await page.waitForSelector("section > header > h2"); //ждем загрузки страницы
    await clickElement(page, "section > div > button"); //получить код бронирования
    const actual = await getText(page, "section > header > h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Try book an unavailable ticket", async () => {
    await getDays(page, 6); //выбираем дату
    await getMovieTime(page, 2, 2); //выбираем время
    await getSeatSelector(page, 8, 6); //выбираем ряд и место
    expect(
      await page.$eval("button", (button) => {
        return button.disabled; // проверяем, что кнопка неактивна
      })
    ).toBe(true);
  });
});
