import { stringify } from "../utils/DateTimeUtils";

it("Date object formatted", () => {
  const date = stringify(new Date("2022-12-22T12:06:59.515+00:00"));
  expect(date).toEqual("22/12/2022");
});

it("Date object formatted for date with day and month minus than ten", () => {
  const dateWithDayAndMonthMinusThanTen = stringify(
    new Date("2022-01-02T12:06:59.515+00:00")
  );

  expect(dateWithDayAndMonthMinusThanTen).toEqual("02/01/2022");
});
